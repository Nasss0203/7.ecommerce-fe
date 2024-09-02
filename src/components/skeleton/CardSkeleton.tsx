import { Skeleton } from "../ui/skeleton";

const CardSkeleton = () => {
	return (
		<div className='flex flex-col gap-2 px-2 py-3 bg-white border rounded shadow-lg lg:gap-2 border-neutral-300'>
			<Skeleton className='lg:h-[170px] h-[160px] w-auto'></Skeleton>
			<Skeleton className='w-auto h-3 mr-14'></Skeleton>
			<Skeleton className='w-auto h-6 '></Skeleton>
			<Skeleton className='w-auto h-5 mr-7'></Skeleton>
		</div>
	);
};

export default CardSkeleton;
