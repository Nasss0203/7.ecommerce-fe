import { SignInForm } from '@/components/form';

const SignInPage = () => {
	return (
		<div className='flex items-center justify-center mt-10'>
			<div className='p-5 bg-white border border-gray-100 rounded shadow-md w-[424px] '>
				<h1 className='mb-5 text-2xl font-bold text-center'>Sign In</h1>
				<SignInForm></SignInForm>
			</div>
		</div>
	);
};

export default SignInPage;
