import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import FormGrid from '../FormGrid';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

const FormElectronic = () => {
	const { control } = useFormContext();
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
								<Input
									type='number'
									{...field}
									onChange={(e) => field.onChange(parseFloat(e.target.value))}
								/>
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
								<Input
									type='number'
									{...field}
									onChange={(e) => field.onChange(parseFloat(e.target.value))}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
			</FormGrid>
			<FormGrid>
				<FormField
					control={control}
					name='product_attributes.data'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Data</FormLabel>
							<FormControl>
								<Input
									type='number'
									{...field}
									onChange={(e) => field.onChange(parseFloat(e.target.value))}
								/>
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
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
			</FormGrid>
		</>
	);
};

export default FormElectronic;
