# Report Builder & Layout Manager

A full-stack, no-code report builder that allows users to create structured, data-rich reports with custom text, images, editable tables, and charts. Built with a FastAPI backend and a React frontend.

---

## ✨ Features

-  Intuitive layout builder for text, images, and tables (charts coming soon)
-  Live preview of the report layout
-  Save, load, and delete report layouts via API
-  Sample data seeding for demo/testing
-  FastAPI + React full-stack architecture


### Running Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload


Open API docs: http://localhost:8000/docs

### Running Frontend
cd frontend
npm install
npm start
