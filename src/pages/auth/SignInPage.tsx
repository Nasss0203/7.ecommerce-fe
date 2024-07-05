import { signIn } from '@/api/auth.api';
import { FormFooter } from '@/components/form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignInBody, SignInBodyType } from '@/validator/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignInPage = () => {
	const navigate = useNavigate();
	const form = useForm<SignInBodyType>({
		resolver: zodResolver(SignInBody),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: SignInBodyType) {
		console.log('values: ', values);
		try {
			const res = await signIn(values);
			console.log('Sign in successful:', res);
			if (res) {
				navigate('/');
			}
		} catch (error) {
			console.error('Error during sign up:', error);
			toast.error('Login unsuccessful. Please try again.');
		}
	}
	return (
		<div className='flex items-center justify-center mt-10'>
			<div className='p-5 bg-white border border-gray-100 rounded shadow-md w-[424px] '>
				<h1 className='mb-5 text-2xl font-bold text-center'>Sign In</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<div className='space-y-2'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter your email'
												{...field}
												type='email'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder='************'
												{...field}
												type='password'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type='submit' className='w-full bg-primary-500'>
							SIGN IN
						</Button>
					</form>
					<FormFooter />
				</Form>
			</div>
		</div>
	);
};

export default SignInPage;
