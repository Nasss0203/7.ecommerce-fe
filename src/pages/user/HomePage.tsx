import { findAllProducts } from "@/api/product.api";
import { Banner } from "@/components/banner";
import { Card } from "@/components/card";
import { Category } from "@/components/category";
import { categoryForm } from "@/constants/category";
import { IBackEnd, IProduct, IResponse } from "@/types/data";
import { getCategory } from "@/utils";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

const HomePage = () => {
	const [dataProduct, setDataProduct] =
		useState<IBackEnd<IResponse<IProduct[]>>>();

	useEffect(() => {
		getAllProducts();
		document.title = "Trang chủ";
	}, []);

	const getAllProducts = async () => {
		const response = await findAllProducts();
		setDataProduct(response);
	};

	const product = dataProduct?.metadata.data;
	console.log("product~", product);

	const productPhone = getCategory(product, categoryForm.PHONE);
	const productLaptop = getCategory(product, categoryForm.LAPTOP);

	if (!product) return null;

	return (
		<div className='container px-3 space-y-5 lg:px-0'>
			<div className='flex w-full lg:h-[435px] gap-2.5'>
				<Category></Category>
				<Banner></Banner>
			</div>
			<div className='flex flex-col gap-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-2xl font-semibold leading-8'>
						Điện thoại
					</h3>
					<Link
						to={"/"}
						className='flex items-center gap-2 text-secondary-500'
					>
						<span className='text-sm font-semibold leading-5'>
							Thêm sản phẩm
						</span>
						<span className='text-xl'>
							<IoIosArrowRoundForward />
						</span>
					</Link>
				</div>
				<div className='grid grid-cols-2 gap-1.5 lg:grid-cols-6 md:grid-cols-4'>
					{productPhone.map((item: IProduct, index: any) => (
						<Card
							category={item.product_category}
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
							Thêm sản phẩm
						</span>
						<span className='text-xl'>
							<IoIosArrowRoundForward />
						</span>
					</Link>
				</div>
				<div className='grid grid-cols-2 gap-1.5 md:gap-3 lg:grid-cols-5'>
					{productLaptop.map((item: any, index: any) => (
						<Card
							category={item.product_category}
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
