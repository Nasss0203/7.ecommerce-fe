import React, { useState } from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { FaBars } from 'react-icons/fa6';
import { sidebar, TSidebar } from '@/constants/sidebar';
import { NavLink } from 'react-router-dom';

const SidebarSheet = () => {
	return (
		<div className='block 2xl:hidden'>
			<Sheet>
				<SheetTrigger>
					<FaBars />
				</SheetTrigger>
				<SheetContent side={'left'} className='w-[230px] bg-[#1C2434]'>
					<SheetHeader className='mt-5'>
						<SheetTitle className='px-5 text-2xl text-gray-400'>
							Menu
						</SheetTitle>
						<SheetDescription className=''>
							<div className='flex flex-col gap-1 px-2 mt-5 '>
								{sidebar.map((item: TSidebar, index) => (
									<NavSidebarSheet
										key={index}
										icon={item.icon}
										iconDown={item.iconDown}
										iconUp={item.iconUp}
										menu={item.menu}
										path={item.path}
										title={item.title}></NavSidebarSheet>
								))}
							</div>
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export function NavSidebarSheet(props: TSidebar) {
	const { path, icon, title, iconDown, iconUp, menu = [] } = props;
	const [subnav, setSubnav] = useState<boolean>(false);
	const showSidebar = () => setSubnav(!subnav);
	const className = 'flex items-center justify-between px-4 py-2';
	const classSubnav = 'px-5 text-sm font-bold flex items-center gap-2';
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
					<span className='text-lg'>{icon}</span>
					<span className='text-base font-semibold'>{title}</span>
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

export default SidebarSheet;
