import { Card } from "@/components/card";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategoryProduct } from "@/utils";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const validCategories = ["phone", "laptop", "tablet", "accessory"];

const CategoryPage = () => {
	const { category } = useParams();
	const categoryName = category || "";
	const location = useLocation();

	const [selectedCategory, setSelectedCategory] = useState("phone" || null);
	const product = getCategoryProduct(categoryName);
	const [items, setItems] = useState(product);

	useEffect(() => {
		const pathname = location.pathname;
		const category = pathname.substring(1).toLowerCase();
		if (validCategories.includes(category)) {
			setSelectedCategory(category);
		} else {
			setSelectedCategory("phone");
		}
	}, [category]);

	const filterItems = (item: any) => {
		const updateItems = product.filter((curItem: any) => {
			return curItem.product_attributes.brand === item;
		});
		setItems(updateItems);
	};

	if (!product)
		return (
			<div className='container px-3 space-y-5 lg:px-0'>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink>
								<Skeleton className='w-24 h-3'></Skeleton>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink>
								<Skeleton className='w-24 h-3'></Skeleton>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className='space-y-5'>
					<div className='space-y-3'>
						<Skeleton className='h-5 w-52'></Skeleton>
						<div className='overflow-x-auto'>
							<div
								className={`flex items-center gap-2 py-1`}
							></div>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-1.5 lg:grid-cols-6 md:grid-cols-4'>
						{Array(12)
							.fill(0)
							.map((item, index) => (
								<CardSkeleton key={index}></CardSkeleton>
							))}
					</div>
				</div>
			</div>
		);

	return (
		<>
			<div className='container px-3 space-y-5 lg:px-0'>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href='/'>Trang chủ</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href={`/${category}`}>
								{category}
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
								{/* <div className='inline-flex items-center gap-2 px-3 py-1.5 border rounded border-neutral-300 bg-white min-w-fit'>
									<VscFilter />
									Bộ lọc
								</div> */}
								{/* {filter1[
									selectedCategory as keyof typeof filter1
								].map((item, index) => (
									<Popover key={index}>
										<PopoverTrigger
											className='inline-flex items-center justify-between gap-0.5 px-2 py-1.5 border rounded border-neutral-300 bg-white  min-w-fit'
											key={index}
										>
											{item.name}
											<IoMdArrowDropdown />
										</PopoverTrigger>
										<PopoverContent className='space-x-2'>
											{item.data?.map((item, index) => (
												<span
													className={`inline-flex items-center justify-between px-2 py-1.5 border rounded border-neutral-300 bg-white min-w-fit cursor-pointer`}
													key={index}
													onClick={() =>
														filterItems(item.key)
													}
												>
													{item.name}
												</span>
											))}
										</PopoverContent>
									</Popover>
								))} */}
							</div>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-1.5 lg:grid-cols-6 md:grid-cols-4'>
						{product?.map((item: any, index: any) => (
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
