import { NewsletterSection } from '../../components';

export default function Example() {
	return (
		<>
			<div className="bg-white">
				<div className="relative isolate px-6 pt-14 lg:px-8">
					<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
						<div className="text-center">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
								Welcome to Kicks Avenue, where style and comfort meet.
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-600">
								Shop our collection of sneakers and clothing for men and women,
								featuring the latest trends and brands. Find your perfect fit and
								elevate your wardrobe today.
							</p>
							<div className="mt-10 flex items-center justify-center gap-x-6">
								<a
									href="/store"
									className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
									Shop now
								</a>
								<a
									href="/contact"
									className="text-sm font-semibold leading-6 text-gray-900">
									Contact Us <span aria-hidden="true">→</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<NewsletterSection />
		</>
	);
}
