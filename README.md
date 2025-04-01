# JK-BLOG
# Full Stack Blog Application

This project is a simple blog application built with NestJS for the backend and ReactJS for the frontend. It allows users to log in using their Google or Facebook accounts, create, read blog posts.

## Features

•	A login page that lets users sign in with their Google or Facebook account
•	A dashboard page that shows a list of the user's posts. Only logged-in users can access this page. 
•	A create post page that allows users to create new posts. Only logged-in users can access this page. 
•	A post detail page that shows the details of a specific post. This page should be accessible to both logged-in and logged-out users. 

* Users can log in using their Google or Facebook accounts.
* **Important Note:** In some cases, Facebook login may not return the user's email address due to user privacy settings. In such cases, the application treats a Google account and a Facebook account (without a verified email) as separate user accounts, even if they belong to the same person. Future improvements may include functionality to link these accounts.


  ## User Interface

  ![Image](https://github.com/user-attachments/assets/9e9aaeab-c6f5-4eb3-a65a-d94eafbef3f2)

* **Login Page:**
    * Allows users to log in using their Google or Facebook accounts.
    * Displays "Sign in with Google" and "Sign in with Facebook" buttons.

![image](https://github.com/user-attachments/assets/7aff6d9b-3332-463c-984f-96adebe6c106)

* **Dashboard Page:**
    * Displays a list of the currently logged-in user's blog posts.
    * Provides a button to create a new post.
    * Accessible only to logged-in users.
 
![image](https://github.com/user-attachments/assets/1d8e260b-c38d-4ac7-8148-c9e6af28376c)

* **Create Post Page:**
    * Allows users to create a new blog post by entering a title and body.
    * Accessible only to logged-in users.
 
![image](https://github.com/user-attachments/assets/e37b0da0-54ee-4092-90e9-90ceb93fbd13)

* **Post Detail Page:**
    * Displays the title and body of a selected blog post.
    * Accessible to both logged-in and logged-out users.


## Technologies Used

* NestJS
* ReactJS
* PassportJS
* JWT
* Angular Google and Facebook login libraries
* Jest
* Cypress
* Terraform
* Docker
* AWS ECR
* AWS EKS
* Typescript 

### Installation

git clone https://github.com/yashrajverma/jktech-assignment.git
cd jk-blog
cd blog-backend && npm install
cd blog-frontend && npm install


* **Backend:**
    * Set up environment variables for database connection, Google/Facebook authentication credentials, and JWT secret.
* **Frontend:**
    * Configure the backend API URL and Google/Facebook app IDs.

### Environment Variables Create a .env file in both api and client folders with the following details:
Backend .env 

PORT=5000
DATABASE_URI=postgres://postgres:<YOUR password>3@localhost:5432/<Your db name>
JWT_SECRET=<YOUR JWT Secret>
GOOGLE_CLIENT_ID=<Your Google Client ID>
GOOGLE_CLIENT_SECRET=<Your Google Client Secret>
FACEBOOK_CLIENT_ID=<Your Facebook App ID>
FACEBOOK_CLIENT_SECRET=<Your Facebook App Secret>
FRONTEND_URL=http://localhost:5173

Frontend .env

REACT_APP_BACKEND_URL=http://localhost:5000

### Run the Backend
cd blog-backend
npm run start:dev 

### Run the Frontend
cd blog-frontend
npm run dev


### Running Tests

![image](https://github.com/user-attachments/assets/67702e9a-db24-47ed-8b3f-d45ac253191f)


1.  Run backend tests:
    cd blog-backend
    npm run test
    

2.  Run frontend tests:

   cd blog-backend
   npm run test

### Google OAuth
Go to Google Cloud Console
Create a new project.
Enable the Google+ API.
In OAuth Consent Screen, set the Authorized Redirect URI to:
http://localhost:5000/api/auth/google/callback

### Facebook OAuth
Go to Facebook Developers
Create a new app with the Consumer type.
In Facebook Login → Settings, add the following URI:
http://localhost:5000/api/auth/facebook/callback

