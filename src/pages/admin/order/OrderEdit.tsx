import { getOrder } from "@/api/order.api";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { deliveryStatus } from "@/constants/order";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { updateOrder } from "@/redux/slice/order.slice";
import { IBackEnd } from "@/types/data";
import { IOrder } from "@/types/order";
import { UpdateOrderBody, UpdateOrderType } from "@/validator/order.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa6";

const OrderEdit = (props: any) => {
	const { orderId, userId } = props;
	const [date, setDate] = useState<Date>();
	const [data, setData] = useState<IBackEnd<IOrder>>();
	const [orderStatus, setOrderStatus] = useState<any>("pending");

	const dispatch = useAppDispatch();

	useEffect(() => {
		getOrderItem({ orderId, userId });
	}, []);

	const getOrderItem = async ({
		orderId,
		userId,
	}: {
		orderId: string;
		userId: string;
	}) => {
		const response = await getOrder({ orderId, userId });
		setData(response);
		setDate(response.metadata.createdOn);
	};

	const form = useForm<UpdateOrderType>({
		resolver: zodResolver(UpdateOrderBody),
		defaultValues: {
			order_id: orderId,
			// order_products: "",
			order_payment: "pending",
			order_status: "pending",
			order_userId: userId,
			createdOn: new Date(),
		},
	});
	async function onSubmit(values: any) {
		const response = await dispatch(
			updateOrder({
				orderId,
				values,
			}),
		);
		if (response) {
			DialogClose;
		}
	}

	return (
		<Dialog>
			<DialogTrigger onClick={() => getOrderItem({ orderId, userId })}>
				<span className='text-base'>
					<FaPen />
				</span>
			</DialogTrigger>
			<DialogContent className='lg:max-w-[40rem] h-[calc(100%-5%)] 2xl:h-[calc(100%-35%)]'>
				<DialogHeader>
					<DialogTitle>Cập nhật đơn hàng</DialogTitle>
					<DialogDescription className='pt-5'>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-3 2xl:space-y-5'
							>
								<FormField
									control={form.control}
									name='order_id'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Order ID</FormLabel>
											<FormControl>
												<Input
													placeholder='Order ID'
													{...field}
													disabled
													className='disabled:cursor-auto disabled:text-neutral-950 disabled:opacity-100 disabled:border-neutral-300'
													value={data?.metadata?._id}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='order_userId'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Khách hàng</FormLabel>
											<FormControl>
												<Input
													placeholder='shadcn'
													{...field}
													disabled
													className='disabled:cursor-auto disabled:text-neutral-950 disabled:opacity-100 disabled:border-neutral-300'
													value={
														data?.metadata
															?.order_userId
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='createdOn'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Ngày đặt hàng</FormLabel>
											<FormControl>
												<Popover>
													<PopoverTrigger asChild>
														<Button
															disabled
															variant={"outline"}
															className={cn(
																"w-full justify-start text-left font-normal disabled:cursor-auto disabled:text-neutral-950 disabled:opacity-100 disabled:border-neutral-300",
																!date &&
																	"text-muted-foreground",
															)}
														>
															<CalendarIcon className='w-4 h-4 mr-2' />
															{date ? (
																format(
																	date,
																	"PPP",
																)
															) : (
																<span>
																	Pick a date
																</span>
															)}
														</Button>
													</PopoverTrigger>
													{/* <PopoverContent className='w-auto p-0'>
														<Calendar
															mode='single'
															selected={date}
															onSelect={setDate}
															initialFocus
														/>
													</PopoverContent> */}
												</Popover>
											</FormControl>
										</FormItem>
									)}
								/>

								{/* <FormGrid>
									<FormField
										control={form.control}
										name='username'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Giá tiền</FormLabel>
												<FormControl>
													<Input
														placeholder='shadcn'
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='username'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Phương thức thanh toán
												</FormLabel>
												<FormControl>
													<Input
														placeholder='shadcn'
														{...field}
														className='disabled:border-neutral-500 disabled:cursor-auto disabled:placeholder:text-neutral-700 disabled:text-neutral-800'
														disabled
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</FormGrid> */}
								<FormField
									control={form.control}
									name='order_status'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Tình trạng giao hàng
											</FormLabel>
											<FormControl>
												<Select
													onValueChange={(value) => {
														field.onChange(value);
														setOrderStatus(value);
													}}
													value={orderStatus}
												>
													<SelectTrigger className='w-full uppercase text-neutral-950 border-neutral-300'>
														<SelectValue
															placeholder='Theme'
															className='uppercase text-neutral-950 border-neutral-300'
														/>
													</SelectTrigger>
													<SelectContent>
														{deliveryStatus.map(
															(item, index) => (
																<SelectItem
																	value={
																		item.name
																	}
																	key={index}
																	className='uppercase text-neutral-950 border-neutral-300'
																>
																	{item.name}
																</SelectItem>
															),
														)}
													</SelectContent>
												</Select>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button type='submit' className='w-[200px]'>
									Cập nhật
								</Button>
							</form>
						</Form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default OrderEdit;
