/* eslint-disable @typescript-eslint/no-unused-vars */
import { TiHome } from 'react-icons/ti';
import { AiFillProduct } from 'react-icons/ai';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';

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
		title: 'Dashboard',
		path: '/admin/dashboard',
		icon: <TiHome />,
	},
	{
		title: 'Product',
		path: '/admin/product',
		iconDown: <IoMdArrowDropdown />,
		iconUp: <IoMdArrowDropup />,
		icon: <AiFillProduct />,
		menu: [
			{
				title: 'Create product',
				path: '/admin/product/product-add',
				icon: <GoDotFill />,
			},
			{
				title: 'List product',
				path: '/admin/product/product-list',
				icon: <GoDotFill />,
			},
		],
	},
];
