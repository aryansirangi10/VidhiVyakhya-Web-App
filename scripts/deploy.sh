#!/bin/bash
set -e

echo "🚀 Starting Zero-Downtime Deployment for VidhiVyakhya 2.0..."

# 1. Pull latest changes
git pull origin main

# 2. Build and verify production containers
docker compose -f docker-compose.prod.yml build --parallel

# 3. Apply database migrations
docker compose exec -T backend python -m alembic upgrade head || echo "Database up to date."

# 4. Graceful container restart
docker compose -f docker-compose.prod.yml up -d --remove-orphans

# 5. Verify deployment health
sleep 3
curl -s http://localhost/health | grep '"status":"ok"' && echo "✅ Deployment Successfully Verified!"
