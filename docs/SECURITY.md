# VidhiVyakhya 2.0 Security & Compliance Guide

## Enterprise Security Specifications

1. **Authentication**: PBKDF2/Argon2id password hashing + 15-minute access tokens & 30-day refresh token rotation.
2. **Data Encryption**: Sensitive citizen financial profile metrics (annual income, capital gains) are encrypted at rest using AES-256 GCM (`encryption.py`).
3. **Network Protection**: Nginx WAF rate-limiting (`auth_limit`: 5 req/min, `api_limit`: 60 req/min) and HTTP Security Headers (`CSP`, `HSTS`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`).
4. **Anti-Hallucination Guardrails**: AI Assistant statements are validated against retrieved statutory clause citations. If evidence is insufficient, ungrounded responses are blocked.
