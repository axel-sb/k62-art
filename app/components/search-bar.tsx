// https://codesandbox.io/p/sandbox/react-colorful-demo-u5vwp?file=%2Fpackage.json

import {
	type LinksFunction,
	type LoaderFunctionArgs,
	json,
} from '@remix-run/node'
import {
	Form,
	/* NavLink,*/
	useLoaderData,
	useNavigation,
	useNavigate,
	/* useSearchParams, */
	// useSubmit,
} from '@remix-run/react'
import { useEffect, useId, useState } from 'react'
import { useIsPending } from '#app/utils/misc'
import {
	getAny,
	getArtist,
	getStyle,
	getPlace,
	getDate,
	getColor,
} from '../routes/resources+/search-data.server'
import searchBarStyles from './search-bar.css?url'
import { Icon } from './ui/icon'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { StatusButton } from './ui/status-button'

// _______ _____________________________________  LOADER FUNCTION
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
	return json({ data, searchType })
}

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: searchBarStyles },
]

//  _____   _________________________________________  Search Bar
export function SearchBar({
	status,
	autoFocus = false,
	autoSubmit = false,
}: {
	status: 'idle' | 'pending' | 'success' | 'error'
	autoFocus?: boolean
	autoSubmit?: boolean
}) {
	const { searchType } = useLoaderData<typeof loader>()
	const navigation = useNavigation()
	const navigate = useNavigate()
	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has('q')

	const id = useId()

	// const submit = useSubmit()
	const isSubmitting = useIsPending({
		formMethod: 'GET',
		formAction: '/artworks/artworks/',
	})

	/* const handleFormChange = useDebounce((form: HTMLFormElement) => {
    submit(form)
  }, 400) */

	const [selectedSearchType, setSelectedSearchType] = useState<
		'all' | 'artist' | 'style' | 'place' | 'date' | 'color' | ''
	>('')

	useEffect(() => {
		if (selectedSearchType === 'color') {
			navigate('/artworks/colorSearch')
		}
	}, [navigate, selectedSearchType])

	const [searchParam, setSearchParam] = useState<string>('')

	//  _____   _____________________________return

	return (
		<Form
			id="search-form"
			method="GET"
			action="/artworks"
			className="flex flex-wrap items-center justify-center gap-2"
		>
			<div className="flex-1">
				<Input
					type="search"
					name="q"
					id="q"
					className={
						searching ? 'loading w-full font-light' : 'w-full font-light'
					}
					value={searchParam}
					placeholder={'Search ' + searchType}
					autoFocus={autoFocus}
					onChange={e => setSearchParam(e.target.value)}
				/>

				{/* __________________________________________   Search Type  */}
				<div className="search-filters">
					<Label htmlFor={id} className="sr-only">
						Search Type
					</Label>
					<select
						id="searchType"
						name="searchType"
						value={searchType}
						onChange={e => {
							const selectedValue = e.target.value as
								| 'all'
								| 'artist'
								| 'style'
								| 'place'
								| 'date'
								| 'color'

							setSelectedSearchType(selectedValue)

							if (selectedValue === 'color') {
								navigate('/artworks/colorSearch')
							}
						}}
						className="w-full !bg-background font-light"
					>
						<option value="all">All</option>
						<option value="artist">Artist</option>
						<option value="style">Style</option>
						<option value="place">Place</option>
						<option value="date">Date</option>
						<option value="color">Color</option>
					</select>
				</div>
			</div>
			<div>
				<StatusButton
					type="submit"
					status={isSubmitting ? 'pending' : status}
					className="flex w-full items-center justify-center"
				>
					<Icon name="magnifying-glass" size="md" />
					<span className="sr-only">Search</span>
				</StatusButton>
			</div>
		</Form>
	)
}
