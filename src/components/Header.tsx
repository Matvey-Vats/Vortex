'use client'
import { logoutUser } from '@/store/slices/authSlice'
import { AppDispatch, RootState } from '@/store/store'
import { Orbitron, Roboto } from 'next/font/google'
import Link from 'next/link'
import { FC } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })
const roboto = Roboto({ subsets: ['latin'], weight: '400' })

const Header: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { isAuthenticated } = useSelector((state: RootState) => state.auth)

	return (
		<header className='py-5 sticky top-0 z-50 bg-[#0a0a0a]'>
			<div className='container'>
				<div className='flex items-center justify-between'>
					<Link
						href={'/'}
						className={`${orbitron.className} font-bold text-5xl bg-gradient-to-r from-[#FF3B3B] to-[#6C5CE7] bg-clip-text text-transparent drop-shadow-[0_0_10px_#FF3B3B]`}
					>
						Vortex
					</Link>
					<nav className={`${roboto.className} flex text-xl gap-x-15`}>
						<ul className={`flex items-center gap-x-5`}>
							<li className='transition-all duration-300 hover:opacity-70'>
								<Link href={'/'}>Home</Link>
							</li>
							<li className='transition-all duration-300 hover:opacity-70'>
								<Link href={'/tv'}>TV Shows</Link>
							</li>
							<li className='transition-all duration-300 hover:opacity-70'>
								<Link href={'/movies'}>Movies</Link>
							</li>

							<li className='transition-all duration-300 hover:opacity-70'>
								<Link href={'/'}>My List</Link>
							</li>
							<li className='transition-all duration-300 hover:opacity-70'>
								<Link href={'/search'}>Search</Link>
							</li>
						</ul>
						{!isAuthenticated ? (
							<ul className='flex items-center gap-x-5'>
								<li className='bg-[#FF3B3B] border-1 border-transparent font-bold px-5 py-2 rounded-xl transition-all duration-700 hover:border-[#FF3B3B] hover:bg-transparent'>
									<Link href={'/auth/login'}>Log-in</Link>
								</li>
								<li>
									<Link href={'/auth/register'}>Sign-up</Link>
								</li>
							</ul>
						) : (
							<button
								onClick={() => dispatch(logoutUser())}
								className='cursor-pointer'
							>
								<BiLogOut size={30} />
							</button>
						)}
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header
