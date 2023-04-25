interface MessageBoxProps {
	message: string;
}

const MessageBox = (props: MessageBoxProps) => {
	return (
		<div>
			<div
				className="max-w-xs bg-red-100 border border-red-200 text-sm text-red-500 rounded-md shadow-md"
				role="alert">
				<div className="flex p-4 ps-10 ">{props.message}</div>
			</div>
		</div>
	);
};
export default MessageBox;
