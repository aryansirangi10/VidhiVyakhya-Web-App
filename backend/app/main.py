from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.database import engine
from app.db.base import Base
from app.api import health
from app.routes import auth, bills, profiles, calculations
from app.auth import auth_router
from app.dashboard import dashboard_router
from app.api.v1 import search, notifications, admin, assistant

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(search.router)
app.include_router(notifications.router)
app.include_router(admin.router)
app.include_router(assistant.router)
app.include_router(bills.router)
app.include_router(profiles.profiles_router)
app.include_router(profiles.history_router)
app.include_router(calculations.router)
