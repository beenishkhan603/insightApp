import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

import { ProductSchema } from '../../utils/validation';
import ApiRequest from '../../utils/axioInterceptor';
import { toast } from 'react-toastify';

const ProductModal = ({ isOpen, onClose, onCreateProduct, isEdit }) => {
	const navigate = useNavigate();
	const [file, setFile] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(ProductSchema),
	});

	const onDrop = (acceptedFiles) => {
		const selectedFile = acceptedFiles[0];
		setFile(selectedFile);
		const reader = new FileReader();
		reader.onload = () => {
			setPreviewImage(reader.result);
		};
		reader.readAsDataURL(selectedFile);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const handleCreateProduct = async (product) => {
		try {
			if (isEdit) {
			} else {
				let data = new FormData();
				const {
					name,
					description,
					category,
					manufacturer,
					stockQuantity,
					price,
				} = product;
				data.append('name', name);
				data.append('description', description);
				data.append('category', category);
				data.append('manufacturer', manufacturer);
				data.append('stockQuantity', stockQuantity);
				data.append('image', file);
				data.append('price', price);
				const response = await ApiRequest.post(
					`${process.env.REACT_APP_BACKEND_URL}/product`,
					data,
					{
						headers: {
							Authorization: ` ${localStorage.getItem('token')}`,
						},
					}
				);
				if (response) {
					const { data } = response;
					if (data) {
						const { success, message } = data;
						if (success) {
							toast.success(message);
						} else {
							toast.error(message);
						}
					}
				}
			}

			// Reset the form and close the modal
			reset();
			onClose();
		} catch (e) {
			if (e?.response?.status == '401') {
				localStorage.clear();
				navigate('/login');
			}
		}
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
								<label htmlFor="stockQuantity">Stock quantity</label>
								<input
									type="number"
									id="stockQuantity"
									{...register('stockQuantity')}
									className={`appearance-none rounded relative block w-full px-3 py-2 border ${
										errors?.stockQuantity ? 'border-red-500' : 'border-gray-300'
									} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
									placeholder="Product stock quantity"
								/>
								{errors.stockQuantity && (
									<p className="text-red-500 text-xs mt-1">
										{errors.stockQuantity.message}
									</p>
								)}
							</div>
							<div className="mt-5">
								<label htmlFor="manufacturer">Manufacturer</label>
								<input
									type="text"
									id="manufacturer"
									{...register('manufacturer')}
									className={`appearance-none rounded relative block w-full px-3 py-2 border ${
										errors?.manufacturer ? 'border-red-500' : 'border-gray-300'
									} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
									placeholder="Product manufacturer"
								/>
								{errors.manufacturer && (
									<p className="text-red-500 text-xs mt-1">
										{errors.manufacturer.message}
									</p>
								)}
							</div>
							<div className="mt-5">
								<label htmlFor="image">Image</label>
								<div
									{...getRootProps()}
									className={`dropzone ${
										isDragActive ? 'active' : ''
									} border-dashed border-2 border-gray-300`}
								>
									<input {...getInputProps()} />
									{isDragActive ? (
										<p>Drop the image here</p>
									) : (
										<p>Drag 'n' drop an image, or click to select one</p>
									)}
								</div>
								{previewImage && (
									<img
										src={previewImage}
										alt="Preview"
										className="mt-2 max-w-full h-auto"
									/>
								)}
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
