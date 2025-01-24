# User Backend

## Overview
The User Backend handles user-specific functionalities, including authentication, note management, and exposing limited data to the Admin Backend.

## Key Features
### Authentication
- **POST /api/auth/register**: Register a new user and return a JWT.
- **POST /api/auth/login**: Log in as a user and return a JWT.

### User-Specific Operations
- **GET /api/notes**: Fetch all notes of the authenticated user.
- **POST /api/notes**: Create a new note.
- **PATCH /api/notes/:id**: Update a specific note.
- **DELETE /api/notes/:id**: Delete a specific note.

### Shared Data Access
- **GET /api/admin/notes**: Expose limited data to Backend 2 (Admin Backend) via a secure endpoint.

## Setup Instructions
1. Navigate to the `backend1` directory.
2. Install dependencies using `npm install`.
3. Set up environment variables in a `.env` file.
4. Start the backend using `npm run dev`.

## Environment Variables
- `5000`: Port number for the server.
- `mongodb+srv://rr679122:rishav@cluster0.o74fj.mongodb.net/User`: MongoDB connection string.
- `123456`: Secret key for JWT token generation.

## API Endpoints
### Authentication
- **POST /api/auth/register**
  - Request: `{ "username": "John Doe", "email": "john@example.com", "password": "password123" }`
  - Response: `{ "message": "User registered successfully", "token": "jwt-token"  }`
  
- **POST /api/auth/login**
  - Request: `{ "email": "john@example.com", "password": "password123" }`
  - Response: `{ "token": "jwt-token" }`

### User-Specific Operations
- **GET /api/notes**
  - Request: Requires JWT token in `Authorization` header.
  - Response: List of notes.

- **POST /api/notes**
  - Request: `{ "title": "New Note", "content": "Note content" }`
  - Response: Created note.

- **PATCH /api/notes/:id**
  - Request: `{ "title": "Updated Note" }`
  - Response: Updated note.

- **DELETE /api/notes/:id**
  - Request: Requires JWT token in `Authorization` header.
  - Response: `{ "message": "Note deleted successfully" }`

### Shared Data Access
- **GET /api/admin/notes**
  - Request: Requires admin JWT token in `Authorization` header.
  - Response: List of notes.

## License
This project is licensed under the MIT License.
