import { findProductById, updatedProduct } from "@/api/product.api";
import {
	FormBackground,
	FormGrid,
	FormLaptopEdit,
	FormPhoneEdit,
} from "@/components/form";
import { Header } from "@/components/header";
import { QuillEditor } from "@/components/quill";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { categoryOptions } from "@/constants/category";
import { IProduct } from "@/types/data";
import { isAuthenticate } from "@/utils";
import {
	CreateNewProductBody,
	CreateNewProductType,
} from "@/validator/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ProductType = "Phones" | "Laptops" | "Tablets";
interface IMeta<T> {
	message: string;
	metadata: T;
	status: number;
}

const ProductEdit = () => {
	const user = isAuthenticate();
	const _id = user?.data?._id;
	const navigate = useNavigate();

	const [selectedCategory, setSelectedCategory] = useState<any>("Phones");
	const [fileUpload, setFileUpload] = useState<File | null>(null);
	const [dataProduct, setDataProduct] = useState<IMeta<IProduct>>();

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const _idProduct = searchParams.get("id");

	useEffect(() => {
		if (_id) {
			getProductById(_idProduct);
		}
	}, [_id]);

	const getProductById = async (id: string | null) => {
		if (!id) return;
		try {
			const response = await findProductById(id);
			console.log("response~", response);
			setDataProduct(response);

			// Update form with the fetched data
			form.reset({
				...response.metadata,
				product_attributes: {
					...response.metadata.product_attributes,
				},
			});
			setSelectedCategory(
				response.metadata.product_category as ProductType,
			);
		} catch (error) {
			console.error("Error fetching product by ID", error);
		}
	};

	const data = dataProduct?.metadata;

	const form = useForm<CreateNewProductType>({
		resolver: zodResolver(CreateNewProductBody),
		defaultValues: {
			product_name: "",
			product_description: "",
			product_thumb: "",
			product_price: 0,
			product_quantity: 0,
			product_category: "phone",
			product_auth: _id,
			product_attributes: {
				brand: data?.product_attributes.brand,
				storage_capacity: "",
				ram: "",
				screen: "",
				pin: "",
				cpu: "",
				ssd: "",
			},
		},
	});

	const handleFileChange = async (values: any) => {
		if (values.target.files && values.target.files[0]) {
			setFileUpload(values.target.files[0]);
		}
	};

	async function onSubmit(values: any) {
		console.log("values~", values);
		try {
			const response = await updatedProduct(_idProduct as string, values);
			if (response) {
				form.reset();
			}
			navigate("/admin/product/product-list");
			toast.success("Updated successfully");
		} catch (error) {
			console.error("Error during product creation:", error);
			toast.error("Create new product unsuccessful. Please try again.");
		}
	}

	return (
		<div className='flex flex-col gap-5'>
			<Header>Chỉnh Sửa Sản Phẩm</Header>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'
					autoComplete='off'
				>
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
														field.onChange(
															parseFloat(
																e.target.value,
															),
														)
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
											<FormLabel>
												Product Quantity
											</FormLabel>
											<FormControl>
												<Input
													type='number'
													{...field}
													onChange={(e) =>
														field.onChange(
															parseFloat(
																e.target.value,
															),
														)
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
												value={selectedCategory}
											>
												<SelectTrigger className='flex-1'>
													<SelectValue placeholder='Theme' />
												</SelectTrigger>
												<SelectContent>
													{categoryOptions.map(
														(item, index) => (
															<SelectItem
																value={
																	item.name
																}
																key={index}
															>
																{item.name}
															</SelectItem>
														),
													)}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* <FormField
								control={form.control}
								name='product_thumb'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product Thumb</FormLabel>
										<FormControl>
											<Input
												type='file'
												placeholder='Enter product name'
												onChange={handleFileChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/> */}
							{/* <CategoryForm
								methods={form}
								category={selectedCategory}
							></CategoryForm> */}
						</FormBackground>
						<FormBackground>
							<FormField
								control={form.control}
								name='product_description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Product description
										</FormLabel>
										<FormControl>
											<QuillEditor
												value={
													data?.product_description
												}
												onChange={field.onChange}
											></QuillEditor>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex items-center w-full gap-5'>
								<Button type='submit' className='w-full'>
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

const ProductEditView: Record<ProductType, JSX.Element> = {
	Phones: <FormPhoneEdit></FormPhoneEdit>,
	Laptops: <FormLaptopEdit></FormLaptopEdit>,
	Tablets: <div>Tablets</div>,
};

function CategoryForm(props: { category: ProductType; methods: any }) {
	const { category, methods } = props;

	return (
		<FormProvider {...methods}>{ProductEditView[category]}</FormProvider>
	);
}
export default ProductEdit;
