# ShadowGraph

Map Your Digital Shadow - AI-powered digital footprint intelligence platform.

## Monorepo

- `frontend/` React app
- `backend/` FastAPI backend
- `docs/` operational runbooks
- `infra/` deployment manifests

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Added Production-Oriented Assets

- Docker: `backend/Dockerfile`, `frontend/Dockerfile`, `docker-compose.yml`
- CI: `.github/workflows/ci.yml`
- K8s manifests: `infra/k8s/`
- Alembic migrations: `backend/alembic/`
- Tests: `backend/tests/`, `frontend/e2e/`
