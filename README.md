# TinyLink

# TinyLink – URL Shortener (Take-Home Assignment)

A clean, responsive full-stack URL shortener similar to bit.ly.  
Built according to the official TinyLink assignment specification.

Live Demo: *<your deployed frontend URL>*  
Backend API: *<your deployed backend URL>*  
GitHub Repo: *<your repo URL>*  
Video Walkthrough: *<your video link>*  
ChatGPT Transcript: *<your transcript link>*  

---

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

| Purpose | Path | Auth |
|--------|------|------|
| Dashboard | `/` | Public |
| Stats Page | `/code/:code` | Public |
| Redirect | `/:code` | Public |
| Health Check | `/healthz` | Public |

---

# 📡 API Endpoints (Exactly as required)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/links` | Create link (409 on duplicate) |
| GET | `/api/links` | List all links |
| GET | `/api/links/:code` | Stats for single code |
| DELETE | `/api/links/:code` | Delete link |

---

# 📦 Project Structure

## Backend
backend
│               
│
└───src
    │   app.js
    │   index.js
    │
    ├───controllers
    │       links.controller.js
    │
    ├───middlewares
    │       validateUrl.js
    │
    ├───routes
    │       health.routes.js
    │       links.routes.js
    │
    ├───services
    │       links.service.js
    │
    └───utils
            db.js
            generateCode.js



## Frontend

frontend
│               
│
└───src
    ├───app
    │   │   favicon.ico
    │   │   globals.css
    │   │   layout.js
    ├───app
    │   │   favicon.ico
    │   │   globals.css
    │   │   layout.js
    │   │   favicon.ico
    │   │   globals.css
    │   │   layout.js
    │   │   page.js
    │   │
    │   │   globals.css
    │   │   layout.js
    │   │   page.js
    │   │
    │   └───code
    │   │   page.js
    │   │
    │   └───code
    │   │
    │   └───code
    │   └───code
    │       └───[code]
    │       └───[code]
    │               page.jsx
    │               page.module.css
    │               page.jsx
    │               page.module.css
    │
    │               page.module.css
    │
    │
    ├───components
    │       AddLinkForm.jsx
    │       AddLinkForm.module.css
    │       LinksTable.jsx
    │       LinksTable.module.css
    │
    └───lib
            api.js



---

# 🛠 Environment Variables

## `.env.example` (Backend)

DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
PORT=5000


## `.env.local` (Frontend)

NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com


---

# 🧪 Automated Testing Requirements (All Satisfied)

According to the spec:

1. **/healthz returns 200** ✔  
2. **Create link works; duplicate → 409** ✔  
3. **Redirect increments click count** ✔  
4. **Delete stops redirect (404)** ✔  
5. **UI meets expectations** ✔  
   - Clean layout  
   - Loading / error / empty states  
   - Copy button  
   - Responsive  
   - Form validation  
   - Consistent styling  

---

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

🌐 Deployment
Backend (Render)

Create a Web Service

Add DATABASE_URL environment variable

Deploy from GitHub

Enable auto-deploy

Frontend (Vercel)

Set NEXT_PUBLIC_API_URL

Connect GitHub repo

Deploy