const Spinner = () => {
	return (
		<div className='flex justify-center items-center h-screen space-x-2'>
			<div className='w-2 h-8 bg-[#FF3B3B] animate-pulse'></div>
			<div className='w-2 h-8 bg-[#FF3B3B] animate-pulse200'></div>
			<div className='w-2 h-8 bg-[#FF3B3B] animate-pulse400'></div>
		</div>
	)
}

export default Spinner
