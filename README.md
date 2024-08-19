# EventEase

EventEase is a comprehensive event management application that provides user authentication and event management features. Built with React on the frontend and Node.js with Express on the backend, it utilizes JWT for secure authentication. The application is designed to be scalable and follows a microservices architecture for flexibility and maintainability.

## Features

- User Registration
- User Login and Logout
- Event Creation, Viewing, and Management
- Responsive UI with Tailwind CSS
- Microservices Architecture for Scalability

## Microservices

EventEase is structured with the following microservices:

1. **User Service**
   - Handles user authentication and authorization.
   - Endpoints: `POST /auth/register`, `POST /auth/login`
   - Manages JWT token creation and user management.

2. **Event Service**
   - Manages event creation, retrieval, updating, and deletion.
   - Endpoints: `GET /event/events`, `POST /event/events`, `PUT /event/events/:id`, `DELETE /event/events/:id`

## Installation

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
