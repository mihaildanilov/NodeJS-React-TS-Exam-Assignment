import { ChildrenProps } from '../../types';

interface PageComponentProps {
	title: string;
	buttons?: '';
}
const PageComponent = (props: PageComponentProps & ChildrenProps) => {
	return (
		<>
			<header className="bg-white shadow  ">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 pb-6 pt-[5.5rem] sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						{props.title}
					</h1>
					{props.buttons}
				</div>
			</header>
			<main>
				<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{props.children}</div>
			</main>
		</>
	);
};

export default PageComponent;
