import { getCategoryDisplay } from "@/utils";
import { memo } from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
interface ICard {
	_id: string;
	image: string;
	name: string;
	price: number;
	slug: string;
	category: string;
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
		<Link
			className='flex flex-col gap-2 px-2 py-3 bg-white border rounded shadow-lg lg:gap-4 border-neutral-300'
			to={`/${displayCategory}/${slug}?id=${_id}`}
		>
			<div className='lg:h-[170px] h-[160px]'>
				<img
					srcSet={image}
					alt={slug}
					className='flex-shrink-0 object-cover w-full h-full'
					loading='lazy'
				/>
			</div>
			<div className='flex flex-col flex-1 gap-2'>
				<div className='flex flex-col flex-1 '>
					<div className='flex items-center gap-2'>
						<div className='flex items-center gap-1 lg:text-xs text-[10px] text-yellow-400'>
							{Array(5)
								.fill(0)
								.map((item, index) => (
									<FaStar key={index} />
								))}
						</div>
						<span className='text-xs text-[10px] font-normal leading-5 text-gray-500'>
							(52,677)
						</span>
					</div>
					<p className='text-sm font-normal leading-5 text-gray-900 lg:text-base line-clamp-2'>
						{name}
					</p>
				</div>
				<div className='flex items-center gap-2'>
					{/* <span className='text-base font-normal leading-5 text-gray-300 line-through'>
						$865.99
					</span> */}
					<span className='text-base font-semibold leading-5 lg:text-lg text-secondary-500'>
						{price.toLocaleString("vi-VN", {
							style: "currency",
							currency: "VND",
						})}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default memo(Card);
