import { type MetaFunction, type LinksFunction } from '@remix-run/node'

import styleSheetUrl from './index.css?url'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styleSheetUrl }]
}

export const meta: MetaFunction = () => [{ title: '*Kunsträuber' }]

export default function Index() {
	return (
		<main className="index-page grid h-full place-items-center">
			<div className="grid place-items-center px-4 xl:grid-cols-2 xl:gap-24"></div>
			<figure className="default-picture main flex max-w-full flex-wrap justify-center gap-2 sm:gap-4 xl:mt-0 xl:grid xl:grid-flow-col xl:grid-cols-5 xl:grid-rows-6">
				<img
					className="animate-hue"
					alt="Andy Warhol, Four Mona Lisas. A work made of acrylic and silkscreen ink on linen."
					src="four-mona-lisas-sm.jpg"
					srcSet="four-mona-lisas-sm.jpg 430w, four-mona-lisas.jpg 600w"
				/>
				<figcaption className="index">Four Mona Lisas, 1978</figcaption>
			</figure>
			<h1
				data-heading
				className="mt-8 animate-slide-top text-4xl font-medium text-foreground [animation-delay:0.3s] [animation-fill-mode:backwards] md:text-5xl xl:mt-4 xl:animate-slide-left xl:text-6xl xl:[animation-delay:0.8s] xl:[animation-fill-mode:backwards]"
			>
				<span className="mr-0 text-4xl text-cyan-200">Kunst</span>
				<span className="ml-0 text-4xl text-yellow-100">räuber</span>
			</h1>
		</main>
	)
}
