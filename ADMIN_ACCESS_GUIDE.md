# Admin Dashboard Access Guide

## How to Access Admin Dashboard

### Step 1: Start the Application
```bash
# Terminal 1 - Start Server
cd server
npm run dev

# Terminal 2 - Start Client
cd client
npm run dev
```

### Step 2: Navigate to Admin Login
Open your browser and go to:
```
http://localhost:5173/admin/login
```

### Step 3: Login with Default Credentials

**Default Admin Account:**
- **Email:** `admin@connectx.ai`
- **Password:** `Admin@123`

⚠️ **Important:** Change the default password after first login for security.

### Step 4: Access Dashboard
After successful login, you will be automatically redirected to:
```
http://localhost:5173/admin/dashboard
```

---

## Admin Dashboard Sections

### 1. Dashboard Overview
**URL:** `/admin/dashboard`

**What it shows:**
- Total registrations count
- Total career applications count
- Active users count
- Recent registrations (last 10)
- Recent career applications (last 10)

**Navigation:** Click "Dashboard" in the sidebar

---

### 2. Registrations Management
**URL:** `/admin/registrations`

**What it shows:**
- Complete list of all early access registrations
- Registration ID, name, email, phone, date
- Search functionality (by name or email)
- Filter by date range
- Pagination for large datasets

**Features:**
- **View Details:** Click on any registration to see complete information
- **Search:** Enter name or email in search bar
- **Filter:** Select date range to filter registrations
- **Export:** Click "Export" button to download CSV/Excel file
- **Delete:** Select registration and click delete to remove

**Navigation:** Click "Registrations" in the sidebar

---

### 3. Career Applications Management
**URL:** `/admin/careers`

**What it shows:**
- Complete list of all job applications
- Application ID, candidate name, email, role, status, date
- Status indicators (Pending, Approved, Rejected)
- Search functionality
- Filter by status and role

**Features:**
- **View Details:** Click on any application to see complete information including resume
- **Download Resume:** Click download button to get candidate's resume file
- **Filter by Status:** Select "Pending", "Approved", or "Rejected" from dropdown
- **Filter by Role:** Select specific job role from dropdown
- **Approve Application:** Select application and click "Approve" - sends approval email to candidate
- **Reject Application:** Select application, click "Reject", enter reason - sends rejection email to candidate
- **Export:** Click "Export" button to download CSV/Excel file

**Navigation:** Click "Careers" in the sidebar

---

### 4. Settings
**URL:** `/admin/settings`

**What it shows:**
- Email configuration settings
- SMTP settings
- Company information
- System preferences

**Features:**
- **Update Email Settings:** Modify SMTP credentials and test email delivery
- **Update Company Info:** Change company name, support email, etc.
- **View Audit Logs:** See all admin actions with timestamps

**Navigation:** Click "Settings" in the sidebar

---

## Quick Navigation Guide

### From Landing Page
1. Go to `http://localhost:5173`
2. Scroll to footer
3. Click "Admin Login" link
4. Enter credentials
5. Access dashboard

### Direct URLs
- **Admin Login:** `http://localhost:5173/admin/login`
- **Dashboard:** `http://localhost:5173/admin/dashboard`
- **Registrations:** `http://localhost:5173/admin/registrations`
- **Careers:** `http://localhost:5173/admin/careers`
- **Settings:** `http://localhost:5173/admin/settings`

---

## Viewing Registrations

### Step-by-Step:
1. Login to admin dashboard
2. Click "Registrations" in sidebar
3. View all registrations in table format
4. Use search bar to find specific registration
5. Click on any row to view detailed information

### Registration Details Include:
- Personal Information (name, email, phone, WhatsApp, gender)
- Location (state, city, country)
- Education (degree, branch, graduation year, institution)
- Career Interests (internship, full-time, placement assistance, career guidance)
- Preferred Job Role and Location
- ConnectX Features selected
- Suggestions
- Registration Date and ID

---

## Viewing Career Applications

### Step-by-Step:
1. Login to admin dashboard
2. Click "Careers" in sidebar
3. View all applications in table format
4. Use filters to narrow down:
   - Filter by status (Pending/Approved/Rejected)
   - Filter by job role
5. Click on any row to view detailed information
6. Download resume by clicking "Download Resume" button

### Application Details Include:
- Personal Information (name, email, phone, WhatsApp, gender)
- Location (city, state, country)
- Education (degree, branch, graduation year, institution)
- Role Information (role applying for, experience level, current status, availability)
- Resume (downloadable file)
- Skills (selected skills list)
- Answers to questions (why join, why select, achievements, projects, contribution)
- Application Status
- Application Date and ID

---

## Managing Application Status

### Approve Application:
1. Navigate to Careers section
2. Find the application you want to approve
3. Click "Approve" button
4. Confirm approval
5. System automatically sends approval email to candidate
6. Status changes to "Approved"

### Reject Application:
1. Navigate to Careers section
2. Find the application you want to reject
3. Click "Reject" button
4. Enter rejection reason
5. Confirm rejection
6. System automatically sends rejection email to candidate
7. Status changes to "Rejected"

---

## Exporting Data

### Export Registrations:
1. Navigate to Registrations section
2. Click "Export" button
3. Select format (CSV or Excel)
4. File downloads automatically
5. File contains all registration data

### Export Applications:
1. Navigate to Careers section
2. Click "Export" button
3. Select format (CSV or Excel)
4. File downloads automatically
5. File contains all application data

---

## Logout
1. Click "Logout" button in top right corner
2. Confirm logout
3. Redirected to admin login page
4. Session token cleared from browser

---

## Troubleshooting

### Cannot Login:
- Verify email and password are correct
- Check server is running on port 5000
- Check browser console for errors
- Clear browser cache and cookies

### Cannot Access Dashboard:
- Verify you are logged in
- Check if JWT token exists in localStorage
- Try logging out and logging back in

### Data Not Loading:
- Check server is running
- Check database connection
- Check browser console for API errors
- Refresh the page

### Email Not Sending:
- Check email settings in Settings page
- Verify SMTP credentials in `.env` file
- Test email configuration in Settings
- Check server logs for email errors

---

## Security Notes

⚠️ **Important Security Practices:**

1. **Change Default Password:** Change the default admin password immediately after first login
2. **Use Strong Passwords:** Use complex passwords with uppercase, lowercase, numbers, and special characters
3. **Enable HTTPS:** Use HTTPS in production for secure communication
4. **Limit Access:** Restrict admin access to authorized personnel only
5. **Regular Backups:** Backup database regularly
6. **Monitor Audit Logs:** Regularly review audit logs for suspicious activity
7. **Keep Software Updated:** Keep dependencies and server updated

---

## API Endpoints for Admin

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token

### Registrations
- `GET /api/registrations` - Get all registrations (admin only)
- `GET /api/registrations/:id` - Get single registration
- `DELETE /api/registrations/:id` - Delete registration (admin only)
- `GET /api/registrations/export` - Export registrations (admin only)

### Career Applications
- `GET /api/careers` - Get all applications (admin only)
- `GET /api/careers/:id` - Get single application
- `PUT /api/careers/:id/status` - Update application status (admin only)
- `GET /api/careers/export` - Export applications (admin only)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/settings` - Get system settings
- `PUT /api/admin/settings` - Update system settings
- `GET /api/admin/audit-logs` - Get audit logs

---

## Support

If you encounter any issues:
1. Check the TESTING_DOCUMENTATION.md for detailed test cases
2. Check server logs for error messages
3. Check browser console for client-side errors
4. Verify all environment variables are set correctly
5. Ensure database is running and accessible
