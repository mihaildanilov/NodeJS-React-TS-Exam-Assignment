interface LoadingBoxProps {
	text: string;
}
const LoadingBox = (props: LoadingBoxProps) => {
	return (
		<div className="pt-20 pl-[20px] ">
			<div
				className="max-w-xs bg-white border rounded-md shadow-lg dark:bg-white dark:border-gray-100 "
				role="alert">
				<div className="flex items-center p-4">
					<div
						className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
						role="status"
						aria-label="loading">
						<span className="sr-only">Loading...</span>
					</div>
					<p className="ml-3 text-sm text-gray-700 dark:text-gray-400">{props.text}</p>
				</div>
			</div>
		</div>
	);
};

export default LoadingBox;
