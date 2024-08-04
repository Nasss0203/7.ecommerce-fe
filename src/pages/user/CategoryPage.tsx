import { Card } from "@/components/card";
import { Filter } from "@/components/filter";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCategoryProduct } from "@/utils";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscFilter } from "react-icons/vsc";
import { useParams } from "react-router-dom";

const filter = [
	{
		name: "Hãng",
	},
	{
		name: "Giá",
	},
	{
		name: "RAM",
	},
	{
		name: "Màn hình",
	},
	{
		name: "Dung lượng lưu trữ",
	},
];

const CategoryPage = () => {
	const { category } = useParams();
	const categoryName = category || "";
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

	const productPhone = getCategoryProduct(categoryName);

	return (
		<>
			{scrolled ? <Filter></Filter> : <></>}
			<div className='container px-3 space-y-5 lg:px-0'>
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
						<div className='overflow-x-auto'>
							<div className={`flex items-center gap-2 py-1`}>
								<div className='inline-flex items-center gap-2 px-3 py-1.5 border rounded border-neutral-300 bg-white min-w-fit'>
									<VscFilter />
									Bộ lọc
								</div>
								{filter.map((item, index) => (
									<div
										className='inline-flex items-center justify-between gap-0.5 px-2 py-1.5 border rounded border-neutral-300 bg-white  min-w-fit'
										key={index}
									>
										{item.name}
										<IoMdArrowDropdown />
									</div>
								))}
							</div>
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
