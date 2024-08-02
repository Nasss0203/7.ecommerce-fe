import { getCategoryDisplay } from "@/utils";
import { FaCartShopping, FaRegHeart, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface ICard {
	_id: string;
	image: string;
	name: string;
	price: number;
	slug: string;
	category: string;
}

interface IMeta<T> {
	message: string;
	metadata: T;
	status: number;
}

const Card = ({
	image = "",
	name = "",
	price = 0,
	_id,
	slug,
	category,
}: ICard) => {
	const displayCategory = getCategoryDisplay(category);

	return (
		<div className='w-full'>
			<div className='flex flex-col gap-4 px-2 py-3 bg-white border rounded shadow-lg border-neutral-300'>
				<Link
					to={`/${displayCategory}/${slug}?id=${_id}`}
					className='flex flex-col gap-5'
				>
					<div className='lg:h-[220px] h-[190px] '>
						<img
							srcSet={image}
							alt={slug}
							className='object-cover w-full h-full '
							loading='lazy'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<div className='space-y-[6px]'>
							<div className='flex items-center gap-2'>
								<div className='flex items-center gap-1 text-xs text-yellow-400'>
									{Array(5)
										.fill(0)
										.map((item, index) => (
											<FaStar key={index} />
										))}
								</div>
								<span className='text-xs font-normal leading-5 text-gray-500'>
									(52,677)
								</span>
							</div>
							<p className='h-10 text-base font-normal leading-5 text-gray-900 line-clamp-2'>
								{name}
							</p>
						</div>
						<div className='flex items-center gap-2'>
							{/* <span className='text-base font-normal leading-5 text-gray-300 line-through'>
						$865.99
					</span> */}
							<span className='text-lg font-semibold leading-5 text-secondary-500'>
								{price.toLocaleString("vi-VN", {
									style: "currency",
									currency: "VND",
								})}
							</span>
						</div>
					</div>
				</Link>
				<div className='flex items-center gap-2'>
					<div className='items-center justify-center hidden w-8 h-8 p-2 text-sm font-medium rounded lg:flex bg-primary-100 text-primary-500 '>
						<FaRegHeart />
					</div>
					<button
						className='flex items-center justify-center flex-1 w-8 h-8 gap-2 p-2 text-white rounded bg-primary-500'
						onClick={() => {
							console.log("Add to cart");
						}}
					>
						<FaCartShopping />
						<span className='text-sm font-bold leading-8'>
							Add to card
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
