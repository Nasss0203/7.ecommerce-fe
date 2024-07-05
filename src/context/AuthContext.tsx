import { isAuthenticated } from '@/api/auth.api';
import LayoutCustomer from '@/layouts/user/LayoutCustomer';
import SignInPage from '@/pages/auth/SignInPage';
import React, {
	createContext,
	useEffect,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
} from 'react';

export interface AuthContextType {
	currentAuth: any;
	setCurrentAuth: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [currentAuth, setCurrentAuth] = useState<any>(null);

	useEffect(() => {
		const checkLoggedIn = async () => {
			let cuser = await isAuthenticated();
			if (!cuser) {
				localStorage.setItem('user', '');
				cuser = null;
			}
			setCurrentAuth(cuser);
		};

		checkLoggedIn();
	}, []);

	console.log('usercontext', currentAuth);

	return (
		<AuthContext.Provider value={{ currentAuth, setCurrentAuth }}>
			{currentAuth?.metadata?.tokens ? children : children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
