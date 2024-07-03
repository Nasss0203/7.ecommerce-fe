import React from 'react';
import { FaCartShopping, FaRegHeart, FaStar } from 'react-icons/fa6';

const Card = () => {
	return (
		<div className='flex flex-col gap-5 p-4 border rounded border-neutral-200'>
			<div className=''>
				<img
					srcSet='Image.png 2x'
					alt=''
					className='object-cover w-full h-full'
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='space-y-[6px]'>
					<div className='flex items-center gap-2'>
						<div className='flex items-center gap-1 text-xs text-yellow-400'>
							{Array(5)
								.fill(0)
								.map((item, index) => (
									<FaStar key={index} />
								))}
						</div>
						<span className='text-xs font-normal leading-5 text-gray-500'>
							(52,677)
						</span>
					</div>
					<p className='text-base font-normal leading-5 text-gray-900 line-clamp-2'>
						Xbox Series S - 512GB SSD Console with Wireless Controller - EU
						Versio Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Atque veritatis dolores facere repudiandae tenetur! A odio velit
						distinctio, nam, iure eveniet placeat id obcaecati esse tempora
						repellendus aliquam, ducimus atque?
					</p>
				</div>
				<div className='flex items-center gap-2'>
					<span className='text-base font-normal leading-5 text-gray-300 line-through'>
						$865.99
					</span>
					<span className='text-lg font-semibold leading-5 text-secondary-500'>
						$442.12
					</span>
				</div>
				<p className='text-sm font-normal leading-5 text-gray-600 md:line-clamp-3 line-clamp-2'>
					Games built using the Xbox Series X|S development kit showcase
					unparalleled load times, visuals.
				</p>
			</div>
			<div className='flex items-center gap-2'>
				<div className='items-center justify-center hidden w-8 h-8 p-2 text-sm font-medium rounded lg:flex bg-primary-100 text-primary-500 '>
					<FaRegHeart />
				</div>
				<div className='flex items-center justify-center flex-1 w-8 h-8 gap-2 p-2 text-white rounded bg-primary-500'>
					<FaCartShopping />
					<span className='text-sm font-bold leading-8'>Add to card</span>
				</div>
			</div>
		</div>
	);
};

export default Card;
