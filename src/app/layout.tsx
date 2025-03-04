import Header from '@/components/Header'
import './globals.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>
				<Header />

				<main className='w-full p-5'>
					<div className='container'>{children}</div>
				</main>
			</body>
		</html>
	)
}
