import { ICountry, IGenre } from '@/app/movies/[id]/page'
import LikeButton from '@/components/LikeButton'
import getImageUrl from '@/utils/getImageUrl'
import { Orbitron, Roboto } from 'next/font/google'
import Image from 'next/image'
import { FC } from 'react'
import { ITVShow } from '../Home/TVShows/TopRatedTV'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })
const roboto = Roboto({ subsets: ['latin'], weight: '400' })

interface IEpisode {
	id: number
	name: string
	overview: string
	episode_number: number
	season_number: number
	air_date: string
	still_path: string
	runtime: number
	vote_average: number
}

interface ISeason {
	air_date: string
	episode_count: number
	id: number
	name: string
	overview: string
	poster_path: string
}

type Props = {
	id: number
	name: string
	poster_path: string
	runtime: number
	overview: string
	release_date: string
	production_countries: ICountry[]
	genres: IGenre[]
	status: string
	last_episode_to_air: IEpisode
	next_episode_to_air: IEpisode
	seasons: ISeason[]
	vote_average: number
}

const TVDetailsContent: FC<Props> = ({
	id,
	name,
	poster_path,
	release_date,
	overview,
	production_countries,
	genres,
	status,
	last_episode_to_air,
	next_episode_to_air,
	seasons,
	vote_average,
}) => {
	return (
		<>
			<div
				className={`${roboto.className} mb-20 flex items-start justify-between`}
			>
				<Image
					src={getImageUrl(poster_path)}
					alt={name}
					width={500}
					height={700}
					objectFit='cover'
					className='rounded-md'
					priority
				/>
				<div className='w-[600px]'>
					<div className='mb-5'>
						<div className='flex justify-between items-center'>
							<h3 className='text-4xl font-bold'>{name}</h3>
						</div>
						<span className='font-bold'>Status: {status}</span>
					</div>

					<p className=''>{overview}</p>
					<p className='mt-5 font-bold'>Release: {release_date}</p>
					{production_countries && (
						<p className='font-bold'>Country: {production_countries[0].name}</p>
					)}

					<div className='flex items-end justify-between'>
						{genres.length > 0 && (
							<div>
								<h4 className='mt-10 text-2xl'>Genres</h4>
								<ul>
									{genres.map((genre: IGenre) => (
										<li key={genre.id}>{genre.name}</li>
									))}
								</ul>
							</div>
						)}
						<LikeButton
							item={{ id, name, poster_path, vote_average } as ITVShow}
							type={'tvShow'}
						/>
					</div>
				</div>
			</div>
			<div className={`mb-20 ${roboto.className}`}>
				<h3 className={`${orbitron.className} text-3xl mb-10`}>
					Last and Next episodes to air
				</h3>
				<div>
					{last_episode_to_air && (
						<div className='flex items-start justify-between border-b-2 border-[#333] pb-10 mb-10'>
							<div className='max-w-[600px]'>
								<h4 className='font-bold text-2xl mb-4'>
									{last_episode_to_air.name}
								</h4>
								<p className='mb-5'>{last_episode_to_air.overview}</p>
								<ul className='flex flex-col gap-y-2'>
									<li>
										<strong>Season:</strong> {last_episode_to_air.season_number}
									</li>
									<li>
										<strong>Episode:</strong>{' '}
										{last_episode_to_air.episode_number}
									</li>
									<li>
										<strong>Air date:</strong> {last_episode_to_air.air_date}
									</li>
									<li>
										<strong>Runtime:</strong> {last_episode_to_air.runtime}{' '}
										minutes
									</li>
								</ul>
								<p className='mt-10 text-3xl text-yellow-200'>
									Rating: {last_episode_to_air.vote_average}
								</p>
							</div>
							<Image
								src={getImageUrl(last_episode_to_air.still_path)}
								alt={last_episode_to_air.name}
								width={500}
								height={700}
								objectFit='cover'
								className='rounded-md'
								priority
							/>
						</div>
					)}
					{next_episode_to_air && (
						<div className='flex items-start justify-between border-b-2 border-[#333] pb-10'>
							<div className='max-w-[600px]'>
								<h4 className='font-bold text-2xl mb-4'>
									{next_episode_to_air.name}
								</h4>
								<p className='mb-5'>{next_episode_to_air.overview}</p>
								<ul className='flex flex-col gap-y-2'>
									<li>
										<strong>Season:</strong> {next_episode_to_air.season_number}
									</li>
									<li>
										<strong>Episode:</strong>{' '}
										{next_episode_to_air.episode_number}
									</li>
									<li>
										<strong>Air date:</strong> {next_episode_to_air.air_date}
									</li>
									<li>
										<strong>Runtime:</strong> {next_episode_to_air.runtime}{' '}
										minutes
									</li>
								</ul>
								<p className='mt-10 text-3xl text-yellow-200'>
									Rating: {next_episode_to_air.vote_average}
								</p>
							</div>
							<Image
								src={getImageUrl(next_episode_to_air.still_path)}
								alt={next_episode_to_air.name}
								width={500}
								height={700}
								objectFit='cover'
								className='rounded-md'
								priority
							/>
						</div>
					)}
					{seasons.length > 0 && (
						<div>
							<h3 className={`${orbitron.className} text-3xl mb-10`}>
								Seasons
							</h3>
							{seasons.map((season: ISeason) => (
								<div
									key={season.id}
									className='flex items-start justify-between border-b-2 border-[#333] pb-10 mb-10'
								>
									<div className='max-w-[600px]'>
										<h4 className='font-bold text-2xl mb-4'>{season.name}</h4>
										<p className='mb-5'>{season.overview}</p>
										<ul className='flex flex-col gap-y-2'>
											<li>
												<strong>Episode count:</strong> {season.episode_count}
											</li>
											<li>
												<strong>Air date:</strong> {season.air_date}
											</li>
										</ul>
									</div>
									<Image
										src={getImageUrl(season.poster_path)}
										alt={season.name}
										width={500}
										height={700}
										objectFit='cover'
										className='rounded-md'
										priority
									/>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default TVDetailsContent
