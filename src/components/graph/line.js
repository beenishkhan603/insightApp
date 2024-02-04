import React, { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

import ApiRequest from '../../utils/axioInterceptor';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const lineOptions = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Monthly Statistics',
		},
	},
};

const LineGraph = () => {
	const navigate = useNavigate();
	const [labels, setLabels] = useState([]);
	const [userStats, setUserStats] = useState([]);
	const [productStats, setProductStats] = useState([]);
	const lineData = {
		labels,
		datasets: [
			{
				label: 'User',
				data: userStats || [],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Product',
				data: productStats || [],
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};
	const handleMonthly = async () => {
		try {
			const response = await ApiRequest.get(
				`${process.env.REACT_APP_BACKEND_URL}/stats/monthly`,
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
						setLabels(Object.keys(data?.data?.userStats));
						setUserStats(Object.values(data?.data?.userStats));
						setProductStats(Object.values(data?.data?.productStats));
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
		handleMonthly();
	}, []);
	return <Line options={lineOptions} data={lineData} />;
};

export default LineGraph;
