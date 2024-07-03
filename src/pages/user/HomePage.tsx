import { Card } from '@/components/card';
import React from 'react';
import { BsCart } from 'react-icons/bs';
import { FaCartShopping, FaRegHeart, FaStar } from 'react-icons/fa6';
import { IoIosArrowRoundForward, IoMdHeartEmpty } from 'react-icons/io';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div className=''>
			<div className='flex flex-col gap-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-2xl font-semibold leading-8'>Best Deals</h3>
					<Link to={'/'} className='flex items-center gap-2 text-secondary-500'>
						<span className='text-sm font-semibold leading-5'>
							Browse All Product
						</span>
						<span className='text-xl'>
							<IoIosArrowRoundForward />
						</span>
					</Link>
				</div>
				<div className='grid grid-cols-2 gap-2 md:gap-3 2xl:grid-cols-6 xl:grid-cols-5'>
					{Array(10)
						.fill(0)
						.map((item, index) => (
							<Card key={index}></Card>
						))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
