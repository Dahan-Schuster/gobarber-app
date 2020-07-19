import React, {
	useEffect,
	useRef,
	useImperativeHandle,
	forwardRef,
	useState,
	useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, IconInput } from './styles';
import colors from '../../styles/colors';

interface InputProps extends TextInputProps {
	name: string;
	icon: string;
}

interface InputValueReference {
	value: string;
}

interface InputRef {
	focus(): void;
}

// Componentes que recebem uma ref como propriedade devem ser do tipo ForwardRefRenderFunction
const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
	{ name, icon, ...rest },
	reference,
) => {
	const { registerField, defaultValue = '', fieldName, error } = useField(
		name,
	);

	// referência ao componente Input
	const inputElementRef = useRef<any>(null);

	// referência ao valor do input
	const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);

	const handleInputFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleInputBlur = useCallback(() => {
		setIsFocused(false);
		setIsFilled(!!inputValueRef.current?.value);
	}, []);

	// Hook para passar informações de um componente filho para um componente pai
	// Utilizado em casos específicos
	// Neste caso, está sendo utilizado porque o componente InputText possui
	// um ref utilizado pelo unform e um ref que pode ser recebido via props,
	// e nós queremos ditar o comportamento do método focus() do componente pai
	useImperativeHandle(reference, () => ({
		focus() {
			// Injeta o método focus da referência do componente filho TextInput
			// no método focus da referência do componente pai Input
			inputElementRef.current?.focus();
		},
	}));

	useEffect(() => {
		// Registra um campo no unform
		registerField({
			name: fieldName,
			// Envia a referência do valor do input para o unform
			ref: inputValueRef.current,
			// Informa qual propriedade dentro da referência reflete o valor do input
			path: 'value',
			// Informa o comportamento que deve ser tomado ao alterar o valor do input através do código
			setValue(_ref: any, value) {
				// Atualiza a referência do valor do Input
				inputValueRef.current.value = String(value);

				// Atualiza o texto apresentado na tela pelo componente Input
				inputElementRef.current?.setNativeProps({
					text: String(value),
				});
			},
			// Informa o comportamento que deve ser tomado ao apagar o valor do input através do código
			clearValue() {
				inputValueRef.current.value = '';
				inputElementRef.current?.clear();
			},
		});
	}, [fieldName, registerField]);

	return (
		<Container isFocused={isFocused} isErrored={!!error}>
			<IconInput
				name={icon}
				size={20}
				color={
					isFocused || isFilled
						? colors.primary
						: colors.input.placeholder
				}
			/>
			<TextInput
				isFilled={isFilled}
				ref={inputElementRef}
				keyboardAppearance="dark"
				placeholderTextColor={colors.input.placeholder}
				onChangeText={(value) => {
					// quanto o texto do input mudar, altere o valor de sua referência
					inputValueRef.current.value = value;
				}}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				{...rest}
			/>
		</Container>
	);
};

// Qualquer componente que seja do tipo ForwardRefRenderFunction
// deve ser exportado através de um forwardRed()
export default forwardRef(Input);
