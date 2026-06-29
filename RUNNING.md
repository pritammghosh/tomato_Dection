# Running the project locally

This repository has two parts:

- Frontend: Vite app in the project root
- Backend: FastAPI app in `backend/`

## Prerequisites

- Node.js
- Python 3.10 or newer
- Use PowerShell for the commands below, or follow the Git Bash notes if you prefer that terminal

## After downloading the repo

Open a terminal in the project root:

```powershell
cd C:\Users\prita\Downloads\tomaro-ai
```

## 1) Install the frontend dependencies

```powershell
npm install
```

## 2) Create and prepare the Python backend environment

If the backend virtual environment does not already exist, create it:

```powershell
python -m venv backend\.venv
```

Activate it:

```powershell
backend\.venv\Scripts\Activate.ps1
```

Install backend dependencies:

```powershell
python -m pip install -r backend\requirements.txt
```

If `Activate.ps1` is blocked by PowerShell, run this once in the same window:

```powershell
Set-ExecutionPolicy -Scope Process RemoteSigned
```

## 3) Start the backend server

Run this from the project root in the same backend terminal:

```powershell
python backend\run.py
```

The backend starts on:

```text
http://127.0.0.1:8000
```

Health check:

```text
http://127.0.0.1:8000/api/health
```

## 4) Start the frontend server

Open a second terminal in the project root and run:

```powershell
npm run dev
```

The frontend starts on:

```text
http://localhost:3000
```

## 5) Use the app

- Open `http://localhost:3000` in your browser.
- The frontend talks to the backend at `http://127.0.0.1:8000/api` by default.
- If you change the backend address, set `VITE_API_BASE_URL` before running the frontend.

## If you are using Git Bash

Do not run `pip install -r backend\requirements.txt` by itself. That fails if `pip` is not on PATH.

Use the backend Python executable directly:

```bash
./backend/.venv/Scripts/python.exe -m pip install -r backend/requirements.txt
./backend/.venv/Scripts/python.exe backend/run.py
```

## Stop the servers

- Press `Ctrl+C` in each terminal.

## Notes

- The model files `best.pt` and `bestclassifier.pt` are already included in the repo.
- The backend stores uploads and generated reports under `backend/uploads/` and `backend/reports/`.
