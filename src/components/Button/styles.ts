import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { colors, fonts } from '../../styles';

export const Container = styled(RectButton)`
	width: 100%;
	height: 60px;
	background: ${colors.primary};
	border-radius: 10px;
	margin-top: 8px;

	justify-content: center;
	align-items: center;
`;

export const ButtonText = styled.Text`
	font-family: ${fonts.family.medium};
	color: ${colors.dark};
	font-size: ${fonts.size.button};
`;
