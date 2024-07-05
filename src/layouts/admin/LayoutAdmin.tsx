import React, { useContext, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Link, Outlet } from 'react-router-dom';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaRegBell, FaUserLock } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5';
import { IAuthResponse } from '@/types/data';
import { useAuth } from '@/hooks/useAuth';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LayoutAdmin = () => {
	const auth = useAuth();
	console.log('auth: ', auth);
	const data = auth?.currentAuth?.metadata;
	console.log('data: ', data);
	const dataAuth = data?.data;
	console.log('dataAuth: ', dataAuth);
	return (
		<div className='h-screen grid grid-cols-[280px,minmax(0,1fr)]'>
			<Sidebar></Sidebar>
			<div className=''>
				<div className='flex items-center justify-between gap-6 px-5 py-3 bg-white dark:bg-[#24303f]'>
					<div className='dark:bg-[#313d4a]  dark:text-white bg-[#eff4fb] text-gray-900 px-5 py-3 rounded w-[500px] flex items-center gap-3'>
						<input
							type='text'
							className='w-full text-sm bg-transparent'
							placeholder='Search....'
						/>
						<span className='text-base'>
							<IoSearchOutline />
						</span>
					</div>
					<div className='flex items-center gap-3'>
						<div className='flex items-center gap-3'>
							<div className='p-2.5 rounded-md dark:bg-[#313d4a] text-xl dark:text-white bg-[#eff4fb] text-gray-900'>
								<FaRegBell />
							</div>
							<ModeToggle></ModeToggle>
						</div>
						{dataAuth ? (
							<div className='flex items-center gap-2 '>
								<div className='flex flex-col gap-1 text-sm text-right'>
									<span className='font-semibold text-gray-900 dark:text-white'>
										{dataAuth?.name}
									</span>
									<span className='font-medium text-gray-500'>Admin</span>
								</div>
								<Avatar>
									<AvatarImage
										src='https://github.com/shadcn.png'
										alt='@shadcn'
									/>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
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
										<Link to={'/sign-in'} className='block w-full'>
											Sign in
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>
				</div>
				<div className='p-5 bg-[#dddddd] min-h-screen dark:bg-[#1a222c] '>
					<Outlet></Outlet>
				</div>
			</div>
		</div>
	);
};

export default LayoutAdmin;
