interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	itemname: string;
}

const ModalOutOfStock = (props: ModalProps) => {
	if (!props.isOpen) return null;

	return (
		<div className="fixed inset-0 top-32 z-10 overflow-y-auto">
			<div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity">
					<div className="absolute inset-0 bg-gray-500 opacity-75" />
				</div>
				<div
					className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-headline">
					<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
								<svg
									className="h-6 w-6 text-red-600"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</div>
							<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
								<h3
									className="text-lg font-medium leading-6 text-gray-900"
									id="modal-headline">
									{props.itemname} is out of stock
								</h3>
								<div className="mt-2">
									<p className="text-sm leading-5 text-gray-500">
										Unfortunately, {props.itemname} is currently out of stock.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
						<span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
							<button
								type="button"
								className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium leading-6 text-white shadow-sm transition duration-150 ease-in-out hover:bg-red-500 focus:border-red-700 focus:outline-none sm:text-sm sm:leading-5"
								onClick={props.onClose}>
								Close
							</button>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalOutOfStock;
