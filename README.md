# ShadowGraph

ShadowGraph is a multi-module digital-footprint intelligence platform for consent-based discovery, exposure monitoring, and risk analysis.

It combines a production-oriented FastAPI backend with a React frontend to run and visualize:

- identity discovery scans,
- face recognition and anti-spoof analysis,
- research/publication lookups,
- breach monitoring,
- scraping and aggregation pipelines,
- risk scoring,
- graph intelligence,
- report export and operations monitoring.

## Tagline

Map Your Digital Shadow.

## Who This Is For

- Security researchers and OSINT practitioners
- Privacy-focused users auditing their online exposure
- Engineering teams building digital identity intelligence workflows

## Core Capabilities

- Authentication and session management
  - Email/password auth with JWT
  - Google/GitHub OAuth backend flows
- Face Intelligence
  - Image upload and face detection
  - Face embedding matching against configurable local gallery
  - Anti-spoof inference (DeepFace when available, heuristic fallback)
- Username Discovery
  - Multi-platform live probing (GitHub, LinkedIn, LeetCode, GeeksforGeeks)
- Research Detection
  - Live publication lookup via Crossref
- Breach Monitoring
  - Live HIBP integration when API key is configured
- Exposure Scoring
  - Weighted risk scoring with recommendations
- Web Scraping & Aggregation Engine
  - Seed-based crawl, keyword aggregation, email/link extraction
  - Synchronous scans + asynchronous job queue
  - Recurring crawler schedules
- Graph Intelligence
  - Dynamic graph built from persisted scan history
- Reporting
  - Event history view
  - PDF export from real scan data
- Settings & Account Lifecycle
  - Persistent settings
  - Account deletion and related cleanup
- Ops Dashboard
  - Job queue and schedule monitoring
  - Audit event feed
  - Readiness checks

## Reality Model (Important)

ShadowGraph is a real scanning pipeline, not a static demo UI. However, outputs are intelligence signals, not guaranteed truth.

- Live integrations can return false positives/false negatives.
- Anti-spoof/fake detection is probabilistic.
- Face matching quality depends on gallery quality and coverage.
- Breach checks require valid HIBP API credentials.

## Architecture

### Frontend

- React (Vite)
- React Router
- Tailwind CSS
- Framer Motion
- Cytoscape graph rendering
- Axios API client

### Backend

- FastAPI
- SQLite + SQLAlchemy ORM
- Alembic migrations
- JWT auth (python-jose)
- OAuth provider exchange endpoints
- Redis-backed distributed rate limit (fallback in-memory)
- Report generation (ReportLab)

### Ops/Delivery

- Dockerfiles (frontend/backend)
- `docker-compose.yml`
- GitHub Actions CI
- Kubernetes manifests under `infra/k8s`

## Repository Structure

- `frontend/` — React app
- `backend/` — FastAPI service
- `docs/` — operational runbooks
- `infra/` — deployment manifests
- `.github/workflows/` — CI workflows

## Quick Start (Local)

### Prerequisites

- Python 3.11+ recommended
- Node.js 20+
- Redis (optional but recommended for distributed rate limiting)
- macOS users for face stack: `cmake`, Xcode build tools

### 1. Backend setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
cp .env.example .env
```

Populate `backend/.env` with real values (see Environment section below), then:

```bash
alembic upgrade head
python3 scripts/preflight.py
python3 scripts/verify_runtime.py
python3 -m uvicorn app.main:app --reload --port 8000
```

### 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 3. Open app

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:8000/health`
- Backend readiness: `http://localhost:8000/ops/readiness`

## Environment Configuration

Configure `backend/.env`:

- Required baseline
  - `SHADOWGRAPH_SECRET_KEY` or `SHADOWGRAPH_JWT_KEYS`
- Recommended for production-grade behavior
  - `REDIS_URL`
  - `CORS_ORIGINS`
- Optional integrations
  - `HIBP_API_KEY`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GITHUB_CLIENT_ID`
  - `GITHUB_CLIENT_SECRET`

See templates and runbooks:

- `backend/.env.example`
- `docs/SECRETS_TEMPLATE.md`
- `docs/OAUTH_SETUP.md`
- `docs/OPS_SETUP.md`

## OAuth Setup (Required for Google/GitHub Login)

Register these callback URLs in provider consoles:

- `http://localhost:5173/auth?provider=google`
- `http://localhost:5173/auth?provider=github`

Full instructions:

- `docs/OAUTH_SETUP.md`

## Face System Setup & Quality

Face matching depends on local gallery entries:

- metadata: `backend/app/data/face_gallery/metadata.json`
- images: `backend/app/data/face_gallery/`

Quality guide:

- `docs/FACE_QUALITY.md`

## Run with Makefile (Convenience)

From repo root:

```bash
make backend-install
make frontend-install
make backend-preflight
make backend-runtime
make backend-migrate
make backend-run
```

In another terminal:

```bash
cd frontend && npm run dev
```

## API Surface (Selected)

- Auth
  - `POST /auth/signup`
  - `POST /auth/login`
  - `GET /auth/me`
  - `GET /auth/oauth/{provider}/start-url`
  - `POST /auth/oauth/{provider}/exchange`
- Scans
  - `POST /upload-face`
  - `POST /scan-username`
  - `POST /search-research`
  - `POST /check-breach`
  - `POST /calculate-risk`
  - `POST /scrape-aggregate`
- Jobs/Scheduling
  - `POST /jobs/scrape`
  - `GET /jobs/scrape`
  - `GET /jobs/scrape/{job_id}`
  - `POST /crawler/schedules`
  - `GET /crawler/schedules`
  - `DELETE /crawler/schedules/{schedule_id}`
- Reports/Graph/Ops
  - `GET /report/history`
  - `GET /report/export/pdf`
  - `GET /graph-data`
  - `GET /audit/events`
  - `GET /ops/readiness`
- User controls
  - `GET /settings`
  - `PUT /settings`
  - `DELETE /account`

## Testing

### Backend

```bash
cd backend
source .venv/bin/activate
pytest -q
```

### Frontend E2E (Playwright)

```bash
cd frontend
npm run test:e2e
```

## Deployment

### Docker Compose (local stack)

```bash
docker-compose up --build
```

### CI

- Workflow: `.github/workflows/ci.yml`
- Runs backend tests and frontend build on push/PR.

### Kubernetes

Reference manifests:

- `infra/k8s/backend-deployment.yaml`
- `infra/k8s/frontend-deployment.yaml`
- `infra/k8s/redis-deployment.yaml`

## Security Notes

- Do not commit real secrets.
- Rotate exposed OAuth client secrets immediately.
- Prefer `SHADOWGRAPH_JWT_KEYS` for key rotation.
- Use Redis in shared/multi-instance environments.

## Troubleshooting

- `python: command not found`
  - Use `python3` and ensure virtualenv is activated.
- `alembic: command not found`
  - Install `requirements-dev.txt` in active venv.
- `face_recognition`/`dlib` build issues
  - Install `cmake` + system build tools; prefer Python 3.11 if needed.
- Port 8000 already in use
  - Kill existing process: `lsof -ti:8000 | xargs kill -9`
- Readiness false checks
  - Inspect `GET /ops/readiness` and fill missing env/provider setup.

## License / Usage

Define your license and permitted usage model before production distribution.


![Visitor Count](https://visitor-badge.laobi.icu/badge?page_id=sadiasakharkar.ShadowGraph)
