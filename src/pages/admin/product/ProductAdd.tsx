import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Header } from '@/layouts/admin';
import {
	CreateNewProductBody,
	CreateNewProductType,
} from '@/validator/product.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { categoryOptions } from '@/constants/category';
import { QuillEditor } from '@/components/quill';

const ProductAdd = () => {
	const navigate = useNavigate();
	const [selectedCategory, setSelectedCategory] =
		useState<string>('Electronics');
	const form = useForm<CreateNewProductType>({
		resolver: zodResolver(CreateNewProductBody),
		defaultValues: {
			product_name: '',
			product_description: '',
			product_thumb: '',
			product_price: 0,
			product_quantity: 0,
			product_category: 'Electronics',
			product_auth: '',
			product_stock: 0,
			product_attributes: {
				brand: '',
				data: 0,
				ram: 0,
				screen: 0,
				product_auth: '',
			},
		},
	});

	async function onSubmit(values: CreateNewProductType) {
		console.log(`values`, values);
	}
	return (
		<div className='flex flex-col gap-5'>
			<Header>Create New Product</Header>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormGrid>
						<FormBackground>
							<FormField
								control={form.control}
								name='product_name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product name</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='Enter product name'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormGrid>
								<FormField
									control={form.control}
									name='product_price'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Product Price</FormLabel>
											<FormControl>
												<Input
													type='number'
													placeholder='Enter product price'
													{...field}
													onChange={(e) =>
														field.onChange(parseFloat(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='product_quantity'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Product Quantity</FormLabel>
											<FormControl>
												<Input
													type='number'
													{...field}
													onChange={(e) =>
														field.onChange(parseFloat(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</FormGrid>
							<FormField
								control={form.control}
								name='product_category'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<FormControl>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
													setSelectedCategory(value);
												}}
												value={field.value}>
												<SelectTrigger className='flex-1'>
													<SelectValue placeholder='Theme' />
												</SelectTrigger>
												<SelectContent>
													{categoryOptions.map((item, index) => (
														<SelectItem value={item.name} key={index}>
															{item.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='product_thumb'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product Thumb</FormLabel>
										<FormControl>
											<Input
												type='file'
												placeholder='Enter product name'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<CategoryForm
								form={form}
								category={selectedCategory}></CategoryForm>
						</FormBackground>
						<FormBackground>
							<FormField
								control={form.control}
								name='product_description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product description</FormLabel>
										<FormControl>
											<QuillEditor
												value={field.value}
												onChange={field.onChange}></QuillEditor>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex items-center w-full gap-5'>
								<Button type='submit' className='w-full'>
									ADD
								</Button>
								<Button type='reset' className='w-full'>
									ADD
								</Button>
							</div>
						</FormBackground>
					</FormGrid>
				</form>
			</Form>
		</div>
	);
};

function FormBackground({ children }: { children: React.ReactNode }) {
	return (
		<div className='dark:bg-[#313d4a] bg-[#eff4fb] px-5 py-4 rounded-md space-y-3 min-h-screen'>
			{children}
		</div>
	);
}

function FormGrid({ children }: { children: React.ReactNode }) {
	return <div className='grid grid-cols-2 gap-5'>{children}</div>;
}

function CategoryForm(props: { form: any; category: string }) {
	const { form, category } = props;
	return (
		<>
			{category === 'Electronics' ? (
				<>
					<FormGrid>
						<FormField
							control={form.control}
							name='product_attributes.ram'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ram</FormLabel>
									<FormControl>
										<Input
											type='number'
											{...field}
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='product_attributes.screen'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Screen</FormLabel>
									<FormControl>
										<Input
											type='number'
											{...field}
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</FormGrid>
					<FormGrid>
						<FormField
							control={form.control}
							name='product_attributes.data'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Data</FormLabel>
									<FormControl>
										<Input
											type='number'
											{...field}
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='product_attributes.screen'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Screen</FormLabel>
									<FormControl>
										<Input
											type='number'
											{...field}
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</FormGrid>
				</>
			) : category === 'Laptops' ? (
				<div>Laptops</div>
			) : category === 'Tablets' ? (
				<div>Tablets</div>
			) : null}
		</>
	);
}
export default ProductAdd;
