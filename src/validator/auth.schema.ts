import { z } from 'zod';

export const SignUpBody = z
	.object({
		name: z
			.string()
			.trim()
			.min(8, { message: 'Name must be at least 8 characters long.' })
			.max(256, { message: 'Name must not exceed 256 characters.' }),
		email: z.string().email({ message: 'Invalid email address.' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long.' })
			.max(100, { message: 'Password must not exceed 100 characters.' }),
	})
	.strict();

export type SignUpBodyType = z.TypeOf<typeof SignUpBody>;

export const SignInBody = z
	.object({
		email: z.string().email({ message: 'Invalid email address.' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long.' })
			.max(100, { message: 'Password must not exceed 100 characters.' }),
	})
	.strict();

export type SignInBodyType = z.TypeOf<typeof SignInBody>;
