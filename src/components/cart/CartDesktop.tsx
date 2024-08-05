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

const CartDesktop = ({
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
		<div className='flex items-center text-xs border-b'>
			<div className='w-[5%] py-2 justify-center flex'>
				<input type='checkbox' checked={checked} onChange={onChange} />
			</div>
			<div className='w-[35%] py-2 '>
				<div className='flex items-center gap-2 w-[400px]'>
					<div className='w-12 h-12'>
						<img
							src={image}
							alt=''
							className='object-cover w-full h-full'
						/>
					</div>
					<p className='flex-1 text-sm line-clamp-2'>{name}</p>
				</div>
			</div>
			<div className='flex items-center gap-1 w-[15%] justify-center py-2'>
				<span className='text-sm text-gray-400 line-through'></span>
				<span className='text-sm '>{formatCurrency(price)}</span>
			</div>
			<div className='w-[15%] justify-center flex py-2'>
				<div className='inline-flex items-center border-[2px] rounded border-neutral-300 '>
					<button className='px-3 py-1.5' onClick={decreaseButton}>
						<RiSubtractFill />
					</button>
					<span className='px-3 py-1.5'>{quantity}</span>
					<button className='px-3 py-1.5' onClick={increaseButton}>
						<LuPlus />
					</button>
				</div>
			</div>

			<div className='w-[15%] justify-center flex py-2'>
				{formatCurrency(quantity * price)}
			</div>
			<div
				className='text-red-500 cursor-pointer w-[15%] justify-center flex py-2'
				onClick={deleteItem}
			>
				<FaRegTrashAlt />
			</div>
		</div>
	);
};

export default CartDesktop;
