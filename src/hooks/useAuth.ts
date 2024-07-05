import AuthContext, { AuthContextType } from '@/context/AuthContext';
import { IAuthResponse } from '@/types/data';
import { useContext, useEffect, useState } from 'react';

export const useAuth = (): AuthContextType | undefined => {
	const auth = useContext(AuthContext);
	const [dataAuth, setDataAuth] = useState<AuthContextType | undefined>(auth);

	useEffect(() => {
		setDataAuth(auth);
	}, [auth]);

	return dataAuth;
};
