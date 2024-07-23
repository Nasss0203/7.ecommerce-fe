import { Card } from "@/components/card";
import { Filter } from "@/components/filter";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { categoryForm } from "@/constants/category";
import { getCategoryProduct } from "@/utils";
import { useEffect, useState } from "react";
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

const CategoryPage = () => {
	const [scrolled, setScrolled] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 220) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const productPhone = getCategoryProduct(categoryForm.LAPTOP);

	return (
		<>
			{scrolled ? <Filter></Filter> : <></>}
			<div className='container space-y-5'>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href='/'>Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href='/category'>
								Category
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className='space-y-5'>
					<div className='space-y-3'>
						<span className='text-lg font-semibold'>
							Chọn theo tiêu chí
						</span>
						<div className={`flex items-center gap-2 y-1 `}>
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
					<div className='grid grid-cols-2 gap-1.5 lg:grid-cols-5'>
						{productPhone?.map((item: any, index: any) => (
							<Card
								category={item.product_category}
								slug={item.product_slug}
								_id={item._id}
								key={index}
								image={item.product_thumb}
								name={item.product_name}
								price={item.product_price}
							></Card>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default CategoryPage;
