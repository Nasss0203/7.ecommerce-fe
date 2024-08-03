import { checkoutCart } from "@/api/checkout.api";
import { getListDiscountByShop } from "@/api/discount.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	deteleProductCart,
	fetchListCart,
	resetFetchListCart,
	updateProductCart,
} from "@/redux/slice/cart.slice";
import { IBackEnd, IDiscount } from "@/types/data";
import { formatCurrency, getUserIdAndToken } from "@/utils";
import { Fragment, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { RiSubtractFill } from "react-icons/ri";

const CartPage = () => {
	const { userId } = getUserIdAndToken();

	const dispatch = useAppDispatch();
	const isAddCart = useAppSelector((state) => state.cart.isAddCart);
	const listCart = useAppSelector((state) => state.cart.listCart);
	const dataCart = listCart?.cart_products;

	const [listDisount, setLisDiscount] = useState<IBackEnd<IDiscount>>();
	const [selectAll, setSelectAll] = useState(false);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [totalAmount, setTotalAmount] = useState(0);

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

	const handleSelectItem = (productId: string) => {
		const selectedItem = dataCart.find(
			(item) => item.productId === productId,
		);

		if (!selectedItem) return;

		if (selectedItems.includes(productId)) {
			setSelectedItems(selectedItems.filter((id) => id !== productId));
			setTotalAmount(
				totalAmount - selectedItem.price * selectedItem.quantity,
			);
		} else {
			setSelectedItems([...selectedItems, productId]);
			setTotalAmount(
				totalAmount + selectedItem.price * selectedItem.quantity,
			);
		}
	};

	const handleSelectAll = () => {
		if (selectAll) {
			setSelectedItems([]);
			setTotalAmount(0);
		} else {
			const allProductIds = dataCart.map((item) => item.productId);
			const allProductTotal = dataCart.reduce(
				(acc, item) => acc + item.price * item.quantity,
				0,
			);
			setSelectedItems(allProductIds);
			setTotalAmount(allProductTotal);
		}
		setSelectAll(!selectAll);
	};

	useEffect(() => {
		getListDiscount();
	}, []);

	const getListDiscount = async () => {
		const response = await getListDiscountByShop(userId);
		setLisDiscount(response);
	};

	const checkoutReview = async () => {
		const itemProducts = listCart.cart_products.map((item) => ({
			productId: item.productId,
			price: item.price,
			quantity: item.quantity,
		}));
		const response = await checkoutCart({
			cartId: listCart._id,
			userId: 1001,
			shop_order_ids: [
				{
					authId: userId,
					shop_discounts: [
						{
							codeId: "SHOP-1144",
							discoutId: "66addc5803d7cd621a209255",
							shop_id: userId,
						},
					],
					item_products: itemProducts,
				},
			],
		});
		console.log("response~", response?.metadata);
	};

	return (
		<Fragment>
			<div className='container flex flex-col gap-4'>
				<div className='w-full pt-5 border border-neutral-400 rounded flex flex-col gap-3'>
					<h3 className='px-5 text-xl font-medium'>Cart</h3>
					<div className='flex flex-col text-left'>
						<div className='flex items-center  text-xs font-semibold uppercase bg-neutral-300 text-center'>
							<div className='w-[5%] py-2 justify-center flex'>
								<input
									type='checkbox'
									checked={selectAll}
									onChange={handleSelectAll}
								/>
							</div>
							<div className='w-[35%] text-left  py-2'>
								Sản phẩm
							</div>
							<div className='w-[15%] py-4'>Giá</div>
							<div className='w-[15%] py-4'>số lượng</div>
							<div className='w-[15%] py-4'>tổng tiền</div>
							<div className='w-[15%] py-4'>xóa sản phẩm</div>
						</div>
						<div className='h-[280px] overflow-x-auto'>
							{dataCart?.map((item: any, index: any) => (
								<div
									className='flex items-center text-xs border-b'
									key={index}
								>
									<div className='w-[5%] py-2 justify-center flex'>
										<input
											type='checkbox'
											checked={selectedItems.includes(
												item.productId,
											)}
											onChange={() =>
												handleSelectItem(item.productId)
											}
										/>
									</div>
									<div className='w-[35%] py-2 '>
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
									<div className='flex items-center gap-1 w-[15%] justify-center py-2'>
										<span className='text-sm text-gray-400 line-through'></span>
										<span className='text-sm '>
											{formatCurrency(item.price)}
										</span>
									</div>
									<div className='w-[15%] justify-center flex py-2'>
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
									<div className='w-[15%] justify-center flex py-2'>
										{formatCurrency(
											item.quantity * item.price,
										)}
									</div>
									<div
										className='text-red-500 cursor-pointer w-[15%] justify-center flex py-2'
										onClick={() =>
											handleDeleteCart({
												productId: item.productId,
												userId: 1001,
											})
										}
									>
										<FaRegTrashAlt />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3 ml-5'>
						<div className='py-4 justify-center flex'>
							<input
								type='checkbox'
								checked={selectAll}
								onChange={handleSelectAll}
								id='all'
							/>
						</div>
						<label className='text-lg' htmlFor='all'>
							Chọn Tất Cả ({selectedItems.length})
						</label>
					</div>
					<div className='flex items-center gap-5'>
						<div className='flex items-center gap-3 '>
							<span className='text-lg'>Tổng thanh toán:</span>
							<span className='text-xl text-blue-500'>
								{formatCurrency(totalAmount)}
							</span>
						</div>
						<button
							className='bg-blue-500 rounded-md px-5 py-2 text-white'
							onClick={() => console.log(checkoutReview())}
						>
							Thanh Toán
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default CartPage;
