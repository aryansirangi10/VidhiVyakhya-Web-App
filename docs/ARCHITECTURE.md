# VidhiVyakhya 2.0 Enterprise Architecture Guide

## System Overview

VidhiVyakhya is a production-grade statutory legal intelligence platform built with Clean Architecture:

```
                                    Internet
                                        │
                                        ▼
                              Cloudflare CDN + WAF
                                        │
                                        ▼
                                Nginx Reverse Proxy
                                        │
                 ┌──────────────────────┼──────────────────────┐
                 ▼                      ▼                      ▼
          React Frontend          FastAPI Backend         Admin Portal
                 │                      │                      │
                 └──────────────┬───────┴──────────────┬───────┘
                                ▼                      ▼
                           Redis Cache            Celery Workers
                                │                      │
                    ┌───────────┴────────────┐
                    ▼                        ▼
              PostgreSQL + pgvector      Object Storage (PDFs)
```

## Layer Architecture

1. **Presentation Layer (`frontend/src/features/`)**: Feature-first domain modules (`bills`, `pdf`, `calculator`, `auth`, `dashboard`, `assistant`).
2. **API Gateway (`backend/app/api/v1/`)**: Validated FastAPI v1 REST routers with rate limiting and OpenAPI documentation.
3. **Intelligence Layer (`backend/app/engine/` & `backend/app/ai/`)**:
   - PDF Parser & Clause Splitter
   - Deterministic Statutory Tax Calculator (`tax_engine.py`, `surcharge.py`, `cess.py`, `rebate.py`)
   - 384-dim Vector Similarity Search & Grounded AI Assistant with Guardrail Validation
4. **Data Layer (`PostgreSQL 15` + `pgvector` + `Redis 7.2`)**: Encrypted profile storage (AES-256 GCM) and high-throughput Redis caching.
