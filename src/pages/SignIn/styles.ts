import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { fonts, colors } from '../../styles';

export const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;

	padding: 0 40px ${Platform.OS === 'android' ? 50 : 40}px;
`;

export const Title = styled.Text`
	font-size: 24px;
	color: ${colors.light};
	font-family: ${fonts.family.medium};
	margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
	margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
	color: ${colors.light};
	font-size: ${fonts.size.regular};
	font-family: ${fonts.family.regular};
`;

export const CreateAccountButton = styled.TouchableOpacity`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;

	flex-direction: row;
	justify-content: center;
	align-items: center;

	padding: 16px 0 ${16 + getBottomSpace()}px;
	background: ${colors.background};
	border-top-width: 1px;
	border-top-color: ${colors.darker};
`;

export const CreateAccountButtonText = styled.Text`
	color: ${colors.primary};
	font-size: ${fonts.size.button};
	font-family: ${fonts.family.regular};
	margin-left: 16px;
`;
