import Hero from '@/components/Sections/Home/Hero'
import MovieList from '@/components/Sections/Home/Movies/MovieList'
import PopularMovies from '@/components/Sections/Home/Movies/PopularMovies'
import TopRatedMovies from '@/components/Sections/Home/Movies/TopRatedMovies'
import PopularPeopleList from '@/components/Sections/Home/People/PopularPeopleList'
import TopRatedTV from '@/components/Sections/Home/TVShows/TopRatedTV'
import TVList from '@/components/Sections/Home/TVShows/TVList'

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
