import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const LayoutAdmin = lazy(() => import('@/layouts/admin/LayoutAdmin'));
const ProductAdmin = lazy(() => import('@/pages/admin/ProductAdmin'));
const DashboardAdmin = lazy(() => import('@/pages/admin/DashboardAdmin'));

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
	]);

	return (
		<Suspense fallback={<></>}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
