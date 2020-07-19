import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface SigninCredentials {
	email: string;
	password: string;
}

interface AuthContextData {
	user: object;
	signIn(credentials: SigninCredentials): Promise<void>;
	signOut(): void;
	loading: boolean;
}

interface AuthData {
	token: string;
	user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
	const [authData, setAuthData] = useState<AuthData>({} as AuthData);
	const [loading, setLoading] = useState(true);

	const signIn = useCallback(async ({ email, password }) => {
		const response = await api.post<AuthData>('/sessions', {
			email,
			password,
		});

		const { token, user } = response.data;
		await AsyncStorage.multiSet([
			['@GoBarber:token', token],
			['@GoBarber:user', JSON.stringify(user)],
		]);

		setAuthData({ token, user });
	}, []);

	const signOut = useCallback(async () => {
		await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

		setAuthData({} as AuthData);
	}, []);

	useEffect(() => {
		async function loadStoragedData(): Promise<void> {
			const [[, token], [, user]] = await AsyncStorage.multiGet([
				'@GoBarber:token',
				'@GoBarber:user',
			]);

			const data = {} as AuthData;

			if (token && user) {
				data.token = token;
				data.user = JSON.parse(user);
				setAuthData(data);
			}

			setLoading(false);
		}

		loadStoragedData();
	});

	return (
		<AuthContext.Provider
			value={{ user: authData.user, signIn, signOut, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	if (!context)
		throw new Error(
			'useAuth must be used within an AuthProvider component.',
		);

	return context;
}
