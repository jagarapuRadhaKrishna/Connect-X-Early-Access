# ConnectX Early Access - Testing Documentation

## Table of Contents
1. [Admin Dashboard Testing](#admin-dashboard-testing)
2. [User Registration Testing](#user-registration-testing)
3. [Career Application Testing](#career-application-testing)
4. [Authentication Testing](#authentication-testing)
5. [API Endpoint Testing](#api-endpoint-testing)
6. [Database Testing](#database-testing)
7. [Email Service Testing](#email-service-testing)
8. [Cross-Browser Testing](#cross-browser-testing)

---

## Admin Dashboard Testing

### Prerequisites
- Admin account created in database
- Valid admin credentials
- Server running on port 5000
- Client running on port 5173

### Test Cases

#### 1. Admin Login
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| AD-001 | Valid admin login | 1. Navigate to `/admin/login`<br>2. Enter valid email<br>3. Enter valid password<br>4. Click login | Redirect to admin dashboard, JWT token stored |
| AD-002 | Invalid email | 1. Enter invalid email format<br>2. Enter valid password<br>3. Click login | Error message: "Invalid email format" |
| AD-003 | Wrong password | 1. Enter valid email<br>2. Enter wrong password<br>3. Click login | Error message: "Invalid credentials" |
| AD-004 | Empty fields | 1. Leave email empty<br>2. Leave password empty<br>3. Click login | Validation error for required fields |
| AD-005 | Session persistence | 1. Login successfully<br>2. Refresh page<br>3. Navigate to admin routes | User remains logged in, no re-authentication required |

#### 2. Dashboard Overview
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| AD-010 | View dashboard stats | 1. Login as admin<br>2. Navigate to dashboard | Display total registrations, career applications, active users |
| AD-011 | Recent registrations list | 1. Scroll to recent registrations section | Show last 10 registrations with timestamps |
| AD-012 | Recent applications list | 1. Scroll to recent applications section | Show last 10 career applications with status |

#### 3. Registration Management
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| AD-020 | View all registrations | 1. Navigate to registrations page | Display paginated list of all registrations |
| AD-021 | Search registrations | 1. Enter search term (email/name)<br>2. Click search | Filter results matching search term |
| AD-022 | Filter by date | 1. Select date range<br>2. Apply filter | Show registrations within date range |
| AD-023 | Export registrations | 1. Click export button<br>2. Select format (CSV/Excel)<br>3. Download file | File downloads with all registration data |
| AD-024 | View registration details | 1. Click on a registration<br>2. View details modal | Show complete registration information |
| AD-025 | Delete registration | 1. Select registration<br>2. Click delete<br>3. Confirm deletion | Registration removed from database |

#### 4. Career Applications Management
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| AD-030 | View all applications | 1. Navigate to careers page | Display paginated list of all applications |
| AD-031 | Filter by status | 1. Select status filter (Pending/Approved/Rejected)<br>2. Apply filter | Show applications with selected status |
| AD-032 | Filter by role | 1. Select role from dropdown<br>2. Apply filter | Show applications for selected role |
| AD-033 | View application details | 1. Click on an application<br>2. View details modal | Show complete application info including resume |
| AD-034 | Download resume | 1. Open application details<br>2. Click download resume | Resume file downloads successfully |
| AD-035 | Approve application | 1. Select application<br>2. Click approve<br>3. Confirm | Status changes to "Approved", email sent to candidate |
| AD-036 | Reject application | 1. Select application<br>2. Click reject<br>3. Enter reason<br>4. Confirm | Status changes to "Rejected", email sent to candidate |
| AD-037 | Export applications | 1. Click export button<br>2. Select format<br>3. Download | File downloads with all application data |

#### 5. Admin Settings
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| AD-040 | View settings | 1. Navigate to settings page | Display current system settings |
| AD-041 | Update email settings | 1. Modify SMTP settings<br>2. Save changes | Settings updated, test email sent |
| AD-042 | Update system info | 1. Modify company name<br>2. Save changes | Settings updated successfully |
| AD-043 | View audit logs | 1. Navigate to audit logs section | Display list of admin actions with timestamps |

---

## User Registration Testing

### Prerequisites
- Server running on port 5000
- Client running on port 5173
- Database configured

### Test Cases

#### 1. Registration Form - Step 1: Personal Information
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| UR-001 | Valid personal info | 1. Enter valid name<br>2. Enter valid email<br>3. Enter valid phone<br>4. Enter valid WhatsApp<br>5. Select gender<br>6. Click Next | Proceed to step 2, data validated |
| UR-002 | Invalid email format | 1. Enter invalid email (e.g., test@)<br>2. Click Next | Validation error: "Invalid email format" |
| UR-003 | Invalid phone format | 1. Enter phone with letters<br>2. Click Next | Validation error: "Phone must be 10 digits" |
| UR-004 | Duplicate email | 1. Enter already registered email<br>2. Click Next | Error: "Email already registered" |
| UR-005 | Missing required fields | 1. Leave required fields empty<br>2. Click Next | Validation errors for missing fields |
| UR-006 | Phone/WhatsApp mismatch | 1. Enter different phone and WhatsApp<br>2. Click Next | Should allow (no validation required) |

#### 2. Registration Form - Step 2: Location Information
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| UR-010 | Valid location info | 1. Select state from dropdown<br>2. Enter city<br>3. Enter country<br>4. Click Next | Proceed to step 3 |
| UR-011 | Invalid state | 1. Enter invalid state<br>2. Click Next | Validation error or dropdown selection required |
| UR-012 | Empty city | 1. Leave city empty<br>2. Click Next | Validation error: "City is required" |

#### 3. Registration Form - Step 3: Education Information
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| UR-020 | Valid education info | 1. Select degree from dropdown<br>2. Select branch from dropdown<br>3. Select graduation year<br>4. Enter institution<br>5. Click Next | Proceed to step 4 |
| UR-021 | Invalid graduation year | 1. Select past year (e.g., 2020)<br>2. Click Next | Validation error or warning |
| UR-022 | Empty institution | 1. Leave institution empty<br>2. Click Next | Validation error: "Institution is required" |

#### 4. Registration Form - Step 4: Career Interests
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| UR-030 | Select career options | 1. Click "Internship"<br>2. Click "Full Time"<br>3. Observe checkbox state | Checkboxes show solid red background when selected |
| UR-031 | Deselect career option | 1. Click selected option<br>2. Observe checkbox state | Checkbox returns to unselected state |
| UR-032 | No selection | 1. Leave all options unselected<br>2. Click Next | Validation error: "Select at least one option" |
| UR-033 | Select job role | 1. Select role from dropdown<br>2. Select location from dropdown<br>3. Click Next | Proceed to step 5 |

#### 5. Registration Form - Step 5: ConnectX Features
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| UR-040 | Select features | 1. Click feature categories<br>2. Select individual features<br>3. Observe checkbox state | Checkboxes show solid red background when selected |
| UR-041 | Deselect feature | 1. Click selected feature<br>2. Observe checkbox state | Checkbox returns to unselected state |
| UR-042 | No selection | 1. Leave all features unselected<br>2. Click Next | Should allow (optional field) |

#### 6. Registration Form - Step 6: Suggestions
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| UR-050 | Enter suggestions | 1. Enter text in textarea<br>2. Observe character count | Character count updates (max 1000) |
| UR-051 | Exceed character limit | 1. Enter more than 1000 characters<br>2. Observe validation | Prevents typing beyond limit or shows warning |
| UR-052 | Empty suggestions | 1. Leave textarea empty<br>2. Click Next | Should allow (optional field) |

#### 7. Registration Form - Step 7: Terms & Submit
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| UR-060 | Accept terms | 1. Click terms checkbox<br>2. Observe checkbox state | Checkbox shows checkmark when checked |
| UR-061 | Submit without terms | 1. Leave terms unchecked<br>2. Click Submit | Validation error: "Must accept terms" |
| UR-062 | Successful submission | 1. Accept terms<br>2. Click Submit<br>3. Wait for response | Redirect to success page, email sent |

#### 8. Registration Success
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| UR-070 | View success page | 1. After successful submission<br>2. Observe page | Display success message with registration ID |
| UR-071 | Email received | 1. Check registered email<br>2. Open confirmation email | Email contains registration details and welcome message |
| UR-072 | Navigate home | 1. Click "Back to Home" button<br>2. Observe navigation | Redirect to landing page |

---

## Career Application Testing

### Prerequisites
- Server running on port 5000
- Client running on port 5173
- Valid resume file (PDF/DOCX)

### Test Cases

#### 1. Career Landing Page
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| CA-001 | View landing page | 1. Navigate to `/careers` | Display careers landing page with hero section |
| CA-002 | View open positions | 1. Scroll to positions section<br>2. View role categories | Display all department categories with roles |
| CA-003 | Filter by department | 1. Click department filter<br>2. Observe results | Show roles for selected department |
| CA-004 | Click "Apply Now" | 1. Click "Apply Now" button<br>2. Observe navigation | Redirect to application form |

#### 2. Application Form - Step 1: Personal Information
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| CA-010 | Valid personal info | 1. Enter full name<br>2. Enter valid email<br>3. Enter valid phone<br>4. Enter WhatsApp<br>5. Select gender<br>6. Click Next | Proceed to step 2 |
| CA-011 | Invalid email | 1. Enter invalid email format<br>2. Click Next | Validation error |
| CA-012 | Duplicate email | 1. Enter already registered email<br>2. Click Next | Error: "Email already registered" |

#### 3. Application Form - Step 2: Location
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| CA-020 | Valid location | 1. Select city from dropdown<br>2. Select state from dropdown<br>3. Enter country<br>4. Click Next | Proceed to step 3 |
| CA-021 | Select "Remote" | 1. Select "Remote" from city dropdown<br>2. Observe state field | State field should still be visible |
| CA-022 | Select "Other" | 1. Select "Other" from city dropdown<br>2. Enter custom city<br>3. Select state<br>4. Click Next | Proceed to step 3 |

#### 4. Application Form - Step 3: Education
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| CA-030 | Valid education | 1. Select degree<br>2. Select branch<br>3. Select graduation year<br>4. Enter institution<br>5. Click Next | Proceed to step 4 |
| CA-031 | Invalid graduation year | 1. Select invalid year<br>2. Click Next | Validation error |

#### 5. Application Form - Step 4: Role & Experience
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| CA-040 | Select role | 1. Select role from dropdown<br>2. Select experience level<br>3. Select current status<br>4. Select availability<br>5. Click Next | Proceed to step 5 |
| CA-041 | Pre-filled role | 1. Navigate with `?role=Software Engineer`<br>2. Observe role field | Role field pre-filled with URL parameter |

#### 6. Application Form - Step 5: Resume Upload
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| CA-050 | Upload PDF resume | 1. Click "Upload Resume"<br>2. Select PDF file<br>3. Wait for parsing<br>4. Observe auto-fill | Fields auto-filled from parsed data |
| CA-051 | Upload DOCX resume | 1. Click "Upload Resume"<br>2. Select DOCX file<br>3. Wait for parsing<br>4. Observe auto-fill | Fields auto-filled from parsed data |
| CA-052 | Invalid file format | 1. Select non-PDF/DOCX file<br>2. Attempt upload | Error: "Invalid file format" |
| CA-053 | Large file | 1. Select file > 5MB<br>2. Attempt upload | Error: "File too large" |
| CA-054 | Parsing failure | 1. Upload corrupted file<br>2. Wait for parsing | Error: "Failed to parse resume" |
| CA-055 | Skip upload | 1. Click "Skip"<br>2. Proceed to next step | Proceed to step 6 with manual entry |

#### 7. Application Form - Step 6: Skills
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| CA-060 | Select skills | 1. Click skill checkboxes<br>2. Observe checkbox state | Checkboxes show checkmark when checked |
| CA-061 | Add custom skill | 1. Type custom skill<br>2. Click add<br>3. Observe list | Custom skill added to list |
| CA-062 | Remove skill | 1. Click remove on skill<br>2. Observe list | Skill removed from list |
| CA-063 | No skills selected | 1. Leave all skills unselected<br>2. Click Next | Validation error: "Select at least one skill" |

#### 8. Application Form - Step 7: Questions
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| CA-070 | Answer questions | 1. Enter "Why join"<br>2. Enter "Why select"<br>3. Enter achievements<br>4. Enter projects<br>5. Enter contribution<br>6. Click Next | Proceed to step 8 |
| CA-071 | Empty answers | 1. Leave fields empty<br>2. Click Next | Validation errors for required fields |

#### 9. Application Form - Step 8: Startup Commitment
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| CA-080 | Read commitment | 1. Read warning message<br>2. Observe stipend timeline | Message shows "5 months" stipend timeline |
| CA-081 | Accept agreement | 1. Click agreement checkbox<br>2. Observe checkbox state | Checkbox shows checkmark when checked |
| CA-082 | Submit without agreement | 1. Leave checkbox unchecked<br>2. Click Submit | Validation error: "Must accept agreement" |

#### 10. Application Form - Step 9: Review
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| CA-090 | Review application | 1. Scroll through all sections<br>2. Verify data accuracy | All entered data displayed correctly |
| CA-091 | Edit section | 1. Click "Edit" on a section<br>2. Modify data<br>3. Save | Data updated, return to review |
| CA-092 | Submit application | 1. Click "Submit Application"<br>2. Wait for response | Redirect to success page |

#### 11. Application Success
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| CA-100 | View success page | 1. After submission<br>2. Observe page | Display success message with application ID |
| CA-101 | Email received | 1. Check registered email<br>2. Open confirmation email | Email contains application ID and job title |
| CA-102 | HR notification | 1. Check HR email<br>2. Open notification email | HR receives application notification |

---

## Authentication Testing

### Prerequisites
- Server running on port 5000
- Admin account exists in database

### Test Cases

#### 1. Admin Authentication
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| AUTH-001 | Valid login | 1. Navigate to `/admin/login`<br>2. Enter valid credentials<br>3. Click login | Redirect to dashboard, token stored |
| AUTH-002 | Invalid credentials | 1. Enter invalid email/password<br>2. Click login | Error: "Invalid credentials" |
| AUTH-003 | Token validation | 1. Login successfully<br>2. Copy JWT token<br>3. Use in API request | API returns valid response |
| AUTH-004 | Expired token | 1. Use expired token<br>2. Make API request | Error: "Token expired" |
| AUTH-005 | Invalid token | 1. Use malformed token<br>2. Make API request | Error: "Invalid token" |
| AUTH-006 | Logout | 1. Click logout button<br>2. Observe navigation | Redirect to login, token cleared |

#### 2. Protected Routes
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| AUTH-010 | Access without token | 1. Navigate to `/admin/dashboard` without login<br>2. Observe response | Redirect to login or 401 error |
| AUTH-011 | Access with valid token | 1. Login<br>2. Navigate to protected route<br>3. Observe response | Access granted, content displayed |
| AUTH-012 | Access with invalid token | 1. Set invalid token in localStorage<br>2. Navigate to protected route | Redirect to login |

---

## API Endpoint Testing

### Prerequisites
- Server running on port 5000
- Postman or similar API testing tool
- Valid admin JWT token

### Test Cases

#### 1. Authentication Endpoints
| Test ID | Endpoint | Method | Description | Expected Result |
|---------|----------|--------|-------------|-----------------|
| API-001 | `/api/auth/login` | POST | Admin login | Returns JWT token and user data |
| API-002 | `/api/auth/login` | POST | Invalid credentials | Returns 401 error |
| API-003 | `/api/auth/verify` | GET | Verify token | Returns user data if valid |
| API-004 | `/api/auth/verify` | GET | Invalid token | Returns 401 error |

#### 2. Registration Endpoints
| Test ID | Endpoint | Method | Description | Expected Result |
|---------|----------|--------|-------------|-----------------|
| API-010 | `/api/registrations` | POST | Create registration | Returns created registration with ID |
| API-011 | `/api/registrations` | POST | Duplicate email | Returns 400 error |
| API-012 | `/api/registrations` | POST | Invalid data | Returns validation errors |
| API-013 | `/api/registrations` | GET | Get all registrations (admin) | Returns paginated list |
| API-014 | `/api/registrations/:id` | GET | Get single registration | Returns registration details |
| API-015 | `/api/registrations/:id` | DELETE | Delete registration (admin) | Returns success message |
| API-016 | `/api/registrations/export` | GET | Export registrations | Returns CSV/Excel file |

#### 3. Career Endpoints
| Test ID | Endpoint | Method | Description | Expected Result |
|---------|----------|--------|-------------|-----------------|
| API-020 | `/api/careers/apply` | POST | Submit application | Returns application with ID |
| API-021 | `/api/careers/apply` | POST | Duplicate email | Returns 400 error |
| API-022 | `/api/careers/parse-resume` | POST | Parse resume | Returns extracted data |
| API-023 | `/api/careers/parse-resume` | POST | Invalid file | Returns 400 error |
| API-024 | `/api/careers` | GET | Get all applications (admin) | Returns paginated list |
| API-025 | `/api/careers/:id` | GET | Get single application | Returns application details |
| API-026 | `/api/careers/:id/status` | PUT | Update status (admin) | Returns updated application |
| API-027 | `/api/careers/export` | GET | Export applications | Returns CSV/Excel file |

#### 4. Admin Endpoints
| Test ID | Endpoint | Method | Description | Expected Result |
|---------|----------|--------|-------------|-----------------|
| API-030 | `/api/admin/stats` | GET | Get dashboard stats | Returns statistics |
| API-031 | `/api/admin/settings` | GET | Get settings | Returns current settings |
| API-032 | `/api/admin/settings` | PUT | Update settings | Returns updated settings |
| API-033 | `/api/admin/audit-logs` | GET | Get audit logs | Returns paginated logs |

---

## Database Testing

### Prerequisites
- Database server running
- Database schema created
- Test data seeded

### Test Cases

#### 1. Database Connection
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| DB-001 | Connection test | 1. Run connection test script | Connection successful |
| DB-002 | Connection retry | 1. Stop database<br>2. Attempt connection<br>3. Start database<br>4. Retry connection | Connection fails then succeeds |

#### 2. Model Operations
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| DB-010 | Create registration | 1. Insert registration record<br>2. Query database | Record exists with correct data |
| DB-011 | Create application | 1. Insert application record<br>2. Query database | Record exists with correct data |
| DB-012 | Update status | 1. Update application status<br>2. Query database | Status updated correctly |
| DB-013 | Delete record | 1. Delete registration<br>2. Query database | Record removed |
| DB-014 | Foreign key constraint | 1. Try to delete referenced record<br>2. Observe result | Constraint violation error |

#### 3. Data Integrity
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| DB-020 | Unique constraint | 1. Insert duplicate email<br>2. Observe result | Unique constraint violation |
| DB-021 | Not null constraint | 1. Insert record with null required field<br>2. Observe result | Not null constraint violation |
| DB-022 | Email validation | 1. Insert invalid email format<br>2. Observe result | Validation error |

---

## Email Service Testing

### Prerequisites
- SMTP server configured
- Valid email credentials in .env
- Test email accounts

### Test Cases

#### 1. Email Configuration
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| EMAIL-001 | Verify transporter | 1. Run verification script | Transporter verified successfully |
| EMAIL-002 | Invalid credentials | 1. Use invalid SMTP credentials<br>2. Attempt verification | Verification fails |

#### 2. Email Sending
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| EMAIL-010 | Early access email | 1. Submit registration<br>2. Check email inbox | Email received with correct content |
| EMAIL-011 | Application confirmation | 1. Submit career application<br>2. Check email inbox | Email received with application ID |
| EMAIL-012 | HR notification | 1. Submit career application<br>2. Check HR email | HR receives notification |
| EMAIL-013 | Approval email | 1. Approve application<br>2. Check candidate email | Candidate receives approval email |
| EMAIL-014 | Rejection email | 1. Reject application<br>2. Check candidate email | Candidate receives rejection email |

#### 3. Email Content
| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| EMAIL-020 | Email template rendering | 1. Send test email<br>2. Verify HTML rendering | Template renders correctly |
| EMAIL-021 | Dynamic content | 1. Send email with dynamic data<br>2. Verify placeholders | Dynamic data replaced correctly |
| EMAIL-022 | Email attachments | 1. Send email with attachment<br>2. Verify attachment | Attachment included correctly |

---

## Cross-Browser Testing

### Browsers to Test
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Safari (latest, if available)

### Test Cases

| Test ID | Browser | Description | Expected Result |
|---------|---------|-------------|-----------------|
| CB-001 | Chrome | Registration form | All features work correctly |
| CB-002 | Firefox | Registration form | All features work correctly |
| CB-003 | Edge | Registration form | All features work correctly |
| CB-004 | Chrome | Career application form | All features work correctly |
| CB-005 | Firefox | Career application form | All features work correctly |
| CB-006 | Edge | Career application form | All features work correctly |
| CB-007 | Chrome | Admin dashboard | All features work correctly |
| CB-008 | Firefox | Admin dashboard | All features work correctly |
| CB-009 | Edge | Admin dashboard | All features work correctly |
| CB-010 | All | Checkbox visibility | Checkboxes show checkmark when checked |
| CB-011 | All | Dropdown functionality | Dropdowns display and select correctly |
| CB-012 | All | Responsive design | Layout adapts to screen size |

---

## Performance Testing

### Test Cases

| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| PERF-001 | Page load time | 1. Measure landing page load | < 3 seconds |
| PERF-002 | Form submission | 1. Measure registration submission time | < 2 seconds |
| PERF-003 | Resume parsing | 1. Upload and parse resume<br>2. Measure time | < 5 seconds |
| PERF-004 | Dashboard load | 1. Measure admin dashboard load | < 2 seconds |
| PERF-005 | Export data | 1. Export 1000 registrations<br>2. Measure time | < 10 seconds |

---

## Security Testing

### Test Cases

| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| SEC-001 | SQL injection | 1. Attempt SQL injection in form fields | Input sanitized, no SQL execution |
| SEC-002 | XSS prevention | 1. Attempt XSS in form fields | Input sanitized, no script execution |
| SEC-003 | CSRF protection | 1. Attempt CSRF attack | Request blocked |
| SEC-004 | Rate limiting | 1. Send multiple rapid requests | Requests rate-limited after threshold |
| SEC-005 | Password hashing | 1. Check admin password in database | Password hashed, not plaintext |
| SEC-006 | JWT security | 1. Decode JWT token<br>2. Verify signature | Token signed with secret key |

---

## Mobile Responsiveness Testing

### Devices to Test
- iPhone (iOS)
- Android phone
- Tablet (iPad/Android tablet)

### Test Cases

| Test ID | Device | Description | Expected Result |
|---------|--------|-------------|-----------------|
| MOB-001 | iPhone | Registration form | Layout adapts, all fields accessible |
| MOB-002 | Android | Registration form | Layout adapts, all fields accessible |
| MOB-003 | Tablet | Registration form | Layout adapts, all fields accessible |
| MOB-004 | iPhone | Career application form | Layout adapts, all fields accessible |
| MOB-005 | Android | Career application form | Layout adapts, all fields accessible |
| MOB-006 | iPhone | Admin dashboard | Layout adapts, all features accessible |
| MOB-007 | Android | Admin dashboard | Layout adapts, all features accessible |

---

## Test Environment Setup

### Local Development
```bash
# Clone repository
git clone https://github.com/jagarapuRadhaKrishna/Connect-X-Early-Access.git
cd Connect-X-Early-Access

# Install dependencies
npm install
cd client && npm install
cd ../server && npm install

# Configure environment
cp server/.env.example server/.env
# Edit .env with your credentials

# Setup database
cd server
npm run setup

# Start servers
npm run dev  # Terminal 1 - Server
cd ../client && npm run dev  # Terminal 2 - Client
```

### Test Data
- Admin credentials: Check database seed file
- Test resume files: Located in `client/` directory
- Test email accounts: Configure in `.env`

---

## Bug Reporting Template

```
Bug ID: [AUTO-GENERATED]
Title: [Brief description]
Severity: [Critical/High/Medium/Low]
Priority: [P1/P2/P3/P4]

Environment:
- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Firefox/Edge/Safari]
- Version: [Version number]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Result:
[What should happen]

Actual Result:
[What actually happened]

Screenshots/Videos:
[Attach if applicable]

Additional Notes:
[Any additional context]
```

---

## Test Execution Checklist

### Pre-Testing
- [ ] Database configured and running
- [ ] Server started on port 5000
- [ ] Client started on port 5173
- [ ] Email service configured
- [ ] Test data seeded
- [ ] Admin account created

### Admin Dashboard Testing
- [ ] Login functionality
- [ ] Dashboard overview
- [ ] Registration management
- [ ] Career application management
- [ ] Settings management
- [ ] Audit logs viewing

### User Registration Testing
- [ ] All 7 form steps
- [ ] Checkbox visibility
- [ ] Dropdown functionality
- [ ] Form validation
- [ ] Success page
- [ ] Email delivery

### Career Application Testing
- [ ] Landing page
- [ ] All 9 form steps
- [ ] Resume upload and parsing
- [ ] Skills selection
- [ ] Agreement acceptance
- [ ] Success page
- [ ] Email delivery

### API Testing
- [ ] Authentication endpoints
- [ ] Registration endpoints
- [ ] Career endpoints
- [ ] Admin endpoints

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if available)

### Post-Testing
- [ ] Document bugs found
- [ ] Create bug reports
- [ ] Update test documentation
- [ ] Clean up test data
