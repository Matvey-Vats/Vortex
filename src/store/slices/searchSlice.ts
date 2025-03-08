import { IPeople } from '@/components/Sections/Home/People/PopularPeopleList'
import { ITVShow } from '@/components/Sections/Home/TVShows/TopRatedTV'
import { IMovie } from '@/components/Sliders/HeroSlider'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface SearchState {
	query: string
	results: IPeople[] | ITVShow[] | IMovie[]
	type: string //'movie' | 'tv' | 'person'
	status: 'idle' | 'loading' | 'failed'
	error: string | null
}

export const fetchSearchResults = createAsyncThunk(
	'search/fetchSearchResults',
	async (params: { query: string; type: string }) => {
		const { query, type } = params
		const { data } = await axios(
			`https://api.themoviedb.org/3/search/${type}?query=${query}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
					accept: 'application/json',
				},
			}
		)
		return data
	}
)

const initialState: SearchState = {
	query: '',
	results: [],
	type: 'movie',
	status: 'idle',
	error: null,
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchQuery(state, action: PayloadAction<string>) {
			state.query = action.payload
		},
		setType(state, action: PayloadAction<string>) {
			state.type = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchSearchResults.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchSearchResults.fulfilled, (state, action) => {
				state.status = 'idle'
				state.results = action.payload.results
			})
			.addCase(fetchSearchResults.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message ? action.error.message : null
			})
	},
})

export const { setSearchQuery, setType } = searchSlice.actions
export default searchSlice.reducer
