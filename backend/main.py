"""
SolarPlan Ireland — Solar Glare Risk Checker API
FastAPI backend for preliminary glint & glare screening.
"""
import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

from glare_engine import run_glare_check

load_dotenv()

app = FastAPI(
    title='Solar Glare Risk Checker API',
    description='Preliminary glint & glare screening for solar PV projects in Ireland.',
    version='1.0.0',
)

# CORS — allow requests from the Vercel-deployed frontend
ALLOWED_ORIGINS = [
    'https://www.solarplanningireland.com',
    'https://solarplanningireland.com',
    'http://localhost:5173',
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


# ---------------------------------------------------------------------------
# Request / Response models
# ---------------------------------------------------------------------------
class PolygonPoint(BaseModel):
    lat: float
    lng: float


class ReceptorInput(BaseModel):
    id: str
    type: str = Field(..., pattern='^(road|residential|railway|aviation|atct|other)$')
    name: str
    lat: float
    lng: float


class GlareCheckRequest(BaseModel):
    polygon: List[PolygonPoint] = Field(..., min_items=3)
    project_type: str = Field(..., pattern='^(rooftop|ground-mounted)$')
    tilt: float = Field(..., ge=0, le=90)
    azimuth: float = Field(..., ge=0, le=360)
    lower_height: float = Field(..., ge=0, le=20)
    upper_height: float = Field(..., ge=0, le=20)
    surface_type: str = Field(..., pattern='^(standard|anti-reflective)$')
    receptors: List[ReceptorInput] = Field(..., min_items=1)


class LeadRequest(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    message: Optional[str] = None
    project_location: Optional[str] = None
    glare_check_id: Optional[str] = None


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------
@app.get('/health')
def health():
    return {'status': 'ok', 'service': 'solar-glare-checker'}


@app.post('/api/glare-check')
def glare_check(req: GlareCheckRequest):
    if len(req.polygon) < 3:
        raise HTTPException(status_code=400, detail='Polygon must have at least 3 points.')
    if not req.receptors:
        raise HTTPException(status_code=400, detail='At least one receptor is required.')

    polygon = [{'lat': p.lat, 'lng': p.lng} for p in req.polygon]
    receptors = [
        {'id': r.id, 'type': r.type, 'name': r.name, 'lat': r.lat, 'lng': r.lng}
        for r in req.receptors
    ]

    try:
        result = run_glare_check(
            polygon=polygon,
            tilt=req.tilt,
            azimuth=req.azimuth,
            lower_height=req.lower_height,
            upper_height=req.upper_height,
            surface_type=req.surface_type,
            project_type=req.project_type,
            receptors=receptors,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Calculation error: {str(e)}')

    # Save to Supabase if configured
    check_id = None
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_SERVICE_KEY')
    if supabase_url and supabase_key:
        try:
            from supabase import create_client
            sb = create_client(supabase_url, supabase_key)
            row = sb.table('glare_checks').insert({
                'polygon': polygon,
                'panel_config': result['panel_config'],
                'receptors_input': receptors,
                'result': result,
            }).execute()
            if row.data:
                check_id = row.data[0].get('id')
        except Exception:
            pass   # Non-fatal — don't fail the response if Supabase is unavailable

    result['check_id'] = check_id
    return result


@app.post('/api/lead')
def capture_lead(req: LeadRequest):
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_SERVICE_KEY')

    if not supabase_url or not supabase_key:
        # Return ok even without Supabase — front-end will still show results
        return {'status': 'ok', 'message': 'Lead received (Supabase not configured)'}

    try:
        from supabase import create_client
        sb = create_client(supabase_url, supabase_key)
        sb.table('glare_leads').insert({
            'name': req.name,
            'email': req.email,
            'phone': req.phone,
            'company': req.company,
            'message': req.message,
            'project_location': req.project_location,
            'glare_check_id': req.glare_check_id,
        }).execute()
        return {'status': 'ok'}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
