interface LoadingBoxProps {
	text: string;
}
const LoadingBox = (props: LoadingBoxProps) => {
	return (
		<div className="pl-[20px] pt-20 ">
			<div
				className="max-w-xs rounded-md border bg-white shadow-lg dark:border-gray-100 dark:bg-white "
				role="alert">
				<div className="flex items-center p-4">
					<div
						className="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600"
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
