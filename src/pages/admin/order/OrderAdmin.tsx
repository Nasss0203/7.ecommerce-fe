import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { listOrder } from "@/redux/slice/order.slice";
import { formatCurrency } from "@/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaBoxes, FaTrashAlt } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { IoEyeSharp, IoSearchOutline } from "react-icons/io5";
import { MdOutlineCancel, MdOutlineLocalShipping } from "react-icons/md";
import { Link } from "react-router-dom";
import OrderEdit from "./OrderEdit";

const order = [
	{
		name: "Tất cả đơn hàng",
		icon: <FaBoxes />,
	},
	{
		name: "Đã giao hàng",
		icon: <CiCircleCheck />,
	},
	{
		name: "Đang giao hàng",
		icon: <MdOutlineLocalShipping />,
	},
	{
		name: "Hàng trả về",
		icon: <GiReturnArrow />,
	},
	{
		name: "Đơn bị hủy",
		icon: <MdOutlineCancel />,
	},
];

const OrderAdmin = () => {
	const [date, setDate] = useState<Date>();
	const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

	const dispatch = useAppDispatch();
	const orderData = useAppSelector((state) => state.order.listOrder);

	useEffect(() => {
		dispatch(listOrder());
	}, []);

	const data = orderData.data;

	return (
		<div className='flex flex-col gap-5'>
			<div className='py-5 space-y-4 bg-white rounded-md'>
				<div className='flex items-center justify-between px-5'>
					<h2 className='text-2xl font-bold'>Đơn hàng</h2>
					<div className=''>
						<div className='px-3 py-2 text-xs text-white rounded bg-cyan-600'>
							Import
						</div>
					</div>
				</div>
				<div className='border-b border-neutral-200'></div>
				<div className='flex items-center gap-3 px-5'>
					<div className='flex items-center flex-1 gap-3 px-3 py-[7px] border rounded-md border-neutral-200'>
						<IoSearchOutline />
						<input
							type='text'
							placeholder='Search for order ID, customer, order status or something...'
							className='w-full bg-transparent placeholder:text-xs'
						/>
					</div>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"lg:w-[130px] xl:w-[230px] justify-start text-left font-normal",
									!date && "text-muted-foreground",
								)}
							>
								<CalendarIcon className='w-4 h-4 mr-2' />
								{date ? (
									format(date, "PPP")
								) : (
									<span>Select date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0'>
							<Calendar
								mode='single'
								selected={date}
								onSelect={setDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					<Select>
						<SelectTrigger className='lg:w-[130px] xl:w-[230px]'>
							<SelectValue placeholder='Theme' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='light'>Light</SelectItem>
							<SelectItem value='dark'>Dark</SelectItem>
							<SelectItem value='system'>System</SelectItem>
						</SelectContent>
					</Select>
					<Select>
						<SelectTrigger className='lg:w-[130px] xl:w-[230px]'>
							<SelectValue placeholder='Theme' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='light'>Light</SelectItem>
							<SelectItem value='dark'>Dark</SelectItem>
							<SelectItem value='system'>System</SelectItem>
						</SelectContent>
					</Select>
					<div className='px-5 py-[11px] text-xs text-white bg-blue-600 rounded-md'>
						Filter
					</div>
				</div>
				<div className='border-b border-neutral-200'></div>
				<div className=''>
					<div className='flex items-center px-5 text-sm border-b border-neutral-200'>
						{order.map((item, index) => (
							<div
								className={`justify-center w-[150px] pb-2 cursor-pointer flex items-center gap-1 ${
									index === selectedIndex
										? "border-b border-green-500 "
										: ""
								}`}
								key={index}
								onClick={() => setSelectedIndex(index)}
							>
								<span
									className={` ${
										index === selectedIndex
											? "text-green-500 font-semibold"
											: "font-medium"
									}`}
								>
									{item.icon}
								</span>
								<span
									className={` ${
										index === selectedIndex
											? "text-green-500 font-semibold"
											: "font-medium"
									}`}
								>
									{item.name}
								</span>
							</div>
						))}
					</div>
					<Table className='w-full '>
						<TableHeader>
							<TableRow>
								<TableHead className='w-10'>
									<Checkbox />
								</TableHead>
								<TableHead className='text-sm font-semibold '>
									Mã đơn
								</TableHead>
								<TableHead className='text-sm font-semibold '>
									Khách hàng
								</TableHead>
								<TableHead className='text-sm font-semibold '>
									Ngày đặt
								</TableHead>
								<TableHead className='text-sm font-semibold '>
									Số lượng sản phẩm
								</TableHead>
								<TableHead className='text-sm font-semibold '>
									Giá tiền
								</TableHead>
								<TableHead className='text-sm font-semibold '>
									Thanh toán
								</TableHead>
								<TableHead className='text-sm font-semibold '>
									Trạng thái
								</TableHead>
								<TableHead className='text-sm font-semibold '>
									Hành động
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((item, index) => (
								<TableRow key={index}>
									<TableCell className='w-10 '>
										<Checkbox />
									</TableCell>
									<TableCell className=''>
										{item._id}
									</TableCell>
									<TableCell className='line-clamp-1'>
										{item.order_userId}
									</TableCell>
									<TableCell className='w-[210px]'>
										{new Date(
											item.createdOn,
										).toLocaleDateString("vi-VN", {
											year: "numeric", // Năm
											month: "long", // Tháng
											day: "numeric", // Ngày
										})}
									</TableCell>
									<TableCell className='text-center'>
										{item.order_products.length}
									</TableCell>
									<TableCell className=''>
										{formatCurrency(
											item.order_checkout.grandTotal,
										)}
									</TableCell>
									<TableCell className=''>COD</TableCell>
									<TableCell className='uppercase'>
										<DeliveryColor>
											{item.order_status}
										</DeliveryColor>
									</TableCell>
									<TableCell className='flex items-center gap-2 '>
										<Link
											to={`/admin/order/order-details/${item._id}?userId=${item.order_userId}`}
											className='block text-base'
										>
											<IoEyeSharp />
										</Link>
										<OrderEdit
											orderId={item._id}
											userId={item.order_userId}
										></OrderEdit>
										<span className='text-red-500'>
											<FaTrashAlt />
										</span>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

function DeliveryColor({ children }: { children: React.ReactNode }) {
	const colorMap: Record<string, string> = {
		pending: "text-[#f0ad4e] bg-[#f0ad4e]",
		cancelled: "text-red-500 bg-red-500",
		confirmed: "text-green-500 bg-green-500",
		shipped: "text-blue-500 bg-blue-500",
		delivered: "text-teal-500 bg-teal-500",
	};

	const colorClass = colorMap[children as string] || ""; // Xử lý trường hợp không tìm thấy

	return (
		<span
			className={`px-3 py-2 font-semibold rounded-md bg-opacity-20 ${colorClass}`}
		>
			{children}
		</span>
	);
}

// "pending",
// "confirmed",
// "shipped",
// "cancelled",
// "delivered",
export default OrderAdmin;
