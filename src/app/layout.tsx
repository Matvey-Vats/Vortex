import Header from '@/components/Header'
import ReduxProvider from '@/store/provider'
import './globals.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>
				<ReduxProvider>
					<Header />

					<main className='w-full'>{children}</main>
				</ReduxProvider>
			</body>
		</html>
	)
}
