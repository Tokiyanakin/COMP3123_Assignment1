COMP3123 Assignment 1

Name: Akinwunmi Eludoyin
Student ID: 101567797

Project Description

This project is an Employee Management REST API developed using Node.js, Express.js, and MongoDB.

The application allows users to register, log in, and manage employee records. Users can create, view, update, and delete employees. JWT authentication is used to protect employee information so users can only access their own records.

Technologies Used

This project uses Node.js and Express.js to create the API. MongoDB is used to store user and employee information, and Mongoose is used to interact with the database.

JWT is used for authentication, and bcryptjs is used to hash passwords. The project also uses express-validator for input validation, express-rate-limit to limit repeated login attempts, Helmet for security headers, and Morgan for request logging.

How to Run the Project

First, download or clone the repository and open the project folder in a terminal.

Install the required packages by running:

npm install

Create a .env file in the main project folder. Use .env.example as a reference and enter your MongoDB connection string and JWT secret.

Make sure MongoDB is running.

Start the server by running:

node server.js

The API runs on port 3000 by default.

API Endpoints

Users can register by sending a POST request to /api/v1/user/signup.

Users can log in by sending a POST request to /api/v1/user/login. A successful login returns a JWT token.

Authenticated users can create employees using POST /api/v1/emp/employees.

They can retrieve all their employees using GET /api/v1/emp/employees.

To retrieve a specific employee, use GET /api/v1/emp/employees/:id.

To update an employee, use PUT /api/v1/emp/employees/:id.

To delete an employee, use DELETE /api/v1/emp/employees?eid=EMPLOYEE_ID.

Employee requests require a JWT token in the Authorization header.

The health check endpoint is GET /api/health. It returns the server status and database connection status.

Testing

I tested the API using Postman and curl.

I tested user registration, login, and all employee CRUD operations. I also tested invalid employee information, requests without authentication, invalid employee IDs, and rate limiting.

I created two different users to confirm that one user cannot access another user’s employee records.

I also checked MongoDB to confirm that user passwords were hashed and employee records were associated with the correct user.

The Postman collection and screenshots are included with the project.

Security

User passwords are hashed before being saved to MongoDB. JWT authentication is required to access employee endpoints.

The API validates employee information and returns appropriate HTTP error codes when requests are invalid.

Rate limiting is used on the authentication routes to reduce repeated login attempts. Helmet provides HTTP security headers, and Morgan records requests in the terminal and a local log file.

Environment Variables

The .env.example file shows the environment variables needed to run the application.

The actual .env file is excluded from GitHub because it contains private credentials.