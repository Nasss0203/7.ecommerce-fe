import { findAllProducts } from '@/api/product.api';
import { Card } from '@/components/card';
import React, { useEffect, useState } from 'react';
import { BsCart } from 'react-icons/bs';
import { FaCartShopping, FaRegHeart, FaStar } from 'react-icons/fa6';
import { IoIosArrowRoundForward, IoMdHeartEmpty } from 'react-icons/io';
import { Link } from 'react-router-dom';

const HomePage = () => {
	const [dataProduct, setDataProduct] = useState<any>();
	console.log('dataProduct: ', dataProduct);

	useEffect(() => {
		getAllProducts();
	}, []);

	const getAllProducts = async () => {
		const response = await findAllProducts();
		setDataProduct(response);
	};
	const product = dataProduct?.metadata;
	console.log('product: ', product);
	if (!product) return null;

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
					{product.map((item: any, index: any) => (
						<Card
							slug={item.product_slug}
							_id={item._id}
							key={index}
							image={item.product_thumb}
							name={item.product_name}
							price={item.product_price}></Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
