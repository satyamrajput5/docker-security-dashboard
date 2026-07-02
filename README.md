# 🐳 Docker Security Dashboard

A modern full-stack dashboard for monitoring Docker containers, images, networks, and volumes in real time.

Built with **FastAPI**, **Docker SDK**, and **React**.

---

## ✨ Features

- 📦 View all Docker containers
- 🟢 Running vs Stopped container summary
- 🖼️ List Docker images
- 💾 View Docker volumes
- 🌐 Inspect Docker networks
- 🔄 Real-time Docker information using Docker SDK
- ⚡ FastAPI REST API
- ⚛️ React frontend

---

## 🛠️ Tech Stack

### Backend
- FastAPI
- Docker SDK for Python
- Uvicorn

### Frontend
- React
- Vite
- CSS

---

## 📂 Project Structure

```
docker-security-dashboard/
│
├── backend/
│   ├── docker_service.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/satyamrajput5/docker-security-dashboard.git
cd docker-security-dashboard
```

### Backend

```bash
cd backend

python -m venv venv
source venv/bin/activate      # macOS/Linux

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

### Frontend

```bash
cd frontend

npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/summary` | Dashboard summary |
| GET | `/containers` | List containers |
| GET | `/images` | List images |
| GET | `/volumes` | List volumes |
| GET | `/networks` | List networks |

---

## Roadmap

- [x] FastAPI backend
- [x] Docker SDK integration
- [x] React frontend
- [x] Dashboard summary cards
- [ ] Container table
- [ ] Image table
- [ ] Volume table
- [ ] Network table
- [ ] Start/Stop/Restart containers
- [ ] Live container logs
- [ ] Resource usage charts
- [ ] Dark dashboard UI
- [ ] Authentication

---

## Screenshots

Coming soon.

---
