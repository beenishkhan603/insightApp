import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';

import { ProductSchema } from '../../utils/validation';

const ProductModal = ({ isOpen, onClose, onCreateProduct }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(ProductSchema),
	});

	const onDrop = (acceptedFiles) => {
		// Handle dropped files (images) here
		console.log(acceptedFiles);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const handleCreateProduct = (data) => {
		// Call the function to create the product with the form data

		// Reset the form and close the modal
		reset();
		onClose();
	};

	return (
		<div
			className={`fixed z-10 inset-0 overflow-y-auto ${
				isOpen ? 'block' : 'hidden'
			}`}
		>
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
				&#8203;
				<div
					className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-headline"
				>
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<form onSubmit={handleSubmit(handleCreateProduct)}>
							<div className="mt-5">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									id="name"
									{...register('name')}
									className={`appearance-none rounded relative block w-full px-3 py-2 border ${
										errors?.name ? 'border-red-500' : 'border-gray-300'
									} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
									placeholder="Product name"
								/>
								{errors.name && (
									<p className="text-red-500 text-xs mt-1">
										{errors.name.message}
									</p>
								)}
							</div>

							<div className="mt-5">
								<label htmlFor="description">Description</label>
								<input
									type="text"
									id="description"
									{...register('description')}
									className={`appearance-none rounded relative block w-full px-3 py-2 border ${
										errors?.description ? 'border-red-500' : 'border-gray-300'
									} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
									placeholder="Product description"
								/>
								{errors.description && (
									<p className="text-red-500 text-xs mt-1">
										{errors.description.message}
									</p>
								)}
							</div>

							<div className="mt-5">
								<label htmlFor="category">Category</label>
								<input
									type="text"
									id="category"
									{...register('category')}
									className={`appearance-none rounded relative block w-full px-3 py-2 border ${
										errors?.category ? 'border-red-500' : 'border-gray-300'
									} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
									placeholder="Product category"
								/>
								{errors.category && (
									<p className="text-red-500 text-xs mt-1">
										{errors.category.message}
									</p>
								)}
							</div>

							<div className="mt-5">
								<label htmlFor="price">Price</label>
								<input
									type="number"
									id="price"
									{...register('price')}
									className={`appearance-none rounded relative block w-full px-3 py-2 border ${
										errors?.price ? 'border-red-500' : 'border-gray-300'
									} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
									placeholder="Product price"
								/>
								{errors.price && (
									<p className="text-red-500 text-xs mt-1">
										{errors.price.message}
									</p>
								)}
							</div>

							<div className="mt-5">
								<label htmlFor="image">Image</label>
								<div
									{...getRootProps()}
									className={`dropzone ${isDragActive ? 'active' : ''}`}
								>
									<input {...getInputProps()} />
									{isDragActive ? (
										<p>Drop the image here</p>
									) : (
										<p>Drag 'n' drop an image, or click to select one</p>
									)}
								</div>
							</div>

							<div className="flex justify-end mt-5">
								<button
									onClick={() => onClose()}
									className="mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
								>
									Cancel
								</button>
								<button
									type="submit"
									onClick={handleCreateProduct}
									className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductModal;
