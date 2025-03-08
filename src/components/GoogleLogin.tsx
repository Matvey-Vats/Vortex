import { FC } from 'react'
import { FaGoogle } from 'react-icons/fa'

type Props = {
	handleClickLoginWithGoogle: () => void
}

const GoogleLogin: FC<Props> = ({ handleClickLoginWithGoogle }) => {
	return (
		<button
			onClick={handleClickLoginWithGoogle}
			className='flex items-center mx-auto gap-x-5 cursor-pointer'
		>
			<FaGoogle size={30} />
			<p className='text-[18px] font-bold'>Login with google</p>
		</button>
	)
}

export default GoogleLogin
