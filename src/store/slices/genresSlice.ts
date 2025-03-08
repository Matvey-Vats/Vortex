import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface IGenre {
	id: number
	name: string
}

interface GenresState {
	genres: IGenre[]
	selectedGenre: IGenre | null
	status: 'idle' | 'loading' | 'failed'
	error: string | null
}

export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
	const { data } = await axios(
		`https://api.themoviedb.org/3/genre/movie/list`,
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
				accept: 'application/json',
			},
		}
	)

	return data.genres
})

const initialState: GenresState = {
	genres: [],
	selectedGenre: null,
	status: 'idle',
	error: null,
}

const genresSlice = createSlice({
	name: 'genres',
	initialState,
	reducers: {
		setSelectedGenre: (state, action: PayloadAction<IGenre | null>) => {
			state.selectedGenre = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchGenres.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchGenres.fulfilled, (state, action) => {
				state.status = 'idle'
				state.genres = action.payload
			})
			.addCase(fetchGenres.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message ? action.error.message : null
			})
	},
})

export const { setSelectedGenre } = genresSlice.actions
export default genresSlice.reducer
