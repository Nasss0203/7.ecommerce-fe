import { findProductById } from "@/api/product.api";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	addToCart,
	fetchListCart,
	resetFetchListCart,
} from "@/redux/slice/cart.slice";
import { IBackEnd, IProduct } from "@/types/data";
import { getUserIdAndToken } from "@/utils";
import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { RiSubtractFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const DetailProductPage = () => {
	const [quantity, setQuantity] = useState<number>(1);
	const [dataProduct, setDataProduct] = useState<IBackEnd<IProduct>>();

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const _id = searchParams.get("id");
	const { userId } = getUserIdAndToken();

	const dispatch = useAppDispatch();
	const isAddCart = useAppSelector((state) => state.cart.isAddCart);

	useEffect(() => {
		if (isAddCart === true) {
			dispatch(fetchListCart({ userId: userId }));
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
				userId: userId,
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

	if (!product)
		return (
			<div className='container px-3 space-y-5 lg:px-0'>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink>
								<Skeleton className='w-24 h-3'></Skeleton>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink>
								<Skeleton className='w-24 h-3'></Skeleton>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>
								<Skeleton className='h-3 w-96'></Skeleton>
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className='gap-10 lg:grid lg:grid-cols-12'>
					<div className='flex flex-col gap-10 lg:col-span-6'>
						<Skeleton className='w-full h-[250px]'></Skeleton>
					</div>
					<div className='flex flex-col justify-start gap-3 lg:gap-6 lg:col-span-6'>
						<div className='flex flex-col gap-2 lg:gap-4'>
							<div className='space-y-2'>
								<Skeleton className='w-full h-6'></Skeleton>
								<Skeleton className='w-full h-6'></Skeleton>
							</div>
							<div className='grid grid-cols-2'>
								<div className='space-y-2'>
									<Skeleton className='h-4 w-36'></Skeleton>
									<Skeleton className='h-4 w-36'></Skeleton>
								</div>
							</div>
						</div>
						<div className='w-full border-t border-neutral-300'></div>
						<div className='flex items-center gap-3'>
							<div className='flex items-center gap-3'>
								<Skeleton className='w-[170px] h-7'></Skeleton>
								<Skeleton className='w-[140px] h-7'></Skeleton>
							</div>
						</div>
						<div className='flex items-center gap-5 '>
							<Skeleton className='w-[115px] h-10'></Skeleton>
							<Skeleton className='w-[350px] h-10'></Skeleton>
						</div>
					</div>
				</div>
				<div className='gap-10 pt-5 lg:pt-0 lg:grid lg:grid-cols-12'>
					<div className='flex flex-col gap-3 lg:col-span-6'>
						<h2 className='text-xl font-bold'>
							<Skeleton className='w-[190px] h-7'></Skeleton>
						</h2>
						<div className='flex flex-col items-center gap-2'>
							{Array(7)
								.fill(0)
								.map((item, index) => (
									<Skeleton
										className='w-full h-4'
										key={index}
									></Skeleton>
								))}
							<Skeleton className='w-[280px] h-10'></Skeleton>
						</div>
					</div>
				</div>
			</div>
		);

	document.title = product.product_name;

	return (
		<div className='container px-3 space-y-5 lg:px-0'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink>
							<Link to='/'>Trang chủ</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink>
							<Link to={`/${product?.product_category}`}>
								{product?.product_category}
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{product?.product_name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
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
			<div className='gap-10 pt-5 lg:pt-0 lg:grid lg:grid-cols-12'>
				<div className='flex flex-col gap-3 lg:col-span-6'>
					<h2 className='text-xl font-bold'>Thông tin sản phẩm</h2>
					<div className='flex flex-col items-center gap-3'>
						<div className=' lg:line-clamp-[8] line-clamp-4'>
							<div
								dangerouslySetInnerHTML={{
									__html: product?.product_description,
								}}
							></div>
						</div>
						<Dialog>
							<DialogTrigger>
								<div className='py-3 w-[300px] text-base font-medium text-blue-500 border border-blue-500 rounded-md flex items-center gap-2 justify-center'>
									Xem thêm
									<span className='text-2xl'>
										<IoMdArrowDropright />
									</span>
								</div>
							</DialogTrigger>
							<DialogContent className='lg:max-w-[76rem] top-0 translate-y-0 h-[calc(100%-1%)]'>
								<AlertDialogHeader>
									<DialogTitle></DialogTitle>
									<ScrollArea className='w-full lg:px-[150px] max-h-[calc(100vh-5rem)] mb-[100px] rounded-md'>
										<DialogDescription>
											<div
												dangerouslySetInnerHTML={{
													__html: product?.product_description,
												}}
											></div>
										</DialogDescription>
									</ScrollArea>
								</AlertDialogHeader>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailProductPage;
