# Admin Backend

## Overview
The Admin Backend focuses on administrative operations with privileges to access data from the User Backend. It includes features for managing user profiles and auditing notes data.

## Key Features
### Authentication
- **POST /api/auth/login**: Login as an admin and return a JWT.

### Administrative Operations
- **GET /api/users**: Fetch all user profiles.
- **GET /api/users/:id**: Fetch details of a specific user.
- **DELETE /api/users/:id**: Delete a user profile.

### Cross-Backend Communication
- **GET /api/audit/notes**: Fetch notes data from Backend 1 via secure API calls.
- Use JWT or API keys to authenticate cross-backend requests.

## Setup Instructions
1. Navigate to the `backend2` directory.
2. Install dependencies using `npm install`.
3. Set up environment variables in a `.env` file.
4. Start the backend using `npm run dev`.

## Environment Variables
- `5001`: Port number for the server.
- `mongodb+srv://rr679122:rishav@cluster0.o74fj.mongodb.net/User`: MongoDB connection string.
- `123456`: Secret key for JWT token generation.

## API Endpoints
### Authentication
- **POST /api/auth/login**
  - Request: `{ "email": "admin@example.com", "password": "adminpassword" }`
  - Response: `{ "token": "jwt-token" }`

### Administrative Operations
- **GET /api/users**
  - Request: Requires admin JWT token in `Authorization` header.
  - Response: List of user profiles.

- **GET /api/users/:id**
  - Request: Requires admin JWT token in `Authorization` header.
  - Response: User profile details.

- **DELETE /api/users/:id**
  - Request: Requires admin JWT token in `Authorization` header.
  - Response: `{ "message": "User deleted successfully" }`

### Cross-Backend Communication
- **GET /api/audit/notes**
  - Request: Requires admin JWT token in `Authorization` header.
  - Response: List of notes fetched from Backend 1.

## License
This project is licensed under the MIT License.
