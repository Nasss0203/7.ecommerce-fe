import { IoMdArrowDropdown } from "react-icons/io";
import { VscFilter } from "react-icons/vsc";

const filter = [
	{
		name: "Hãng",
	},
	{
		name: "Giá",
	},
];
const Filter = () => {
	return (
		<div
			className={`bg-white py-1 sticky top-0 transition-all ease-linear duration-300 shadow-lg`}
		>
			<div className='container flex items-center gap-2 y-1'>
				<span className='flex items-center gap-2 px-3 py-1.5 border rounded border-neutral-300 bg-white'>
					<VscFilter />
					Bộ lọc
				</span>
				{filter.map((item, index) => (
					<span
						className='flex items-center justify-between gap-0.5 px-2 py-1.5 border rounded border-neutral-300 bg-white'
						key={index}
					>
						{item.name}
						<IoMdArrowDropdown />
					</span>
				))}
			</div>
		</div>
	);
};

export default Filter;
