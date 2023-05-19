import { useState } from 'react';

import { PageComponent } from '../layouts';

import { toast } from 'react-toastify';
import { useContactUs } from '../../hooks/';
import { useNavigate } from 'react-router-dom';

const ContactUS = () => {
	const [subject, setSubject] = useState('');
	const [customersMessage, setCustomersMessage] = useState('');
	const { isLoading, error, createContactUs } = useContactUs();
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await createContactUs(subject, customersMessage);
		if (error) {
			toast.error(error);
		} else {
			navigate('/');
			toast.success('Message successfully sent!');
		}
	};

	return (
		<PageComponent title="Contact Us">
			<div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Contact Us
					</h2>
					<p className="mt-2 text-lg leading-8 text-gray-600">
						If you have any questions, concerns, or feedback, please do not hesitate to
						reach out to us using the form below.
					</p>
				</div>
				<form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
					<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
						<div className="sm:col-span-2">
							<label
								htmlFor="subject"
								className="block text-sm font-semibold leading-6 text-gray-900">
								Subject
							</label>
							<div className="mt-2.5">
								<input
									required
									type="text"
									id="subject"
									value={subject}
									onChange={(event) => setSubject(event.target.value)}
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="message"
								className="block text-sm font-semibold leading-6 text-gray-900">
								Message
							</label>
							<div className="mt-2.5">
								<textarea
									required
									id="message"
									value={customersMessage}
									onChange={(event) => setCustomersMessage(event.target.value)}
									rows={4}
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
					<div className="mt-10">
						<button
							disabled={isLoading}
							type="submit"
							className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							{isLoading ? 'Submitting...' : 'Submit'}
						</button>
					</div>
				</form>
			</div>
		</PageComponent>
	);
};
export default ContactUS;
