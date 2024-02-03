import React from 'react';

const Confrimation = (props) => {
	const { text, onClose, handleDeleteConfirm } = props;
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-4 rounded-md">
				<p className="mb-4">{text}</p>
				<div className="flex justify-end">
					<button
						onClick={() => onClose()}
						className="mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
					>
						Cancel
					</button>
					<button
						onClick={handleDeleteConfirm}
						className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};
export default Confrimation;
