# VidhiVyakhya (विधिव्याख्या) - Law, Decoded Personally

VidhiVyakhya calculates the personal financial impact of Indian parliamentary bills and budget amendments based on a user's financial profile. It pairs results with precise, interactive clause-level highlights in the original PDF text.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Python 3.11 + FastAPI + Uvicorn
- **Database**: PostgreSQL (JSONB schema for structured rules)
- **Deployment**: Docker Compose

## Getting Started
To spin up the entire application locally, ensure Docker Desktop is running and run:
```bash
docker compose up --build
```
Once active, the services will be reachable at:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8000`

---

## Security & Encryption Trade-offs

> [!IMPORTANT]
> **Encryption at Rest Policy**
> For authenticated users, personal financial profile attributes (`income`, `age`, `state`, `employment_category`) are encrypted using **AES-256-CBC** before database writes.
>
> **Trade-off & Trust Level**:
> The AES key is managed server-side (stored in `.env` as `ENCRYPTION_KEY`). While this protects against database dumps and disk snooping, it **does not offer zero-knowledge security**. Since the backend container retains the key to run calculations and display profiles, a server operator or system compromise could decrypt the profiles. This simplicity was chosen to support seamless rule calculation in the backend rather than executing client-side cryptographic logic.
