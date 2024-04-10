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
import { getArtwork, updateArtwork } from '../resources+/search-data'
import artwork from './artwork.css?url'

// import artworkStyles from "../artworkStyles.css?url";

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: artwork }]

export const action = async ({ params, request }: ActionFunctionArgs) => {
	invariantResponse(params.artworkId, 'Missing artworkId param')
	const formData = await request.formData()
	const favorite = Object.fromEntries(formData)
	console.log(' 🟠 ', formData, ' 🟠🟠 ', favorite)
	await updateArtwork(parseInt(params.artworkId),)
	console.log(
		'🟠🟡🟠  parseInt(params.artworkId) →',
		parseInt(params.artworkId),
	)
	return redirect(`/artworks/${params.artworkId}`)
}

//+ _____________________________________________  Loader function to fetch artwork data

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariantResponse(params.artworkId, 'Missing artworkId param')
	const artwork = await getArtwork({ id: Number(params.artworkId) })
	if (!artwork) {
		throw new Response("Artwork from 'getArtwork(id)' not found", {
			status: 404,
		})
	}
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
	console.log('🟡 artwork →', artwork)
	const artist = {
		__html: 'Artist: ' + artwork.Artist ?? '',
	}
	const description = {
		__html: 'Description: ' + artwork.Description ?? '',
	}

	//+ ____________________________________________________________________  return  JSX ↓

	return (
		<main>
			<figure>
				<img
					alt={artwork.alt_text ?? undefined}
					key={artwork.id}
					src={artwork.image_url ?? './dummy.jpeg'}
				/>
				<figcaption>
					<details
						id="artwork-info"
						onClick={() => {
							// scroll to top of details element
							document.getElementById('artwork-info')?.scrollIntoView({
								behavior: 'smooth',
								block: 'start',
							})
						}}
					>
						<summary>
							<img
								src="../../icons/info.svg"
								alt="info"
								className="details-marker"
							/>{' '}
							<Favorite artwork={artwork} />
						</summary>
						<ul>
							<li dangerouslySetInnerHTML={artist}></li>
							<li dangerouslySetInnerHTML={description}></li>
							{Object.entries(artwork)
								.filter(
									([key, value]) =>
										value &&
										value !== '' &&
										key !== 'id' &&
										key !== 'image_url' &&
										key !== 'alt_text' &&
										key !== 'artist_title' &&
										key !== 'date_end' &&
										key !== 'favorite' &&
										key !== 'is_boosted' &&
										key !== 'Description' &&
										key !== 'Artist' &&
										key !== 'image_id',
								)

								.sort(([keyA], [keyB]) => {
									const order = [
										'Title',
										'Artist',
										'Date',
										'Place',
										'Description',
										'Type',
										'Style',
										'Styles',
										'Subject',
										'Medium',
										'Technique',
										'Category',
										'Term',
										'Classification',
										'Theme',
										'width',
										'height',
										'provenance_text',
									]
									const indexA = order.indexOf(keyA)
									const indexB = order.indexOf(keyB)
									return indexA - indexB
								})
								.map(([key, value]) => (
									<li key={key}>
										<span>{key}:</span>{' '}
										<span className="detail-content">{value}</span>
									</li>
								))}
						</ul>
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
				className="favorite"
				value={favorite ? 'false' : 'true'}
			>
				{favorite ? '★' : '☆'}
			</button>
		</fetcher.Form>
	)
}
