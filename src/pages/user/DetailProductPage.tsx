import { findProductById } from "@/api/product.api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	addToCart,
	fetchListCart,
	resetFetchListCart,
} from "@/redux/slice/cart.slice";
import { IProduct } from "@/types/data";
import { getUserIdAndToken } from "@/utils";
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
	const { toast } = useToast();
	const [quantity, setQuantity] = useState<number>(1);

	const [dataProduct, setDataProduct] = useState<IMeta<IProduct>>();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const _id = searchParams.get("id");
	const { userId } = getUserIdAndToken();

	const dispatch = useAppDispatch();
	const isAddCart = useAppSelector((state) => state.cart.isAddCart);

	useEffect(() => {
		if (isAddCart === true) {
			dispatch(fetchListCart({ userId: 1001 }));
			dispatch(resetFetchListCart());
		}
	}, [isAddCart, dispatch]);

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

	const handleAddCart = () => {
		dispatch(
			addToCart({
				userId: "1001",
				product: {
					name: product?.product_name,
					price: product?.product_price,
					image: product?.product_thumb,
					productId: product?._id,
					quantity: quantity,
					shopId: userId,
					category: product?.product_category,
					slug: product?.product_slug,
				},
			}),
		);
	};

	if (!product) return null;
	document.title = product.product_name;

	return (
		<div className='container px-3 space-y-5 lg:px-0'>
			<div className='gap-10 lg:grid lg:grid-cols-12'>
				<div className='flex flex-col gap-10 lg:col-span-6'>
					<div className='bg-white border rounded-md border-neutral-200'>
						<div className='flex items-center justify-center flex-1'>
							<div className='w-[250px] h-[250px] py-5'>
								<img
									src={product.product_thumb}
									alt={product.product_slug}
									className='object-cover h-full '
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col justify-start gap-3 lg:gap-6 lg:col-span-6'>
					<div className='flex flex-col gap-2 lg:gap-4'>
						<div className='space-y-2'>
							<div></div>
							<p className='text-lg font-medium leading-7 text-gray-900 lg:text-xl'>
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
							<span className='font-serif text-lg leading-8 lg:text-2xl text-secondary-600'>
								{product?.product_price.toLocaleString(
									"vi-VN",
									{
										style: "currency",
										currency: "VND",
									},
								)}
							</span>
							<span className='font-serif text-base leading-6 text-gray-500 line-through lg:text-lg'>
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
							<button
								className={`px-3 py-1.5 ${
									quantity <= 1 ? "cursor-not-allowed" : ""
								}`}
								onClick={() => setQuantity(quantity - 1)}
								disabled={quantity <= 1 ? true : false}
							>
								<RiSubtractFill />
							</button>
							<span className='px-3 py-1.5'>{quantity}</span>
							<button
								className='px-3 py-1.5 cursor-pointer'
								onClick={() => setQuantity(quantity + 1)}
							>
								<LuPlus />
							</button>
						</div>
						<Button
							className='flex items-center gap-3 font-medium uppercase w-[300px]'
							onClick={() => handleAddCart()}
						>
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
