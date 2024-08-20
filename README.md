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

## Installation

### setup Backend

Make sure you have Docker Desktop installed on your system

```bash
# Navigate to the backend directory of the user-service
cd backend/user-service

# Install the necessary npm packages
npm install

# Navigate back to the backend directory
cd ..

# Navigate to the event-service directory
cd event-service

# Install the necessary npm packages
npm install

# Navigate back to the backend directory
cd ..

# Build the docker containers
docker-compose build

# Start up the Docker containers in detached mode
docker-compose up -d
```
### setup Frontend
open a new terminal

```bash
# Navigate to the frontend directory of the user-service
cd frontend

# Install the necessary npm packages
npm i

#start the server
npm run dev
```
## **Key Features**
- User Management: Secure and scalable handling of user data.
- Asynchronous Communication: Efficient inter-service communication via RabbitMQ.
- Containerization: Simplified deployment and scalability using Docker.
- Integration: Seamlessly integrates with other microservices for enhanced functionality.

## **Challenges and Solutions**
 - Challenge 1: RabbitMQ Connectivity Issues 
   - Solution: Ensure RabbitMQ is properly configured and accessible. Use Docker Compose for consistent environment setup.
- Challenge 2: Error Handling 
   - Solution: Implement comprehensive error handling and logging to troubleshoot issues effectively.
- Challenge 3: Service Scalability 
   - Solution: Use container orchestration and cloud services to manage scalability and high availability.

## **Future Enhancements**
- User Roles and Permissions: Enhance user management with more granular roles and permissions.
- Improved Security: Implement additional security measures such as OAuth or JWT for secure authentication.
- Performance Optimization: Optimize service performance and scalability with caching and load balancing.
