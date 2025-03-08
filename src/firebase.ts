// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	UserCredential,
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// console.log('1', process.env.NEXT_FIREBASE_API_KEY)
// console.log('2', process.env.NEXT_FIREBASE_AUTH_DOMAIN)
// console.log('3', process.env.NEXT_FIREBASE_PROJECT_ID)
// console.log('4', process.env.NEXT_STORAGE_BUCKET)
// console.log('5', process.env.NEXT_MESSAGING_SENDER_ID)
// console.log('6', process.env.NEXT_APP_ID)

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
	prompt: 'select_account ',
})

export const loginWithGooglePopup = async (): Promise<UserCredential> => {
	const result = await signInWithPopup(auth, provider)
	return result
}
