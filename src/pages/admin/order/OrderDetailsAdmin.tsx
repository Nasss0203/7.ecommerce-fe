import { getOrder } from "@/api/order.api";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { findAllPublishProduct } from "@/redux/slice/product.slice";
import { IBackEnd } from "@/types/data";
import { IOrder } from "@/types/order";
import { formatCurrency } from "@/utils";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const OrderDetailsAdmin = () => {
	const [data, setData] = useState<IBackEnd<IOrder>>();
	console.log("data~", data);

	const dispatch = useAppDispatch();
	const listProduct = useAppSelector((state) => state.product.listProduct);
	console.log("listProduct~", listProduct);

	const { orderId } = useParams();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userId = searchParams.get("userId");
	const order_id = orderId as string;
	const user_id = userId as string;

	useEffect(() => {
		getOrderItem();
	}, []);

	useEffect(() => {
		dispatch(findAllPublishProduct());
	}, []);

	const getOrderItem = async () => {
		const response = await getOrder({ orderId: order_id, userId: user_id });
		setData(response);
	};

	const dataItem = data?.metadata?.order_products?.map((item) => {
		const product = listProduct.find((p) => p._id === item.productId);
		return { ...item, ...product }; // Kết hợp thông tin từ item và product
	});
	console.log("dataItem~", dataItem);

	return (
		<div className='grid grid-cols-8 gap-5'>
			<div className='flex flex-col col-span-6 gap-5 '>
				<div className='p-3 bg-white rounded-md'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='text-sm max-w-[700px]'>
									Sản phẩm
								</TableHead>
								<TableHead className='text-sm w-[250px] text-right'>
									Giá
								</TableHead>
								<TableHead className='text-sm w-[250px] text-right'>
									Số lượng
								</TableHead>
								<TableHead className='text-sm text-right w-[250px]'>
									Tổng tiền
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{dataItem?.map((item, index) => (
								<TableRow key={index}>
									<TableCell className='font-medium'>
										<div className='flex gap-3'>
											<div className='w-12 h-12'>
												<img
													src={item.product_thumb}
													alt=''
													className='flex-shrink-0 object-cover w-full h-full rounded-md'
												/>
											</div>
											<div className=''>
												<p className='font-medium line-clamp-1'>
													{item.product_name}
												</p>
											</div>
										</div>
									</TableCell>
									<TableCell className='text-right'>
										{formatCurrency(item.price)}
									</TableCell>
									<TableCell className='text-right'>
										{item.quantity}
									</TableCell>
									<TableCell className='text-right'>
										{formatCurrency(item.totalPrice)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className='flex justify-end pt-4 border-t border-neutral-300'>
						<div className='space-y-3'>
							<div className='flex items-center justify-between'>
								<div className='text-right'>Giá:</div>
								<div className='w-[200px] text-right'>
									{formatCurrency(
										data?.metadata.order_checkout
											.totalPrice,
									)}
								</div>
							</div>
							<div className='flex items-center justify-between'>
								<div className='text-right'>Giảm giá:</div>
								<div className='w-[200px] text-right'>
									{formatCurrency(
										data?.metadata.order_checkout
											.totalApplyDiscount,
									)}
								</div>
							</div>
							<div className='flex items-center justify-between'>
								<div className='text-left'>Phí vận chuyển:</div>
								<div className='w-[200px] text-right'>0</div>
							</div>
							<div className='flex items-center justify-between'>
								<div className='text-lg font-bold text-left'>
									Tổng tiền:
								</div>
								<div className='w-[200px] text-right'>
									{formatCurrency(
										data?.metadata.order_checkout
											.grandTotal,
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='col-span-2'>
				<div className='p-3 bg-white rounded-md'></div>
			</div>
		</div>
	);
};

export default OrderDetailsAdmin;
