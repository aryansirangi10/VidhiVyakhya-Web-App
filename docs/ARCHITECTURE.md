# VidhiVyakhya 2.0 System Architecture

## Architecture Overview

VidhiVyakhya 2.0 follows **Clean Architecture + Feature-Driven Design**.

```
HTTP Request ──► API Router ──► Service Layer ──► Repository Layer ──► Database
```

## Directory Structure

### Frontend (`frontend/src/`)
- `app/`: Global application bootstrap (providers, theme, router, env config).
- `shared/`: Reusable components (Button, Card, Badge, Input, etc.), hooks, types, utils.
- `features/`: Isolated feature modules (`landing`, `bills`, `calculator`, `dashboard`, `auth`, `glossary`, `pdf`, `history`, `profiles`).
- `pages/`: Top-level route pages.

### Backend (`backend/app/`)
- `api/v1/`: Versioned API controllers.
- `services/`: Core business logic services.
- `repositories/`: Database abstraction queries.
- `engine/`: 7-stage rule evaluation and citation pipeline.
- `models/`: SQLAlchemy 2.0 ORM entities.
- `schemas/`: Pydantic v2 validation models.
- `security/`: AES-256-CBC encryption, JWT, password hashing.
- `core/`: Application settings, structured logging.
- `db/`: Database session, migrations, pgvector.
- `workers/`: Background Redis & Celery tasks.

## Quality Standards
- Strict TypeScript mode without `any`.
- SOLID & DRY principles.
- 100% accessible WCAG-compliant design system primitives.
- Isolated feature modules with index export entry points.
