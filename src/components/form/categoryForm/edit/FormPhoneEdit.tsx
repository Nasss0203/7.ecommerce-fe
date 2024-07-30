import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { attributesPhone } from "@/constants/attributes";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormGrid from "../../FormGrid";

const FormPhoneEdit = ({ defaultValues = {} }: any) => {
	console.log("defaultValues~", defaultValues);
	const { control, setValue } = useFormContext();
	const [selectedRam, setSelectedRam] = useState<string>(
		defaultValues?.ram || "",
	);
	const [selectedBrand, setSelectedBrand] = useState<string>(
		defaultValues?.brand || "",
	);
	const [selectedScreen, setSelectedScreen] = useState<string>(
		defaultValues?.screen || "",
	);
	const [selectedStorageCapacity, setSelectedStorageCapacity] =
		useState<string>(defaultValues?.storage_capacity || "");

	useEffect(() => {
		setValue("product_attributes.ram", selectedRam);
		setValue("product_attributes.screen", selectedScreen);
		setValue(
			"product_attributes.storage_capacity",
			selectedStorageCapacity,
		);
		setValue("product_attributes.brand", selectedBrand);
	}, [
		selectedRam,
		selectedScreen,
		selectedStorageCapacity,
		selectedBrand,
		setValue,
	]);

	return (
		<>
			<FormGrid>
				<FormField
					control={control}
					name='product_attributes.ram'
					defaultValue={selectedRam}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ram</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => {
										field.onChange(value);
										setSelectedRam(value);
									}}
									value={field.value || selectedRam}
								>
									<SelectTrigger className='flex-1'>
										<SelectValue placeholder='Select Ram' />
									</SelectTrigger>
									<SelectContent>
										<ScrollArea className='w-full h-[120px] rounded-md'>
											{attributesPhone?.ram.map(
												(item, index) => (
													<SelectItem
														value={item.name}
														key={index}
													>
														{item.name}
													</SelectItem>
												),
											)}
										</ScrollArea>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name='product_attributes.screen'
					defaultValue={selectedScreen}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Screen</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => {
										field.onChange(value);
										setSelectedScreen(value);
									}}
									value={field.value || selectedScreen}
								>
									<SelectTrigger className='flex-1'>
										<SelectValue placeholder='Select Screen' />
									</SelectTrigger>
									<SelectContent>
										<ScrollArea className='w-full h-[120px] rounded-md'>
											{attributesPhone?.screen.map(
												(item, index) => (
													<SelectItem
														value={item.name}
														key={index}
													>
														{item.name}
													</SelectItem>
												),
											)}
										</ScrollArea>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
			</FormGrid>
			<FormGrid>
				<FormField
					control={control}
					name='product_attributes.storage_capacity'
					defaultValue={selectedStorageCapacity}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Storage Capacity</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => {
										field.onChange(value);
										setSelectedStorageCapacity(value);
									}}
									value={
										field.value || selectedStorageCapacity
									}
								>
									<SelectTrigger className='flex-1'>
										<SelectValue placeholder='Select Storage Capacity' />
									</SelectTrigger>
									<SelectContent>
										<ScrollArea className='w-full h-[120px] rounded-md'>
											{attributesPhone?.storage_capacity.map(
												(item, index) => (
													<SelectItem
														value={item.name}
														key={index}
													>
														{item.name}
													</SelectItem>
												),
											)}
										</ScrollArea>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name='product_attributes.brand'
					defaultValue={selectedBrand}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Brand</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => {
										field.onChange(value);
										setSelectedBrand(value);
									}}
									value={field.value || selectedBrand}
								>
									<SelectTrigger className='flex-1'>
										<SelectValue placeholder='Select Brand' />
									</SelectTrigger>
									<SelectContent>
										<ScrollArea className='w-full h-[120px] rounded-md'>
											{attributesPhone?.brand.map(
												(item, index) => (
													<SelectItem
														value={item.name}
														key={index}
													>
														{item.name}
													</SelectItem>
												),
											)}
										</ScrollArea>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
			</FormGrid>
		</>
	);
};

export default FormPhoneEdit;
