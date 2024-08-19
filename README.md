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

## Usage
   - Registration: Users can register with their name, email, and password.
   - Login: Registered users can log in using their email and password.
   - Event Management: Users can create, view, and manage events once logged in.

## API Endpoints

1. **Authentication**
   - POST /auth/register: Register a new user
   - POST /auth/login: Authenticate a user and return a token
2. **Events**
   - GET /event/events: Retrieve all events
   - POST /event/events: Create a new event
   - PUT /event/events/:id: Update an event
   - DELETE /event/events/:id: Delete an event

