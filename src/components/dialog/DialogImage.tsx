import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { AlertDialogHeader } from '../ui/alert-dialog';

const DialogImage = ({ image }: { image: string }) => {
	return (
		<Dialog>
			<DialogTrigger>
				<div className='w-10 h-12'>
					<img src={image} alt='' className='object-cover w-full h-full' />
				</div>
			</DialogTrigger>
			<DialogContent>
				<AlertDialogHeader>
					{/* <DialogTitle>Product images</DialogTitle> */}
					<DialogDescription>
						<div className='flex justify-center w-full h-full '>
							<img src={image} alt='' className='object-cover w-full h-full' />
						</div>
					</DialogDescription>
				</AlertDialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default DialogImage;
