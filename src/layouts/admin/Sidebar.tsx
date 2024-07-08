/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TSidebar, sidebar } from '@/constants/sidebar';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
	const [menuSidebar, setMenuSidebar] = useState<boolean>(false);
	const showSidebar = () => setMenuSidebar(!menuSidebar);

	return (
		<div className=' bg-[#1C2434] dark:bg-[#24303f]'>
			<Link to={'/admin/dashboard'} className='flex justify-center px-10 py-5'>
				<h1 className='text-3xl font-bold text-white'>Dashboard</h1>
			</Link>
			<div className='flex flex-col gap-1 px-5 mt-5 '>
				{sidebar.map((item: TSidebar, index) => (
					<NavSidebar
						key={index}
						icon={item.icon}
						iconDown={item.iconDown}
						iconUp={item.iconUp}
						menu={item.menu}
						path={item.path}
						title={item.title}></NavSidebar>
				))}
			</div>
		</div>
	);
};

function NavSidebar(props: TSidebar) {
	const { path, icon, title, iconDown, iconUp, menu = [] } = props;
	const [subnav, setSubnav] = useState<boolean>(false);
	const showSidebar = () => setSubnav(!subnav);
	const className = 'flex items-center justify-between px-5 py-3 ';
	const classSubnav = 'px-10 text-lg font-bold flex items-center gap-2';
	return (
		<>
			<NavLink
				to={path}
				className={({ isActive }) =>
					isActive
						? `${className} text-white rounded-md bg-[#333A48]  `
						: `${className} text-gray-400`
				}
				onClick={menu && showSidebar}>
				<div className='flex items-center gap-2'>
					<span className='text-2xl'>{icon}</span>
					<span className='text-xl font-semibold'>{title}</span>
				</div>
				<span className='text-xl'>
					{menu && subnav ? iconUp : menu ? iconDown : null}
				</span>
			</NavLink>
			{subnav &&
				menu.map((item, index) => (
					<NavLink
						to={item.path}
						key={index}
						className={({ isActive }) =>
							isActive
								? `${classSubnav} text-white`
								: `${classSubnav} text-gray-400`
						}>
						{item.icon}
						{item.title}
					</NavLink>
				))}
		</>
	);
}

export default Sidebar;
