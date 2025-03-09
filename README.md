# Vortex 🎬  

**Vortex** is a web application for browsing and managing favorite movies and TV shows. The project is built with **Next.js**, **Firebase**, and **Redux Toolkit** to provide a seamless and interactive user experience.  

## Features  
✅ Browse popular and top-rated movies & TV shows  
✅ View detailed movie and TV show information  
✅ Add and remove movies/TV shows from favorites  
✅ User authentication with Firebase  
✅ Responsive design for all devices  



## Technologies Used  
- **Next.js** – for server-side rendering and fast page loading  
- **TypeScript** – for better type safety  
- **Firebase Firestore** – for storing user data and favorites  
- **Firebase Authentication** – for user login and authentication  
- **Redux Toolkit** – for global state management  
- **React Icons** – for UI icons  
- **Tailwind CSS** – for styling
- **React Hook Form** - for form validation

## Installation  

1️⃣ **Clone the repository**  
```bash
git clone https://github.com/Matvey-Vats/Vortex
cd vortex
```

2️⃣ **Install dependencies**  
```bash
npm install
# or
yarn install
```

3️⃣ **Set up Firebase**  
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)  
- Enable **Firestore Database** and **Authentication**  
- Add your Firebase credentials to a `.env.local` file:  
  ```plaintext
  NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
  NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
  ```

4️⃣ **Run the development server**  
```bash
npm run dev
# or
yarn dev
```
The app will be available at `http://localhost:3000` 🚀  
