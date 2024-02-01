import * as Yup from 'yup';
const SignUpSchema = Yup.object().shape({
	email: Yup.string()
		.trim('Email shouldnt have space')
		.strict(true)
		.required('Email is required')
		.matches(
			/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
			'Email must be a valid'
		),
	// firstName: Yup.string()
	// 	.required('First name is required')
	// 	.min(2, 'Too Short!')
	// 	.max(50, 'Too Long!')
	// 	.matches(/^(?![\s])(.*)/, 'Space at start are not allowed'),
	// lastName: Yup.string()
	// 	.required('Last name is required')
	// 	.min(2, 'Too Short!')
	// 	.max(50, 'Too Long!')
	// 	.matches(/^(?![\s])(.*)/, 'Space at start are not allowed'),
	password: Yup.string()
		.required('Password is required')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character'
		),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Confirm Password is required'),
});
const SignInSchema = Yup.object().shape({
	email: Yup.string()
		.trim('Email shouldnt have space')
		.strict(true)
		.required('Email is required')
		.matches(
			/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
			'Email must be a valid'
		),

	password: Yup.string().required('Password is required'),
});

export { SignUpSchema, SignInSchema };
