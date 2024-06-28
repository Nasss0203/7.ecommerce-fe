import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import HeaderAdmin from '@/layouts/admin/HeaderAdmin';
import React from 'react';

const ProductAdmin = () => {
	return (
		<div className='space-y-5'>
			<HeaderAdmin>ProductAdmin</HeaderAdmin>
			<div className='p-5 bg-[#516C8D] rounded-md'>
				<Table>
					<TableCaption>A list of your recent invoices.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>Invoice</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Method</TableHead>
							<TableHead className='text-right'>Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className='font-medium'>INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className='text-right'>$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className='font-medium'>INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className='text-right'>$250.00</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ProductAdmin;
