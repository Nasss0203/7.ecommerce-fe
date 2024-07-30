import React from "react";

const FormGrid = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={`grid grid-cols-1 gap-5 lg:grid-cols-2 ${className}`}>
			{children}
		</div>
	);
};

export default FormGrid;
