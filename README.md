
# 🚀 MERN Stack Social Media Application

This project is a social media application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to register, log in, create, read, update, and delete posts, as well as like and comment on posts.

## ✨ Features

- User Registration: Users can register using their email, username, and password.
- User Login: Registered users can log in using their username and password.
- Forgot Password: Users can reset their password if they forget it.
- CRUD Operations for Posts: Users can create, read, update, and delete posts.
- Likes & Comments: Users can like posts and add comments to them.

## 🛠️ Technologies Used

- **Frontend:**

  - React.js
  - Redux (for state management)
  - Tailwind CSS
  - Material-UI

- **Backend:**
  - Express.js
  - MongoDB

## 🚦 Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/harshkhavale/social-web.platform
   ```

2. Navigate to the project directory:

   ```
   cd server
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the backend server:

   ```
   node server.js
   ```

5. Navigate to the frontend directory:

   ```
   cd client
   ```

6. Install frontend dependencies:

   ```
   npm install
   ```

7. Start the frontend server:

   ```
   npm start
   ```

8. Open your browser and go to `http://localhost:3000` to view the application.

## 📧 Email Configuration

For sending emails, make sure to create a `.env` file in the `server` directory and add the following configuration:

```
EMAIL_FROM="YOUR_GMAIL_ID"
SMTP_HOST="HOSTNAME(GOOGLE)"
SMTP_PORT=PORT.NO
SMTP_SECURE=true    # Set to true for SSL/TLS connection
EMAIL_USERNAME="YOUR_GMAIL_ID"
EMAIL_PASSWORD="GMAILAPPPASSWORD"  # Replace with your actual Gmail app password
RESET_PASSWORD_SECRET="YOURSECRETKEY"
PORT=5000 MONGO_URL="YOURMONGOURL"
JWT_SECRET="JWTSECERT"
```

Make sure to replace `EMAIL_PASSWORD` with your actual Gmail app password.

## 🌐 Deployed Version

The application is deployed on [Vercel](https://social-web-platform.vercel.app). You can visit the deployed version at [https://social-web-platform.vercel.app](https://social-web-platform.vercel.app).


