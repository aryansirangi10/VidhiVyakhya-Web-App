#!/bin/bash
set -e

BACKUP_DIR="/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "💾 Starting Enterprise Database & Storage Backup..."

# 1. PostgreSQL Database Dump
docker compose exec -T db pg_dump -U vidhi_user vidhi_db | gzip > "$BACKUP_DIR/vidhi_db_backup.sql.gz"

echo "✅ Backup completed successfully at $BACKUP_DIR"
