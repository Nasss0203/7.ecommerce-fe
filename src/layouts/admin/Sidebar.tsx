/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TSidebar, sidebar } from '@/constants/sidebar';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
	return (
		<div className=' bg-[#1C2434]'>
			<div className='flex justify-center px-10 py-5'>
				<h1 className='text-3xl font-bold text-white'>Dashboard</h1>
			</div>
			<div className='flex flex-col gap-3 px-10 mt-5 '>
				{sidebar.map((item: TSidebar, index) => (
					<NavSidebar
						key={index}
						icon={item.icon}
						path={item.path}
						title={item.title}></NavSidebar>
				))}
			</div>
		</div>
	);
};

function NavSidebar(props: TSidebar) {
	const { path, icon, title } = props;
	return (
		<NavLink
			to={path}
			className={({ isActive }) =>
				isActive
					? 'text-white flex items-center gap-2'
					: 'text-gray-400 flex items-center gap-2'
			}>
			<span className='text-2xl'>{icon}</span>
			<span className='text-xl font-semibold'>{title}</span>
		</NavLink>
	);
}

export default Sidebar;
