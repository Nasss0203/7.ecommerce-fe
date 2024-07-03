import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const LayoutAdmin = lazy(() => import('@/layouts/admin/LayoutAdmin'));
const ProductAdmin = lazy(() => import('@/pages/admin/ProductAdmin'));
const DashboardAdmin = lazy(() => import('@/pages/admin/DashboardAdmin'));

const LayoutCustomer = lazy(() => import('@/layouts/user/LayoutCustomer'));
const HomePage = lazy(() => import('@/pages/user/HomePage'));

//Auth
const SignUpPage = lazy(() => import('@/pages/auth/SignUpPage'));
const SignInPage = lazy(() => import('@/pages/auth/SignInPage'));

function App() {
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
		<Suspense fallback={<></>}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
