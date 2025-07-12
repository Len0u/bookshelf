# 📚 BookLog - Personal Reading Tracker

A full-stack app to track your reading journey. Built with React, Node.js, and MongoDB, BookLog helps you manage your personal library, set reading goals, and visualize your reading patterns.

## Features

### Book Management
- **Search & Add Books**: Search the Google Books API and add books to your personal shelf
- **Reading Status Tracking**: Mark books as "To Be Read", "Reading", or "Finished"
- **Reading Dates**: Track when you started and finished each book
- **Ratings & Reviews**: Rate books (1-5 stars) and write personal reviews
- **Book Details**: Store title, author, genre, and cover image

### Reading Analytics
- **Reading Goals**: Set and track annual reading goals
- **Progress Visualization**: Progress bar showing goal completion
- **Reading Timeline**: Monthly bar chart timeline showing when books were finished
- **Genre Analysis**: Pie chart showing genre distribution
- **Rating Statistics**: Pie chart with rating distribution
- **Reading Statistics**: Total books, months active, average books per month

### User Experience
- **Account Creation**: Users can create an account to track their own books and stats
- **User Authentication**: JWT-based login and registration with hashed passwords (bcrypt)
- **Personal Library**: Each user has their own private library and personalized data

## Tech Stack

### Frontend
- React 19 with Hooks and Context API
- React Router
- Vite
- Recharts (charts and data visualizations)
- CSS3 (custom responsive styles)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt for auth
- RESTful API design

### External APIs
- Google Books API – book search and metadata

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Atlas or local)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd booklog
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   CONNECTION_STRING=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_jwt_secret_key
   ```

5. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5001`

   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

## Usage

### Registration & Login
1. Open the app in your browser
2. Click "Register" to create a new account
3. Enter your username, email, and password
4. Login with your credentials

### Adding Books
1. Use the search bar on the home page
2. Search for books by title, author, or ISBN
3. Click the "+" button to add books to your shelf
4. Books are added to your "To Be Read" shelf by default

### Managing Your Library
1. **Shelf Page**: View all your books
2. **Status Updates**: Change book status using the dropdown
3. **Reading Dates**: Add start and end dates for books
4. **Ratings**: Click stars to rate books (1-5)
5. **Reviews**: Write personal reviews for each book

### Reading Analytics
1. **Goals Page**: Set your annual reading goal
2. **Progress Tracking**: See your progress toward your goal
3. **Reading Timeline**: Visualize your reading activity by month
4. **Genre Analysis**: Discover your reading preferences
5. **Rating Statistics**: Track your average ratings

## 🏗️ Project Structure

```
booklog/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── BookCard.jsx   # Individual book display
│   │   ├── NavBar.jsx     # Navigation component
│   │   ├── ProgressBar.jsx # Reading goal progress
│   │   ├── ReadingTimeline.jsx # Monthly reading timeline
│   │   └── ...            # Other components
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Home page with search
│   │   ├── Shelf.jsx      # Book management page
│   │   ├── ReadingStats.jsx # Analytics page
│   │   ├── Login.jsx      # Login page
│   │   └── Register.jsx   # Registration page
│   ├── contexts/          # React contexts
│   │   ├── AuthContext.jsx # Authentication state
│   │   └── BookContext.jsx # Book management state
│   ├── services/          # API services
│   │   └── api.js         # Google Books API integration
│   └── css/               # Stylesheets
├── server/                # Backend source code
│   ├── controllers/       # Route controllers
│   │   ├── bookController.js # Book CRUD operations
│   │   └── userController.js # User authentication
│   ├── models/            # Database models
│   │   ├── bookModel.js   # Book schema
│   │   └── userModel.js   # User schema
│   ├── routes/            # API routes
│   │   ├── bookRoutes.js  # Book endpoints
│   │   └── userRoutes.js  # User endpoints
│   ├── middleware/        # Express middleware
│   │   ├── errorHandler.js # Global error handling
│   │   └── validateTokenHandler.js # JWT validation
│   └── config/            # Configuration
│       └── dbConnection.js # Database connection
└── public/                # Static assets
```

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/current` - Get current user info
- `PUT /api/users/reading-goal` - Update reading goal

### Books
- `GET /api/books` - Get user's books
- `POST /api/books` - Add new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

## Acknowledgments

- Google Books API for book data
- React and Node.js communities
- MongoDB Atlas for database hosting
- Recharts for data visualization

## Note from the Developer

This project was built as a personal learning experience in full-stack development. I used AI to help me figure things out along the way — especially for debugging and understanding new tools. But I built it myself, start to finish. It shows my growth, curiosity, and commitment to building something real while learning along the way.



