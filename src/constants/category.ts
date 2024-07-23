import { ICategory } from "@/types/data";

const categoryOptions: ICategory[] = [
	{
		name: "Phones",
	},
	{
		name: "Laptops",
	},
	{
		name: "Tablets",
	},
];

const categoryForm = {
	PHONE: "Phones",
	LAPTOP: "Laptops",
};

export { categoryForm, categoryOptions };
