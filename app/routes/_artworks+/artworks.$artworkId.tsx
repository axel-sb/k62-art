import { invariantResponse } from '@epic-web/invariant'
import { type Artwork } from '@prisma/client'
import {
	type LinksFunction,
	type LoaderFunctionArgs,
	json,
	redirect,
	type ActionFunctionArgs,
} from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { type FunctionComponent } from 'react'
import { Icon } from '#app/components/ui/icon.js'
import { getArtwork, updateArtwork } from '../resources+/search-data'
import artworkId from './artworkId.css?url'

// import artworkStyles from "../artworkStyles.css?url";

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: artworkId },
]

export const action = async ({ params, request }: ActionFunctionArgs) => {
	invariantResponse(params.artworkId, 'Missing artworkId param')
	const formData = await request.formData()
	const favorite = Object.fromEntries(formData)
	console.log(' 🟠 ', formData, ' 🟠🟠 ', favorite)
	await updateArtwork(parseInt(params.artworkId))
	console.log('🔵🔵 params →', params)
	return redirect(`/artworks/${params.artworkId}`)
}

//___ __________________________________________  Loader function to fetch artwork data ↓

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariantResponse(params.artworkId, 'Missing artworkId param')
	const artwork = await getArtwork({ id: Number(params.artworkId) })
	if (!artwork) {
		throw new Response("Artwork from 'getArtwork(id)' not found", {
			status: 404,
		})
	}

	// The underscore _ is a convention used by some developers to indicate that the value at that position in the array is not going to be used. This is a way to "ignore" certain returned values when destructuring an array.

	const filteredArtwork: Artwork = Object.fromEntries(
		Object.entries(artwork).filter(
			([_, value]) => value != null && value !== '',
		),
	) as Artwork

	console.log('🟡 filteredArtwork →', filteredArtwork)
	return json({ artwork: filteredArtwork })
}

//+ ___________________________________________________________________  Export Default ↓

export default function Artwork() {
	const { artwork } = useLoaderData<typeof loader>()
	const artist = {
		__html: 'Artist: <br>' + artwork.Artist,
	}
	const description = {
		__html: artwork.Description
			? '<span class="font-normal">Description: </span>' + artwork.Description
			: '',
	}

	const bgHsl = `hsl(${artwork.color_h} ${artwork.color_s}% ${artwork.color_l}%)`
	const bgColor = `lch(from ${bgHsl} 5% c h)`

	//___  _________________________ toggle details with animation

	const handleClick = (e: { target: any }) => {
		console.log('🟡 e.target →', e.target)
		e.target.classList.toggle('open')
	} 
	//+ ____________________________________________________________________  return  JSX ↓

	return (
		<main
			className="h-full w-full overflow-auto p-4"
			style={{ backgroundColor: bgColor }}
		>
			<div className="toolbar flex w-full items-center justify-between pb-4">
				<button onClick={() => history.back()} className="back" type="button">
					<Icon name="cross-1" />
				</button>

				<Favorite artwork={artwork} />
			</div>
			<figure className="w-full">
				<img
					alt={artwork.alt_text ?? undefined}
					key={artwork.id}
					src={artwork.image_url ?? '../../../four-mona-lisas-sm.jpg'}
				/>
				<figcaption className="mx-auto flex w-full flex-col items-center justify-end">
					{/* //___ _______________________________ Details */}

					<details
						id="artwork-info"
						className="styled max-w-full sm:max-w-[60ch] "
					>
						{/* //___ _____________________________ Summary */}

						<summary className="relative pt-4 font-normal">
							<div
								onClick={handleClick}
								className="relative flex justify-between"
							>
								{artwork.Title}
							</div>
						</summary>
						{/*
            // #region //___  Region DETAILS data to display ↓
            omitting items that are empty or not needed for display
            */}
						<div className="expander" id="expander">
							<div className="expander-content min-h-0 w-full">
								<ul>
									<li
										dangerouslySetInnerHTML={artist}
										className="hyphens-auto pb-4 font-normal"
									></li>
									<li
										className="pt-4"
										dangerouslySetInnerHTML={description}
									></li>
									{Object.entries(artwork)
										.filter(
											([key, value]) =>
												value &&
												value !== '' &&
												key !== 'id' &&
												key !== 'Title' &&
												key !== 'image_url' &&
												key !== 'alt_text' &&
												key !== 'artist_title' &&
												key !== 'Description' &&
												key !== 'Artist' &&
												key !== 'image_id',
										)

										/* .sort(([keyA], [keyB]) => {
											const order = [
												'Date',
												'Place',
												'Medium',
												'Style',
												'Subject',
												'Type',
												'Technique',
												'Category',
												'Term',
												'Theme',
												'width',
												'height',
												'provenance_text',
											]
											const indexA = order.indexOf(keyA)
											const indexB = order.indexOf(keyB)
											return indexA - indexB
										}) */
										.map(([key, value]) => (
											<li key={key}>
												<span className="font-normal">{key}:</span>{' '}
												<span className="detail-content">{value}</span>
											</li>
										))}
								</ul>

								{/*
// #endregion DETAILS
*/}
							</div>
						</div>
					</details>
				</figcaption>
			</figure>
		</main>
	)
}

const Favorite: FunctionComponent<{
	artwork: Pick<Artwork, 'favorite'>
}> = ({ artwork }) => {
	const fetcher = useFetcher()
	const favorite = fetcher.formData
		? fetcher.formData.get('favorite') === 'true'
		: artwork.favorite

	return (
		<fetcher.Form method="post">
			<button
				aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
				name="favorite"
				className={
					favorite
						? 'favorite h-8 w-8 text-2xl'
						: 'not-favorite h-8  w-8 text-2xl'
				}
				value={favorite ? 'false' : 'true'}
			>
				{favorite ? '★' : '☆'}
			</button>
		</fetcher.Form>
	)
}
