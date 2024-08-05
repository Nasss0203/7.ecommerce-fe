import { createNewProduct } from "@/api/product.api";
import { uploadFile } from "@/api/upload.api";
import {
	FormBackground,
	FormGrid,
	FormLaptopAdd,
	FormPhoneAdd,
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
import { isAuthenticated } from "@/utils";
import {
	CreateNewProductBody,
	CreateNewProductType,
} from "@/validator/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ProductType = "Phones" | "Laptops" | "Tablets";

const ProductAdd = () => {
	const user = isAuthenticated();
	const _id = user?.data?._id;

	const navigate = useNavigate();
	const [uploadProgress, setUploadProgress] = useState(0);
	console.log("uploadProgress~", uploadProgress);
	const [selectedCategory, setSelectedCategory] = useState<any>("Phones");
	const [fileUpload, setFileUpload] = useState<File | null>(null);

	const form = useForm<CreateNewProductType>({
		resolver: zodResolver(CreateNewProductBody),
		defaultValues: {
			product_name: "",
			product_description: "",
			product_thumb: "",
			product_price: 0,
			product_quantity: 0,
			product_category: "Phones",
			product_auth: _id,
			product_attributes: {
				brand: "",
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
			const formData = new FormData();
			if (fileUpload) {
				formData.append("file", fileUpload);
			}

			if (fileUpload) {
				const uploadResponse = await uploadFile(
					formData,
					setUploadProgress,
				);
				console.log(
					"uploadResponse: ",
					uploadResponse?.metadata?.thumb_url,
				);
				console.log("uploadResponse~", uploadResponse);

				values.product_thumb = uploadResponse?.metadata?.thumb_url;
			}

			const response = await createNewProduct(values);
			console.log("response~", response);
			if (response) {
				form.reset();
				setFileUpload(null);
			}
			toast.success("Product created successfully");
		} catch (error) {
			console.error("Error during product creation:", error);
			toast.error("Create new product unsuccessful. Please try again.");
		}
	}

	return (
		<div className='flex flex-col gap-5'>
			<Header>Create New Product</Header>
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
												value={field.value}
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
							<FormField
								control={form.control}
								name='product_thumb'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Image</FormLabel>
										<FormControl>
											<>
												<Input
													type='file'
													placeholder='Enter product name'
													onChange={handleFileChange}
												/>
												{/* <Progress
													value={uploadProgress}
													className='bg-white'
												/> */}
											</>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<CategoryForm
								category={selectedCategory}
							></CategoryForm>
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
												value={field.value}
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

const ProductAddView: Record<ProductType, JSX.Element> = {
	Phones: <FormPhoneAdd></FormPhoneAdd>,
	Laptops: <FormLaptopAdd></FormLaptopAdd>,
	Tablets: <div>Tablets</div>,
};

function CategoryForm(props: { category: ProductType }) {
	const { category } = props;

	return ProductAddView[category];
}

export default ProductAdd;
