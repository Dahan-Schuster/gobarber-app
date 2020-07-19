import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	Image,
	ScrollView,
	View,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TextInput,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import Toast from 'react-native-simple-toast';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import { colors } from '../../styles';

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const inputEmailRef = useRef<TextInput>(null);
	const inputPasswordRef = useRef<TextInput>(null);
	const navigation = useNavigation();
	const [showCreateAccount, setShowCreateAccount] = useState(true);

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', () => {
			setShowCreateAccount(false);
		});

		Keyboard.addListener('keyboardDidHide', () => {
			setShowCreateAccount(true);
		});
	}, []);

	const handleSignUp = useCallback(
		async (data: SignUpFormData) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					name: Yup.string().required('Nome obrigatório'),
					email: Yup.string()
						.required('Email obrigatório')
						.email('Email inválido'),
					password: Yup.string().min(6, 'No mínimo 6 dígitos'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await api.post('/users', data);
				navigation.navigate('SignIn');

				Toast.show('Cadastro realizado com sucesso, faça seu login.');
			} catch (err) {
				let toastDescription =
					'Ocorreu um erro ao tentar realizar o cadastro. ' +
					'Por favor, tente novamente.';

				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);

					toastDescription =
						'Dados incorretos. Por favor, verifique os dados e tente novamente.';
				}

				console.log(toastDescription);
				Toast.show(toastDescription, Toast.LONG);
			}
		},
		[navigation],
	);

	return (
		<>
			<KeyboardAvoidingView
				enabled
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{ flex: 1 }}
				>
					<Container>
						<Image source={logoImg} />
						<View>
							<Title>Crie sua conta</Title>
						</View>

						<Form ref={formRef} onSubmit={handleSignUp}>
							<Input
								name="name"
								icon="user"
								placeholder="Nome"
								autoCorrect
								autoCapitalize="words"
								returnKeyType="next"
								onSubmitEditing={inputEmailRef.current?.focus}
							/>
							<Input
								ref={inputEmailRef}
								name="email"
								icon="mail"
								placeholder="E-mail"
								autoCorrect={false}
								autoCapitalize="none"
								keyboardType="email-address"
								returnKeyType="next"
								onSubmitEditing={
									inputPasswordRef.current?.focus
								}
							/>
							<Input
								ref={inputPasswordRef}
								name="password"
								icon="lock"
								placeholder="Senha"
								secureTextEntry
								returnKeyType="send"
								onSubmitEditing={formRef.current?.submitForm}
							/>

							<Button onPress={formRef.current?.submitForm}>
								Entrar
							</Button>
						</Form>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
			{showCreateAccount && (
				<BackToSignIn onPress={() => navigation.goBack()}>
					<Icon name="arrow-left" size={20} color={colors.light} />
					<BackToSignInText>Voltar para o login</BackToSignInText>
				</BackToSignIn>
			)}
		</>
	);
};

export default SignUp;
