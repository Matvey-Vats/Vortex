import ContentLoader from 'react-content-loader'

const SliderLoader = () => (
	<ContentLoader
		speed={2}
		width={440}
		height={700}
		viewBox='0 0 440 700'
		backgroundColor='#000000'
		foregroundColor='#212121'
	>
		<rect x='0' y='0' rx='18' ry='18' width='440' height='700' />
	</ContentLoader>
)

export default SliderLoader
