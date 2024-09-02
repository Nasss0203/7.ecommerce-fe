import { ICategory } from "@/types/data";

const categoryOptions: ICategory[] = [
	{
		name: "phone",
	},
	{
		name: "laptop",
	},
	{
		name: "tablet",
	},
];

const categoryForm = {
	PHONE: "phone",
	LAPTOP: "laptop",
};

export { categoryForm, categoryOptions };
