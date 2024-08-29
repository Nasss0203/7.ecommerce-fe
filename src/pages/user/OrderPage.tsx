import { useEffect } from "react";

const OrderPage = () => {
	useEffect(() => {
		document.title = "Đơn hàng";
	}, []);
	return (
		<div className='container p-5 bg-white border rounded-md shadow border-neutral-200'>
			<div className='p-5 rounded-md opacity-50 bg-warning-100'></div>
			<div className='flex items-center gap-2 mt-2 text-sm'>
				<span>Ngày đặt hàng:</span>
				<span className='text-base font-semibold'>02/03/2003</span>
			</div>
		</div>
	);
};

export default OrderPage;
