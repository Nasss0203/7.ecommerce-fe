/* eslint-disable @typescript-eslint/no-unused-vars */
import { AiFillProduct } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RiListOrdered } from "react-icons/ri";
import { TiHome } from "react-icons/ti";

export type TSidebar = {
	title: string;
	path: string;
	icon: JSX.Element;
	iconDown?: JSX.Element;
	iconUp?: JSX.Element;
	menu?: TSidebar[];
};

export const sidebar: TSidebar[] = [
	{
		title: "Trang chủ",
		path: "/admin/dashboard",
		icon: <TiHome />,
	},
	{
		title: "Sản phẩm",
		path: "/admin/product",
		iconDown: <IoMdArrowDropdown />,
		iconUp: <IoMdArrowDropup />,
		icon: <AiFillProduct />,
		menu: [
			{
				title: "Thêm sản phẩm",
				path: "/admin/product/product-add",
				icon: <GoDotFill />,
			},
			{
				title: "Danh sách",
				path: "/admin/product/product-list",
				icon: <GoDotFill />,
			},
		],
	},
	{
		title: "Đơn hàng",
		path: "/admin/order",
		icon: <RiListOrdered />,
	},
	{
		title: "Mã giảm giá",
		path: "/admin/discount",
		icon: <HiOutlineReceiptPercent />,
	},
];
