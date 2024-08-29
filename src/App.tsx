import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//Admin
const LayoutAdmin = lazy(() => import("@/layouts/admin/LayoutAdmin"));
const DashboardAdmin = lazy(() => import("@/pages/admin/DashboardAdmin"));

//Product
const ProductAdmin = lazy(() => import("@/pages/admin/product/ProductAdmin"));
const ProductAdd = lazy(() => import("@/pages/admin/product/ProductAdd"));
const ProductList = lazy(() => import("@/pages/admin/product/ProductList"));
const ProductEdit = lazy(() => import("@/pages/admin/product/ProductEdit"));

//Order
const OrderAdmin = lazy(() => import("@/pages/admin/order/OrderAdmin"));
const OrderDetailsAdmin = lazy(
	() => import("@/pages/admin/order/OrderDetailsAdmin"),
);

//Discount
const DiscountPage = lazy(() => import("@/pages/admin/discount/DiscountPage"));

//User
//LandingPage
const LayoutCustomer = lazy(() => import("@/layouts/user/LayoutCustomer"));
const HomePage = lazy(() => import("@/pages/user/HomePage"));
const DetailProductHome = lazy(() => import("@/pages/user/DetailProductPage"));
const CategoryPage = lazy(() => import("@/pages/user/CategoryPage"));
const CheckoutPage = lazy(() => import("@/pages/user/CheckoutPage"));
const CartPage = lazy(() => import("@/pages/user/CartPage"));
const OrderPage = lazy(() => import("@/pages/user/OrderPage"));
const PageNotFound = lazy(() => import("@/pages/user/PageNotFound"));

const OrderSuccess = lazy(() => import("@/pages/user/order/OrderSuccess"));

//Auth
const SignUpPage = lazy(() => import("@/pages/auth/SignUpPage"));
const SignInPage = lazy(() => import("@/pages/auth/SignInPage"));

function App() {
	const Loading = () => (
		<div className='animate-spin'>
			<div className='w-5 h-5 border rounded-full border-neutral-400 border-t-transparent'></div>
		</div>
	);
	const router = createBrowserRouter([
		{
			path: "*",
			element: <PageNotFound></PageNotFound>,
		},
		{
			path: "admin",
			element: <LayoutAdmin />,
			children: [
				{
					path: "dashboard",
					element: <DashboardAdmin />,
				},
				{
					path: "order",
					element: <OrderAdmin />,
				},
				{
					path: "order-details/:orderId",
					element: <OrderDetailsAdmin />,
				},
				{
					path: "product",
					element: <ProductAdmin />,
				},
				{
					path: "product/product-add",
					element: <ProductAdd />,
				},
				{
					path: "product/product-list",
					element: <ProductList />,
				},
				{
					path: "product/product-edit/:editID",
					element: <ProductEdit />,
				},
				{
					path: "discount",
					element: <DiscountPage />,
				},
			],
		},
		{
			path: "",
			element: <LayoutCustomer />,
			children: [
				{
					path: "",
					element: <HomePage />,
				},

				{
					path: ":category",
					element: <CategoryPage />,
				},
				{
					path: ":category/:id",
					element: <DetailProductHome />,
				},
				{
					path: "cart",
					element: <CartPage />,
				},
				{
					path: "checkout",
					element: <CheckoutPage />,
				},
				{
					path: "order",
					element: <OrderPage />,
				},
				{
					path: "order-success",
					element: <OrderSuccess />,
				},
				{
					path: "sign-up",
					element: <SignUpPage />,
				},
				{
					path: "sign-in",
					element: <SignInPage />,
				},
			],
		},
	]);

	return (
		<Suspense fallback={<Loading></Loading>}>
			{/* <AuthProvider>
			</AuthProvider> */}
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
