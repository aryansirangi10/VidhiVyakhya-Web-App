.PHONY: up down frontend backend test lint build

up:
	docker compose up --build

down:
	docker compose down

frontend:
	cd frontend && npm run dev

backend:
	cd backend && uvicorn app.main:app --reload

test:
	cd backend && python -m pytest

lint:
	cd frontend && npm run lint

build:
	cd frontend && npm run build
