import React from 'react';
import { FcGoogle } from 'react-icons/fc';
const FormFooter = () => {
	return (
		<div className='flex flex-col gap-5 my-5'>
			<div className='flex items-center justify-between gap-2 '>
				<div className='flex-1 border-t border-neutral-300'></div>
				<span>or</span>
				<div className='flex-1 border-t border-neutral-300'></div>
			</div>
			<div className='flex items-center justify-center gap-5 px-3 py-2 border rounded cursor-pointer border-neutral-300'>
				<FcGoogle />
				<span className='text-base leading-5 text-gray-700'>
					Login with Google
				</span>
			</div>
		</div>
	);
};

export default FormFooter;
