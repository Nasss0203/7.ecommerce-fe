import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";
import { DataTable } from "@/constants/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	actionPublish,
	fetchAllDraftProduct,
	resetFetchDraft,
} from "@/redux/slice/product.slice";
import { IProduct } from "@/types/data";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { DialogImage } from "../dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

const TableDraft = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{},
	);
	const [rowSelection, setRowSelection] = useState({});

	const dispatch = useAppDispatch();
	const product = useAppSelector((state) => state.product.listProduct);
	const isPublish = useAppSelector((state) => state.product.isPublish);

	useEffect(() => {
		if (isPublish === true) {
			dispatch(resetFetchDraft());
		}
	}, [isPublish]);

	useEffect(() => {
		dispatch(fetchAllDraftProduct());
	}, []);

	const columns: ColumnDef<IProduct>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) =>
						table.toggleAllPageRowsSelected(!!value)
					}
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
			accessorKey: "product_name",
			header: "Name",
			cell: ({ row }) => (
				<span className='max-w-[180px] line-clamp-1'>
					{row.getValue("product_name")}
				</span>
			),
		},
		{
			accessorKey: "product_thumb",
			header: "Image",
			cell: ({ row }) => (
				<DialogImage
					image={row.getValue("product_thumb")}
				></DialogImage>
			),
		},
		{
			accessorKey: "product_category",
			header: "Category",
			cell: ({ row }) => (
				<div className='capitalize'>
					{row.getValue("product_category")}
				</div>
			),
		},
		{
			accessorKey: "product_price",
			header: "Amount",
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("product_price"));
				const formatted = new Intl.NumberFormat("vn-VN", {
					style: "currency",
					currency: "VND",
				}).format(amount);
				return <div className='font-medium'>{formatted}</div>;
			},
		},
		{
			accessorKey: "_id",
			header: "Action",
			cell: ({ row }) => (
				<Popover>
					<PopoverTrigger className='ml-5'>
						<BsThreeDots />
					</PopoverTrigger>
					<PopoverContent className='space-y-2 w-44'>
						<div className='flex items-center gap-5 cursor-pointer'>
							<FaEye />
							View
						</div>
						<div className='flex items-center gap-5 cursor-pointer'>
							<MdModeEdit />
							Edit
						</div>
						<AlertDialog>
							<AlertDialogTrigger className='flex items-center gap-5'>
								<IoSettingsSharp />
								Publish
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Are you absolutely sure?
									</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will
										permanently delete your account and
										remove your data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() =>
											dispatch(
												actionPublish(
													row.getValue("_id"),
												),
											)
										}
									>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
						<div className='flex items-center gap-5 cursor-pointer'>
							<FaRegTrashAlt />
							Delete
						</div>
					</PopoverContent>
				</Popover>
			),
		},
	];

	const table = DataTable({
		data: product,
		columns,
		setSorting,
		setColumnFilters,
		setColumnVisibility,
		setRowSelection,
		columnFilters,
		columnVisibility,
		rowSelection,
		sorting,
	});

	if (!product && !table) return null;

	return (
		<div className='w-full'>
			<div className='flex items-center py-4'>
				<Input
					placeholder='Filter product...'
					value={
						(table
							.getColumn("product_name")
							?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table
							.getColumn("product_name")
							?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>
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
														header.column.columnDef
															.header,
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
									data-state={
										row.getIsSelected() && "selected"
									}
								>
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
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end py-4 space-x-2'>
				<div className='flex-1 text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel()?.rows.length} of
					{table.getFilteredRowModel()?.rows.length} row(s) selected.
				</div>
				<div className='space-x-2'>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<Button
									variant='outline'
									size='sm'
									onClick={() => table.previousPage()}
									disabled={!table.getCanPreviousPage()}
								>
									<IoIosArrowBack />
								</Button>
							</PaginationItem>
							<PaginationItem>
								<Button
									variant='outline'
									size='sm'
									onClick={() => table.nextPage()}
									disabled={!table.getCanNextPage()}
								>
									<IoIosArrowForward />
								</Button>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	);
};

export default TableDraft;
