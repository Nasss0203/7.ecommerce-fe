import { Outlet } from "react-router-dom";
import HeaderCustomer from "./HeaderCustomer";

const LayoutCustomer = () => {
	return (
		<div className='flex flex-col '>
			<HeaderCustomer></HeaderCustomer>
			<div className='py-5 mt-[--header]'>
				<Outlet></Outlet>
			</div>
			<footer></footer>
		</div>
	);
};

export default LayoutCustomer;
