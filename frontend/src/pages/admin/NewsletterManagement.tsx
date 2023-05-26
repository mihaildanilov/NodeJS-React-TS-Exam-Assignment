import React, { useState } from 'react';
import { toast } from 'react-toastify';
import apiClient from '../../api/apiClient';
import { ApiError } from '../../types';
import { getError } from '../../utils';

const NewsletterManagement = () => {
	const [subject, setSubject] = useState('');
	const [text, setText] = useState('');
	const [html, setHtml] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('subject', subject);
		formData.append('text', text);
		formData.append('html', html);

		try {
			await apiClient.post('/api/email/send-email-all', formData);
			toast.success('Message sent successfully');
		} catch (err) {
			toast.error(getError(err as unknown as ApiError));
		}
	};

	return (
		<div className="rounded-md border-b border-gray-200 bg-gray-50 p-4 pt-3">
			<h1 className="text-2xl font-bold tracking-tight  text-gray-500 sm:text-3xl">
				Product managment
			</h1>
			<p className="mt-2 text-lg  text-gray-500">
				Track the performance of your products, handle customer feedback and returns, and
				explore new product ideas.
			</p>
			<form onSubmit={handleSubmit} className="flex flex-col">
				<div className="flex flex-row">
					<div className="w-[50%]">
						<div className="flex flex-col">
							<label htmlFor="subject" className="mb-1 font-medium text-gray-600">
								Subject:
							</label>
							<input
								id="subject"
								type="text"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
								className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
								required
							/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="text" className="mb-1 font-medium text-gray-600">
								Text:
							</label>
							<textarea
								id="text"
								value={text}
								onChange={(e) => setText(e.target.value)}
								className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
								required
							/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="html" className="mb-1 font-medium text-gray-600">
								HTML:
							</label>
							<textarea
								id="html"
								value={html}
								onChange={(e) => setHtml(e.target.value)}
								className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
								required
							/>
						</div>
					</div>
				</div>
				<div className="pt-4">
					<button
						className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
						type="submit">
						Send Email
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewsletterManagement;
