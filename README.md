# Next.js Blog Application

This is a simple blog application built with Next.js, React Query, Firebase, Redux, and Material-UI. The application provides Create, Read, Update, and Delete (CRUD) capabilities for blog posts.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete blog posts.
- **Server-Side State Management**: Utilizes React Query for data fetching and server-side state management.
- **Data Storage**: Firebase is used for data storage.
- **Client-Side State Management**: Redux is employed for client-side state management.
- **UI Library**: Material-UI is used as the UI library.

## Prerequisites

Before running the application, make sure you have the following prerequisites installed:

- Node.js (v16)
- npm (Node Package Manager)
- Git (for cloning the repository)
- Firebase account with Firebase project details

## Getting Started

1. **Clone the Repository**

   ```shell
   git clone https://github.com/roronoazor/blog_task.git
   cd blog_task
   ```

2. **Create Environment Variables**

   Create an `.env.local` file in the project root and add your Firebase and API configuration details:

   ```
   DUMMY_APP_ID=
   DUMMY_BASE_URL=
   NEXT_PUBLIC_REACT_APP_BASE_URL=
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
   ```

   Replace the placeholders with your actual Firebase and API information.

3. **Install Dependencies**

   Install the required Next.js packages by running:

   ```shell
   npm install
   ```

   if you encounter an error in installing the dependencies try running:

   ```shell
   npm install --legacy-peer-deps
   ```

4. **Use Node Version 16**

   Use Node.js version 16 by running:

   ```shell
   nvm use 16
   ```

5. **Run the Application**

   Start the application by running:

   ```shell
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

## Author

- Odumegwu Ugochukwu
- GitHub: [https://github.com/roronoazor](https://github.com/roronoazor)

```

```
