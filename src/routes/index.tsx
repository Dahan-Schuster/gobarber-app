import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import colors from '../styles/colors';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
	<Auth.Navigator
		screenOptions={{
			headerShown: false,
			cardStyle: { backgroundColor: colors.background },
		}}
	>
		<Auth.Screen name="SignIn" component={SignUp} />
		<Auth.Screen name="SignUp" component={SignIn} />
	</Auth.Navigator>
);

export default AuthRoutes;
