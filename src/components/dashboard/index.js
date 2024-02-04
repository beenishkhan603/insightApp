import React, { useState, useEffect } from 'react';
import { FaUser, FaBox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Navbar from '../nav';
import LineGraph from '../graph/line';
import BarGraph from '../graph/bar';
import ApiRequest from '../../utils/axioInterceptor';

const Dashboard = () => {
	const navigate = useNavigate();
	const [overallStats, setOverallStats] = useState({
		totalUsers: 0,
		totalProducts: 0,
	});
	const handleOverall = async () => {
		try {
			const response = await ApiRequest.get(
				`${process.env.REACT_APP_BACKEND_URL}/stats/overall`,
				{
					headers: {
						Authorization: ` ${localStorage.getItem('token')}`,
					},
				}
			);
			if (response) {
				const { data } = response;
				if (data) {
					if (data?.success) {
						setOverallStats(data?.data);
					}
				}
			}
		} catch (error) {
			console.error('Error fetching overall statistics:', error);
			if (error?.response?.status === 401) {
				localStorage.clear();
				navigate('/login');
			}
		}
	};
	useEffect(() => {
		handleOverall();
	}, []);

	return (
		<>
			<Navbar />
			<div className="container mx-auto p-4">
				<div className="mt-8">
					<h2 className="text-2xl font-bold mb-4">Dashboard</h2>
					<div class="grid grid-cols-1 gap-4  mt-8 sm:grid-cols-6 justify-center">
						<div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
							<div class="p-6 bg-green-400">
								<FaUser className="text-3xl mr-2" color="#fff" />
							</div>
							<div class="px-4 text-gray-700">
								<h3 class="text-2 tracking-wider font-semibold">
									Total Member
								</h3>
								<p class="text-3xl">{overallStats.totalUsers}</p>
							</div>
						</div>
						<div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
							<div class="p-6 bg-blue-400">
								<FaBox className="text-3xl mr-2" color="#fff" />
							</div>
							<div class="px-4 text-gray-700">
								<h3 class="text-2 tracking-wider font-semibold">
									Total Products
								</h3>
								<p class="text-3xl">{overallStats?.totalProducts}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-col-2 lg:grid-col-2 gap-4 mt-20">
					<div>
						<LineGraph />
					</div>
					<div>
						<BarGraph />
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
