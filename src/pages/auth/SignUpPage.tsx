import { register } from '@/api/auth.api';
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
import { useToast as ToastShadCn } from '@/components/ui/use-toast';
import { SignUpBody, SignUpBodyType } from '@/validator/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast as toasttify } from 'react-toastify';

const SignUpPage = () => {
	const navigate = useNavigate();
	const { toast } = ToastShadCn();
	const form = useForm<SignUpBodyType>({
		resolver: zodResolver(SignUpBody),
		defaultValues: {
			email: '',
			name: '',
			password: '',
		},
	});

	async function onSubmit(values: SignUpBodyType) {
		console.log('values: ', values);
		try {
			const res = await register(values);
			console.log('Sign up successful:', res);
			if (res) {
				form.reset();
				// toasttify.success('Account created successfully!');
				toast({
					description: 'Account created successfully!',
				});
				navigate('/sign-in');
			}
		} catch (error) {
			console.error('Error during sign up:', error);
			toasttify.error('Failed to create account. Please try again.'); // Thông báo lỗi
		}
	}
	return (
		<div className='flex items-center justify-center mt-10'>
			<div className='p-5 bg-white border border-gray-100 rounded shadow-md w-[424px] '>
				<h1 className='mb-5 text-2xl font-bold text-center'>Sign Up</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<div className='space-y-2'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder='Enter your username' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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

export default SignUpPage;
