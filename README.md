# ConnectX Early Access Registration Platform

A production-ready, enterprise-grade early access registration platform for ConnectX - an AI Talent Cloud.

## Tech Stack

### Frontend
- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- React Hook Form
- Zod
- React Router DOM
- TanStack Query
- Axios
- Lucide React
- Sonner
- Recharts

### Backend
- Node.js
- Express.js
- TypeScript
- Sequelize ORM
- MySQL
- JWT Authentication
- Nodemailer
- Multer

## Project Structure

```
connectx-registration/
├── client/          # React frontend
├── server/          # Express backend
└── docs/           # Documentation
```

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Installation

1. Clone the repository
2. Install all dependencies:
```bash
npm run install:all
```

3. Configure environment variables (see below)
4. Setup MySQL database:
```bash
Create database: connectx_registrations
```

5. Run development servers:
```bash
npm run dev
```

### Environment Variables

#### Server (.env)
```
NODE_ENV=development
PORT=8000
DATABASE_URL=mysql://root:password@localhost:3306/connectx_registrations
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=ConnectX <noreply@connectx.ai>

# CORS
CLIENT_URL=http://localhost:5173
```

#### Client (.env)
```
VITE_API_URL=http://localhost:8000/api
```

## Features

### Landing Page
- Hero section with navigation
- About ConnectX
- Platform vision
- Benefits and statistics
- Roadmap
- Features preview
- Testimonials
- FAQ
- Call to action

### Registration Workflow
- Multi-step form (7 steps)
- Real-time validation
- Duplicate prevention
- Rate limiting
- Registration ID generation
- Success screen

### Admin Dashboard
- Analytics dashboard
- Registration management
- Approval/rejection workflow
- Bulk actions
- Advanced filters
- Export functionality (Excel, CSV, PDF)
- Email management
- Audit logs

### Security
- JWT authentication
- Role-based access control
- Rate limiting
- XSS protection
- SQL injection prevention
- Input sanitization
- CORS configuration
- Helmet security headers

## Database Schema

### Tables
- `admins` - Admin users
- `students` - Student registrations
- `registration_logs` - Registration activity logs
- `email_logs` - Email delivery logs
- `notifications` - System notifications
- `audit_logs` - Audit trail
- `settings` - Application settings

## API Documentation

API endpoints follow REST best practices with proper status codes, validation, pagination, and filtering.

### Public Endpoints
- `POST /api/registrations` - Submit registration
- `GET /api/registrations/:id` - Get registration by ID

### Admin Endpoints
- `POST /api/auth/login` - Admin login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/registrations` - List registrations
- `GET /api/admin/registrations/:id` - Get registration details
- `PUT /api/admin/registrations/:id` - Update registration
- `POST /api/admin/registrations/:id/approve` - Approve registration
- `POST /api/admin/registrations/:id/reject` - Reject registration
- `DELETE /api/admin/registrations/:id` - Delete registration
- `GET /api/admin/analytics` - Analytics data
- `POST /api/admin/export` - Export data

## Deployment

### Production Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## License

Proprietary - ConnectX
