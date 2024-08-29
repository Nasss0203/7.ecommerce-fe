import { getAllOrderAdmin, getOrder } from "@/api/order.api";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
import { IBackEnd, IResponse } from "@/types/data";
import { IOrder } from "@/types/order";
import { formatCurrency } from "@/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaBoxes, FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { GiReturnArrow } from "react-icons/gi";
import { IoEyeSharp, IoSearchOutline } from "react-icons/io5";
import { MdOutlineCancel, MdOutlineLocalShipping } from "react-icons/md";
import { Link } from "react-router-dom";

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

	const [data, setData] = useState<IBackEnd<IResponse<IOrder[]>>>();

	useEffect(() => {
		getAllOrder();
	}, []);

	const getAllOrder = async () => {
		const response = await getAllOrderAdmin();
		setData(response);
	};

	return (
		<div className='flex flex-col gap-5'>
			<Header>Đơn hàng</Header>
			<div className='py-5 space-y-4 bg-white rounded-md'>
				<div className='flex items-center justify-between px-5'>
					<h2 className='text-lg'>Order</h2>
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
							{data?.metadata.data.map((item, index) => (
								<TableRow key={index}>
									<TableCell className='w-10 '>
										<Checkbox />
									</TableCell>
									<TableCell className=''>
										{item._id}
									</TableCell>
									<TableCell className='line-clamp-1 '>
										{item.order_userId}
									</TableCell>
									<TableCell className='w-[210px]'>
										{item.createdOn}
									</TableCell>
									<TableCell className='text-center'>
										{item.order_products.length}
									</TableCell>
									<TableCell className=''>
										{formatCurrency(200000)}
									</TableCell>
									<TableCell className=''>tiền mặt</TableCell>
									<TableCell className='uppercase '>
										pending
									</TableCell>
									<TableCell className='flex items-center gap-2 '>
										<Link
											to={`/admin/order-details/${item._id}?userId=${item.order_userId}`}
											className='block text-base'
										>
											<IoEyeSharp />
										</Link>
										<span className='text-base'>
											<FaPen />
										</span>
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

function ModalOrderDetails({
	orderId,
	userId,
}: {
	orderId: string;
	userId: string;
}) {
	const [data, setData] = useState<IBackEnd<IResponse<IOrder>>>();
	console.log("data~", data);

	const getOrderItem = async () => {
		const response = await getOrder({ orderId, userId });
		setData(response);
	};

	return (
		<>
			<Dialog>
				<DialogTrigger onClick={() => getOrderItem()}>
					<span className='text-base'>
						<IoEyeSharp />
					</span>
				</DialogTrigger>
				<DialogContent className='lg:max-w-[40rem] h-[calc(100%-50%)]'>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently
							delete your account and remove your data from our
							servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default OrderAdmin;
