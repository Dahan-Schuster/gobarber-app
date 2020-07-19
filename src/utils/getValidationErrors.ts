import { ValidationError } from 'yup';

interface Errors {
	[key: string]: string;
}

export default function getValidationErrors(
	validationErrors: ValidationError,
): Errors {
	const errors: Errors = {};

	validationErrors.inner.forEach(({ path, message }) => {
		errors[path] = message;
	});

	return errors;
}
