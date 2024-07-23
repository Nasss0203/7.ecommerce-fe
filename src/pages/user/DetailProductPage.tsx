import { findProductById } from "@/api/product.api";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/data";
import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import { RiSubtractFill } from "react-icons/ri";
import { useLocation } from "react-router-dom";

interface IMeta<T> {
	message: string;
	metadata: T;
	status: number;
}

const DetailProductPage = () => {
	const [dataProduct, setDataProduct] = useState<IMeta<IProduct>>();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const _id = searchParams.get("id");

	useEffect(() => {
		if (_id) {
			getProductById(_id);
		}
	}, [_id]);

	const getProductById = async (id: string) => {
		try {
			const response = await findProductById(id);
			setDataProduct(response);
		} catch (error) {
			console.error("Error fetching product by ID", error);
		}
	};

	const product = dataProduct?.metadata;
	console.log("product: ", product);
	if (!product) return null;

	return (
		<div className='container space-y-5'>
			<div className='grid grid-cols-12 gap-10'>
				<div className='flex flex-col col-span-6 gap-10'>
					<div className='bg-white border rounded-md border-neutral-200'>
						<div className='flex items-center justify-center flex-1'>
							<div className='w-[300px] h-[300px] py-5'>
								<img
									src={product.product_thumb}
									alt={product.product_slug}
									className='object-cover h-full '
								/>
							</div>
						</div>
						<div></div>
					</div>
				</div>
				<div className='flex flex-col justify-start col-span-6 gap-6'>
					<div className='flex flex-col gap-4'>
						<div className='space-y-2'>
							<div></div>
							<p className='text-xl font-medium leading-7 text-gray-900'>
								{product.product_name}
							</p>
						</div>
						<div className='grid grid-cols-2'>
							<div className=''>
								<div className='flex items-center gap-1'>
									<span className='text-sm font-medium leading-5 text-gray-600'>
										Brand:
									</span>
									<span className='text-sm font-semibold leading-5 text-gray-900'>
										{product.product_attributes?.brand}
									</span>
								</div>
								<div className='flex items-center gap-1'>
									<span className='text-sm font-medium leading-5 text-gray-600 '>
										Category:
									</span>
									<span className='text-sm font-semibold leading-5 text-gray-900'>
										{product.product_category}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='w-full border-t border-neutral-300'></div>
					<div className='flex items-center gap-3'>
						<div className='flex items-center gap-3'>
							<span className='font-serif text-2xl leading-8 text-secondary-600'>
								{product?.product_price.toLocaleString(
									"vi-VN",
									{
										style: "currency",
										currency: "VND",
									},
								)}
							</span>
							<span className='font-serif text-lg leading-6 text-gray-500 line-through'>
								{product?.product_price.toLocaleString(
									"vi-VN",
									{
										style: "currency",
										currency: "VND",
									},
								)}
							</span>
						</div>
						<div></div>
					</div>
					<div className='flex items-center gap-5 '>
						<div className='inline-flex items-center border-[2px] rounded border-neutral-300 '>
							<button className='px-3 py-1.5'>
								<RiSubtractFill />
							</button>
							<span className='px-3 py-1.5'>1</span>
							<button className='px-3 py-1.5'>
								<LuPlus />
							</button>
						</div>
						<Button className='flex items-center gap-3 font-medium uppercase w-[300px]'>
							Add to cart
							<BsCart3 />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailProductPage;
