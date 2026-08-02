from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "VidhiVyakhya"
    environment: str = "development"
    version: str = "2.0.0"
    log_level: str = "INFO"
    
    database_url: str = "postgresql://postgres:postgres@db:5432/vidhivyakhya"
    redis_url: str = "redis://redis:6379"
    jwt_secret: str = "super_secret_jwt_key_vidhivyakhya_2026"
    jwt_expires: int = 3600
    openai_api_key: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
