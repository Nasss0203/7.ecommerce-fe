export interface IAuth {
	_id?: string;
	name?: string;
	email: string;
	password: string;
}

export interface IBackEnd<T> {
	message: string;
	metadata: T;
	status: number;
}

export interface IResponse<T> {
	currentPage?: number;
	data?: T;
	totalPages?: number;
}

export interface IToken {
	accessToken: string;
	refreshToken: string;
}

export interface ICategory {
	name: string;
}

export interface IAuthResponse {
	message?: string;
	metadata?: {
		data?: IAuth;
		tokens?: IToken;
	};
}

export interface IPhones {
	brand?: string;
	ram?: string;
	screen?: string;
	data?: string;
	product_auth?: string | undefined;
}

export interface ILaptops {
	brand?: string;
	ram?: string;
	screen?: string;
	ssd?: string;
	cpu?: string;
	product_auth?: string | undefined;
}

export interface ITablet {
	brand?: string;
	ram?: string;
	screen?: string;
	pin?: string;
	product_auth?: string | undefined;
}

export interface IProduct {
	_id: string;
	product_auth?: string | undefined;
	product_name: string;
	product_thumb: string;
	product_description: string;
	product_slug: string;
	product_price: number;
	product_quantity: number;
	product_discount?: number;
	product_stock?: number;
	product_category: string;
	product_attributes: IPhones | ILaptops | ITablet;
}

export interface ICart {
	userId: string;
	product: {
		productId?: string;
		shopId?: string;
		quantity: number;
		name?: string;
		price?: number;
		image?: string;
		slug?: string;
		category?: string;
	};
}

export interface IUpdateCart {
	userId: string;
	shop_order_ids: [
		{
			shopId: string;
			item_products: [
				{
					quantity: number;
					price: number;
					shopId: string;
					old_quantity: number;
					productId: string;
				},
			];
		},
	];
}

export interface IDiscount {
	_id?: string;
	discount_name?: string;
	discount_description?: string;
	discount_type?: string;
	discount_value?: number;
	discount_code?: string;
	discount_start_date?: Date;
	discount_end_date?: Date;
	discount_max_uses?: number;
	discount_uses_count: number;
	discount_users_used?: [];
	discount_max_uses_per_user?: number;
	discount_min_order_value?: number;
	discount_is_active?: boolean;
	discount_apply_to?: string;
	discount_product_ids?: string[];
}
