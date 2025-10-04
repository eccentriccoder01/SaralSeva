This file explains how to verify the form validation changes added to SaralSeva (both frontend and backend).

Frontend checks

1. Grievance form (user app):
   - Open the app in your browser (development server), go to "Lodge a Grievance" → "Grievance Registration Form".
   - Try submitting with empty required fields: you should see inline validation messages (e.g., "Mobile number is required" or "Please enter a valid email").
   - Enter an invalid email like `abc@xyz` → message: "Please enter a valid email".
   - Enter a mobile number with fewer or more than 10 digits → message: "Mobile number must be exactly 10 digits".
   - Enter a short grievance description (<10 chars) → message: "Description must be at least 10 characters".

2. Scheme Application form:
   - Open a scheme and click apply. Try invalid/empty values for `name`, `email`, `mobile`.
   - You should see inline validation messages matching the frontend zod schema.

Backend checks (server-side validation)

The backend now validates inputs on the following endpoints (returns 400 with an errors object):

- POST /api/v1/grievances/apply
  - Validates: name (min 3 chars), email (format), mobile (exactly 10 digits), description (min 10 chars), grievance_type, grievance_category.
  - On validation failure, response: status 400 and JSON { success: false, message: 'Validation failed', errors: { ... } }

- POST /api/v1/user/scheme/schemeApplied
  - Validates: name (min 3 chars), email (format), mobile (exactly 10 digits), scheme_name, scheme_code. Also basic aadhar/pan length checks if provided.
  - On validation failure, response: status 400 and JSON { success: false, message: 'Validation failed', errors: { ... } }

How to test the backend validations

1. Start the backend server:

```powershell
cd backend; npm install; npm run dev
```

2. Use curl, Postman, or HTTPie to POST to the endpoints. Example (cURL):

```powershell
# Example: send invalid grievance (missing mobile)
curl -X POST "http://localhost:5000/api/v1/grievances/apply" -F "name=Ab" -F "email=abc@xyz" -F "description=test" -F "document=@path\to\dummy.pdf"
```

Expected: you should receive a 400 response with an `errors` object describing the validation failures.

Notes

- Frontend validation is implemented using zod + react-hook-form. This prevents invalid submissions in the UI. The backend validation is defensive and will reject bad requests made directly (e.g., via curl).
- If you add new required fields to forms, mirror the checks in the corresponding backend controller to keep validation consistent.

Contact

If you want, I can add automated unit/integration tests for these controllers using Jest + supertest, or add more precise checks (IFSC pattern, stricter PAN regex, Aadhaar numeric-only).