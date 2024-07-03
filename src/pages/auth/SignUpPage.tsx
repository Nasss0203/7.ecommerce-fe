import { SignUpForm } from '@/components/form';
import React from 'react';

const SignUpPage = () => {
	return (
		<div className='flex items-center justify-center mt-10'>
			<div className='p-5 bg-white border border-gray-100 rounded shadow-md w-[424px] '>
				<h1 className='mb-5 text-2xl font-bold text-center'>Sign Up</h1>
				<SignUpForm></SignUpForm>
			</div>
		</div>
	);
};

export default SignUpPage;
