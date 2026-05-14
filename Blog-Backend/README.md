BlogApp Backend

This is the backend server for the BlogApp project built using the MERN Stack.
The backend handles user authentication, blog management, database operations, file uploads, and REST API services.

It is developed using Node.js, Express.js, and MongoDB.

Features
User Registration & Login
JWT Authentication
Create, Read, Update, Delete Blogs
Protected Routes
MongoDB Database Integration
REST API Architecture
Image Upload Support using Multer & Cloudinary
Error Handling Middleware
Role-Based Access (User / Author)
⚙️ Tech Stack
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Multer
Cloudinary
dotenv

Project Structure
backend/
│
├── config/
│   ├── db.js
│   └── cloudinary.js
│
├── controllers/
│
├── middleware/
│   ├── authMiddleware.js
│   └── multer.js
│
├── models/
│   ├── User.js
│   └── Article.js
│
├── routes/
│   ├── authRoutes.js
│   └── articleRoutes.js
│
├── utils/
│   └── cloudinaryUpload.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
🔧 Installation & Setup
1. Clone the Repository
git clone https://github.com/Nishitha-Vemula-30/Capstone-Project--Blog-App.git
2. Navigate to Backend Folder
cd backend
3. Install Dependencies
npm install
4. Create .env File

Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

 Running the Server
Development Mode
npm run dev
Production Mode
npm start

Server runs on:

http://localhost:5000
 Database

MongoDB is used as the database for storing:

Users
Blog Articles
Comments
Uploaded Image URLs

Mongoose is used for schema design and database interaction.

 Authentication

JWT (JSON Web Token) authentication is implemented for secure access.

Features:

User Login
Token Generation
Protected Routes
Authorization Middleware
☁️ File Uploads

Images are uploaded using:

Multer
Cloudinary

Only image URLs are stored in MongoDB.
