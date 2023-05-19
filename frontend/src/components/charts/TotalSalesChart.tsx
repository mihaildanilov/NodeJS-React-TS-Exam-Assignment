import {
	Chart,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGetAllOrdersQuery } from '../../hooks';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import { LoadingBox, MessageBoxError } from '../toasts';

const TotalSalesChart = () => {
	Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
	const { data: orders, isLoading: isLoadingOrders, error: errorOrders } = useGetAllOrdersQuery();

	const salesByDay: { [key: number]: number } = {};

	orders?.forEach((order) => {
		const day = new Date(order.createdAt).getDate();
		salesByDay[day] = (salesByDay[day] || 0) + order.totalPrice;
	});

	const data = {
		labels: orders?.reduce<string[]>((acc, order) => {
			const date = new Date(order.createdAt).toLocaleDateString();
			if (!acc.includes(date)) {
				acc.push(date);
			}
			return acc;
		}, []),
		datasets: [
			{
				label: 'Total sales',
				data: Object.values(salesByDay),
				fill: false,
				backgroundColor: '#3b82f6',
				borderColor: '#3b82f6',
			},
		],
	};

	const options = {
		scales: {
			y: {
				title: {
					display: true,
					text: 'Amount ($)',
				},
				beginAtZero: true,
			},
		},
	};

	return isLoadingOrders ? (
		<div className="pt-[3.25rem] sm:ml-[20rem]">
			<LoadingBox text="Action in progress" />
		</div>
	) : errorOrders ? (
		<div className="pt-[3.25rem] sm:ml-[20rem]">
			<MessageBoxError message={getError(errorOrders as unknown as ApiError)} />
		</div>
	) : (
		<div className="">
			<div className="rounded-lg bg-white p-4 shadow">
				<Line data={data} options={options} />
			</div>
		</div>
	);
};

export default TotalSalesChart;
