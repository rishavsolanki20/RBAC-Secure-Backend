# RBAC Secure Backend Project

## Overview
This project consists of two independent backend services showcasing role-based access control (RBAC) and secure data sharing between the two systems. The project is built using Express.js and TypeScript, with MongoDB as the database.

## Project Structure
- **Backend 1 (User Backend)**: Handles user-specific functionalities.
- **Backend 2 (Admin Backend)**: Focuses on administrative operations with privileges to access data from Backend 1.

## Key Features
### Backend 1 (User Backend)
- **Authentication**: User registration and login with JWT token generation.
- **User-Specific Operations**: Create, update, delete, and fetch notes for authenticated users.
- **Shared Data Access**: Exposes limited data to Backend 2 via secure endpoints.

### Backend 2 (Admin Backend)
- **Authentication**: Admin login with JWT token generation.
- **Administrative Operations**: Fetch, update, and delete user profiles, and fetch notes data from Backend 1.
- **Cross-Backend Communication**: Securely access shared user and notes data from Backend 1 using API calls.

## Database Structure
### Collections
- **Users**: Shared across both backends.
  - Shared fields: `_id`, `name`, `email`.
  - Private fields (Backend 1): Password hash, preferences.
- **Notes**: Shared across both backends.
  - Shared fields: `_id`, `title`, `status`.
  - Private fields (Backend 1): Detailed description, user ID.
- **Audit Logs**: Backend 2 only.
  - Tracks administrative actions.

## Security
- JWT tokens for authentication and authorization.
- Role-based access control (RBAC).

## Setup Instructions
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables in a `.env` file.
4. Start each backend using `npm start`.

## Documentation
- Detailed README files for each backend.
- Postman collection to demonstrate API functionality.
- PowerPoint presentation summarizing the assignment.

## License
This project is licensed under the MIT License.
