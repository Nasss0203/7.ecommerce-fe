import { FormFooter } from "@/components/form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { authLogin } from "@/redux/slice/auth.slice";
import { isAuthenticate } from "@/utils";
import { SignInBody, SignInBodyType } from "@/validator/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
	const dispatch = useAppDispatch();
	const auth = isAuthenticate();

	const navigate = useNavigate();
	const form = useForm<SignInBodyType>({
		resolver: zodResolver(SignInBody),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: SignInBodyType) {
		console.log(`values ~`, values);
		const resultAction = await dispatch(authLogin(values));
		const user = resultAction.payload;

		if (user?.data?.roles.includes("ADMIN")) {
			navigate("/admin/dashboard");
		} else {
			navigate("/");
		}
	}

	return (
		<div className='flex items-center justify-center mt-10'>
			<div className='p-5 bg-white border border-gray-100 rounded shadow-md w-[424px]'>
				<h1 className='mb-5 text-2xl font-bold text-center'>Sign In</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'
					>
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
												className='bg-transparent dark:bg-transparent'
												disabled={auth ? true : false}
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
												className='bg-transparent dark:bg-transparent'
												disabled={auth ? true : false}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex justify-end'>
								<Link
									to={"/sign-up"}
									className='text-xs text-blue-400 underline'
								>
									Đăng ký
								</Link>
							</div>
						</div>
						<Button
							type='submit'
							className='w-full bg-blue-500'
							disabled={auth ? true : false}
						>
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
