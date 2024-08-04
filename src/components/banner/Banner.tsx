const Banner = () => {
	return (
		<div className='lg:flex flex-1 hidden'>
			<div className='grid grid-cols-9 gap-4'>
				<div className='h-full col-span-6'>
					<div className='grid grid-rows-3 gap-4'>
						<div className='row-span-2 rounded-md shadow-md'>
							<img
								srcSet='slider3.png.png 2x'
								alt=''
								className='object-cover w-full h-full rounded-md '
							/>
						</div>
						<div className='grid grid-cols-2 row-span-1 gap-4'>
							<div className='rounded-md shadow-md'>
								<img
									srcSet='slider4.png 2x'
									alt=''
									className='object-cover w-full h-full rounded-md '
								/>
							</div>
							<div className='rounded-md shadow-md'>
								<img
									srcSet='slider5.png 2x'
									alt=''
									className='object-cover w-full h-full rounded-md'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='grid col-span-3 grid-rows-2 gap-4 rounded'>
					<div className='rounded-md shadow-md'>
						<img
							srcSet='slider6.png 2x'
							alt=''
							className='object-cover w-full h-full rounded-md'
						/>
					</div>
					<div className='rounded-md shadow-md'>
						<img
							srcSet='slider7.png 2x'
							alt=''
							className='object-cover w-full h-full rounded-md'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
