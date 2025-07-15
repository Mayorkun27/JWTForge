# **JWTForge: Secure User Authentication API**

Welcome to **JWTForge**! 🚀 This project provides a robust and secure backend API for user authentication, meticulously crafted with Express.js and MongoDB. It's designed to offer seamless user registration and login, powered by JSON Web Tokens (JWT) delivered via HTTP-only cookies, ensuring a high level of security for your web applications.

This API handles all the core aspects of user authentication, from secure password hashing and token generation to protected route management. It’s built to be scalable, maintainable, and easy to integrate into any modern web project requiring solid authentication features. ✨

## 🛠️ Installation

Getting JWTForge up and running on your local machine is straightforward! Follow these steps to set up the project:

*   **Clone the Repository**:
    ```bash
    git clone https://github.com/Mayorkun27/JWTForge.git
    ```
*   **Navigate to the Project Directory**:
    ```bash
    cd JWTForge
    ```
*   **Install Dependencies**:
    This command will install all the necessary packages listed in `package.json`.
    ```bash
    npm install
    ```
*   **Configure Environment Variables**:
    Create a `.env` file in the root directory of the project and add the following variables. Remember to replace the placeholder values with your actual configuration.
    ```
    MONGO_URL=your_mongodb_connection_string_here
    JWT_SECRET=a_very_strong_random_secret_key_for_jwt_signing
    PORT=2001
    ```
    *   `MONGO_URL`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/jwtforge_db` or a MongoDB Atlas URI).
    *   `JWT_SECRET`: A complex, random string used to sign your JWTs. Keep this absolutely secure!
    *   `PORT`: The port your server will listen on. Default is 2000.
*   **Start the Server**:
    You can start the server in development mode (with `nodemon` for auto-restarts) or production mode.
    ```bash
    # For development (with hot-reloading)
    npm run dev
    
    # For production
    npm start
    ```
    Once the server starts, you should see a message in your console indicating that it's running, typically at `http://localhost:2000`.

## 🚀 Usage

The JWTForge API provides a set of endpoints for managing users and handling authentication flows. The base URL for all user-related endpoints is `/api/v1/user`.

Here's how you can interact with the API:

### **1. User Registration**

*   **Endpoint**: `POST /api/v1/user/register`
*   **Description**: Creates a new user account.
*   **Request Body**:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "userName": "johndoe",
      "password": "SecurePassword123",
      "confirmPassword": "SecurePassword123"
    }
    ```
*   **Validation**:
    *   `firstName`, `lastName`, `userName`: Required.
    *   `email`: Must be a valid email format.
    *   `password`: Minimum 8 characters.
    *   `confirmPassword`: Must match `password`.
*   **Success Response (201 Created)**:
    ```json
    {
      "message": "User created successfully",
      "createNewUser": {
        "_id": "65b...",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "userName": "johndoe",
        "createdAt": "...",
        "updatedAt": "...",
        "__v": 0
      }
    }
    ```

### **2. User Login**

*   **Endpoint**: `POST /api/v1/user/login`
*   **Description**: Authenticates an existing user and sets an HTTP-only JWT cookie.
*   **Request Body**:
    ```json
    {
      "userName": "johndoe",
      "password": "SecurePassword123"
    }
    ```
*   **Success Response (200 OK)**:
    Upon successful login, an `httpOnly` cookie named `jwt` containing the authentication token will be set in the browser.
    ```json
    {
      "message": "Login Successful",
      "user": {
        "_id": "65b...",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "userName": "johndoe",
        "createdAt": "...",
        "updatedAt": "...",
        "__v": 0
      },
      "token": "eyJhbGciOiJIUzI1Ni..."
    }
    ```

### **3. Get User Session (Protected Route)**

*   **Endpoint**: `GET /api/v1/user/session`
*   **Description**: Retrieves the authenticated user's profile details. Requires a valid `jwt` cookie.
*   **Authorization**: This route is protected by `protectRoute` middleware. A valid JWT must be present in the `jwt` HTTP-only cookie.
*   **Success Response (200 OK)**:
    ```json
    {
      "message": "Profile fetched successfully",
      "user": {
        "_id": "65b...",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "userName": "johndoe",
        "createdAt": "...",
        "updatedAt": "...",
        "__v": 0
      }
    }
    ```

### **4. User Logout**

*   **Endpoint**: `POST /api/v1/user/logout`
*   **Description**: Logs out the current user by clearing the `jwt` HTTP-only cookie.
*   **Success Response (200 OK)**:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

### **5. Get All Users**

*   **Endpoint**: `GET /api/v1/user/allusers`
*   **Description**: Fetches a list of all registered users in the database.
*   **Success Response (200 OK)**:
    ```json
    {
      "message": "Users fetched successfully",
      "data": [
        {
          "_id": "65b...",
          "firstName": "John",
          "lastName": "Doe",
          "email": "john.doe@example.com",
          "userName": "johndoe",
          "createdAt": "...",
          "updatedAt": "...",
          "__v": 0
        },
        {
          "_id": "65c...",
          "firstName": "Jane",
          "lastName": "Smith",
          "email": "jane.smith@example.com",
          "userName": "janesmith",
          "createdAt": "...",
          "updatedAt": "...",
          "__v": 0
        }
      ]
    }
    ```

## ✨ Features

*   **User Registration & Login**: Comprehensive system for new user signup and authentication.
*   **Robust Input Validation**: Utilizes `express-validator` to ensure data integrity and provide clear feedback for invalid inputs during registration and login.
*   **Secure Password Management**: Passwords are securely hashed using `bcryptjs` before storage, protecting sensitive user data.
*   **JSON Web Token (JWT) Authentication**: Implements JWTs for stateless and scalable authentication.
*   **HTTP-Only Cookie Management**: JWTs are stored in secure HTTP-only cookies, mitigating common client-side JavaScript (XSS) attacks.
*   **Protected Routes**: Middleware (`authMiddleware.js`) ensures that sensitive API endpoints are only accessible to authenticated users.
*   **MongoDB Integration**: Seamless data persistence and management through Mongoose ODM for MongoDB.
*   **Environment Configuration**: Uses `dotenv` for managing sensitive credentials and configuration variables, promoting secure deployment practices.
*   **CORS Enabled**: Configured to handle Cross-Origin Resource Sharing, allowing frontend applications to securely interact with the API.
*   **Clear Error Handling**: Provides informative error messages for both client-side and server-side issues.

## 💻 Technologies Used

| Technology         | Description                                        | Link                                                                      |
| :----------------- | :------------------------------------------------- | :------------------------------------------------------------------------ |
| **Node.js**        | JavaScript runtime environment                     | [nodejs.org](https://nodejs.org/en)                                       |
| **Express.js**     | Fast, unopinionated, minimalist web framework      | [expressjs.com](https://expressjs.com/)                                   |
| **MongoDB**        | NoSQL database for flexible data storage           | [mongodb.com](https://www.mongodb.com/)                                   |
| **Mongoose**       | MongoDB object modeling for Node.js                | [mongoosejs.com](https://mongoosejs.com/)                                 |
| **JSON Web Token** | Compact, URL-safe means of representing claims     | [jwt.io](https://jwt.io/)                                                 |
| **Bcrypt.js**      | Library for hashing passwords                      | [npmjs.com/package/bcryptjs](https://www.npmjs.com/package/bcryptjs)      |
| **Cookie-Parser**  | Parse Cookie header and populate `req.cookies`     | [npmjs.com/package/cookie-parser](https://www.npmjs.com/package/cookie-parser) |
| **Dotenv**         | Loads environment variables from a `.env` file     | [npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)          |
| **Express-Validator** | Middleware for validation in Express.js apps       | [express-validator.github.io](https://express-validator.github.io/)     |
| **CORS**           | Provides a Connect/Express middleware for CORS     | [npmjs.com/package/cors](https://www.npmjs.com/package/cors)              |
| **Morgan**         | HTTP request logger middleware                     | [npmjs.com/package/morgan](https://www.npmjs.com/package/morgan)          |
| **Nodemon**        | Utility for developing Node.js applications        | [nodemon.io](https://nodemon.io/)                                         |

## 👤 Author Info

*   **Your Name**
    *   GitHub: [@YourGitHubUsername](https://github.com/YourGitHubUsername)
    *   LinkedIn: [@YourLinkedInProfile](https://www.linkedin.com/in/YourLinkedInProfile)
    *   Portfolio: [YourPortfolioLink.com](https://yourportfolio.com)

---

![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-5.1.0-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-compatible-4ea94b.svg)
![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)