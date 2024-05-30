// #region imports
import {
	type LinksFunction,
	type LoaderFunctionArgs,
	json,
} from '@remix-run/node'
import {
	Form,
	NavLink,
	useLoaderData,
	useNavigation,
	useSubmit,
} from '@remix-run/react'
import { useEffect, useState } from 'react'

import { Icon } from '#app/components/ui/icon.js'
import { Input } from '#app/components/ui/input'
import { StatusButton } from '#app/components/ui/status-button.tsx'
// import { useDebounce } from '#app/utils/misc'
import { getColor } from '../resources+/search-data.server'
import colorSearch from './artworks.colorSearch.css?url'
import artworks from './artworks.index.css?url'
// #endregion imports

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: artworks },
	{ rel: 'stylesheet', href: colorSearch },
]

// #region Loader  // ___ ________________________ Loader ⇅ ⬆︎⬇︎

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	const q = url.searchParams.get('q') ?? '200'
	let data = await getColor((q ?? '340').toString())
	return json({ q, data })
}
// #endregion

// #region Color Search  //          ______________ Color Search 🌈

export default function ColorSearch() {
	const { q, data } = useLoaderData<typeof loader>()
	const navigation = useNavigation()

	const [inputValue, setInputValue] = useState('')

	const hues = [
		'0',
		'20',
		'40',
		'60',
		'80',
		'100',
		'120',
		'140',
		'160',
		'180',
		'200',
		'220',
		'240',
		'260',
		'280',
		'300',
		'320',
		'340',
	]

	function ColorCircle({ hue }: ColorCircleProps) {
		return (
			<div
				className="h-20 w-20 rounded-full"
				style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
				data-hue={`${hue}`}
				onClick={handleColorCircleClick}
			/>
		)
	}

	interface ColorCircleProps {
		hue: string
		onClick?: (event: React.MouseEvent<HTMLDivElement>) => void // Add this line
	}

	const handleColorCircleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const hue = event.currentTarget.getAttribute('data-hue') ?? ''
		console.log('Selected hue:', hue)
		setInputValue(hue)
	}

	function ColorGrid() {
		return (
			<div className="mx-auto my-10 grid grid-cols-3 justify-items-center gap-4">
				{hues.map(hue => (
					<ColorCircle key={hue} hue={hue} onClick={handleColorCircleClick} />
				))}
			</div>
		)
	}

	useEffect(() => {
		const searchField = document.getElementById('q')
		if (searchField instanceof HTMLInputElement) {
			searchField.value = q || ''
		}
	}, [q])

	// We've seen useNavigate already, we'll use its cousin, useSubmit (https://remix.run/docs/en/main/hooks/use-submit), for this.
	const submit = useSubmit()

	// Spinner
	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has('q')

	/* // __  ____________________________    Color Picker 🌈  */

	return (
		<>
			<header className="hidden py-6">
				<nav className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8"></nav>
			</header>

			<ColorGrid />

			<Form
				id="search-form"
				className="flex flex-wrap items-center justify-center gap-2"
				onChange={event => {
					submit(event.currentTarget)
				}}
				role="search"
			>
				<div className="flex-1">
					<label htmlFor="color-picker">Label for "color-picker": Color:</label>
					<Input
						aria-label="Search by color"
						id="q"
						name="q"
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						placeholder="Search"
						type="search"
						className={
							searching
								? 'loading w-full font-light text-primary-foreground'
								: 'w-full font-light text-primary-foreground'
						}
					/>

					<button onClick={() => submit(q, { method: 'get' })}>
						Submit Search (Ln152)
					</button>
				</div>
				<div>
					<StatusButton
						type="submit"
						status={navigation.state ? 'pending' : 'idle'}
						className="flex w-full items-center justify-center"
					>
						<Icon name="magnifying-glass" size="md" />
						<span className="sr-only">Submit Search (Ln158)</span>
					</StatusButton>
				</div>
				<div aria-hidden hidden={!searching} id="search-spinner" />
			</Form>

			{/* // ___ _______________________________ response (images) on page */}

			<main className="flex flex-col items-center justify-center">
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
													<div className="flex w-full justify-between">
														<span>{artwork.artist_title}</span>
														<Icon
															name="info_i"
															className="h-6 w-6 rounded-full border"
														/>
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
		</>
	)
}

// #endregion
