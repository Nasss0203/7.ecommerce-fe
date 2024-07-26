export interface IAuth {
	_id?: string;
	name?: string;
	email: string;
	password: string;
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
	product_description?: string;
	product_slug: string;
	product_price: number;
	product_quantity: number;
	product_discount?: number;
	product_stock?: number;
	product_category: string;
	product_attributes: IPhones | ILaptops | ITablet;
}

export interface IProductResponse<T> {
	message: string;
	metadata: T[];
	status: number;
}
