/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

interface ModalDeliverPackageProps {
	title: string;
	warningText: string;
	itemName: string;
	buttonText: string;
	successMessage?: string;
	className?: string;
	ProceedAction: (info: string) => void;
}

const ModalWarning = (props: ModalDeliverPackageProps) => {
	const [isOpen, setIsOpen] = useState(false);

	function closeModalAndProceed() {
		props.ProceedAction(props.itemName);
		setIsOpen(false);
		if (props.successMessage) toast.success(props.successMessage);
	}
	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}
	return (
		<>
			<div>
				<button
					className="inline-flex items-center rounded-full bg-red-100 px-3.5 py-1.5 text-xs font-medium text-red-800 hover:bg-red-300"
					type="button"
					onClick={openModal}
					{...props}>
					{props.buttonText}
				</button>
			</div>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900">
										{props.title}
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											{props.warningText}
											{props.itemName}
										</p>
									</div>

									<div className="mt-4 flex justify-center">
										<div className="flex flex-wrap justify-center space-x-7">
											<button
												type="button"
												className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 "
												onClick={closeModalAndProceed}>
												Yes, proceed.
											</button>
											<button
												type="button"
												className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 "
												onClick={closeModal}>
												No, go back.
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default ModalWarning;
