import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	deteleProductCart,
	fetchListCart,
	resetFetchListCart,
	updateProductCart,
} from "@/redux/slice/cart.slice";
import { getUserIdAndToken } from "@/utils";
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { RiSubtractFill } from "react-icons/ri";

interface CartProduct {
	productId: string;
	name: string;
	image: string;
	price: number;
	quantity: number;
	shopId: string;
}

interface Cart {
	_id: string;
	cart_count_product: number;
	cart_products: CartProduct;
	cart_state: string;
	cart_userId: number;
	createOn: Date;
	modifiedOn: Date;
}

const CartPage = () => {
	const { userId } = getUserIdAndToken();
	const dispatch = useAppDispatch();
	const isAddCart = useAppSelector((state) => state.cart.isAddCart);
	const listCart = useAppSelector((state) => state.cart.listCart);
	const dataCart = listCart?.cart_products;

	useEffect(() => {
		if (isAddCart === true) {
			dispatch(fetchListCart({ userId: 1001 }));
			dispatch(resetFetchListCart());
		}
	}, [isAddCart, dispatch]);

	useEffect(() => {
		dispatch(fetchListCart({ userId: 1001 }));
	}, []);

	const handleIncreaseCart = async (productId: string) => {
		const item = dataCart.find((item) => item.productId === productId);
		if (item) {
			dispatch(
				updateProductCart({
					userId: 1001,
					shop_order_ids: [
						{
							shopId: userId,
							item_products: [
								{
									shopId: userId,
									price: item?.price,
									quantity: item.quantity + 1,
									old_quantity: item.quantity,
									productId: item.productId,
								},
							],
						},
					],
				}),
			);
		}
	};

	const handleDecreaseCart = async (productId: string) => {
		const item = dataCart.find((item) => item.productId === productId);
		if (item) {
			if (item.quantity === 1) {
				handleDeleteCart({
					productId: item.productId,
					userId: 1001,
				});
			} else if (item.quantity > 1) {
				dispatch(
					updateProductCart({
						userId: 1001,
						shop_order_ids: [
							{
								shopId: userId,
								item_products: [
									{
										shopId: userId,
										price: item.price,
										quantity: item.quantity - 1,
										old_quantity: item.quantity,
										productId: item.productId,
									},
								],
							},
						],
					}),
				);
			}
		}
	};

	const handleDeleteCart = ({
		productId,
		userId,
	}: {
		productId: string;
		userId: number;
	}) => {
		const item = dataCart.find((item) => item.productId === productId);
		dispatch(deteleProductCart({ productId: item?.productId, userId }));
	};

	const formatCurrency = (amount: any) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	return (
		<div className='container flex gap-4'>
			<div className='w-[75%] pt-5 border border-neutral-400 rounded flex flex-col gap-3'>
				<h3 className='px-5 text-xl font-medium'>Cart</h3>
				<div className='flex flex-col text-left'>
					<div className='flex items-center justify-around text-xs font-semibold uppercase bg-neutral-300 '>
						<span className='px-4 py-3 w-[400px]'>
							Product name
						</span>
						<span className='ml-10 px-4 py-3 w-[160px] text-center '>
							price
						</span>
						<span className='ml-5 px-4 py-3 w-[170px] text-center'>
							quantity
						</span>
						<span className='px-4 py-3 w-[160px] text-center ml-5'>
							total
						</span>
						<div className='px-3'></div>
					</div>
					<div className='h-[280px] overflow-x-auto'>
						{dataCart?.map((item: any, index: any) => (
							<div
								className='flex items-center text-xs border-b'
								key={index}
							>
								<div className='px-4 py-3 '>
									<div className='flex items-center gap-2 w-[400px]'>
										<div className='w-12 h-12'>
											<img
												src={item.image}
												alt=''
												className='object-cover w-full h-full'
											/>
										</div>
										<p className='flex-1 text-sm line-clamp-2'>
											{item.name}
										</p>
									</div>
								</div>
								<div className='flex items-center gap-1 py-3 w-[160px] px-4'>
									<span className='text-sm text-gray-400 line-through'></span>
									<span className='text-sm '>
										{formatCurrency(item.price)}
									</span>
								</div>
								<div className='px-4 py-3 w-[170px]'>
									<div className='inline-flex items-center border-[2px] rounded border-neutral-300 '>
										<button
											className='px-3 py-1.5'
											onClick={() =>
												handleDecreaseCart(
													item.productId,
												)
											}
										>
											<RiSubtractFill />
										</button>
										<span className='px-3 py-1.5'>
											{item.quantity}
										</span>
										<button
											className='px-3 py-1.5'
											onClick={() =>
												handleIncreaseCart(
													item.productId,
												)
											}
										>
											<LuPlus />
										</button>
									</div>
								</div>
								<span className='px-4 py-3 w-[160px] text-right'>
									{formatCurrency(item.quantity * item.price)}
								</span>
								<span
									className='text-red-500 px-3 cursor-pointer'
									onClick={() =>
										handleDeleteCart({
											productId: item.productId,
											userId: 1001,
										})
									}
								>
									<FaRegTrashAlt />
								</span>
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
							<span className='text-sm text-gray-900'>
								{formatCurrency(900000)}
							</span>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-600'>
								Discount
							</span>
							<span className='text-sm text-gray-900'>
								{formatCurrency(0)}
							</span>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-600'>Ship</span>
							<span className='text-sm text-gray-900'>
								{formatCurrency(900000)}
							</span>
						</div>
					</div>
					<div className='border-b'></div>
					<div className='flex flex-col gap-2'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-900'>
								Totals
							</span>
							<span className='text-base font-semibold text-danger-500'>
								{formatCurrency(900000)}
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
