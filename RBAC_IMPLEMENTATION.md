# RBAC (Role-Based Access Control) Implementation Guide

## Overview

This document describes the Role-Based Access Control (RBAC) system implemented across the SaralSeva application. RBAC ensures that only authorized users can access specific features and perform certain actions based on their assigned roles.

## Roles Defined

The system supports three main roles:

### 1. **User** (Regular Citizen)
- Can view available schemes
- Can apply for schemes
- Can file grievances
- Can view their own grievance status
- Can view announcements
- Can subscribe to newsletters

### 2. **Employee** (Government Employee)
- Can view and manage assigned schemes
- Can view and update assigned grievances
- Can view their own profile
- Can update their profile and performance metrics
- Can send messages to admins/users
- Can view notifications

### 3. **Admin** (System Administrator)
- Full access to all system features
- Can create and manage schemes
- Can create announcements
- Can manage users and employees
- Can view and manage all grievances
- Can change grievance and employee statuses
- Can send messages to users and employees
- Can view all notifications
- Can manage the entire system

## Backend Implementation

### 1. Database Models

All three models (User, Admin, Employee) now include a `role` field:

```javascript
role: {
  type: String,
  enum: ['user', 'employee', 'admin'],
  default: 'user'
}
```

### 2. RBAC Middleware

Located at: `backend/middleware/rbac.js`

**Key Functions:**

- `verifyToken(req, res, next)` - Verifies JWT token and extracts user information
- `checkRole(allowedRoles)` - Checks if user has required role
- `requireRole(allowedRoles)` - Combined middleware for token verification and role checking
- `requireAdmin` - Shortcut for admin-only routes
- `requireEmployee` - Shortcut for employee-only routes
- `requireUser` - Shortcut for user-only routes
- `requireAuth` - For any authenticated user

### 3. API Endpoint Protection

All API endpoints are protected with role-based access control:

#### User Routes (`/api/v1/user`)
```javascript
POST   /registerUser          - Public
POST   /loginUser             - Public
GET    /getSingleUser/:id     - Requires: user role
PUT    /updateUser/:id        - Requires: user role
GET    /getAllUser            - Requires: admin role
```

#### Admin Routes (`/api/v1/admin`)
```javascript
POST   /registerAdmin         - Public
POST   /loginAdmin            - Public
GET    /getAdmin              - Requires: admin role
GET    /getSingleAdmin/:id    - Requires: admin role
POST   /changeStatus          - Requires: admin role
```

#### Employee Routes (`/api/v1/employee`)
```javascript
POST   /register              - Public
POST   /login                 - Public
GET    /getSingleEmployee/:id - Requires: employee role
POST   /employeePerformance   - Requires: employee role
GET    /getEmployees          - Requires: admin role
POST   /changeStatus          - Requires: admin role
```

#### Schemes Routes (`/api/v1/schemes`)
```javascript
GET    /list_scheme           - Public
GET    /single_scheme/:id     - Public
POST   /add_scheme            - Requires: admin role
```

#### Scheme Applied Routes (`/api/v1/user/scheme`)
```javascript
POST   /schemeApplied         - Requires: user role
GET    /getAppliedSchemes     - Requires: authentication
GET    /getAllSchemes         - Requires: admin role
```

#### Grievance Routes (`/api/v1/grievances`)
```javascript
POST   /apply                 - Requires: user or employee role
GET    /getAllGrievance       - Requires: admin role
GET    /getSingleGrievance/:id - Requires: user, employee, or admin role
```

#### Announcement Routes (`/api/v1/announcement`)
```javascript
GET    /get_announcement      - Public
POST   /add_announcement      - Requires: admin role
```

#### Message Routes (`/api/v1/messages`)
```javascript
POST   /sendMessage           - Requires: authentication
POST   /getMessages           - Requires: authentication
GET    /getUniqueReciepents   - Requires: admin or employee role
```

#### Notification Routes (`/api/v1/notification`)
```javascript
GET    /getEmployeeNotifications         - Requires: employee role
POST   /getAdminNotifications            - Requires: admin role
POST   /markAsRead                       - Requires: authentication
POST   /deleteNotification               - Requires: authentication
```

## Frontend Implementation

### 1. RBAC Utilities

Each frontend application (user, employee, admin) has its own RBAC utility module:

#### User App (`user/src/lib/rbac.js`)
```javascript
- getUserRole()          // Get current user's role
- getCurrentUser()       // Get current user object
- hasRole(requiredRoles) // Check if user has required role
- isAuthenticated()      // Check if user is logged in
- isAdmin()              // Check if user is admin
- isEmployee()           // Check if user is employee
- isUser()               // Check if user is regular user
- canAccess(allowedRoles)// Check access permission
- logout()               // Logout user
```

#### Employee App (`employee/src/lib/rbac.js`)
```javascript
- getEmployeeRole()      // Get employee's role
- getCurrentEmployee()   // Get current employee object
- isEmployeeAuthenticated() // Check if logged in
- logoutEmployee()       // Logout employee
- canPerformAdminActions()  // Check admin permissions
- getAssignedGrievances() // Get assigned grievances
- getAssignedSchemes()   // Get assigned schemes
```

#### Admin App (`admin/src/lib/rbac.js`)
```javascript
- getAdminRole()         // Get admin's role
- getCurrentAdmin()      // Get current admin object
- isAdminAuthenticated() // Check if logged in
- logoutAdmin()          // Logout admin
- hasFullAccess()        // Check full system access
- canManageUsers()       // Check user management access
- canManageEmployees()   // Check employee management access
- canManageSchemes()     // Check scheme management access
- canManageGrievances()  // Check grievance management access
- canManageAnnouncements() // Check announcement management access
```

### 2. Protected Route Components

Each app has a Protected Route component to restrict access to specific routes:

#### User App (`user/src/components/ProtectedRoute.jsx`)
```javascript
<ProtectedRoute 
  element={<AdminDashboard />} 
  requiredRoles="admin"
  fallbackRoute="/login"
/>
```

#### Employee App (`employee/src/components/EmployeeProtectedRoute.jsx`)
```javascript
<EmployeeProtectedRoute 
  element={<EmployeeDashboard />}
  fallbackRoute="/login"
/>
```

#### Admin App (`admin/src/components/AdminProtectedRoute.jsx`)
```javascript
<AdminProtectedRoute 
  element={<AdminPanel />}
  fallbackRoute="/login"
/>
```

### 3. Frontend Usage Examples

#### Conditional Rendering Based on Role
```javascript
import { hasRole, isAuthenticated } from '../lib/rbac';

function Dashboard() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (hasRole('admin')) {
    return <AdminDashboard />;
  }

  if (hasRole('user')) {
    return <UserDashboard />;
  }

  return <Unauthorized />;
}
```

#### Hiding/Disabling UI Components
```javascript
import { hasRole } from '../lib/rbac';

function ActionButtons() {
  return (
    <div>
      <button>View Profile</button>
      
      {hasRole('admin') && (
        <button>Manage Users</button>
      )}
      
      {hasRole('admin') && (
        <button>Create Announcement</button>
      )}
    </div>
  );
}
```

#### Making Protected API Calls
```javascript
import { getAuthHeader } from '../lib/rbac';

async function fetchUserData() {
  const response = await fetch('/api/v1/user/getSingleUser/123', {
    headers: {
      ...getAuthHeader(),
      'Content-Type': 'application/json'
    }
  });
  
  return response.json();
}
```

## Implementation Checklist

### Backend
- [x] Add `role` field to User model
- [x] Add `role` field to Admin model
- [x] Add `role` field to Employee model
- [x] Create RBAC middleware (`backend/middleware/rbac.js`)
- [x] Protect User routes with RBAC
- [x] Protect Admin routes with RBAC
- [x] Protect Employee routes with RBAC
- [x] Protect Scheme routes with RBAC
- [x] Protect Grievance routes with RBAC
- [x] Protect Announcement routes with RBAC
- [x] Protect Message routes with RBAC
- [x] Protect Notification routes with RBAC

### Frontend - User App
- [ ] Create RBAC utility (`user/src/lib/rbac.js`)
- [ ] Create ProtectedRoute component (`user/src/components/ProtectedRoute.jsx`)
- [ ] Update App.jsx routes to use ProtectedRoute
- [ ] Hide/disable admin-only components for non-admin users
- [ ] Add role checks to API calls

### Frontend - Employee App
- [ ] Create RBAC utility (`employee/src/lib/rbac.js`)
- [ ] Create EmployeeProtectedRoute component
- [ ] Update App.jsx routes to use EmployeeProtectedRoute
- [ ] Restrict access to employee-specific features
- [ ] Add role checks to API calls

### Frontend - Admin App
- [ ] Create RBAC utility (`admin/src/lib/rbac.js`)
- [ ] Create AdminProtectedRoute component
- [ ] Update App.jsx routes to use AdminProtectedRoute
- [ ] Ensure all features are admin-only
- [ ] Add role checks to API calls

## Security Best Practices

1. **Always verify tokens** - Backend middleware verifies JWT tokens before processing requests
2. **Double-check on client and server** - Frontend checks roles for UX, backend enforces security
3. **Use HTTPS** - Always transmit tokens over secure connections
4. **Token expiration** - Implement token expiration and refresh mechanisms
5. **Input validation** - Validate all user inputs on both frontend and backend
6. **Error handling** - Don't expose sensitive information in error messages
7. **Logging** - Log all authentication and authorization attempts
8. **Database indexing** - Index role fields for efficient queries

## Testing RBAC

### Backend Testing
```bash
# Test unauthorized access (should fail)
curl -X GET http://localhost:5000/api/v1/admin/getAdmin

# Test with valid token but wrong role (should fail)
curl -H "Authorization: Bearer <user-token>" \
  http://localhost:5000/api/v1/admin/getAdmin

# Test with valid token and correct role (should succeed)
curl -H "Authorization: Bearer <admin-token>" \
  http://localhost:5000/api/v1/admin/getAdmin
```

### Frontend Testing
1. Test unauthorized route access
2. Test protected components rendering
3. Test logout functionality
4. Test API calls with/without tokens
5. Test role-based UI visibility

## Troubleshooting

### Issue: "Invalid or expired token"
- Solution: Check if token is correctly passed in Authorization header
- Format: `Authorization: Bearer <token>`

### Issue: "Access denied. Required roles: admin"
- Solution: Ensure user has the correct role assigned
- Check database for role field

### Issue: Protected routes showing 403 errors
- Solution: Verify token is valid and user has required role
- Check middleware implementation

### Issue: Frontend not hiding admin components
- Solution: Ensure `hasRole()` is called correctly
- Check role value stored in localStorage

## Future Enhancements

1. **Permission-based system** - Implement granular permissions beyond roles
2. **Role hierarchy** - Create role hierarchies (e.g., super-admin, admin, moderator)
3. **Time-based access** - Restrict access based on time windows
4. **Multi-factor authentication** - Add 2FA for admin accounts
5. **Audit logging** - Log all access attempts and changes
6. **Dynamic role management** - Allow creating custom roles from admin panel

## Support

For issues or questions regarding RBAC implementation, please refer to the issue #45 on GitHub or contact the development team.
