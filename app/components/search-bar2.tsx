import { useLoaderData, useSubmit, Form } from '@remix-run/react'
import { useId } from 'react'
import { type loader } from '#app/root.tsx'
import { useIsPending, useDebounce } from '#app/utils/misc'
import { Icon } from './ui/icon'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { StatusButton } from './ui/status-button'

export function SearchBar({
	status,
	autoFocus = false,
	autoSubmit = false,
}: {
	status: 'idle' | 'pending' | 'success' | 'error'
	autoFocus?: boolean
	autoSubmit?: boolean
}) {
	// const navigation = useNavigation()
	/* const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has('q') */
	const { query /* queryArtist, queryStyle, querySubject */ } =
		useLoaderData<typeof loader>()
	const id = useId()
	// const [searchParams] = useSearchParams()

	const submit = useSubmit()
	const isSubmitting = useIsPending({
		formMethod: 'GET',
		formAction: '/artworks/artworks/',
	})

	const handleFormChange = useDebounce((form: HTMLFormElement) => {
		submit(form)
	}, 400)

	return (
		<Form
			id="search-form"
			method="GET"
			action="/artworks"
			className="flex flex-wrap items-center justify-center gap-2"
			onChange={e => autoSubmit && handleFormChange(e.currentTarget)}
		>
			<div className="flex-1">
				<Label htmlFor={id} className="sr-only">
					Search
				</Label>
				<Input
					type="search"
					name="query"
					id="query"
					defaultValue={query ?? ''}
					placeholder="Search ..."
					className="w-full font-light"
					autoFocus={autoFocus}
				/>
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
