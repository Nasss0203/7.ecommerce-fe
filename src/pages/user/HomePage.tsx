import { Card } from "@/components/card";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { categoryForm } from "@/constants/category";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchFindAllProduct } from "@/redux/slice/product.slice";
import { IProduct } from "@/types/data";
import { getCategory } from "@/utils";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

const HomePage = () => {
	const [limit, setLimit] = useState(12);

	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.product.listProductAll);

	useEffect(() => {
		document.title = "Trang chủ";
		dispatch(fetchFindAllProduct());
	}, []);

	const product = data?.data;

	const productPhone = getCategory(product, categoryForm.PHONE);
	const productLaptop = getCategory(product, categoryForm.LAPTOP);

	if (!product)
		return (
			<>
				{Array(3)
					.fill(0)
					.map((item, index) => (
						<div
							className='container px-3 mb-10 space-y-5 lg:px-0'
							key={index}
						>
							<div className='flex flex-col gap-6'>
								<div className='flex items-center justify-between'>
									<Skeleton className='w-40 h-7'></Skeleton>
								</div>
								<div className='grid grid-cols-2 gap-1.5 lg:grid-cols-6 md:grid-cols-4'>
									{Array(12)
										.fill(0)
										.map((item, index) => (
											<CardSkeleton
												key={index}
											></CardSkeleton>
										))}
								</div>
							</div>
						</div>
					))}
			</>
		);

	return (
		<div className='container px-3 space-y-5 lg:px-0'>
			<div className='flex flex-col gap-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-2xl font-semibold leading-8'>
						Điện thoại
					</h3>
				</div>
				{productPhone && (
					<div className='grid grid-cols-2 gap-1.5 lg:grid-cols-6 md:grid-cols-4'>
						{productPhone
							.slice(0, limit)
							?.map((item: IProduct, index: number) => (
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
				)}

				<div className='flex justify-center'>
					<button
						className={`px-20 py-3 text-lg text-white bg-blue-500 rounded-lg ${
							limit === 24 ? "hidden" : ""
						}`}
						onClick={() => setLimit(limit + 12)}
					>
						Xem thêm
					</button>
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
				{productLaptop && (
					<div className='grid grid-cols-2 gap-1.5 lg:grid-cols-6 md:grid-cols-4'>
						{productLaptop
							.slice(0, limit)
							?.map((item: IProduct, index: number) => (
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
				)}
			</div>
		</div>
	);
};

export default HomePage;
