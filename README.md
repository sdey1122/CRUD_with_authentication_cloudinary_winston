<<<<<<< HEAD
# CRUD_with_authentication_cloudinary_winston
Scope: Build a Product CRUD with authentication, Cloudinary for image, logger (winston)
=======
# Product CRUD API

A complete RESTful Product CRUD API built using Node.js, Express.js, MongoDB, JWT Authentication, Cloudinary, Winston Logger, Joi Validation, Swagger Documentation and MVC Architecture.

---

## Features

- User Registration
- User Login
- JWT Authentication
- Refresh Token Authentication
- Role Based Authorization
- Product CRUD
- Product Image Upload
- Cloudinary Image Storage
- Image Replacement
- Image Deletion
- Soft Delete
- Restore Product
- Permanent Delete
- Joi Validation
- Winston Logging
- Swagger Documentation
- MVC Architecture
- Service Layer Architecture

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- BcryptJS
- Joi
- Cloudinary
- Multer
- Winston
- Swagger

---

## Installation

Clone the repository


git clone https://github.com/your-username/product-crud.git


Go inside project


cd product-crud


Install dependencies


npm install


Create .env file

env
PORT=6159

MONGO_URI=YOUR_MONGODB_URI

JWT_ACCESS_SECRET=YOUR_ACCESS_SECRET

JWT_REFRESH_SECRET=YOUR_REFRESH_SECRET

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=


Run Server


npm run dev


---

## Folder Structure


app
│
├── config
├── controllers
├── docs
├── middlewares
├── models
├── routes
├── services
├── utils
└── validators


---

## API Endpoints

### Authentication

| Method | Endpoint                |
| ------ | ----------------------- |
| POST   | /api/auth/register      |
| POST   | /api/auth/login         |
| POST   | /api/auth/refresh-token |
| POST   | /api/auth/logout        |

---

### Products

| Method | Endpoint                    |
| ------ | --------------------------- |
| GET    | /api/products               |
| GET    | /api/products/:id           |
| POST   | /api/products               |
| PUT    | /api/products/:id           |
| DELETE | /api/products/:id           |
| PATCH  | /api/products/:id/restore   |
| DELETE | /api/products/:id/permanent |

---

## Authentication

Protected APIs require


Authorization

Bearer <Access Token>


---

## Swagger


http://localhost:6159/api-docs


---

## Default Response

Success

json
{
    "success": true,
    "message": "Request Successful",
    "data": {}
}


Error

json
{
    "success": false,
    "message": "Something went wrong"
}


---

## Logger

Generated automatically


logs/

combined.log

error.log


---

## Author

Riku Dey
>>>>>>> master
