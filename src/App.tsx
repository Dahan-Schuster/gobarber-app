import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthRoutes from './routes';
import colors from './styles/colors';

const App: React.FC = () => (
	<NavigationContainer>
		<StatusBar
			barStyle="light-content"
			backgroundColor={colors.background}
		/>
		<View style={{ backgroundColor: colors.background, flex: 1 }}>
			<AuthRoutes />
		</View>
	</NavigationContainer>
);

export default App;
