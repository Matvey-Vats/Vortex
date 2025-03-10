'use client'
import { logoutUser, setUser } from '@/store/slices/authSlice'
import { AppDispatch, RootState } from '@/store/store'
import { Orbitron, Roboto } from 'next/font/google'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { BiLogOut, BiMenu } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })
const roboto = Roboto({ subsets: ['latin'], weight: '400' })

const Header: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { isAuthenticated } = useSelector((state: RootState) => state.auth)
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const savedUser = localStorage.getItem('user')

		if (savedUser) {
			const user = JSON.parse(savedUser)
			dispatch(setUser(user))
		}
	}, [dispatch])

	const handleMenuClick = () => {
		setIsOpen(!isOpen)

		if (!isOpen) {
			document.body.classList.add('overflow-hidden')
		} else {
			document.body.classList.remove('overflow-hidden')
		}
	}

	return (
		<header className='py-5 sticky top-0 z-50 bg-[#0a0a0a]'>
			<div className='container'>
				<div className='flex items-center justify-between'>
					<Link
						href={'/'}
						className={`${orbitron.className} font-bold text-5xl bg-gradient-to-r from-[#FF3B3B] to-[#6C5CE7] bg-clip-text text-transparent drop-shadow-[0_0_10px_#FF3B3B] z-50`}
					>
						Vortex
					</Link>

					<nav
						className={`max-[930px]:hidden ${roboto.className} flex text-xl gap-x-15`}
					>
						<ul className='flex items-center gap-x-5'>
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
								<Link href={'/my-list'}>My List</Link>
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

					<button
						onClick={handleMenuClick}
						className='hidden max-[930px]:block z-50'
					>
						{isOpen ? <IoClose size={30} /> : <BiMenu size={30} />}
					</button>

					<div
						className={`fixed top-0 left-0 w-full h-screen bg-[#0a0a0a] flex flex-col items-center justify-center transition-transform duration-300 ${
							isOpen ? 'translate-x-0' : '-translate-x-full'
						}`}
					>
						<ul className='text-xl text-center space-y-5'>
							<li className='transition-all duration-300 hover:opacity-70'>
								<Link href={'/'} onClick={handleMenuClick}>
									Home
								</Link>
							</li>
							<li className='transition-all duration-300 hover:opacity-70'>
								<Link href={'/tv'} onClick={handleMenuClick}>
									TV Shows
								</Link>
							</li>
							<li className='transition-all duration-300 hover:opacity-70'>
								<Link href={'/movies'} onClick={handleMenuClick}>
									Movies
								</Link>
							</li>
							<li className='transition-all duration-300 hover:opacity-70'>
								<Link href={'/my-list'} onClick={handleMenuClick}>
									My List
								</Link>
							</li>
							<li className='transition-all duration-300 hover:opacity-70'>
								<Link href={'/search'} onClick={handleMenuClick}>
									Search
								</Link>
							</li>
						</ul>

						{!isAuthenticated ? (
							<ul className='flex flex-col items-center gap-y-5 mt-10'>
								<li className='bg-[#FF3B3B] border-1 border-transparent font-bold px-5 py-2 rounded-xl transition-all duration-700 hover:border-[#FF3B3B] hover:bg-transparent'>
									<Link href={'/auth/login'} onClick={handleMenuClick}>
										Log-in
									</Link>
								</li>
								<li>
									<Link href={'/auth/register'} onClick={handleMenuClick}>
										Sign-up
									</Link>
								</li>
							</ul>
						) : (
							<button
								onClick={() => {
									dispatch(logoutUser())
									handleMenuClick()
								}}
								className='cursor-pointer mt-10'
							>
								<BiLogOut size={30} />
							</button>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
