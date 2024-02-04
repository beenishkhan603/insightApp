import React, { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

import ApiRequest from '../../utils/axioInterceptor';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Yearly Statistics',
		},
	},
};

const BarGraph = () => {
	const navigate = useNavigate();
	const [labels, setLabels] = useState([]);
	const [userStats, setUserStats] = useState([]);
	const [productStats, setProductStats] = useState([]);
	const BarData = {
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
	const handleYearly = async () => {
		try {
			const response = await ApiRequest.get(
				`${process.env.REACT_APP_BACKEND_URL}/stats/yearly`,
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
		handleYearly();
	}, []);
	return <Bar options={options} data={BarData} />;
};
export default BarGraph;
