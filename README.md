# School Management API

This is a Node.js-based API for managing a school system, including teachers, students, and classes. The API supports CRUD operations and uses JWT for authentication and Cloudinary for image uploads.

## Features

- User authentication with JWT
- CRUD operations for teachers, students, and classes
- Image upload and storage using Cloudinary
- Pagination support for listing endpoints

## Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud)
- Cloudinary account for image storage

## API Documentation

- [Postman Documentation](https://documenter.getpostman.com/view/38990160/2sAYBUCBua)

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/school-management-api.git
   cd school-management-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file in the root directory.
   - Use the `.env.example` file as a template.

4. **Run the server**:
   ```bash
   npm start
   ```

## Environment Variables

Ensure you have a `.env` file with the following variables:

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Port number for the server
- `JWT_SECRET`: Secret key for JWT
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## API Endpoints


### Authentication

- **POST** `/auth/login`: Authenticate and receive a JWT token.

### Teachers

- **POST** `/teachers`: Create a new teacher.
- **GET** `/teachers`: Retrieve a list of teachers.
- **GET** `/teachers/:id`: Retrieve a specific teacher by ID.
- **PUT** `/teachers/:id`: Update a teacher's information.
- **DELETE** `/teachers/:id`: Soft delete a teacher.

### Students

- **POST** `/students`: Create a new student.
- **GET** `/students`: Retrieve a list of students.
- **GET** `/students/:id`: Retrieve a specific student by ID.
- **PUT** `/students/:id`: Update a student's information.
- **DELETE** `/students/:id`: Soft delete a student.

### Classes

- **POST** `/classes`: Create a new class.
- **GET** `/classes`: Retrieve a list of classes.
- **GET** `/classes/:id`: Retrieve a specific class by ID.
- **PUT** `/classes/:id`: Update a class's information.
- **DELETE** `/classes/:id`: Delete a class.

## Additional Features

- **Pagination**: Use `page` and `limit` query parameters to paginate results.
- **Image Upload**: Upload profile images for teachers and students using Cloudinary.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
