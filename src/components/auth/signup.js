import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { SignUpSchema } from '../../utils/validation';
import ApiRequest from '../../utils/axioInterceptor';

const SignUp = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(SignUpSchema),
	});
	const [err, setErr] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfrimPassword, setShowConfrimPassword] = useState(false);

	const onSubmit = async (data) => {
		try {
			setErr('');
			const response = await ApiRequest.post(
				`${process.env.REACT_APP_BACKEND_URL}/signup`,
				data
			);
			if (response) {
				const { data } = response;
				if (data) {
					const { success, message } = data;
					if (success) {
						reset();
					} else {
						setErr(message);
					}
				}
			}
		} catch (e) {
			if (e?.response?.data?.message) {
				setErr(e?.response?.data?.message);
			} else {
				setErr('Something went worng. Please try again later');
			}
		}
	};
	useEffect(() => {
		// Check if the user has a valid access token
		const accessToken = localStorage.getItem('token');
		if (accessToken) {
			navigate('/dashboard'); // Redirect to the dashboard if a valid token exists
		}
	}, []);
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Create a new account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="first-name" className="sr-only">
								Frist name
							</label>
							<input
								id="first-name"
								name="firstName"
								type="text"
								{...register('firstName')}
								className={`appearance-none rounded relative block w-full px-3 py-2 mt-5 border ${
									errors?.firstName ? 'border-red-500' : 'border-gray-300'
								} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
								placeholder="Frist name"
							/>
							{errors?.firstName && (
								<p className="text-red-500 text-xs mt-1">
									{errors?.firstName?.message}
								</p>
							)}
						</div>
						<div>
							<label htmlFor="last-name" className="sr-only">
								Last name
							</label>
							<input
								id="last-name"
								name="lastName"
								type="text"
								{...register('lastName')}
								className={`appearance-none rounded relative block w-full px-3 py-2 mt-5 border ${
									errors?.lastName ? 'border-red-500' : 'border-gray-300'
								} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
								placeholder="Last name"
							/>
							{errors?.lastName && (
								<p className="text-red-500 text-xs mt-1">
									{errors?.lastName?.message}
								</p>
							)}
						</div>
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								{...register('email')}
								className={`appearance-none rounded relative block w-full px-3 py-2 mt-5 border ${
									errors?.email ? 'border-red-500' : 'border-gray-300'
								} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
								placeholder="Email address"
							/>
							{errors?.email && (
								<p className="text-red-500 text-xs mt-1">
									{errors?.email?.message}
								</p>
							)}
						</div>
						<div className="relative">
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								autoComplete="current-password"
								{...register('password')}
								className={`appearance-none rounded relative block w-full px-3 mt-5 py-2 border ${
									errors?.password ? 'border-red-500' : 'border-gray-300'
								} placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
								placeholder="Password"
							/>
							<div
								className={`absolute ${
									errors?.password ? 'top-[10px]' : 'inset-y-0'
								} right-0 pr-3 flex items-center cursor-pointer z-10`}
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <FaEye /> : <FaEyeSlash />}
							</div>
							{errors?.password && (
								<p className="text-red-500 text-xs mt-1">
									{errors?.password?.message}
								</p>
							)}
						</div>

						<div className="relative">
							<label htmlFor="confirmPassword" className="sr-only">
								Confirm Password
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type={showConfrimPassword ? 'text' : 'password'}
								autoComplete="current-password"
								{...register('confirmPassword')}
								className={`appearance-none rounded relative block w-full px-3 mt-5 py-2 border ${
									errors?.confirmPassword ? 'border-red-500' : 'border-gray-300'
								} placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
								placeholder="Confirm Password"
							/>
							<div
								className={`absolute ${
									errors?.confirmPassword ? 'top-[10px]' : 'inset-y-0'
								} right-0 pr-3 flex items-center cursor-pointer z-10`}
								onClick={() => setShowConfrimPassword(!showConfrimPassword)}
							>
								{showConfrimPassword ? <FaEye /> : <FaEyeSlash />}
							</div>
							{errors?.confirmPassword && (
								<p className="text-red-500 text-xs mt-1">
									{errors?.confirmPassword?.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign up
						</button>
					</div>
				</form>
				{err.length > 0 ? (
					<div className="flex justify-center">
						<p className="text-red-500">{err}</p>
					</div>
				) : (
					''
				)}
				<div className="flex justify-center">
					<p>Already have an account?</p>&nbsp;&nbsp;
					<a href="/login">Login</a>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
