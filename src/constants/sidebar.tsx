/* eslint-disable @typescript-eslint/no-unused-vars */
import { TiHome } from 'react-icons/ti';
import { AiFillProduct } from 'react-icons/ai';

export type TSidebar = {
	title: string;
	path: string;
	icon: JSX.Element;
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
		icon: <AiFillProduct />,
	},
];
