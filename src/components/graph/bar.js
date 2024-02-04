import React from 'react';
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
	labels,
	datasets: [
		{
			label: 'Product',
			data: [1, 2, 3, 4, 5, 6, 7],
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
		{
			label: 'User',
			data: [1, 2, 3, 4, 5, 6, 7],
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
	],
};

const BarGraph = () => {
	return <Bar options={options} data={data} />;
};
export default BarGraph;