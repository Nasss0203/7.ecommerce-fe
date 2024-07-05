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

export interface IElectronics {
	brand: string;
	ram: number;
	screen: number;
	data: number;
	product_auth?: string | undefined;
}

export interface ILaptops {
	brand: string;
	ram: number;
	screen: number;
	data: number;
	battery_life: string;
	keyboard_layout: string;
	product_auth?: string | undefined;
}

export interface IProduct {
	product_auth?: string | undefined;
	product_name: string;
	product_thumb: string;
	product_description: string;
	product_price: number;
	product_quantity: number;
	product_discount?: number;
	product_stock?: number;
	product_category: string;
	product_attributes: IElectronics;
}
