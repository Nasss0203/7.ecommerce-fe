import { Link } from "react-router-dom";

const category = [
	{
		name: "Điện thoại",
		url: "phone",
		icon: <></>,
	},
	{
		name: "Laptop",
		url: "laptop",
		icon: <></>,
	},
];

const Category = () => {
	return (
		<>
			{/* <div className='h-full w-[280px] bg-white rounded shadow-md border border-neutral-200 hidden lg:block'>
				<div className='relative flex flex-col h-full'>
					{category.map((item, index) => (
						<Link
							to={`/${item.url}`}
							className='flex items-center justify-between px-3 py-[7px] hover:bg-slate-200 first:hover:rounded-t pb-1.5 last:hover:rounded-b  transition-all group '
							key={index}
						>
							<div className='flex items-center gap-2'>
								<span className='text-2xl'>
									<LuSmartphone />
								</span>
								<span className='font-medium cursor-pointer hover:text-secondary-500'>
									{item.name}
								</span>
								<div className='hidden w-[982px] h-[440px] -left-1/2 translate-x-[34%] absolute top-0 bg-white rounded-md  group-hover:block shadow-sm border border-neutral-300 z-40'>
									<div className='grid grid-cols-5 gap-10 p-5'>
										<div className='flex flex-col gap-2'>
											<span className='text-base font-semibold '>
												Brand
											</span>
											<div className='flex flex-col gap-3 '>
												{item.brand.map(
													(item, index) => (
														<span
															className='cursor-pointer hover:text-secondary-500'
															key={index}
														>
															{item.name}
														</span>
													),
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
							<IoIosArrowForward />
						</Link>
					))}
				</div>
			</div> */}
			<div className='items-center hidden gap-5 lg:flex '>
				{category.map((item, index) => (
					<Link
						to={`/${item.url}`}
						className='flex items-center gap-1 font-medium text-white'
						key={index}
					>
						<span></span>
						<span>{item.name}</span>
					</Link>
				))}
			</div>
		</>
	);
};

export default Category;
