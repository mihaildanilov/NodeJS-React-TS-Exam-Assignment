import { Line } from 'react-chartjs-2';
import { useGetAllOrdersQuery } from '../../hooks/orderHook';
import { ApiError } from '../../types/ApiError';
import { getError } from '../../utils/utils';
import LoadingBox from '../LoadingBox';
import { MessageBoxError } from '../MessageBox';
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
import { Order } from '../../types/Order';

const AverageOrderValueChart = () => {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
	const { data: orders, isLoading: isLoadingOrders, error: errorOrders } = useGetAllOrdersQuery();
	const calculateAOV = (orders: Order[]) => {
		const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
		const totalOrders = orders.length;
		const aov = totalRevenue / totalOrders;
		return aov.toFixed(2);
	};

	const data = {
		labels: orders?.map((order) => new Date(order.createdAt).toLocaleDateString()),
		datasets: [
			{
				label: 'Average Order Value',
				data: orders?.map((order) => calculateAOV([order])),
				fill: false,
				backgroundColor: '#3B82F6',
				borderColor: '#3B82F6',
			},
		],
	};

	const options = {
		scales: {
			y: {
				title: {
					display: true,
					text: 'Amount ($)',
					font: {
						size: 14,
						weight: 'bold',
					},
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
			<div className="bg-white rounded-lg shadow p-4">
				<Line data={data} options={options} />
			</div>
		</div>
	);
};

export default AverageOrderValueChart;
