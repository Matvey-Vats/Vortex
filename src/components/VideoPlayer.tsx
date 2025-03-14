import { memo } from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({ videoKey }: { videoKey: string }) => {
	const videoUrl = `https://www.youtube.com/watch?v=${videoKey}`

	return (
		<div className='w-full flex justify-center'>
			<ReactPlayer
				url={videoUrl}
				controls
				width='100%'
				className='object-contain'
			/>
		</div>
	)
}

export default memo(VideoPlayer)
