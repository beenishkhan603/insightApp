import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignInSchema } from '../../utils/validation';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(SignInSchema),
	});
	const onSubmit = (data) => {
		console.log(data);
		reset();
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Log in to your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								{...register('email')}
								className={`appearance-none rounded relative block w-full px-3 py-2 my-5 border ${
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
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								{...register('password')}
								className={`appearance-none rounded relative block w-full px-3 my-5 py-2 border ${
									errors?.password ? 'border-red-500' : 'border-gray-300'
								} placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
								placeholder="Password"
							/>
							{errors?.password && (
								<p className="text-red-500 text-xs mt-1">
									{errors?.password?.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Log in
						</button>
					</div>
				</form>
				<div className="flex justify-center">
					<p>Dont have an account?</p> &nbsp;&nbsp;
					<a href="/signup">Sign up</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
