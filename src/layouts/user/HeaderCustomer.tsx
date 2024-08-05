import { searchProduct } from "@/api/product.api";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut } from "@/redux/slice/auth.slice";
import { fetchListCart } from "@/redux/slice/cart.slice";
import { IBackEnd, IProduct } from "@/types/data";
import { isAuthenticated } from "@/utils";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { FaUserLock } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const HeaderCustomer = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<IBackEnd<IProduct[]>>();
	const location = useLocation();

	const dispatch = useAppDispatch();
	const isAuthentication = useAppSelector(
		(state) => state.auth.isAuthenticated,
	);

	const listCart = useAppSelector((state) => state.cart.listCart);
	const dataCart = listCart?.cart_products;
	console.log("dataCart~", dataCart);

	const auth = isAuthenticated();
	const dataAuth = auth?.data;

	useEffect(() => {
		dispatch(fetchListCart({ userId: 1001 }));
	}, []);

	const handleInputChange = (e: any) => {
		setSearchTerm(e.target.value);
	};

	useEffect(() => {
		const fetchData = async () => {
			if (searchTerm) {
				try {
					const results = await searchProduct(searchTerm);
					console.log("results ~", results);
					setSearchResults(results);
				} catch (error) {
					console.error("Search failed", error);
				}
			} else {
				setSearchResults(undefined);
			}
		};

		fetchData();
	}, [searchTerm, location]);

	const dataProduct = searchResults?.metadata;

	return (
		<div className='fixed z-50 flex flex-col w-full'>
			<header className='py-3 bg-secondary-700 lg:py-0 '>
				<div className='container px-3 space-y-3 lg:px-0 lg:space-y-0'>
					<div className='flex items-center justify-between lg:py-5'>
						<Link to={"/"} className='flex items-center gap-2'>
							<img
								srcSet='Icon.png 2x'
								alt=''
								className='object-cover lg:w-auto lg:h-auto h-7 w-7'
							/>
							<h1 className='leading-10 font-bold text-[32px] text-white hidden lg:block'>
								CLICON
							</h1>
						</Link>
						<div className='py-[14px] px-5 bg-white rounded lg:w-[606px] md:w-[450px] w-[130px] md:flex items-center gap-2 relative hidden'>
							<input
								type='text'
								name='search'
								id='search'
								className='w-full text-sm leading-5 bg-transparent placeholder:text-gray-500'
								placeholder='Search for anything...'
								value={searchTerm}
								onChange={handleInputChange}
								autoComplete='off'
							/>
							{dataProduct ? (
								<X
									className='w-5 h-5 cursor-pointer'
									onClick={() => setSearchTerm("")}
								></X>
							) : (
								<span className='text-lg cursor-pointer'>
									<IoSearchOutline />
								</span>
							)}
							<div
								className={`absolute flex-col w-full gap-2 transform -translate-x-1/2  rounded bg-neutral-50 top-14 left-1/2  ${
									dataProduct
										? "flex h-auto"
										: "hidden h-[250px]"
								}`}
							>
								<div className='shadow-xl'>
									{dataProduct
										?.slice(0, 5)
										.map((item, index) => (
											<Link
												to={`${item.product_slug}?id=${item._id}`}
												className='flex items-center gap-2 p-2'
												key={index}
												onClick={() =>
													setSearchTerm("")
												}
											>
												<div className='w-10 h-10 border rounded border-neutral-200'>
													<img
														src={item.product_thumb}
														alt=''
														className='object-cover w-full h-full'
													/>
												</div>
												<div className='flex flex-col gap-1'>
													<p className='text-sm font-medium line-clamp-1'>
														{item.product_name}
													</p>
													<span className='text-xs text-red-400'>
														{item.product_price.toLocaleString(
															"vi-VN",
															{
																style: "currency",
																currency: "VND",
															},
														)}
													</span>
												</div>
											</Link>
										))}
								</div>
							</div>
						</div>
						<div className='flex items-center gap-6 text-2xl font-medium text-white'>
							<HoverCard>
								<HoverCardTrigger>
									<div className='relative'>
										<Link to={"/cart"}>
											<BsCart />
										</Link>
										<div className='absolute left-0 flex items-center justify-center w-4 h-4 text-[9px] font-medium text-blue-500 translate-x-3 -translate-y-4 bg-white rounded-full top-1/2'>
											{listCart?.cart_products.length}
										</div>
									</div>
								</HoverCardTrigger>
								<HoverCardContent className='hidden p-3 mt-5 mr-16 space-y-4 lg:block'>
									<div className='space-y-4'>
										<div className='space-y-2'>
											{dataCart?.map(
												(item: any, index: any) => (
													<div
														className='flex items-center gap-2'
														key={index}
													>
														<div className='w-10 h-10 '>
															<img
																src={item.image}
																alt=''
																className='object-cover w-full h-full'
															/>
														</div>
														<div className='flex flex-col gap-2'>
															<p className='text-xs'>
																{item.name}
															</p>
															<span className='text-xs text-gray-600'>
																SL:{" "}
																{item.quantity}
															</span>
														</div>
													</div>
												),
											)}
										</div>
										<div className='flex justify-end'>
											<Link
												className='px-5 py-2 text-sm text-white bg-blue-500 rounded-md'
												to={"/cart"}
											>
												Cart
											</Link>
										</div>
									</div>
								</HoverCardContent>
							</HoverCard>
							{isAuthentication === true && dataAuth ? (
								<DropdownMenu>
									<DropdownMenuTrigger>
										<div className='text-white outline-none bg-secondary-700 '>
											<GoPerson />
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent className='w-[200px] mr-9 mt-2.5'>
										<DropdownMenuLabel>
											My Account
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={() => dispatch(logOut())}
										>
											Logout
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<DropdownMenu>
									<DropdownMenuTrigger>
										<div className='text-white outline-none bg-secondary-700 '>
											<FaUserLock />
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent className='w-[200px] mr-9 mt-2.5'>
										<DropdownMenuLabel>
											My Account
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<Link to={"/sign-in"}>
											<DropdownMenuItem>
												Login
											</DropdownMenuItem>
										</Link>
									</DropdownMenuContent>
								</DropdownMenu>
							)}
						</div>
					</div>
					<div className='py-[14px] px-5 bg-white rounded  w-full flex items-center gap-2 relative md:hidden'>
						<input
							type='text'
							name='search'
							id='search'
							className='w-full text-sm leading-5 bg-transparent placeholder:text-gray-500'
							placeholder='Search for anything...'
							value={searchTerm}
							onChange={handleInputChange}
							autoComplete='off'
						/>
						{dataProduct ? (
							<X
								className='w-5 h-5 cursor-pointer'
								onClick={() => setSearchTerm("")}
							></X>
						) : (
							<span className='text-lg cursor-pointer'>
								<IoSearchOutline />
							</span>
						)}
						<div
							className={`absolute flex-col w-full gap-2 transform -translate-x-1/2  rounded bg-neutral-50 top-14 left-1/2  ${
								dataProduct ? "flex h-auto" : "hidden h-[250px]"
							}`}
						>
							<div className='shadow-xl'>
								{dataProduct?.slice(0, 5).map((item, index) => (
									<Link
										to={`${item.product_slug}?id=${item._id}`}
										className='flex items-center gap-2 p-2'
										key={index}
										onClick={() => setSearchTerm("")}
									>
										<div className='w-10 h-10 border rounded border-neutral-200'>
											<img
												src={item.product_thumb}
												alt=''
												className='object-cover w-full h-full'
											/>
										</div>
										<div className='flex flex-col gap-1'>
											<p className='text-sm font-medium line-clamp-1'>
												{item.product_name}
											</p>
											<span className='text-xs text-red-400'>
												{item.product_price.toLocaleString(
													"vi-VN",
													{
														style: "currency",
														currency: "VND",
													},
												)}
											</span>
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
};

export default HeaderCustomer;
