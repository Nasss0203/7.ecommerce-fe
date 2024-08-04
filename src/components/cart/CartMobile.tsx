import { formatCurrency } from "@/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { RiSubtractFill } from "react-icons/ri";

interface ICart {
	image: string;
	name: string;
	price: number;
	totalPrice: number;
	quantity: number;
	totalQuantity?: number;
	decreaseButton: () => void;
	increaseButton: () => void;
	deleteItem: () => void;
	checked: boolean;
	onChange: () => void;
}

const CartMobile = ({
	image,
	name,
	price,
	quantity,
	increaseButton,
	decreaseButton,
	deleteItem,
	checked,
	onChange,
}: ICart) => {
	return (
		<div className=' lg:hidden'>
			<div className='space-y-4'>
				<div className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={checked}
						onChange={onChange}
					/>
					<div className='flex flex-1 gap-3'>
						<div className='space-y-2'>
							<div className='w-12 h-14'>
								<img
									src={image}
									alt=''
									className='object-cover w-full h-full rounded-md'
								/>
							</div>
							<div
								className='flex items-center gap-1 text-xs text-red-500 cursor-pointer'
								onClick={deleteItem}
							>
								<FaRegTrashAlt />
								Xóa
							</div>
						</div>
						<div className='flex flex-col flex-1 gap-1'>
							<div className='flex items-start justify-between w-full gap-3 s'>
								<p className='flex-1 text-sm font-medium text-gray-950 line-clamp-2 '>
									{name}
								</p>
								<div className='w-[35%] flex flex-col text-sm text-right'>
									<span className='text-blue-500'>
										{formatCurrency(price)}
									</span>
									<span className='text-gray-500 line-through'>
										{formatCurrency(0)}
									</span>
								</div>
							</div>
							<div className='flex justify-end'>
								<div className='inline-flex items-center border-[2px] rounded border-neutral-300 '>
									<button
										className='px-2.5 py-1'
										onClick={decreaseButton}
									>
										<RiSubtractFill />
									</button>
									<span className='px-2.5 py-1'>
										{quantity}
									</span>
									<button
										className='px-2.5 py-1'
										onClick={increaseButton}
									>
										<LuPlus />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='border-b'></div>
			</div>
		</div>
	);
};

export default CartMobile;
