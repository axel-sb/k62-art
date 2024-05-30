import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Form, NavLink, useNavigation, useSubmit } from '@remix-run/react'
import { cx } from 'class-variance-authority'
import { useCombobox } from 'downshift'
import { useId, useState } from 'react'
// import { RgbaColorPicker } from 'react-colorful'
// <RgbaColorPicker color={color} onChange={handleColorChange} />{' '}

import { Label } from '#app/components/ui/label.js'
import {
	getAny,
	getArtist,
	getStyle,
	getPlace,
	getDate,
	getColor,
} from '#app/routes/resources+/search-data.server.tsx'
import { useDebounce } from '#app/utils/misc'
import { suggestedArtists } from '../routes/resources+/search-suggestions.ts'

// #region loader __                                                         LOADER
export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	const q = url.searchParams.get('q') ?? undefined
	const searchType = url.searchParams.get('searchType') ?? 'All'
  console.log('🟡 q →', q, '🔵 url →', url, '🟢 searchType →', searchType)

	let data
	switch (searchType) {
		case 'all':
			data = await getAny(q)
			break
		case 'artist':
			data = await getArtist(q)
			break
		case 'style':
			data = await getStyle(q)
			break
		case 'place':
			data = await getPlace(q)
			break
		case 'date':
			data = await getDate(Number(q))
			break
		case 'color':
			data = await getColor((q ?? '').toString())
			break

		default:
			data = await getAny('Picasso')
	}
	return json({ q, data })
}
// #endregion loader

export function ArtworksCombobox() {
	const navigation = useNavigation()
	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has('q')

	const submit = useSubmit()

	const handleFormChange = useDebounce((form: HTMLFormElement) => {
		submit(form)
	}, 400)

	const [searchType, setSearchType] = useState<
		'all' | 'artist' | 'style' | 'place' | 'date' | 'color' | ''
	>('')

	// const [color, setColor] = useState({ r: 255, g: 0, b: 255 })

	// #region rgbToHsl //          ______________ rgbToHsl 🌈

	/* const rgbToHsl = (r: number, g: number, b: number) => {
		r /= 255
		g /= 255
		b /= 255
		const l = Math.max(r, g, b)
		const s = l - Math.min(r, g, b)
		const h = s
			? l === r
				? (g - b) / s
				: l === g
					? 2 + (b - r) / s
					: 4 + (r - g) / s
			: 0
		return [
			60 * h < 0 ? 60 * h + 360 : 60 * h,
			100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
			(100 * (2 * l - s)) / 2,
		]
	} */

	// #endregion

	// #region handleClorChange // __ handleColorChange →  setSearchParam(`${h}`)
	// Inside the component where you handle the color selection and database query
	// Define a state to hold the search parameter value

	/* const [searchParam, setSearchParam] = useState<string>('')
	const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newColor = {
			r: parseInt(event.target.value.slice(1, 3), 16),
			g: parseInt(event.target.value.slice(3, 5), 16),
			b: parseInt(event.target.value.slice(5, 7), 16),
			a: 1, // Assuming full opacity, adjust as necessary
		}
		setColor(newColor) // Update the color state
		const [h] = rgbToHsl(newColor.r, newColor.g, newColor.b) // Extract the h value
		setSearchParam(`${h}`) // Update the search parameter value with h
	} */

	// #endregion
	interface SuggestedTerm {
		artist_title: string
		count: string
	}

	const suggestedTerms: SuggestedTerm[] = suggestedArtists
	function getsuggestedTermsFilter(inputValue: string) {
		const lowerCasedInputValue = inputValue.toLowerCase()

		return function suggestedTermsFilter(suggestedTerm: {
			artist_title: string
			count: string
		}) {
			return (
				!inputValue ||
				suggestedTerm.artist_title
					.toLowerCase()
					.includes(lowerCasedInputValue) ||
				suggestedTerm.count.toLowerCase().includes(lowerCasedInputValue)
			)
		}
	}

	// #region ComboBox

	function ComboBox({
		autoFocus = false,
		autoSubmit = false,
	}: {
		autoFocus?: boolean
		autoSubmit?: boolean
	}) {
		const id = useId()
		const [items, setItems] = useState<SuggestedTerm[]>(
			suggestedTerms as SuggestedTerm[],
		)

		const {
			isOpen,
			getToggleButtonProps,
			getLabelProps,
			getMenuProps,
			getInputProps,
			highlightedIndex,
			getItemProps,
			selectedItem,
		} = useCombobox({
			onInputValueChange({ inputValue }) {
				setItems(suggestedTerms.filter(getsuggestedTermsFilter(inputValue)))
			},
			items,
			itemToString(item) {
				return item ? item.artist_title : ''
			},
		})

		//🚩 https://remix.run/docs/en/main/start/tutorial#submitting-forms-onchange     🚩

		return (
			<Form
				id="search-form"
				method="GET"
				action="/artworks"
				className="flex flex-wrap items-center justify-center gap-2"
				onChange={e => autoSubmit && handleFormChange(e.currentTarget)}
			>
				<div className="flex-1">
					{/* __________________________________________   Search Type  */}
					<div className="search-filters">
						<Label htmlFor={id} className="sr-only">
							Search Type
						</Label>
						<select
							id="searchType"
							name="searchType"
							value={searchType}
							onChange={e =>
								setSearchType(
									e.target.value as
										| 'all'
										| 'artist'
										| 'style'
										| 'place'
										| 'date'
										| 'color',
								)
							}
							className="w-full font-light"
						>
							<option value="all">All</option>
							<option value="artist">Artist</option>
							<option value="style">Style</option>
							<option value="place">Place</option>
							<option value="date">Date</option>
							<option value="color">Color</option>
						</select>
					</div>
					{/* // __  ____________________________    Color Picker 🌈  */}
					{searchType === 'color' ? (
						<NavLink
							className={({ isActive, isPending }) =>
								isActive ? 'active' : isPending ? 'pending' : ''
							}
							to="/artworks/colorSearch"
						>
							Search by Color
						</NavLink>
					) : null}
				</div>
				<div className="flex w-72 flex-col gap-1">
					<label className="w-fit" {...getLabelProps()}>
						Select a search term:
					</label>
					<div className="flex gap-0.5 shadow-sm">
						<input
							id="q"
							className={
								searching
									? 'loading w-full font-light text-primary-foreground'
									: 'w-full font-light text-primary-foreground'
							}
							placeholder={'Search ' + searchType}
							autoFocus={autoFocus}
							value={searchType}
							defaultValue={
								new URLSearchParams(navigation?.location?.search || '').get(
									'q',
								) || ''
							}
							onChange={e =>
								setSearchType(
									e.target.value as
										| ''
										| 'all'
										| 'artist'
										| 'style'
										| 'place'
										| 'date'
										| 'color',
								)
							}
							{...getInputProps()}
						/>
						<button
							aria-label="toggle menu"
							className="px-2"
							type="button"
							{...getToggleButtonProps()}
						>
							{isOpen ? <>&#8593;</> : <>&#8595;</>}
						</button>
					</div>
				</div>
				<ul
					className={`absolute left-0 top-1/4 z-10 mt-1 max-h-full min-h-96 w-full overflow-scroll bg-black shadow-md ${
						!(isOpen && items.length) && 'hidden'
					}`}
					{...getMenuProps()}
				>
					{isOpen &&
						items.map((item, index) => (
							<li
								className={cx(
									highlightedIndex === index && 'bg-gray-700',
									selectedItem === item && 'font-bold',
									'flex flex-col flex-wrap px-3 py-2 text-primary-foreground shadow-sm',
								)}
								key={item.artist_title}
								{...getItemProps({ item, index })}
							>
								<span>{item.artist_title}</span>
								<span className="text-sm text-gray-300">({item.count})</span>
							</li>
						))}
				</ul>
			</Form>
		)
	}
	return <ComboBox />
}
// #endregion
