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
