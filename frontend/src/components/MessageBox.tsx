interface MessageBoxProps {
	message: string;
}

export const MessageBoxError = (props: MessageBoxProps) => {
	return (
		<div className="max-w-xs bg-white border rounded-md border-gray-300" role="alert">
			<div className="flex p-4">
				<div className="flex-shrink-0">
					<svg
						className="h-4 w-4 text-red-500 mt-0.5"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16">
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
					</svg>
				</div>
				<div className="ml-3">
					<p className="text-sm text-gray-400">{props.message}</p>
				</div>
			</div>
		</div>
	);
};
export const MessageBoxSuccess = (props: MessageBoxProps) => {
	return (
		<div className="max-w-xs bg-white border rounded-md border-gray-300" role="alert">
			<div className="flex p-4">
				<div className="flex-shrink-0">
					<svg
						className="h-4 w-4 text-green-500 mt-0.5"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16">
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
					</svg>
				</div>
				<div className="ml-3">
					<p className="text-sm text-gray-400">{props.message}</p>
				</div>
			</div>
		</div>
	);
};

export const MessageBoxWarning = (props: MessageBoxProps) => {
	return (
		<div className="max-w-xs bg-white border rounded-md  border-gray-300" role="alert">
			<div className="flex p-4">
				<div className="flex-shrink-0">
					<svg
						className="h-4 w-4 text-orange-500 mt-0.5"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16">
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
					</svg>
				</div>
				<div className="ml-3">
					<p className="text-sm text-gray-400">{props.message}</p>
				</div>
			</div>
		</div>
	);
};
