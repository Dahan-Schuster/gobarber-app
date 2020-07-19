import React from 'react';
import { Text, View, Button } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { colors } from '../../styles';

const Dashboard: React.FC = () => {
	const { signOut } = useAuth();

	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Text style={{ color: '#fff', marginBottom: 20 }}>Dashboard</Text>
			<Button title="Logout" color={colors.primary} onPress={signOut} />
		</View>
	);
};

export default Dashboard;
