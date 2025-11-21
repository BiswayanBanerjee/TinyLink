# TinyLink

# TinyLink – URL Shortener (Take-Home Assignment)

TinyLink is a full-stack URL shortener built as part of the official
TinyLink take-home assignment. It includes link creation, redirects,
stats tracking, a dashboard, and a dedicated stats page for each link.

A clean, responsive full-stack URL shortener similar to bit.ly.  
Built according to the official TinyLink assignment specification.

Live Demo: https://tiny-linkbybiswayan.vercel.app/
Backend API: https://tinylink-backend-exol.onrender.com
GitHub Repo: https://github.com/BiswayanBanerjee/TinyLink  
Video Walkthrough: https://drive.google.com/file/d/1HRRMUBq2Wp9AGEjAqYHqpUePOtx64fir/view?usp=sharing
ChatGPT Transcript: https://chatgpt.com/share/692026c7-7dfc-800e-8fa2-64c970888778

---

# 🏗 System Architecture

Frontend (Next.js) → Backend (Express + Prisma) → Neon PostgreSQL  
 ↑  
 Health Check ( /healthz )

# 🚀 Features

## Core Functionality

- Shorten long URLs
- Optional custom short code (`[A-Za-z0-9]{6,8}`)
- Validate URLs before saving
- Auto-generated codes when not provided
- 302 Redirect from `/:code`
- Click tracking
- Update last-clicked timestamp
- Delete links
- Stats page for each link
- Real-time auto-updating stats (3s polling)
- Dashboard auto-refreshes link table every 3s

---

# 🧱 Tech Stack

### **Frontend**

- Next.js App Router
- CSS Modules (no external dependencies)
- Responsive UI
- Server Components + Client Components
- Polling for real-time updates

### **Backend**

- Node.js + Express
- Prisma ORM
- PostgreSQL (Neon)
- URL validation middleware
- Clean controllers + services architecture

### **Database**

- Neon PostgreSQL
- Prisma migrations

### **Hosting**

- Frontend → Vercel
- Backend → Render
- Database → Neon

---

# 📄 Pages & Routes (Matches Assignment Spec)

| Purpose      | Path          | Auth   |
| ------------ | ------------- | ------ |
| Dashboard    | `/`           | Public |
| Stats Page   | `/code/:code` | Public |
| Redirect     | `/:code`      | Public |
| Health Check | `/healthz`    | Public |

---

# 📡 API Endpoints (Exactly as required)

| Method | Path               | Description                    |
| ------ | ------------------ | ------------------------------ |
| POST   | `/api/links`       | Create link (409 on duplicate) |
| GET    | `/api/links`       | List all links                 |
| GET    | `/api/links/:code` | Stats for single code          |
| DELETE | `/api/links/:code` | Delete link                    |

---

# 📦 Project Structure

## Backend

backend/
└── src
    ├── app.js
    ├── index.js
    ├── controllers
    │   └── links.controller.js
    ├── middlewares
    │   └── validateUrl.js
    ├── routes
    │   ├── health.routes.js
    │   ├── links.routes.js
    │   └── redirect.routes.js
    ├── services
    │   └── links.service.js
    └── utils
        ├── db.js
        └── generateCode.js


## Frontend

frontend/
└── src
    ├── app
    │   ├── layout.js
    │   ├── globals.css
    │   ├── page.js               # Dashboard
    │   └── code
    │       └── [code]
    │           ├── page.jsx      # Stats Page
    │           └── page.module.css
    │
    ├── components
    │   ├── AddLinkForm.jsx
    │   ├── AddLinkForm.module.css
    │   ├── LinksTable.jsx
    │   └── LinksTable.module.css
    │
    └── lib
        └── api.js


---

# 🛠 Environment Variables

## `.env.example` (Backend)

DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
PORT=5000

## `.env.local` (Frontend)

NEXT_PUBLIC_API_URL=https://tiny-linkbybiswayan.vercel.app/

---

# 🧪 Automated Testing Requirements (All Satisfied)

According to the spec:

# 📘 Assignment Requirements — Coverage

- ✔ Short URL creation (POST /api/links)
- ✔ Optional custom codes
- ✔ Redirect from /:code
- ✔ Click tracking + last clicked
- ✔ Stats page per link ( /code/:code )
- ✔ Dashboard page ( / )
- ✔ Health check ( /healthz )
- ✔ Clean UI, responsive, error & loading states
- ✔ Auto-refresh dashboard
- ✔ Auto-refresh stats page
- ✔ Hosted backend + frontend

# 📊 UI/UX Features

- Responsive layout (mobile → table converts into cards)
- Form inline validation
- Disabled submit during loading
- Copy short URL button
- Truncated long URLs
- Empty/Loading/Error states
- Auto-refresh Dashboard and Stats pages
- Clean component structure
- Consistent button styles and spacing

---

# 🚀 Running Locally

## Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev


Backend runs at:
http://localhost:5000


Frontend

cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:3000


# 🌐 Hosting

- **Frontend:** Vercel (Next.js App Router)
- **Backend:** Render (Node + Express)
- **Database:** Neon PostgreSQL

The frontend communicates with the backend using
`NEXT_PUBLIC_API_URL` environment variable.

A backend wake-up loader handles Render's cold start delay.



# 👨‍💻 Author

**Biswayan Banerjee**
Junior Full Stack Developer
Kolkata, India

GitHub: https://github.com/BiswayanBanerjee
LinkedIn: https://www.linkedin.com/in/biswayan-banerjee
```
