import { z } from 'zod';

// Define the product category schema
const ProductCategorySchema = z.enum(['Electronics', 'Laptops', 'Tablets']);

// Define the product attributes schema
const ElectronicAttributesSchema = z.object({
	brand: z.string(),
	ram: z.number(),
	screen: z.number(),
	data: z.number(),
	product_auth: z.string().optional(), // Assuming ObjectId translates to a string
});

const LaptopAttributesSchema = z.object({
	brand: z.string(),
	ram: z.number(),
	screen: z.number(),
	data: z.number(),
	product_auth: z.string().optional(), // Assuming ObjectId translates to a string
	battery_life: z.string().optional(),
	keyboard_layout: z.string().optional(),
});

// Define the main product schema
export const CreateNewProductBody = z.object({
	product_name: z.string(),
	product_thumb: z.string(),
	product_price: z.number(),
	product_description: z.string().optional(),
	// product_image: z.array(z.string()),
	product_quantity: z.number(),
	product_stock: z.number().optional(),
	product_category: ProductCategorySchema, // Using the defined enum schema
	product_attributes: z.union([
		ElectronicAttributesSchema,
		LaptopAttributesSchema,
		// Add more schemas for other product categories if needed
	]),
	product_auth: z.string().optional(), // Assuming Schema.Types.ObjectId translates to a string
});

export type CreateNewProductType = z.TypeOf<typeof CreateNewProductBody>;
