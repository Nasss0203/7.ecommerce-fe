import React from 'react';

const HeaderAdmin = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='w-full px-5 py-5 rounded-md bg-[#516C8D]'>
			<h1 className='text-3xl font-bold text-white '>{children}</h1>
		</div>
	);
};

export default HeaderAdmin;
