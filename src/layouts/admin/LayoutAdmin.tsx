import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const LayoutAdmin = () => {
	return (
		<div className='h-screen grid grid-cols-[300px,minmax(0,1fr)]'>
			<Sidebar></Sidebar>
			<div className=''>
				<div className='flex items-center justify-end gap-10 px-5 py-3 bg-white'>
					<div>
						<ModeToggle></ModeToggle>
					</div>
					<div className='flex items-center gap-2'>
						<div className='flex flex-col gap-1 text-sm text-right'>
							<span className='font-semibold text-gray-900'>Nass Nguyen</span>
							<span className='font-medium text-gray-500'>Admin</span>
						</div>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>
				</div>
				<div className='p-5 bg-[#dddddd] h-screen dark:bg-[#28385E]'>
					<Outlet></Outlet>
				</div>
			</div>
		</div>
	);
};

export default LayoutAdmin;
