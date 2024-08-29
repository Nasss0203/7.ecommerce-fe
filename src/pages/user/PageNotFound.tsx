import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

const PageNotFound = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return <div>This page doesn't exist!</div>;
		}

		if (error.status === 401) {
			return <div>You aren't authorized to see this</div>;
		}

		if (error.status === 503) {
			return <div>Looks like our API is down</div>;
		}

		if (error.status === 418) {
			return <div>🫖</div>;
		}
	}

	return (
		<div className='container py-20'>
			<div className='flex items-center justify-center'>
				<div className='flex flex-col gap-5'>
					<div className='w-full h-full'>
						<img
							srcSet='404.png 2x'
							alt=''
							className='flex-shrink-0 object-contain w-full h-full'
						/>
					</div>
					<div className='flex flex-col items-center justify-center gap-5 text-center'>
						<h1 className='text-[56px] font-bold text-gray-900'>
							PAGE NOT FOUND
						</h1>
						<p className='text-gray-400 textlg'>
							It looks like nothing was found at this location.
							Maybe try to search for what you are looking for?
						</p>
						<Link
							to={"/"}
							className='block w-56 px-10 py-2 text-base font-medium text-white rounded-md bg-primary-500'
						>
							Go To HomePage
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
