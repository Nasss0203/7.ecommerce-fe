import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
	return (
		<div className='container flex justify-center py-20 mt-20 bg-white border rounded-md shadow border-neutral-200 w-[70%]'>
			<div className='space-y-5'>
				<div className='flex items-center justify-center '>
					<div className='flex items-center justify-center w-[70px] h-[70px] text-secondary-500 bg-secondary-200 rounded-full text-7xl'>
						<FaRegCheckCircle />
					</div>
				</div>
				<h1 className='text-xl text-center'>
					Đơn hàng của bạn đã đặt thành công
				</h1>
				<div className='flex items-center justify-center gap-5'>
					<Link
						to={"/"}
						className='flex items-center justify-center px-5 py-3 font-semibold border rounded-md text-secondary-500 border-secondary-500 '
					>
						Tiếp tục mua hàng
					</Link>
					<Link
						to={"/order"}
						className='flex items-center justify-center px-5 py-3 font-semibold text-white rounded-md bg-secondary-500'
					>
						Xem đơn hàng
					</Link>
				</div>
			</div>
		</div>
	);
};

export default OrderSuccess;
