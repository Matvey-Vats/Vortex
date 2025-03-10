import Image from 'next/image'
import Link from 'next/link'
import React, { memo } from 'react'
import Slider from 'react-slick'

type Props<T> = {
	items: T[]
	getImage: (item: T) => string
	renderContent?: (item: T) => React.ReactNode
	type?: string
}

const SliderTemplate = <T,>({
	items,
	getImage,
	renderContent,
	type,
}: Props<T>) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed: 5000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 680,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	return (
		<div className='w-full'>
			<Slider {...settings}>
				{items.map(item => (
					<Link
						href={type ? `/${type}/${(item as any).id}` : '/'}
						key={(item as any).id}
						className='px-2 cursor-pointer'
					>
						<div className='relative w-full h-[700px] group'>
							<Image
								src={getImage(item)}
								alt={(item as any).title || (item as any).name}
								layout='fill'
								objectFit='cover'
								className='rounded-lg'
								sizes='(max-width: 440px) 100vw, 1200px'
								priority
							/>
							<div className='absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg' />
							{renderContent && (
								<div className='absolute bottom-4 left-4 w-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
									{renderContent(item)}
								</div>
							)}
						</div>
					</Link>
				))}
			</Slider>
		</div>
	)
}

export default memo(SliderTemplate) as typeof SliderTemplate
