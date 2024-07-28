import { Outlet } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";

const LayoutAdmin = () => {
	return (
		<div className='h-screen 2xl:grid 2xl:grid-cols-[280px,minmax(0,1fr)]'>
			<SidebarAdmin></SidebarAdmin>
			<div className=''>
				<HeaderAdmin></HeaderAdmin>
				<div className='p-5 bg-[#dddddd] min-h-screen dark:bg-[#1a222c] '>
					<Outlet></Outlet>
				</div>
			</div>
		</div>
	);
};

export default LayoutAdmin;
