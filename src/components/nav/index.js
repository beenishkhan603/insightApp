import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaSignOutAlt, FaWindowClose } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import Avatar from 'react-avatar';

const Navbar = () => {
	const navigate = useNavigate();
	const [isNavOpen, setNavOpen] = useState(false);
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const menuItems = [
		{ icon: <FaHome size={20} className="mr-8" />, text: 'Dashboard' },
		{ icon: <MdFavorite size={20} className="mr-8" />, text: 'Products' },
		{ icon: <FaSignOutAlt size={20} className="mr-8" />, text: 'Logout' },
	];

	const handleProfileClick = () => {
		setDropdownOpen(!isDropdownOpen);
	};
	const handleLogout = () => {
		navigate('/login');
		localStorage.clear();
	};
	const handleNav = (text) => {
		console.log('text', text, text);
		if (text.toLowerCase() === 'logout') {
			handleLogout();
		} else {
			navigate(`/${text.toLowerCase()}`);
		}
	};
	return (
		<div className="w-full mx-auto flex justify-between items-center py-4 px-8 md:px-20 lg:px-20 shadow-sm">
			{/* Left side */}
			<div className="flex items-center">
				<div
					onClick={() => setNavOpen(!isNavOpen)}
					className="cursor-pointer mr-10"
				>
					<FaBars size={20} />
				</div>
				<h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
					Sila <span className="font-bold">Insights</span>
				</h1>
			</div>

			{/* Profile button and dropdown */}
			<div className="relative">
				<Avatar
					onClick={handleProfileClick}
					className="cursor-pointer text-base"
					size="50"
					name={JSON.parse(localStorage.getItem('user'))?.email || 'User'}
					round
				/>

				{/* User Dropdown */}
				{isDropdownOpen && (
					<div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
						<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
							<div>
								{localStorage.getItem('user') &&
									`${JSON.parse(localStorage.getItem('user')).firstname} ${
										JSON.parse(localStorage.getItem('user')).lastname
									}`}
							</div>
							<div className="font-medium truncate">
								{JSON.parse(localStorage.getItem('user'))?.email}
							</div>
						</div>
						<ul
							className="py-2 text-sm text-gray-700 dark:text-gray-200"
							aria-labelledby="avatarButton"
						>
							<li>
								<Link
									to="/"
									className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Dashboard
								</Link>
							</li>
							<li>
								<Link
									href="/setting"
									className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Settings
								</Link>
							</li>
						</ul>
						<div className="py-1">
							<div
								onClick={handleLogout}
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
							>
								Logout
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Mobile Menu */}
			{isNavOpen && (
				<>
					{/* Overlay */}
					<div
						className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"
						onClick={() => setNavOpen(false)}
					></div>

					{/* Side drawer menu */}
					<div
						className={`fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300  ${
							isNavOpen ? '' : 'left-[-100%]'
						}`}
					>
						<div>
							<FaWindowClose
								onClick={() => setNavOpen(false)}
								size={20}
								className="absolute right-4 top-4 cursor-pointer "
							/>
						</div>
						<nav className="mt-10">
							<ul className="flex flex-col p-4 text-gray-800 mt-35">
								{menuItems.map(({ icon, text }, index) => (
									<li
										key={index}
										className="text-xl flex cursor-pointer w-[100%] rounded-full mx-auto p-2 hover:text-white hover:bg-gray-200"
										onClick={() => handleNav(text)}
									>
										{icon} {text}
									</li>
								))}
							</ul>
						</nav>
					</div>
				</>
			)}
		</div>
	);
};

export default Navbar;
