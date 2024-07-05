import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

//Admin
const LayoutAdmin = lazy(() => import('@/layouts/admin/LayoutAdmin'));
const DashboardAdmin = lazy(() => import('@/pages/admin/DashboardAdmin'));

//Product
const ProductAdmin = lazy(() => import('@/pages/admin/product/ProductAdmin'));
const ProductAdd = lazy(() => import('@/pages/admin/product/ProductAdd'));
const ProductList = lazy(() => import('@/pages/admin/product/ProductList'));

const LayoutCustomer = lazy(() => import('@/layouts/user/LayoutCustomer'));
const HomePage = lazy(() => import('@/pages/user/HomePage'));

//Auth
const SignUpPage = lazy(() => import('@/pages/auth/SignUpPage'));
const SignInPage = lazy(() => import('@/pages/auth/SignInPage'));

function App() {
	const Loading = () => <div>Loading...</div>;
	const router = createBrowserRouter([
		{
			path: 'admin',
			element: <LayoutAdmin />,
			children: [
				{
					path: 'dashboard',
					element: <DashboardAdmin />,
				},
				{
					path: 'product',
					element: <ProductAdmin />,
				},
				{
					path: 'product/product-add',
					element: <ProductAdd />,
				},
				{
					path: 'product/product-list',
					element: <ProductList />,
				},
			],
		},
		{
			path: '',
			element: <LayoutCustomer />,
			children: [
				{
					path: '',
					element: <HomePage />,
				},
				{
					path: 'sign-up',
					element: <SignUpPage />,
				},
				{
					path: 'sign-in',
					element: <SignInPage />,
				},
			],
		},
	]);

	return (
		<Suspense fallback={<Loading></Loading>}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</Suspense>
	);
}

export default App;
