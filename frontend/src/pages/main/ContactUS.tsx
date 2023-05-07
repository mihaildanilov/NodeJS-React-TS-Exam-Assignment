import axios from 'axios';
import { useState } from 'react';
import { PageComponent } from '../layouts';

const ContactUS = () => {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		const formData = {
			name,
			surname,
			email,
			phone,
			message,
		};
		console.log(formData);

		try {
			const response = await axios.post(
				'https://jsonplaceholder.typicode.com/posts',
				// '/api/contact',
				formData
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<PageComponent title="Contact Us">
				<div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Contact Us
						</h2>
						<p className="mt-2 text-lg leading-8 text-gray-600">
							If you have any questions, concerns, or feedback, please do not hesitate
							to reach out to us using the form below.
						</p>
					</div>
					<form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							<div>
								<label
									htmlFor="first-name"
									className="block text-sm font-semibold leading-6 text-gray-900">
									First name
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="first-name"
										id="first-name"
										value={name}
										onChange={(event) => setName(event.target.value)}
										autoComplete="given-name"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="last-name"
									className="block text-sm font-semibold leading-6 text-gray-900">
									Last name
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="last-name"
										id="last-name"
										value={surname}
										onChange={(event) => setSurname(event.target.value)}
										autoComplete="family-name"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="first-name"
									className="block text-sm font-semibold leading-6 text-gray-900">
									Email
								</label>
								<div className="mt-2.5">
									<input
										type="email"
										name="email"
										id="email"
										value={email}
										onChange={(event) => setEmail(event.target.value)}
										autoComplete="email"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="last-name"
									className="block text-sm font-semibold leading-6 text-gray-900">
									Phone number
								</label>
								<div className="mt-2.5">
									<input
										type="tel"
										name="phone-number"
										id="phone-number"
										autoComplete="tel"
										value={phone}
										onChange={(event) => setPhone(event.target.value)}
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
										value={message}
										onChange={(event) => setMessage(event.target.value)}
										name="message"
										id="message"
										rows={4}
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
						<div className="mt-10">
							<button
								type="submit"
								className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								Contact us
							</button>
						</div>
					</form>
				</div>
			</PageComponent>
		</>
	);
};
export default ContactUS;
