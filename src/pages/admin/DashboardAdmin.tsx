import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { FaBox, FaBoxOpen, FaMoneyBill } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { Bar, BarChart } from "recharts";

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#2563eb",
	},
	mobile: {
		label: "Mobile",
		color: "#60a5fa",
	},
} satisfies ChartConfig;
const DashboardAdmin = () => {
	return (
		<div className='flex flex-col w-full gap-5 lg:flex-row'>
			<div className='flex flex-col lg:w-[80%] gap-5 '>
				<div className='bg-white rounded-md dark:bg-[#313d4a]'>
					<h1 className='px-5 py-3 text-lg font-semibold uppercase dark:text-white'>
						Kết quả kinh doanh trong ngày
					</h1>
					<div className='border-b border-neutral-400'></div>
					<div className='grid grid-cols-2 px-5 lg:grid-cols-4 dark:text-white'>
						<div className='flex items-center gap-2 py-4 lg:p-5'>
							<div className='flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full'>
								<FaMoneyBill />
							</div>
							<div className='flex flex-col'>
								<span className='text-sm font-medium'>
									Doanh thu
								</span>
								<span className='font-semibold text-blue-500'>
									150.000
								</span>
							</div>
						</div>
						<div className='flex items-center gap-2 py-4 lg:p-5'>
							<div className='flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded-full'>
								<FaBoxOpen />
							</div>
							<div className='flex flex-col'>
								<span className='text-sm font-medium'>
									Đơn hàng mới
								</span>
								<span className='font-semibold text-green-500'>
									150.000
								</span>
							</div>
						</div>
						<div className='flex items-center gap-2 py-4 lg:p-5'>
							<div className='flex items-center justify-center w-10 h-10 text-white bg-yellow-500 rounded-full'>
								<FaBox />
							</div>
							<div className='flex flex-col'>
								<span className='text-sm font-medium'></span>
								<span className='font-semibold text-yellow-500'>
									150.000
								</span>
							</div>
						</div>
						<div className='flex items-center gap-2 py-4 lg:p-5'>
							<div className='flex items-center justify-center w-10 h-10 text-white bg-red-500 rounded-full'>
								<MdCancel />
							</div>
							<div className='flex flex-col'>
								<span className='text-sm font-medium'>
									Đơn hàng hủy
								</span>
								<span className='font-semibold text-red-500'>
									150.000
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className='p-5 bg-white rounded-md overflow-y-auto dark:bg-[#313d4a]'>
					<ChartContainer
						config={chartConfig}
						className='lg:w-full h-[400px] w-[750px]'
					>
						<BarChart accessibilityLayer data={chartData}>
							<Bar
								dataKey='desktop'
								fill='var(--color-desktop)'
								radius={4}
								barSize={40}
							/>
							<Bar
								dataKey='mobile'
								fill='var(--color-mobile)'
								radius={4}
								barSize={40}
							/>
						</BarChart>
					</ChartContainer>
				</div>
				<div className='h-[250px] bg-white w-full rounded-md dark:bg-[#313d4a]'></div>
			</div>
			<div className='flex flex-col lg:w-[20%] gap-5'>
				<div className='p-5 bg-white rounded-md dark:bg-[#313d4a]'></div>
				<div className='p-5 bg-white rounded-md dark:bg-[#313d4a]'></div>
			</div>
		</div>
	);
};

export default DashboardAdmin;
