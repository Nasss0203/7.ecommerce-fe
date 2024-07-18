import { icon } from '@/constants/header';
import { IoSearchOutline } from 'react-icons/io5';
import { BsCart } from 'react-icons/bs';
import { IoMdHeartEmpty } from 'react-icons/io';
import { GoPerson } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaUserLock } from 'react-icons/fa6';
import { logOut } from '@/redux/slice/auth.slice';
import { isAuthenticated } from '@/utils';

const HeaderCustomer = () => {
	const dispatch = useAppDispatch();
	const isAuthentication = useAppSelector(
		(state) => state.auth.isAuthenticated,
	);
	const auth = isAuthenticated();
	const data = auth?.data;
	return (
		<div className='flex flex-col'>
			<header className='bg-secondary-700'>
				<div className='container'>
					<div className='flex items-center justify-between py-3 border-b'>
						<p className='text-sm font-normal leading-5 text-white'>
							Welcome to Clicon online eCommerce store.
						</p>
						<div className='flex items-center gap-3'>
							<span className='text-sm font-normal leading-5 text-white'>
								Follow us:
							</span>
							<div className='flex items-center gap-3'>
								{icon.map((item, index) => (
									<span key={index} className='text-white'>
										{item.icon}
									</span>
								))}
							</div>
						</div>
					</div>
					<div className='flex items-center justify-between py-5'>
						<Link to={'/'} className='flex items-center gap-2'>
							<img srcSet='Icon.png 2x' alt='' />
							<h1 className='leading-10 font-bold text-[32px] text-white'>
								CLICON
							</h1>
						</Link>
						<div className='py-[14px] px-5 bg-white rounded w-[606px] flex items-center gap-2'>
							<input
								type='text'
								name=''
								id=''
								className='w-full text-sm leading-5 bg-transparent placeholder:text-gray-500'
								placeholder='Search for anything...'
							/>
							<span className='text-lg'>
								<IoSearchOutline />
							</span>
						</div>
						<div className='flex items-center gap-6 text-2xl font-medium text-white'>
							<span>
								<BsCart />
							</span>
							<span>
								<IoMdHeartEmpty />
							</span>
							{isAuthentication === true && data ? (
								<DropdownMenu>
									<DropdownMenuTrigger>
										<div className='text-white outline-none bg-secondary-700 '>
											<GoPerson />
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent className='w-[200px] mr-9 mt-2.5'>
										<DropdownMenuLabel>My Account</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={() => dispatch(logOut())}>
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
										<DropdownMenuLabel>My Account</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<Link to={'/sign-in'}>Login</Link>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							)}
						</div>
					</div>
				</div>
			</header>
			<div className='container py-4'>
				<div className='px-6 py-[14px] bg-gray-50 rounded  inline-block'>
					<div className='flex items-center gap-2 '>
						<span className='font-medium leading-5 text-gray-900'>
							All Category
						</span>
						<IoIosArrowDown />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderCustomer;
