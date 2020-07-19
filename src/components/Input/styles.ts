import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { colors, fonts } from '../../styles';

interface ContainerProps {
	isFocused: boolean;
	isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
	width: 100%;
	height: 60px;
	padding: 0 16px;
	background: ${colors.input.background};
	border-radius: 10px;
	margin-bottom: 8px;
	border-width: 2px;
	border-color: ${colors.dark};

	${(props) =>
		props.isErrored &&
		css`
			border-color: ${colors.error};
		`}

	${(props) =>
		props.isFocused &&
		css`
			border-color: ${colors.primary};
		`}

	flex-direction: row;
	align-items: center;
`;

export const IconInput = styled(FeatherIcon)`
	margin-right: 8px;
`;

interface InputProps {
	isFilled: boolean;
}

export const TextInput = styled.TextInput<InputProps>`
	flex: 1;
	color: ${colors.input.color};
	font-size: ${fonts.size.input};
	font-family: ${fonts.family.regular};
`;
