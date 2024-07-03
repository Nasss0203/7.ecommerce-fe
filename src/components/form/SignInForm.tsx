import { SignInBody, SignInBodyType } from '@/validator/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormFooter from './form-footer';
import { signIn } from '@/api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignInForm = () => {
	const navigate = useNavigate();
	const form = useForm<SignInBodyType>({
		resolver: zodResolver(SignInBody),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: SignInBodyType) {
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
	);
};

export default SignInForm;
