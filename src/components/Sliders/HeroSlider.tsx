import getImageUrl from '@/utils/getImageUrl'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

export interface IMovie {
	id: number
	backdrop_path: string
	genre_ids: number[]
	original_title: string
	popularity: number
	poster_path: string
	release_date: string
	title: string
	vote_average: number
	vote_count: number
}

interface Props {
	items: IMovie[]
}

const HeroSlider = memo(({ items }: Props) => {
	const settings = {
		dots: true,
		fade: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		waitForAnimate: false,
		autoplay: true,
		autoplaySpeed: 5000,
	}

	return (
		<div className='w-full overflow-hidden'>
			<Slider {...settings}>
				{items.map(item => (
					<div key={item.id} className='relative w-full h-[800px]'>
						<Image
							src={getImageUrl(item.backdrop_path)}
							alt={item.title}
							fill
							objectFit='cover'
							className='w-full h-full object-cover'
							priority
						/>
						<div className='absolute inset-0 bg-black opacity-50' />
						<div className='absolute bottom-[10%] left-[10%] text-white'>
							<h2 className='text-8xl font-bold max-[930px]:text-6xl max-[550px]:text-4xl'>
								{item.title}
							</h2>
							<p className='text-xl mt-2'>
								Rating: {item.vote_average.toFixed(1)}
							</p>

							<Link
								href={`/movies/${item.id}`}
								className='mt-4 inline-block px-6 py-2 bg-[#FF3B3B] cursor-pointer text-white font-bold rounded hover:bg-[#ff8e8e] transition duration-600'
							>
								Watch Now
							</Link>
						</div>
					</div>
				))}
			</Slider>
		</div>
	)
})

export default HeroSlider
