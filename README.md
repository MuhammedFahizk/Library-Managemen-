# Full Stack Library Management System

A full-stack application built with **Node.js**, **Express.js**, **MongoDB**, **React.js**, and **Vite**. This Library Management System allows users to register, borrow and return books, and view borrowing history. Admins can manage books, users, and more.

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cookie-parser** - Cookie handling
- **cors** - Cross-origin request handling
- **morgan** - HTTP request logging
- **nodemon** - Auto-reloading for development
- **dotenv** - Environment variable management

### Frontend
- **React.js** - Frontend framework
- **Vite** - Build tool and development server
- **Redux** - State management
- **React Router DOM** - Routing
- **Ant Design (antd)** - UI component library
- **Framer Motion** - Animation library
- **Axios** - API requests
- **TailwindCSS** - Utility-first CSS framework

## 📦 Features

### Backend Features
- **User Authentication**: User registration, login, and JWT-based authentication.

- **Book Borrowing**: Users can borrow and return books.
- **Security**: Password hashing with `bcryptjs` and secure JWT handling.

### Frontend Features
- **React-based User Interface**: A modern and responsive interface using React.js and Ant Design.
- **User Profile**: Users can manage their profiles, borrowing history, and view book details.
- **State Management**: Redux for state management with persistence using `redux-persist`.
- **Animations**: Smooth transitions and animations using `Framer Motion`.
- **TailwindCSS**: Fast and flexible UI styling with utility-first classes.

## 📄 API Endpoints

### Books
- **POST** `/api/books` - Add a new book (Admin only)
- **GET** `/api/books` - Get a list of books
- **GET** `/api/books/:id` - Get details of a specific book
- **PUT** `/api/books/:id` - Update a book (Admin only)
- **DELETE** `/api/books/:id` - Delete a book (Admin only)

### Users
- **POST** `/api/users/register` - Register a new user
- **POST** `/api/users/login` - Login and get JWT token
- **GET** `/api/users/profile` - Get user profile data
- **PUT** `/api/users/profile` - Update user profile

### Borrowing
- **POST** `/api/borrow/:bookId` - Borrow a book
- **POST** `/api/return/:bookId` - Return a borrowed book
- **GET** `/api/borrow/history` - View borrowing history

## 🎨 Frontend Components
- **Dashboard**: Displays books with search functionality.
- **Login & Register**: Forms for user authentication.
- **Profile**: Allows users to update their profile and view borrowing history.
- **BookCard**: Displays individual book details.
- **BorrowButton**: Allows users to borrow books.
- **ReturnButton**: Allows users to return borrowed books.
- **Snackbar**: For success and error messages.

## 👥 Authors
- **Muhammed Fahiz k** - [your-github-profile](https://github.com/MuhammedFahizk/Library-Managemen-))

## 🙌 Acknowledgements
- Thanks to [Ant Design](https://ant.design/) for providing a great set of UI components!
- Thanks to [TailwindCSS](https://tailwindcss.com/) for providing a utility-first CSS framework.
