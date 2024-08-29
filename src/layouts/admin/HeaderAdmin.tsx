import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut } from "@/redux/slice/auth.slice";
import { isAuthenticate } from "@/utils";
import { FaRegBell, FaUserLock } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SidebarSheet from "./SidebarSheet";

const HeaderAdmin = () => {
	const dispatch = useAppDispatch();
	const isAuthentication = useAppSelector(
		(state) => state.auth.isAuthenticated,
	);

	const auth = isAuthenticate();
	const data = auth?.data;

	const logoutAuth = () => {
		dispatch(logOut());
	};
	return (
		<div className='flex items-center justify-between gap-6 px-5 py-3 bg-white dark:bg-[#24303f]'>
			<div className='flex items-center gap-5'>
				<SidebarSheet></SidebarSheet>
				<div className='dark:bg-[#313d4a]  dark:text-white bg-[#eff4fb] text-gray-900 px-5 py-3 rounded w-[500px] lg:flex items-center gap-3 hidden'>
					<input
						type='text'
						className='w-full text-sm bg-transparent'
						placeholder='Search....'
					/>
					<span className='text-base'>
						<IoSearchOutline />
					</span>
				</div>
			</div>
			<div className='flex items-center gap-3'>
				<div className='flex items-center gap-3'>
					<div className='p-2.5 rounded-md dark:bg-[#313d4a] text-xl dark:text-white bg-[#eff4fb] text-gray-900'>
						<FaRegBell />
					</div>
					<ModeToggle></ModeToggle>
				</div>
				{isAuthentication === true && data ? (
					<div className='flex items-center gap-2 '>
						<div className='flex-col hidden gap-1 text-sm text-right lg:flex'>
							<span className='font-semibold text-gray-900 dark:text-white'>
								{data?.name}
							</span>
							<span className='font-medium text-gray-500'>
								Admin
							</span>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar>
									<AvatarImage
										src='https://github.com/shadcn.png'
										alt='@shadcn'
									/>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-[200px] mr-9 mt-2.5'>
								<DropdownMenuLabel>
									My Account
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => logoutAuth()}>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				) : (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<div className='p-2.5 rounded-md dark:bg-[#313d4a] text-xl dark:text-white bg-[#eff4fb] text-gray-900'>
								<FaUserLock />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-[200px] mr-9 mt-2.5'>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link to={"/sign-in"} className='block w-full'>
									Sign in
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	);
};

export default HeaderAdmin;
