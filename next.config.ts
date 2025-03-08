/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
			},
		],
	},

	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Content-Security-Policy',
						value:
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.google.com https://apis.google.com;",
					},
				],
			},
		]
	},
}

module.exports = nextConfig
