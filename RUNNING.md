# ConnectX Application Run & Setup Guide

This guide provides clear, step-by-step instructions to configure, run, and build the ConnectX platform (covering both the **Client Frontend** and the **Server Backend**).

---

## 📋 Prerequisites
Ensure you have the following installed on your local environment:
- **Node.js**: Version 18.0.0 or higher
- **MySQL Database Server**: Version 8.0 or higher (runs locally, typically on port `3306`)
- **NPM Package Manager** (bundled with Node.js)

---

## ⚡ Quick Start (Run Everything Concurrently)
The root repository is configured with workspaces and helper scripts to get you running in one command.

### Step 1: Install All Dependencies
From the root directory, install all client and server node modules:
```bash
npm run install:all
```

### Step 2: Set Up Database & Seed Super Admin
Initialize the database and auto-seed the default administrator:
```bash
# In the root or server folder, execute:
npx tsx src/setupDatabase.ts
```
*(This creates the database, table schemas, and seeds the super admin user: `admin@connectx.ai` / `Admin@123`)*

### Step 3: Start Concurrently
Launch both frontend and backend development servers together:
```bash
npm run dev
```
- **Client Frontend UI**: [http://localhost:5173](http://localhost:5173)
- **Server Backend API**: [http://localhost:8000](http://localhost:8000)

---

## ⚙️ Environment Configurations (`.env` files)
If running manually, verify that `.env` files are present in the following locations:

### 1. Root Directory (`.env`)
```env
NODE_ENV=development
PORT=8000
DATABASE_URL=mysql://root:9550897539@localhost:3306/connectx_registrations
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
```

### 2. Backend Server (`server/.env`)
```env
NODE_ENV=development
PORT=8000
DATABASE_URL=mysql://root:9550897539@localhost:3306/connectx_registrations
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Mail configurations for notifications
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=ConnectX <noreply@connectx.ai>

CLIENT_URL=http://localhost:5173
```

### 3. Frontend Client (`client/.env`)
```env
VITE_API_URL=http://localhost:8000/api
```

---

## 🛠️ Step-by-Step Manual Running

### A. Server Backend (`server/`)
1. **Navigate to the server directory:**
   ```bash
   cd server
   ```
2. **Install local dependencies:**
   ```bash
   npm install
   ```
3. **Database bootstrapping & migration:**
   ```bash
   npx tsx src/setupDatabase.ts
   ```
4. **Start the backend development server:**
   ```bash
   npm run dev
   ```
   *The server runs on **[http://localhost:8000](http://localhost:8000)**.*

### B. Client Frontend (`client/`)
1. **Navigate to the client directory:**
   ```bash
   cd client
   ```
2. **Install local dependencies:**
   ```bash
   npm install
   ```
3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   *The frontend compiles and runs on **[http://localhost:5173](http://localhost:5173)**.*

---

## 📊 Default Super Admin Login
Use the following credentials to log in to the **Admin Dashboard** (`/admin` path):
- **Email/Username:** `admin@connectx.ai`
- **Password:** `Admin@123`

---

## 📦 Production Builds & Compilation

### 1. Build Client Frontend
Compiles React code and outputs minified static assets to `client/dist/`:
```bash
npm run build:client
```

### 2. Build Server Backend
Compiles TypeScript backend routes and controllers into JavaScript `server/dist/`:
```bash
npm run build:server
```
