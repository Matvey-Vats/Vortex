'use client'

import GoogleLogin from '@/components/GoogleLogin'
import { loginUser, loginWithGoogle } from '@/store/slices/authSlice'
import { AppDispatch, RootState } from '@/store/store'
import { Orbitron } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })

type FieldsTypes = {
	email: string
	password: string
}

const Login = () => {
	const { status, isAuthenticated } = useSelector(
		(state: RootState) => state.auth
	)
	const dispatch = useDispatch<AppDispatch>()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FieldsTypes>()

	useEffect(() => {
		if (status === 'succeeded' && isAuthenticated) {
			reset()
			router.push('/')
		}
	}, [status, isAuthenticated])

	const onSubmit: SubmitHandler<FieldsTypes> = data => {
		const userData = {
			email: data.email,
			password: data.password,
		}
		dispatch(loginUser(userData))
	}

	const handleClickLoginWithGoogle = () => {
		dispatch(loginWithGoogle())
	}

	return (
		<div className='mt-10'>
			<div className='container'>
				<div className='flex items-center justify-center mt-40'>
					<div className='w-[600px]'>
						<h2 className={`${orbitron.className} text-4xl font-bold`}>
							Login
						</h2>
						<div className='w-full'>
							<form
								onSubmit={handleSubmit(onSubmit)}
								action='post'
								className='flex flex-col items-start mt-10 w-full max-w-full'
							>
								<input
									type='email'
									placeholder='Enter your email: '
									className='outline-0 border-b-2 border-b-red-500 w-full p-5 text-white text-md'
									{...register('email', { required: 'Email is required' })}
								/>
								<p
									className={`text-center text-red-500 min-h-[20px] transition-all duration-300 ${
										errors.email ? 'opacity-100 h-auto' : 'opacity-0 h-0'
									}`}
								>
									{errors.email?.message}
								</p>
								<input
									type='password'
									placeholder='Enter your password: '
									className='mt-5 outline-0 border-b-2 border-b-red-500 w-full p-5 text-white text-md'
									{...register('password', {
										required: 'Password is required',
									})}
								/>
								<p
									className={`text-center text-red-500 min-h-[20px] transition-all duration-300 ${
										errors.password ? 'opacity-100 h-auto' : 'opacity-0 h-0'
									}`}
								>
									{errors.password?.message}
								</p>
								<button
									type='submit'
									className={`${orbitron.className} cursor-pointer mt-5 font-bold border-0 border-red-500 bg-red-500 w-[120px] h-[40px] rounded-md transition-all duration-700  hover:bg-transparent hover:border-1`}
								>
									Login
								</button>
							</form>
							<p className='text-center text-xl mt-5 mb-10'>
								Are you not{' '}
								<Link
									href='/auth/register'
									className='text-red-500 font-bold transition-all duration-300 hover:text-red-300'
								>
									registered
								</Link>{' '}
								yet?
							</p>
							<GoogleLogin
								handleClickLoginWithGoogle={handleClickLoginWithGoogle}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
