# VidhiVyakhya 2.0 Production Deployment Guide

## Quick Start (Docker Compose Production)

1. Clone repository:
   ```bash
   git clone https://github.com/aryansirangi10/VidhiVyakhya-Web-App.git
   cd VidhiVyakhya-Web-App
   ```

2. Start full stack in production mode:
   ```bash
   docker compose -f docker-compose.prod.yml up --build -d
   ```

3. Verify health status:
   ```bash
   curl http://localhost/health
   ```

## Production Zero-Downtime Deployment

Execute the automated deployment script:
```bash
bash scripts/deploy.sh
```

## Backup & Disaster Recovery

Run database & storage backup:
```bash
bash scripts/backup.sh
```
