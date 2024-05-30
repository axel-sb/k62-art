/* // @ts-nocheck */
// #region imports

import {
	type LinksFunction,
	type LoaderFunctionArgs,
	json,
} from '@remix-run/node'
import {
	Form,
	// Link,
	NavLink,
	useLoaderData,
	useNavigation,
	useSubmit,
	// useMatches,
} from '@remix-run/react'
import { useState } from 'react'
import pkg from 'react-color'

import { Icon } from '#app/components/ui/icon.js'

import { StatusButton } from '#app/components/ui/status-button.tsx'
import { useIsPending } from '#app/utils/misc'
// import { useDebounce } from '#app/utils/misc'
import { getColor } from '../resources+/search-data.server'
// #endregion imports
import artworks from './artworks.index.css?url'
const { HuePicker } = pkg

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: artworks },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	const q = url.searchParams.get('q') ?? '200'
	let data = await getColor((q ?? '').toString())
	return json({ q, data })
}

// !                                                 react-color HuePicker

export default function HueSlider() {
	const navigation = useNavigation()
	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has('q')
	const submit = useSubmit()
	const isSubmitting = useIsPending({
		formMethod: 'GET',
		formAction: '/artworks/artworks/',
	})

	const { data } = useLoaderData<typeof loader>()
	const [searchParam, setSearchParam] = useState<string>('200')

	const [hue, setHue] = useState({ h: 0, s: 1, l: 1, a: 1 })
	const handleChange = (hue: any) => {
		setHue(hue)
		setSearchParam(`${hue.h}`)
	}

	return (
		<main className="flex flex-col items-center justify-center">
			<Form
				id="q"
				method="GET"
				action="/artworks"
				className="flex flex-wrap items-center justify-center gap-2"
				onChange={e => handleChange(e.currentTarget)}
			>
				<div className="flex-1">
					<label htmlFor="color-picker">Color:</label>
					<div className="hue-picker">
						<HuePicker
							color={hue}
							className={
								searching ? 'loading w-full font-light' : 'w-full font-light'
							}
							onChangeComplete={handleChange}
						/>
					</div>
					{/*{' '}
					<input
						type="color"
						value={searchParam}
						id="q"
						className={
							searching
								? 'loading w-full font-light text-primary-foreground'
								: 'w-full font-light text-primary-foreground'
						}
						onChange={handleColorChange}
					/>{' '}
					*/}
					<button onClick={() => submit(searchParam, { method: 'get' })}>
						Search
					</button>
				</div>
				<div>
					<StatusButton
						type="submit"
						status={isSubmitting ? 'pending' : 'idle'}
						className="flex w-full items-center justify-center"
					>
						<Icon name="magnifying-glass" size="md" />
						<span className="sr-only">Search</span>
					</StatusButton>
				</div>
			</Form>

			<ul className="artworks-preview max-h-[90dvh]} mb-12 flex w-full flex-col items-center justify-start gap-16 overflow-y-auto">
				{data ? (
					data.map(artwork => (
						<li key={artwork.id} className="md:max-w-sm">
							<NavLink
								className={({ isActive, isPending }) =>
									isActive ? 'active' : isPending ? 'pending' : ''
								}
								to={`../artworks/${artwork.id}`}
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
												<div className="flex max-w-full justify-between">
													<span>{artwork.artist_title}</span>
													<Icon
														name="arrow-right"
														className="flex-1 justify-self-end"
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
		</main>
	)
}
// #endregion
