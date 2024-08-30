import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createCheckout, fetchCheckcoutId } from "@/redux/slice/checkout.slice";
import { findAllPublishProduct } from "@/redux/slice/product.slice";
import { formatCurrency } from "@/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface CheckoutItem {
	productId: string;
	quantity: number;
	price: number;
	image: string;
	discount: number;
	totalPrice: number;
}

const CheckoutPage = () => {
	const navigate = useNavigate();
	const checkout = useAppSelector((state) => state.checkout.listCheckout);
	const listProduct = useAppSelector((state) => state.product.listProduct);

	const data = checkout.checkout_items?.map((item) => {
		const product = listProduct.find((p) => p._id === item.productId);
		return { ...item, ...product }; // Kết hợp thông tin từ item và product
	});

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(findAllPublishProduct());
		document.title = "Thanh toán";
	}, []);

	useEffect(() => {
		dispatch(fetchCheckcoutId(checkout));
	}, [checkout]);

	const handleCreateOrder = async () => {
		const respone = await dispatch(
			createCheckout({
				checkoutId: checkout._id,
				cartId: checkout.checkout_cart,
				userId: checkout.checkout_auth,
				use_address: {
					street: "123 Dong Hung Thuan",
					city: "Ho Chi Minh",
					country: "Viet Name",
				},
			}),
		);

		if (respone) {
			toast.success("Đặt hàng thành công");
			navigate("/order-success");
		}
	};
	return (
		<div className='container flex flex-col gap-4'>
			<div className='flex flex-col gap-3 p-5 bg-white border rounded-md shadow border-neutral-200'>
				<h1 className='text-xl text-primary-500'>Địa chỉ nhận hàng</h1>
				<div className='flex items-center justify-between'>
					<div className='space-y-1'>
						<h3 className='text-base font-bold'>NGUYỄN VĂN TÍ</h3>
						<h3 className='text-base font-bold'>13456890</h3>
					</div>
					<div className='flex items-center gap-5'>
						<p className='line-clamp-2'>
							26 Đông Hưng Thuận, Phường Tân Hưng Thuận, Quận 12,
							TP. Hồ Chí Minh
						</p>
						<span className='cursor-pointer text-primary-500'>
							Thay đổi
						</span>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-3 p-10 bg-white border rounded-md shadow border-neutral-200'>
				<div className='flex items-center'>
					<div className='text-gray-500 w-[40%]'>Sản phẩm</div>
					<div className='text-gray-500 w-[15%] text-right'>
						Đơn giá
					</div>
					<div className='text-gray-500 w-[15%] text-right'>
						Số lượng
					</div>
					<div className='text-gray-500 w-[15%] text-right'>
						Giảm giá
					</div>
					<div className='text-gray-500 w-[15%] text-right'>
						Thành tiền
					</div>
				</div>
				{data?.map((item: any, index) => (
					<div
						className='flex items-center text-gray-800'
						key={index}
					>
						<div className='w-[40%]  flex items-center gap-2'>
							<div className='w-10 h-10'>
								<img
									src={item.product_thumb}
									alt=''
									className='object-cover w-full h-full '
								/>
							</div>
							<div className='flex-1'>
								<p className='text-sm line-clamp-2 '>
									{item.product_name}
								</p>
							</div>
						</div>

						<div className='w-[15%] text-right'>
							{formatCurrency(item.price)}
						</div>
						<div className=' w-[15%] text-right'>
							{item.quantity}
						</div>
						<div className=' w-[15%] text-right'>
							{checkout.checkout_totalPrice /
								checkout.checkout_discount}
							%
						</div>
						<div className=' w-[15%] text-right'>
							{formatCurrency(item.totalPrice)}
						</div>
					</div>
				))}
			</div>
			<div className='flex flex-col bg-white border rounded-md shadow border-neutral-200'>
				<div className='flex items-center justify-between px-10 py-5'>
					<h1 className='text-xl text-gray-900'>
						Phương thức thanh toán
					</h1>
					<div className='flex items-center gap-10'>
						<span className='text-sm'>
							Thanh toán khi nhận hàng
						</span>
						<span className='cursor-pointer text-primary-500'>
							Thay đổi
						</span>
					</div>
				</div>
				<div className='border-b-[2px] border-neutral-300'></div>
				<div className='flex flex-col gap-5 p-10 bg-neutral-100'>
					<div className='flex justify-end'>
						<div className='space-y-3'>
							<div className='flex items-center justify-between gap-10'>
								<span className='text-base text-left text-gray-400'>
									Tổng tiền hàng:
								</span>
								<span className='text-xs text-right'>
									{formatCurrency(
										checkout?.checkout_totalPrice,
									)}
								</span>
							</div>
							<div className='flex items-center justify-between gap-10'>
								<span className='text-base text-left text-gray-400'>
									Phí vận chuyển:
								</span>
								<span className='text-xs text-right'>
									{formatCurrency(0)}
								</span>
							</div>
							<div className='flex items-center justify-between gap-10'>
								<span className='text-base text-left text-gray-400'>
									Đã giảm giá
								</span>
								<span className='text-xs text-right'>
									{formatCurrency(
										checkout?.checkout_totalPrice -
											checkout?.checkout_grandTotal,
									)}
								</span>
							</div>
							<div className='flex items-start justify-between gap-10'>
								<span className='text-base text-left text-gray-400'>
									Tổng thanh toán:
								</span>
								<span className='text-2xl font-bold text-right text-primary-500'>
									{formatCurrency(
										checkout?.checkout_grandTotal,
									)}
								</span>
							</div>
						</div>
					</div>
					<div className='flex justify-end'>
						<button
							className='px-16 py-2 text-white rounded-md bg-primary-500'
							onClick={() => handleCreateOrder()}
						>
							Đặt hàng
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
