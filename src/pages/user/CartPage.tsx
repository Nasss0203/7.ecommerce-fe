import { LuPlus } from "react-icons/lu";
import { RiSubtractFill } from "react-icons/ri";

const CartPage = () => {
	return (
		<div className='container flex gap-4'>
			<div className='w-[75%] pt-5 border border-neutral-400 rounded flex flex-col gap-3'>
				<h3 className='px-5 text-xl font-medium'>Cart</h3>
				<div className='flex flex-col text-left'>
					<div className='flex items-center justify-around text-xs font-semibold uppercase bg-neutral-300 '>
						<span className='px-6 py-3 w-[400px]'>
							Product name
						</span>
						<span className='px-8 py-6 '>price</span>
						<span className='px-6 py-3 '>quantity</span>
						<span className='px-6 py-3 '>total</span>
					</div>
					<div className='h-[280px] overflow-x-auto'>
						{Array(8)
							.fill(0)
							.map((item, index) => (
								<div
									className='flex items-center justify-around text-xs border-b'
									key={index}
								>
									<div className='px-6 py-3'>
										<div className='flex items-center gap-2 w-[400px]'>
											<div className='w-12 h-12'>
												<img
													src='https://plus.unsplash.com/premium_photo-1722170080353-5b68cd7b16ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8'
													alt=''
													className='object-cover w-full h-full'
												/>
											</div>
											<p className='flex-1 text-sm line-clamp-2'>
												4K UHD LED Smart TV with
												Chromecast Built-in 4K UHD LED
												Smart TV with Chromecast
												Built-in 4K UHD LED Smart TV
												with Chromecast Built-inư
											</p>
										</div>
									</div>
									<div className='flex items-center gap-1 py-3'>
										<span className='text-sm text-gray-400 line-through'>
											$99
										</span>
										<span className='text-sm '>$99</span>
									</div>
									<div className='px-4 py-3 '>
										<div className='inline-flex items-center border-[2px] rounded border-neutral-300 '>
											<button className='px-3 py-1.5'>
												<RiSubtractFill />
											</button>
											<span className='px-3 py-1.5'>
												1
											</span>
											<button className='px-3 py-1.5'>
												<LuPlus />
											</button>
										</div>
									</div>
									<span className='px-6 py-3 '>$99</span>
								</div>
							))}
					</div>
				</div>
			</div>
			<div className='w-[25%] space-y-4'>
				<div className='flex flex-col gap-3 p-5 border rounded border-neutral-400'>
					<h3 className='text-lg font-medium'>Cart Totals</h3>
					<div className='flex flex-col gap-2'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-600'>
								Sub-total
							</span>
							<span className='text-sm text-gray-900'>900</span>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-600'>
								Discount
							</span>
							<span className='text-sm text-gray-900'>900</span>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-600'>Ship</span>
							<span className='text-sm text-gray-900'>Free</span>
						</div>
					</div>
					<div className='border-b'></div>
					<div className='flex flex-col gap-2'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-900'>
								Totals
							</span>
							<span className='text-base font-semibold text-danger-500'>
								$9000
							</span>
						</div>
					</div>
					<button className='flex items-center justify-center w-full gap-2 py-2 font-medium text-white uppercase rounded-md bg-primary-500'>
						BUY
					</button>
				</div>
				<div className='py-2 border rounded border-neutral-400 '>
					<h3 className='px-5 mb-2 text-lg font-medium'>
						Coupon Code
					</h3>
					<div className='border-b'></div>
					<div className='flex items-center gap-2 p-5'>
						<div className='w-full px-3 py-2 border rounded-md border-neutral-400'>
							<input
								type='text'
								placeholder='Enter discount code'
								className='w-full bg-transparent'
							/>
						</div>
						<button className='px-5 py-3 text-xs font-semibold text-white uppercase bg-blue-500 rounded-md'>
							APPLY
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
