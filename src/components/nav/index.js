import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaSignOutAlt, FaWindowClose } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';

const Navbar = () => {
	const navigate = useNavigate();
	const [isNavOpen, setNavOpen] = useState(false);
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const menuItems = [
		{ icon: <FaHome size={25} className="mr-4" />, text: 'Dashboard' },
		{ icon: <MdFavorite size={25} className="mr-4" />, text: 'Reviews' },
		{ icon: <FaSignOutAlt size={25} className="mr-4" />, text: 'Logout' },
	];

	const handleProfileClick = () => {
		setDropdownOpen(!isDropdownOpen);
	};
	const handleLogout = () => {
		navigate('/login');
		localStorage.clear();
	};

	return (
		<div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm">
			{/* Left side */}
			<div className="flex items-center">
				<div onClick={() => setNavOpen(!isNavOpen)} className="cursor-pointer">
					<FaBars size={30} />
				</div>
				<h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
					Shila <span className="font-bold">Insights</span>
				</h1>
			</div>

			{/* Profile button and dropdown */}
			<div className="relative">
				<img
					onClick={handleProfileClick}
					className="w-10 h-10 rounded-full cursor-pointer"
					src="/docs/images/people/profile-picture-5.jpg"
					alt="User dropdown"
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
								Sign out
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
						className={`fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 ${
							isNavOpen ? '' : 'left-[-100%]'
						}`}
					>
						<FaWindowClose
							onClick={() => setNavOpen(false)}
							size={30}
							className="absolute right-4 top-4 cursor-pointer"
						/>
						<nav>
							<ul className="flex flex-col p-4 text-gray-800">
								{menuItems.map(({ icon, text }, index) => (
									<li
										key={index}
										className="text-xl flex cursor-pointer w-[50%] rounded-full mx-auto p-2 hover:text-white hover:bg-black"
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
