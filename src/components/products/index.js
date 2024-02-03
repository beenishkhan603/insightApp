import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Confrimation from '../modals/confrimation';
import ProductModal from './create';
import ApiRequest from '../../utils/axioInterceptor';
import Navbar from '../nav';

const Product = () => {
	const navigate = useNavigate();
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const [showProductPopup, setShowProductPopup] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [products, setProducts] = useState([]);
	const [isEdit, setIsEdit] = useState(false);

	const handleDeleteClick = (product) => {
		setSelectedProduct(product);
		setShowDeletePopup(true);
	};

	const handleDeleteConfirm = async () => {
		try {
			const response = await ApiRequest.delete(
				`${process.env.REACT_APP_BACKEND_URL}/product/${selectedProduct._id}`,
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
						setProducts(
							products.filter((product) => product._id !== selectedProduct._id)
						);
						toast.success(message);
					}
				}
			}
			setShowDeletePopup(false);
		} catch (e) {
			if (e?.response?.code === '401') {
				localStorage.clear();
				navigate('/login');
			}
		}
	};
	const handleEdit = (id) => {};
	const handleCreate = async () => {
		setIsEdit(false);
		setShowProductPopup(true);

		// try {
		// 	const response = await ApiRequest.post(
		// 		`${process.env.REACT_APP_BACKEND_URL}/product`,
		// 		{
		// 			headers: {
		// 				Authorization: ` ${localStorage.getItem('token')}`,
		// 			},
		// 		}
		// 	);
		// 	if (response) {
		// 	}
		// } catch (e) {
		// 	console.log('e', e);
		// 	if (e?.response?.status == '401') {
		// 		localStorage.clear();
		// 		navigate('/login');
		// 	}
		// }
	};
	const handleProductData = async () => {
		try {
			const response = await ApiRequest.get(
				`${process.env.REACT_APP_BACKEND_URL}/product`,
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
						setProducts(data?.data);
					} else {
						toast.error(message);
					}
				}
			}
			setShowDeletePopup(false);
		} catch (e) {
			console.log('e', e);
			if (e?.response?.status == '401') {
				localStorage.clear();
				navigate('/login');
			}
		}
	};
	useEffect(() => {
		handleProductData();
	}, []);

	return (
		<>
			<Navbar />
			<div className="container mx-auto p-4">
				<h1 className="text-2xl font-bold mb-4">Products</h1>
				<button onClick={handleCreate}>Create</button>
				{/* Product Table */}
				{products?.length > 0 ? (
					<table className="min-w-full bg-white border border-gray-300">
						<thead>
							<tr>
								<th className="py-2 px-4 border-b">Name</th>
								<th className="py-2 px-4 border-b">Description</th>
								<th className="py-2 px-4 border-b">Category</th>
								<th className="py-2 px-4 border-b">Price</th>
								<th className="py-2 px-4 border-b">Manufacturer</th>
								<th className="py-2 px-4 border-b">Stock Quantity</th>
								<th className="py-2 px-4 border-b">Actions</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td className="py-2 px-4 border-b">{product.name}</td>
									<td className="py-2 px-4 border-b">{product.description}</td>
									<td className="py-2 px-4 border-b">{product.category}</td>
									<td className="py-2 px-4 border-b">{product.price}</td>
									<td className="py-2 px-4 border-b">{product.manufacturer}</td>
									<td className="py-2 px-4 border-b">
										{product.stockQuantity}
									</td>
									<td className="py-2 px-4 border-b">
										<button
											onClick={() => handleEdit(product._id)}
											className="text-red-500 hover:underline"
										>
											Edit
										</button>{' '}
										&nbsp;&nbsp;
										<button
											onClick={() => handleDeleteClick(product)}
											className="text-red-500 hover:underline"
										>
											Delete
										</button>
										{/* Add edit icon/button here if needed */}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p className="text-gray-500">No data available</p>
				)}
				{/* Delete Confirmation Popup */}
				{showDeletePopup ? (
					<Confrimation
						text={`Are you sure you want to delete ${selectedProduct.name} `}
						onClose={() => setShowDeletePopup(false)}
						handleDeleteConfirm={handleDeleteConfirm}
					/>
				) : (
					''
				)}
				{/* Product Popup */}
				{showProductPopup ? (
					<ProductModal
						onClose={() => setShowProductPopup(false)}
						isEdit={isEdit}
						isOpen={showProductPopup}
					/>
				) : (
					''
				)}
			</div>
		</>
	);
};

export default Product;
