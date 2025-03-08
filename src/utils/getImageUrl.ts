const getImageUrl = (path: string, size: 'original' | 'w500' = 'original') => {
	return path
		? `https://image.tmdb.org/t/p/${size}${path}`
		: '/default-img.webp'
}

export default getImageUrl
