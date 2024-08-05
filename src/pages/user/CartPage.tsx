import { checkoutCart } from "@/api/checkout.api";
import { getListDiscountByShop } from "@/api/discount.api";
import { CartDesktop, CartMobile } from "@/components/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	deteleProductCart,
	fetchListCart,
	resetFetchListCart,
	updateProductCart,
} from "@/redux/slice/cart.slice";
import { IBackEnd, IDiscount } from "@/types/data";
import { formatCurrency, getUserIdAndToken } from "@/utils";
import { useEffect, useState } from "react";

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
		<div className='container flex flex-col gap-4 px-3 lg:px-0'>
			<div className='space-y-4 '>
				<div className='flex-col hidden w-full gap-3 pt-5 border rounded lg:flex border-neutral-400 '>
					<h3 className='px-5 text-xl font-medium'>Cart</h3>
					<div className='flex flex-col text-left'>
						<div className='flex items-center text-xs font-semibold text-center uppercase bg-neutral-300'>
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
								<CartDesktop
									decreaseButton={() =>
										handleDecreaseCart(item.productId)
									}
									increaseButton={() =>
										handleIncreaseCart(item.productId)
									}
									image={item.image}
									name={item.name}
									price={item.price}
									quantity={item.quantity}
									totalPrice={totalAmount}
									key={index}
									checked={selectedItems.includes(
										item.productId,
									)}
									onChange={() =>
										handleSelectItem(item.productId)
									}
									deleteItem={() =>
										handleDeleteCart({
											productId: item.productId,
											userId: 1001,
										})
									}
								></CartDesktop>
							))}
						</div>
					</div>
				</div>
				{dataCart?.map((item: any, index: any) => (
					<CartMobile
						decreaseButton={() =>
							handleDecreaseCart(item.productId)
						}
						increaseButton={() =>
							handleIncreaseCart(item.productId)
						}
						image={item.image}
						name={item.name}
						price={item.price}
						quantity={item.quantity}
						totalPrice={totalAmount}
						key={index}
						checked={selectedItems.includes(item.productId)}
						onChange={() => handleSelectItem(item.productId)}
						deleteItem={() =>
							handleDeleteCart({
								productId: item.productId,
								userId: 1001,
							})
						}
					></CartMobile>
				))}
				<div className='flex items-center justify-between'>
					<div className='items-center hidden gap-3 ml-5 lg:flex'>
						<div className='flex justify-center py-4'>
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
					<div className='flex flex-col items-center flex-1 gap-5 lg:flex-row lg:flex-none'>
						<div className='flex items-center justify-between w-full gap-3 lg:w-auto'>
							<span className='hidden text-lg lg:block'>
								Tổng thanh toán:
							</span>
							<span className='text-sm lg:hidden'>
								Tổng ({selectedItems.length} sản phẩm)
							</span>
							<span className='text-lg text-right text-blue-500 lg:text-xl'>
								{formatCurrency(totalAmount)}
							</span>
						</div>
						<button
							className='w-full px-5 py-2 text-white bg-blue-500 rounded-md lg:w-auto'
							onClick={() => console.log(checkoutReview())}
						>
							Thanh Toán
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
