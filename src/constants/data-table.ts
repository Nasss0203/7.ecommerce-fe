import {
	ColumnFiltersState,
	OnChangeFn,
	RowSelectionState,
	SortingState,
	VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

interface IDataTableProps {
	data: unknown[];
	columns: any;
	setSorting: OnChangeFn<SortingState>;
	setColumnFilters: OnChangeFn<ColumnFiltersState>;
	setColumnVisibility: OnChangeFn<VisibilityState>;
	setRowSelection: OnChangeFn<RowSelectionState>;
	sorting?: SortingState;
	columnFilters?: ColumnFiltersState | undefined;
	columnVisibility?: VisibilityState | undefined;
	rowSelection?: RowSelectionState | undefined;
}
export const DataTable = (props: IDataTableProps) => {
	const {
		data,
		columns,
		setSorting,
		setColumnFilters,
		setColumnVisibility,
		setRowSelection,
		sorting,
		columnFilters,
		columnVisibility,
		rowSelection,
	} = props;

	const table = useReactTable({
		data: data,
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
	return table;
};
