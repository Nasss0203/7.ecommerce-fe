import { z } from "zod";

const OrderStatusSchema = z.enum([
	"pending",
	"confirmed",
	"shipped",
	"cancelled",
	"delivered",
]);

export const UpdateOrderBody = z.object({
	order_id: z.string(),
	order_payment: z.string(),
	// order_products: z.object({}),
	order_status: OrderStatusSchema,
	order_userId: z.string(),
	createdOn: z.date(),
});

export type UpdateOrderType = z.TypeOf<typeof UpdateOrderBody>;
