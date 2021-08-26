from typing import List
from fastapi import Header, APIRouter
import httpx

from resume_parser.utils import get_host

routes = APIRouter()

@routes.get('/status', status_code = 200)
async def status():
    return { 'message': 'Profile service is active.' }