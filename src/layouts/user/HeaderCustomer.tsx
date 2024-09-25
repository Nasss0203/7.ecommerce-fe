import { searchProduct } from "@/api/product.api";
import { Category } from "@/components/category";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut } from "@/redux/slice/auth.slice";
import { fetchListCart } from "@/redux/slice/cart.slice";
import { IBackEnd, IProduct } from "@/types/data";
import { getUserIdAndToken } from "@/utils";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { FaBars, FaUserLock } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const HeaderCustomer = () => {
	const { userId } = getUserIdAndToken();
	console.log("userId~", userId);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<IBackEnd<IProduct[]>>();
	const location = useLocation();

	const dispatch = useAppDispatch();
	const isAuthentication = useAppSelector(
		(state) => state.auth.isAuthenticated,
	);

	const listCart = useAppSelector((state) => state.cart.listCart);

	useEffect(() => {
		dispatch(fetchListCart({ userId: userId }));
	}, [userId]);

	const handleInputChange = (e: any) => {
		setSearchTerm(e.target.value);
	};

	useEffect(() => {
		const fetchData = async () => {
			if (searchTerm) {
				try {
					const results = await searchProduct(searchTerm);
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
					<div className='flex items-center justify-between lg:py-5 '>
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
						<div className='py-[14px] px-5 bg-white rounded-full lg:w-[606px] md:w-[450px] w-[130px] md:flex items-center gap-2 relative hidden'>
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
							<Link
								to={"/cart"}
								className='relative hidden md:block'
							>
								<BsCart />
								<div className='absolute left-0 flex items-center justify-center w-4 h-4 text-[9px] font-medium text-blue-500 translate-x-3 -translate-y-4 bg-white rounded-full top-1/2'>
									{listCart?.cart_products.length > 0
										? listCart.cart_products.length
										: 0}
								</div>
							</Link>
							<div className='hidden md:block'>
								{isAuthentication === true && userId ? (
									<DropdownMenu>
										<DropdownMenuTrigger>
											<div className='text-white outline-none bg-secondary-700 '>
												<GoPerson />
											</div>
										</DropdownMenuTrigger>
										<DropdownMenuContent className='w-[200px] mr-9 mt-2.5 dark:bg-white dark:text-neutral-900 dark:border-none '>
											<DropdownMenuLabel>
												My Account
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem
												onClick={() =>
													dispatch(logOut())
												}
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
							<div className='flex items-center'>
								<Link
									to={"sign-up"}
									className='block py-3 w-[80px] text-center  text-xs rounded-l-full bg-opacity-40 bg-neutral-900 md:hidden'
								>
									Đăng ký
								</Link>
								<Link
									to={"sign-in"}
									className='block py-3 text-xs w-[80px] text-center bg-white rounded-r-full opacity-50 text-slate-950 md:hidden'
								>
									Đăng nhập
								</Link>
							</div>
						</div>
					</div>
					<div className='relative flex items-center w-full gap-2 bg-white rounded-full md:hidden'>
						<div className='px-4 py-4 rounded-l-full bg-slate-200'>
							<Sheet>
								<SheetTrigger className='block lg:hidden'>
									<FaBars />
								</SheetTrigger>
								<SheetContent className='w-full'>
									<SheetHeader>
										<SheetTitle>
											Danh mục sản phẩm
										</SheetTitle>
										<SheetDescription>
											This action cannot be undone. This
											will permanently delete your account
											and remove your data from our
											servers.
										</SheetDescription>
									</SheetHeader>
								</SheetContent>
							</Sheet>
						</div>
						<span className='text-lg cursor-pointer'>
							<IoSearchOutline />
						</span>
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

						<Link
							to={"/cart"}
							className='relative px-4 py-4 rounded-r-full bg-slate-200 '
						>
							<BsCart />
							{listCart?.cart_products.length ? (
								<div className='absolute left-0 flex items-center justify-center w-3 h-3 text-[9px] font-medium text-blue-500 translate-x-6 -translate-y-3 bg-slate-200 rounded-full top-1/2'>
									{listCart?.cart_products.length > 0
										? listCart.cart_products.length
										: 0}
								</div>
							) : (
								<></>
							)}
						</Link>
					</div>
				</div>
				<div className='container pb-2'>
					<Category></Category>
				</div>
			</header>
		</div>
	);
};

export default HeaderCustomer;
