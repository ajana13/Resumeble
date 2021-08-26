from fastapi import FastAPI
from resume_parser.routes import routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(openapi_url='/api/v1/resume/openapi.json', docs_url='/api/v1/resume/docs')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(routes, prefix = '/api/v1/resume')