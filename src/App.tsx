import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes';
import colors from './styles/colors';

const App: React.FC = () => (
	<NavigationContainer>
		<StatusBar
			barStyle="light-content"
			backgroundColor={colors.background}
		/>
		<AppProvider>
			<View style={{ backgroundColor: colors.background, flex: 1 }}>
				<Routes />
			</View>
		</AppProvider>
	</NavigationContainer>
);

export default App;
