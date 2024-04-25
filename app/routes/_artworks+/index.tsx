import { type MetaFunction, type LinksFunction } from '@remix-run/node'

import styleSheetUrl from './index.css?url'
export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styleSheetUrl }]
}
export const meta: MetaFunction = () => [{ title: '*Kunsträuber' }]

export default function Index() {
	return (
		<>
			<div className="flex h-full flex-col md:max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4">
				<figure className="default-picture flex h-full flex-col items-center justify-center">
					<img
						className="animate-hue w-[calc(70vh/1.26)] object-center"
						alt="Andy Warhol, Four Mona Lisas. A work made of acrylic and silkscreen ink on linen."
						src="four-mona-lisas-sm.jpg"
						srcSet="four-mona-lisas-sm.jpg 430w, four-mona-lisas.jpg 600w"
					/>
					<figcaption className="index">Four Mona Lisas, 1978</figcaption>
				</figure>
				<h1
					data-heading
					className="flex flex-wrap items-center justify-end gap-2 pb-6"
				>
					<div className="flex max-w-min flex-wrap">
						<span className="ml-auto max-w-min text-[16px] font-thin leading-none text-cyan-200 md:text-[18px] lg:text-[22px] xl:text-[24px]">
							Kunst
						</span>
						<span className="max-w-min text-[13px] font-thin leading-none text-yellow-100 file:ml-auto md:text-[15px] lg:text-[18px] xl:text-[20px]">
							räuber
						</span>
					</div>
				</h1>
			</div>
		</>
	)
}
