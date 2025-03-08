import { auth, loginWithGooglePopup } from '@/firebase'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'

interface IUser {
	id: number
	email: string
	password: string
}

export const loginWithGoogle = createAsyncThunk(
	'auth/loginWithGoogle',
	async (_, { rejectWithValue }) => {
		try {
			const result = await loginWithGooglePopup()
			const userEmail = result.user.email

			if (!userEmail) {
				throw new Error(`Failed to get user's email`)
			}

			localStorage.setItem('user', userEmail)

			return userEmail
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const userCredentials = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			return userCredentials.user.email
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const userCredentials = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)

			return userCredentials.user.email
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
	try {
		await auth.signOut()
		localStorage.removeItem('user')
	} catch (error: any) {
		console.error(error.message)
	}
})

interface AuthState {
	user: string | null
	isAuthenticated: boolean
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	status: 'idle',
	error: null,
}
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<string>) {
			state.user = action.payload
			state.isAuthenticated = true

			localStorage.setItem('user', JSON.stringify(action.payload))
		},
	},
	extraReducers: builder => {
		builder
			.addCase(registerUser.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.user = action.payload
				state.isAuthenticated = true

				localStorage.setItem('user', JSON.stringify(action.payload))
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})
			.addCase(loginUser.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.user = action.payload
				state.isAuthenticated = true

				localStorage.setItem('user', JSON.stringify(action.payload))
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})
			.addCase(logoutUser.fulfilled, state => {
				state.user = null
				state.isAuthenticated = false

				localStorage.removeItem('user')
			})

			.addCase(loginWithGoogle.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(loginWithGoogle.fulfilled, (state, action) => {
				state.user = action.payload
				state.status = 'succeeded'
				state.isAuthenticated = true
			})
			.addCase(loginWithGoogle.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})
	},
})

export const { setUser } = authSlice.actions
export default authSlice.reducer
