import Hero from '@/components/Sections/Hero'
import MovieList from '@/components/Sections/Movies/MovieList'
import PopularMovies from '@/components/Sections/Movies/PopularMovies'
import TopRatedMovies from '@/components/Sections/Movies/TopRatedMovies'
import PopularPeopleList from '@/components/Sections/People/PopularPeopleList'
import TopRatedTV from '@/components/Sections/TVShows/TopRatedTV'
import TVList from '@/components/Sections/TVShows/TVList'

export default function Home() {
	return (
		<>
			<Hero />
			<MovieList />
			<TVList />
			<PopularMovies />
			<TopRatedMovies />
			<TopRatedTV />
			<PopularPeopleList />
		</>
	)
}
