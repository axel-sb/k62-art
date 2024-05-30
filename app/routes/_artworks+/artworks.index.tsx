// #region  import export
import {
	type LinksFunction,
	type LoaderFunctionArgs,
	json,
} from '@remix-run/node'
import { NavLink, useLoaderData, useNavigate } from '@remix-run/react'
// import { useState } from 'react'
import BtnBack from '#app/components/ui/btn-back.js'
import { Icon } from '#app/components/ui/icon.js'
import {
	getAny,
	getArtist,
	getStyle,
	getPlace,
	getDate,
	getColor,
} from '../resources+/search-data.server'
import artworks from './artworks.index.css?url'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: artworks },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	const query = url.searchParams.get('q') ?? undefined
	const searchType = url.searchParams.get('searchType') ?? 'All'

	let data
	switch (searchType) {
		case 'all':
			data = await getAny(query)
			break
		case 'artist':
			data = await getArtist(query)
			break
		case 'style':
			data = await getStyle(query)
			break
		case 'place':
			data = await getPlace(query)
			break
		case 'date':
			data = await getDate(Number(query))
			break
		case 'color':
			data = await getColor((query ?? '').toString())
			break

		default:
			data = await getAny('Picasso')
	}
	return json({ query, data })
}
// #endregion import export

//+                                            export default

export default function ArtworksPage() {
	const navigate = useNavigate()
  const goBack = () => navigate(-1)

	const { data } = useLoaderData<typeof loader>()
	return (
		//+ ___________________________________________  return  JSX ↓
		<main className="flex items-center justify-center">
			<ul className="artworks-preview max-h-[90dvh]} mb-12 flex w-full flex-col items-center justify-start gap-16 overflow-y-auto">
				{data ? (
					data.map(artwork => (
						<li key={artwork.id} className="md:max-w-sm">
							<NavLink
								className={({ isActive, isPending }) =>
									isActive ? 'active' : isPending ? 'pending' : ''
								}
								to={`${artwork.id}`}
							>
								{artwork.Title ? (
									<>
										<figure className="p-4 hover:grid hover:items-start">
											<img
												alt={artwork.alt_text ?? undefined}
												key={artwork.id}
												src={artwork.image_url ?? '../dummy.jpeg'}
											/>
											{/* //__ ______ figcaption ____artwork.Title_-_artwork.artist_title_-_arrow-right */}
											<figcaption>
												<div>{artwork.Title}</div>
												<div className="flex w-full justify-between">
													<span>{artwork.artist_title}</span>
													<Icon
														name="arrow-right"
														className="justify-self-end"
													></Icon>
												</div>
											</figcaption>
										</figure>
									</>
								) : (
									<i>No Artworks found </i>
								)}
							</NavLink>
						</li>
					))
				) : (
					<li>no data</li>
				)}
			</ul>

<BtnBack/>
			<button
				className="btn-back fixed bottom-4 left-4 h-10 w-10"
				onClick={goBack}
			>
				<Icon name="cross-1" className="h-6 w-6" />
			</button>

			<NavLink to="/" className="home fixed bottom-4 right-4">
				<h1
					data-heading
					className=" flex flex-wrap items-center justify-end gap-2"
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
			</NavLink>
		</main>
	)
}
