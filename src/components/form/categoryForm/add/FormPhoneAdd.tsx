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
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import FormGrid from "../../FormGrid";

const FormPhoneAdd = () => {
	const { control } = useFormContext();
	const [selectedRam, setSelectedRam] = useState<string>("");
	const [selectedBrand, setSelectedBrand] = useState<string>("");
	const [selectedScreen, setSelectedScreen] = useState<string>("");
	const [selectedStorageCapacity, setSelectedStorageCapacity] =
		useState<string>("");

	return (
		<>
			<FormGrid>
				<FormField
					control={control}
					name='product_attributes.ram'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ram</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => {
										field.onChange(value);
										setSelectedRam(value);
									}}
									value={field.value}
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
					render={({ field }) => (
						<FormItem>
							<FormLabel>Screen</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => {
										field.onChange(value);
										setSelectedScreen(value);
									}}
									value={field.value}
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
					render={({ field }) => (
						<FormItem>
							<FormLabel>Storage Capacity</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => {
										field.onChange(value);
										setSelectedStorageCapacity(value);
									}}
									value={field.value}
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
					render={({ field }) => (
						<FormItem>
							<FormLabel>Brand</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => {
										field.onChange(value);
										setSelectedBrand(value);
									}}
									value={field.value}
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

export default FormPhoneAdd;
