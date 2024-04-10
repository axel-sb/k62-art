import { type MetaFunction, type LinksFunction } from '@remix-run/node'

import styleSheetUrl from './index.css?url'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styleSheetUrl }]
}

export const meta: MetaFunction = () => [{ title: '*Kunsträuber' }]

export default function Index() {
	return (
		<main className="index-page flex flex-col pb-48 h-full max-w-xl items-center justify-evenly ">
			<figure className="default-picture">
				<img
					className="animate-hue object-center"
					alt="Andy Warhol, Four Mona Lisas. A work made of acrylic and silkscreen ink on linen."
					src="four-mona-lisas-sm.jpg"
					srcSet="four-mona-lisas-sm.jpg 430w, four-mona-lisas.jpg 600w"
				/>
				<figcaption className="index">Four Mona Lisas, 1978</figcaption>
			</figure>
			<h1
				data-heading
				className="text-4xl md:text-5xl xl:mt-4 xl:text-6xl "
			>
				<span className="mr-0 text-4xl text-cyan-200 md:text-5xl md:font-semibold lg:text-6xl lg:font-bold xl:text-7xl">
					Kunst
				</span>
				<span className="text-yellow-100 mr-0  text-4xl   md:text-5xl md:font-semibold lg:text-6xl lg:font-bold xl:text-7xl">
					räuber
				</span>
			</h1>
		</main>
	)
}
