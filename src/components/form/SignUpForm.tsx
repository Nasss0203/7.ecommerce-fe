import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { SignUpBody, SignUpBodyType } from '@/validator/auth.schema';
import FormFooter from './form-footer';
import { signUp } from '@/api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
	const navigate = useNavigate();
	const form = useForm<SignUpBodyType>({
		resolver: zodResolver(SignUpBody),
		defaultValues: {
			email: '',
			name: '',
			password: '',
		},
	});

	async function onSubmit(values: SignUpBodyType) {
		try {
			const res = await signUp(values);
			console.log('Sign up successful:', res);
			if (res) {
				form.reset();
				toast.success('Account created successfully!');
				navigate('/sign-in');
			}
		} catch (error) {
			console.error('Error during sign up:', error);
			toast.error('Failed to create account. Please try again.'); // Thông báo lỗi
		}
	}

	return (
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
	);
};

export default SignUpForm;
