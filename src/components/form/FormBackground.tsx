import React from "react";

const FormBackground = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='dark:bg-[#313d4a] bg-white px-5 py-4 rounded-md space-y-3 min-h-screen'>
			{children}
		</div>
	);
};

export default FormBackground;
