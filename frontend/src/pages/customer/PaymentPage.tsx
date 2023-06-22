import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutSteps } from '../../components';
import { useStateContext } from '../../context/ContextProvider';
import { PageComponent } from '../layouts';

const PaymentPage = () => {
	const navigate = useNavigate();
	const { state, dispatch } = useStateContext();
	const {
		cart: { shippingAddress, paymentMethod },
	} = state;

	const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal');
	useEffect(() => {
		if (!shippingAddress.address) {
			navigate('/shipping');
		}
	}, [shippingAddress, navigate]);

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
		localStorage.setItem('paymentMethod', paymentMethodName);
		navigate('/placeorder');
	};

	return (
		<PageComponent title="Payment">
			<div className="isolate h-screen bg-white px-6 sm:py-8 lg:h-[calc(100vh-12.5rem)] lg:px-8">
				<div>
					<CheckoutSteps step1 step2 step3 />
					<div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
						<h1 className="my-3 text-2xl font-semibold">Payment Method</h1>
						<form onSubmit={submitHandler}>
							<div className="mb-3">
								<label className="block">
									<input
										type="radio"
										id="PayPal"
										name="paymentMethod"
										value="PayPal"
										checked={paymentMethodName === 'PayPal'}
										onChange={(e) => setPaymentMethodName(e.target.value)}
										className="mr-2 leading-tight"
									/>
									<span className="text-sm">PayPal</span>
								</label>
							</div>
							<div className="mb-3">
								<label className="block">
									<input
										disabled
										type="radio"
										id="Stripe"
										name="paymentMethod"
										value="Stripe"
										checked={paymentMethodName === 'Stripe'}
										onChange={(e) => setPaymentMethodName(e.target.value)}
										className="mr-2 leading-tight"
									/>
									<span className="text-sm">Stripe - temporarily disabled</span>
								</label>
							</div>
							<div className="mb-3">
								<button
									type="submit"
									className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
									Continue
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default PaymentPage;
