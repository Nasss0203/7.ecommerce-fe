import { findAllProducts } from "@/api/product.api";
import { Banner } from "@/components/banner";
import { Card } from "@/components/card";
import { Category } from "@/components/category";
import { categoryForm } from "@/constants/category";
import { IProduct, IProductResponse } from "@/types/data";
import { getCategory } from "@/utils";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

const HomePage = () => {
	const [dataProduct, setDataProduct] =
		useState<IProductResponse<IProduct>>();

	useEffect(() => {
		getAllProducts();
	}, []);

	const getAllProducts = async () => {
		const response = await findAllProducts();
		setDataProduct(response);
	};

	const product = dataProduct?.metadata;

	const productPhone = getCategory(product, categoryForm.PHONE);
	const productLaptop = getCategory(product, categoryForm.LAPTOP);

	if (!product) return null;

	return (
		<div className='container space-y-5'>
			<div className='flex w-full h-[435px] gap-4'>
				<Category></Category>
				<Banner></Banner>
			</div>
			<div className='flex flex-col gap-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-2xl font-semibold leading-8'>Phone</h3>
					<Link
						to={"/"}
						className='flex items-center gap-2 text-secondary-500'
					>
						<span className='text-sm font-semibold leading-5'>
							Browse All Product
						</span>
						<span className='text-xl'>
							<IoIosArrowRoundForward />
						</span>
					</Link>
				</div>
				<div className='grid grid-cols-2 gap-1.5 lg:grid-cols-5'>
					{productPhone.map((item: any, index: any) => (
						<Card
							category={
								item.product_category === "Laptops"
									? "laptop"
									: item.product_category === "Phones"
									? "dien-thoai"
									: ""
							}
							slug={item.product_slug}
							_id={item._id}
							key={index}
							image={item.product_thumb}
							name={item.product_name}
							price={item.product_price}
						></Card>
					))}
				</div>
			</div>
			<div className='flex flex-col gap-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-2xl font-semibold leading-8'>Laptop</h3>
					<Link
						to={"/"}
						className='flex items-center gap-2 text-secondary-500'
					>
						<span className='text-sm font-semibold leading-5'>
							Browse All Product
						</span>
						<span className='text-xl'>
							<IoIosArrowRoundForward />
						</span>
					</Link>
				</div>
				<div className='grid grid-cols-2 gap-1.5 md:gap-3 lg:grid-cols-5'>
					{productLaptop.map((item: any, index: any) => (
						<Card
							category={
								item.product_category === "Laptops"
									? "laptop"
									: item.product_category === "Phones"
									? "dien-thoai"
									: ""
							}
							slug={item.product_slug}
							_id={item._id}
							key={index}
							image={item.product_thumb}
							name={item.product_name}
							price={item.product_price}
						></Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
