import React, { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { IProduct, IProductResponse } from '@/types/data';
import { Checkbox } from '../ui/checkbox';
import {
	actionPublishProduct,
	findAllProducts,
	findAllPublishForShop,
	unActionPublishProduct,
} from '@/api/product.api';
import { Input } from '../ui/input';
import { DialogImage } from '../dialog';

const TablePublish = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [dataProduct, setDataProduct] = useState<IProductResponse<IProduct>>();
	const [published, setPublished] = useState<IProductResponse<IProduct>>();
	console.log('published: ', published);

	useEffect(() => {
		// getAllProducts();
		getListPublish();
	}, []);

	const getAllProducts = async () => {
		const response = await findAllProducts();
		setDataProduct(response);
	};

	const getListPublish = async () => {
		const response = await findAllPublishForShop();
		setPublished(response);
	};

	const actionUnPublish = async (id: string) => {
		const response = await unActionPublishProduct(id);
		return response;
	};

	const product = published?.metadata || [];

	const columns: ColumnDef<IProduct>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label='Select all'
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label='Select row'
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: 'product_name',
			header: 'Name',
			cell: ({ row }) => (
				<div className='capitalize'>{row.getValue('product_name')}</div>
			),
		},
		{
			accessorKey: 'product_thumb',
			// header: ({ column }) => {
			// 	return (
			// 		<Button
			// 			variant='ghost'
			// 			onClick={() =>
			// 				column.toggleSorting(column.getIsSorted() === 'asc')
			// 			}>
			// 			Email
			// 			<ArrowUpDown className='w-4 h-4 ml-2' />
			// 		</Button>
			// 	);
			// },
			header: 'Image',
			cell: ({ row }) => (
				<DialogImage image={row.getValue('product_thumb')}></DialogImage>
			),
		},
		{
			accessorKey: 'product_category',
			header: 'Category',
			cell: ({ row }) => (
				<div className='capitalize'>{row.getValue('product_category')}</div>
			),
		},
		{
			accessorKey: 'product_price',
			header: 'Amount',
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue('product_price'));
				const formatted = new Intl.NumberFormat('vn-VN', {
					style: 'currency',
					currency: 'VND',
				}).format(amount);
				return <div className='font-medium'>{formatted}</div>;
			},
		},
		{
			accessorKey: '_id',
			header: 'Action',
			cell: ({ row }) => (
				<button
					onClick={() => actionUnPublish(row.getValue('_id'))}
					className='px-3 py-2 bg-red-500 rounded-md'>
					unPublish
				</button>
			),
		},
	];

	const table = useReactTable({
		data: product,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	if (!product && !table) return null;
	return (
		<div className='w-full'>
			<div className='flex items-center py-4'>
				<Input
					placeholder='Filter product...'
					value={
						(table.getColumn('product_name')?.getFilterValue() as string) ?? ''
					}
					onChange={(event) =>
						table.getColumn('product_name')?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>
				{/* <DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Columns <ChevronDown className='w-4 h-4 ml-2' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu> */}
			</div>
			<div className='border rounded-md'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel()?.rows?.length ? (
							table.getRowModel()?.rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{/* <div className='flex items-center justify-end py-4 space-x-2'>
				<div className='flex-1 text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel()?.rows.length} of
					{table.getFilteredRowModel()?.rows.length} row(s) selected.
				</div>
				<div className='space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div> */}
		</div>
	);
};

export default TablePublish;
