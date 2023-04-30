import { FC } from 'react';

interface CheckoutStepsProps {
	step1?: boolean;
	step2?: boolean;
	step3?: boolean;
	step4?: boolean;
}

const CheckoutSteps: FC<CheckoutStepsProps> = ({
	step1 = false,
	step2 = false,
	step3 = false,
	step4 = false,
}) => {
	return (
		<div className="checkout-steps flex">
			<div
				className={`w-1/4 border-b-2 ${
					step1 ? 'border-blue-500 text-blue-500' : 'border-gray-500 text-gray-500'
				}`}>
				Sign-In
			</div>
			<div
				className={`w-1/4 border-b-2 ${
					step2 ? 'border-blue-500 text-blue-500' : 'border-gray-500 text-gray-500'
				}`}>
				Shipping
			</div>
			<div
				className={`w-1/4 border-b-2 ${
					step3 ? 'border-blue-500 text-blue-500' : 'border-gray-500 text-gray-500'
				}`}>
				Payment
			</div>
			<div
				className={`w-1/4 border-b-2 ${
					step4 ? 'border-blue-500 text-blue-500' : 'border-gray-500 text-gray-500'
				}`}>
				Place Order
			</div>
		</div>
	);
};

export default CheckoutSteps;
