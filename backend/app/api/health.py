from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
import redis.asyncio as aioredis

from app.core.config import settings
from app.db.database import get_db

router = APIRouter(tags=["Health"])

@router.get("/health")
async def health_check(db: Session = Depends(get_db)):
    db_status = "disconnected"
    try:
        db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"

    redis_status = "disconnected"
    try:
        r = aioredis.from_url(settings.redis_url, socket_timeout=1.0)
        await r.ping()
        await r.aclose()
        redis_status = "connected"
    except Exception as e:
        redis_status = f"error: {str(e)}"

    return {
        "status": "ok",
        "app": settings.app_name,
        "environment": settings.environment,
        "version": settings.version,
        "database": db_status,
        "redis": redis_status
    }
