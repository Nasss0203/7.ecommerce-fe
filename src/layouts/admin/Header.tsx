import React from 'react';

const Header = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex items-center justify-between'>
			<h1 className='text-2xl font-bold leading-9 text-gray-900 dark:text-gray-400 up'>
				{children}
			</h1>
		</div>
	);
};

export default Header;
