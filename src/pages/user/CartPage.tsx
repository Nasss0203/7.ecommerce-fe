import { getListDiscountByShop } from "@/api/discount.api";
import { CartDesktop, CartMobile } from "@/components/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	deteleProductCart,
	fetchListCart,
	resetFetchListCart,
	updateProductCart,
} from "@/redux/slice/cart.slice";
import {
	checkcoutReview,
	resetCheckoutCart,
} from "@/redux/slice/checkout.slice";
import { IBackEnd, IDiscount } from "@/types/data";
import { formatCurrency, getUserIdAndToken } from "@/utils";
import { useEffect, useLayoutEffect, useState } from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
	const { userId } = getUserIdAndToken();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const isAddCart = useAppSelector((state) => state.cart.isAddCart);
	const listCart = useAppSelector((state) => state.cart.listCart);
	const isCheckout = useAppSelector((state) => state.checkout.isCheckout);

	const dataCart = listCart?.cart_products;

	const [listDisount, setLisDiscount] = useState<IBackEnd<IDiscount>>();
	const [selectAll, setSelectAll] = useState(false);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [totalAmount, setTotalAmount] = useState(0);

	useLayoutEffect(() => {
		if (isAddCart === true) {
			dispatch(fetchListCart({ userId: userId }));
			dispatch(resetFetchListCart());
		}
		document.title = "Giỏ hàng";
	}, [isAddCart, dispatch]);

	useEffect(() => {
		if (isCheckout === true) {
			navigate("/checkout");

			dispatch(resetCheckoutCart());
		}
	}, [isCheckout]);

	const handleIncreaseAndDecrease = ({
		data,
		productId,
		action,
	}: {
		data: any[];
		productId: any;
		action: "increase" | "decrease";
	}) => {
		const item = data.find((item) => {
			return item.productId === productId;
		});

		const newQuantity =
			action === "increase" ? item.quantity + 1 : item.quantity - 1;
		const amountChange = action === "increase" ? item.price : -item.price;

		if (item) {
			if (newQuantity === 0) {
				handleDeleteCart({
					productId: item.productId,
					userId,
				});
			} else {
				dispatch(
					updateProductCart({
						userId: userId,
						shop_order_ids: [
							{
								shopId: userId,
								item_products: [
									{
										shopId: userId,
										price: item?.price,
										quantity: newQuantity,
										old_quantity: item.quantity,
										productId: item.productId,
									},
								],
							},
						],
					}),
				).then(() => {
					if (selectedItems.includes(productId)) {
						setTotalAmount(totalAmount + amountChange);
					}
				});
			}
		}
	};

	const handleDeleteCart = ({
		productId,
		userId,
	}: {
		productId: string;
		userId: string;
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
			setSelectAll(false); // Bỏ chọn tất cả nếu có sản phẩm bị bỏ chọn
		} else {
			setSelectedItems([...selectedItems, productId]);
			setTotalAmount(
				totalAmount + selectedItem.price * selectedItem.quantity,
			);
			// Kiểm tra xem đã chọn hết sản phẩm chưa
			if (selectedItems.length + 1 === dataCart.length) {
				setSelectAll(true); // Chọn tất cả nếu đã chọn hết sản phẩm
			}
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
		const selectedProducts = listCart.cart_products.filter((item) =>
			selectedItems.includes(item.productId),
		);

		const itemProducts = selectedProducts.map((item) => ({
			productId: item.productId,
			price: item.price,
			quantity: item.quantity,
		}));

		const selectedTotalAmount = selectedProducts.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0,
		);

		await dispatch(
			checkcoutReview({
				cartId: listCart._id,
				userId: userId,
				shop_order_ids: [
					{
						authId: userId,
						item_products: itemProducts,
						shop_discounts: [
							{
								codeId: "SHOP-1144",
								discountId: "66addc5803d7cd621a209255",
								shop_id: userId,
							},
						],
					},
				],
			}),
		);

		setTotalAmount(totalAmount - selectedTotalAmount);
	};

	return (
		<>
			{dataCart && dataCart.length > 0 ? (
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
									<div className='w-[15%] py-4'>
										tổng tiền
									</div>
									<div className='w-[15%] py-4'>
										xóa sản phẩm
									</div>
								</div>
								<div className='h-[280px] overflow-x-auto'>
									{dataCart?.map((item: any, index: any) => (
										<CartDesktop
											decreaseButton={() =>
												handleIncreaseAndDecrease({
													data: dataCart,
													action: "decrease",
													productId: item.productId,
												})
											}
											increaseButton={() =>
												handleIncreaseAndDecrease({
													data: dataCart,
													action: "increase",
													productId: item.productId,
												})
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
													userId: "66859264b627f62df4daf95d",
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
									handleIncreaseAndDecrease({
										data: dataCart,
										action: "decrease",
										productId: item.productId,
									})
								}
								increaseButton={() =>
									handleIncreaseAndDecrease({
										data: dataCart,
										action: "increase",
										productId: item.productId,
									})
								}
								image={item.image}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								totalPrice={totalAmount}
								key={index}
								checked={selectedItems.includes(item.productId)}
								onChange={() =>
									handleSelectItem(item.productId)
								}
								deleteItem={() =>
									handleDeleteCart({
										productId: item.productId,
										userId: userId,
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
								<div
									className='w-full px-5 py-2 text-white bg-blue-500 rounded-md cursor-pointer lg:w-auto'
									onClick={() => checkoutReview()}
								>
									Thanh Toán
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='container flex flex-col gap-4 px-3 mt-32 lg:px-0'>
					<div className='flex flex-col gap-4'>
						<div className='flex justify-center'>
							<div className='text-[100px] text-red-500'>
								<MdOutlineRemoveShoppingCart />
							</div>
						</div>
						<h3 className='text-lg text-center'>
							Không có sản phẩm nào trong giỏ hàng
						</h3>
						<div className='flex justify-center'>
							<Link
								to={"/"}
								className='px-20 py-3 text-white bg-blue-500 rounded-lg'
							>
								Quay lại trang chủ
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CartPage;
