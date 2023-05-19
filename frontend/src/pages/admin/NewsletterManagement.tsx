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
	);
};

export default NewsletterManagement;
