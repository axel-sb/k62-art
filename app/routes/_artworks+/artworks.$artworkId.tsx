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
	console.log(" 🟠 ", formData, " 🟠🟠 ", favorite)
	await updateArtwork(parseInt(params.artworkId), favorite.value === 'true')
  console.log(
		'🟠🟡🟠  parseInt(params.artworkId) →',
		parseInt(params.artworkId),
	)
	return redirect(`/artworks/${params.artworkId}`)
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariantResponse(params.artworkId, 'Missing artworkId param')
	const artwork = await getArtwork({ id: Number(params.artworkId) })
	if (!artwork) {
		throw new Response("Artwork from 'getArtwork(id)' not found", {
			status: 404,
		})
	}
	return json({ artwork })
}

export default function Artwork() {
	const { artwork } = useLoaderData<typeof loader>()
	const description = { __html: `${artwork.description}` }
	console.log('🟡 artwork →', artwork)
	return (
		<>
			<figure>
				<img
					alt={artwork.alt_text ?? undefined}
					key={artwork.id}
					src={artwork.image_url ?? './dummy.jpeg'}
				/>
				<figcaption>{artwork.title}</figcaption>
			</figure>

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
					<img src="../../icons/info.svg" alt="info" />{' '}
					<Favorite artwork={artwork} />
				</summary>
				{artwork.id ? (
					<ul>
						<li>
							<span>Title:</span>  <span className='detail-content'>{artwork.title}</span></li>
						<li className="artist">
							<span>Artist:</span>  <span className='detail-content'>{artwork.artist_title}</span></li>
						<li>
							<span>Date:</span>  <span className='detail-content'>{artwork.date_display}</span></li>
						<li>
							<span>Place:</span>  <span className='detail-content'>{artwork.place_of_origin}</span></li>
						<li>
							<span>Medium:</span>  <span className='detail-content'>{artwork.medium_display}</span></li>
						<li>
							<span>Type:</span>  <span className='detail-content'>{artwork.artwork_type_title}</span></li>
						<li>
							<span>Description:</span>  <span className='detail-content empty'>
							<p
								className="description"
								dangerouslySetInnerHTML={description}
							/>
						</span></li>
						<li>
							<span>Style:</span> <span>{artwork.style_titles}</span></li>
						<li>
							<span>Subject:</span>  <span className='detail-content empty'>{artwork.subject_titles}</span></li>
						<li>
							<span>Categories:</span>  <span className='detail-content'>{artwork.category_titles}</span></li>
						<li>
							<span>Terms:</span>  <span className='detail-content'>{artwork.term_titles}</span></li>
						<li>
							<span>Classification:</span>  <span className='detail-content'>{artwork.classification_titles}</span></li>
						<li>
							<span>Technique:</span>  <span className='detail-content'>{artwork.technique_titles}</span></li>
						<li>
							<span>Theme:</span>  <span className='detail-content'>{artwork.theme_titles}</span></li>
						<li>
							<span>Provenance:</span>  <span className='detail-content'>{artwork.provenance_text}</span></li>
					</ul>
        ) : (
					<i>Not found</i>
				)}{' '}
			</details>
		</>
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
				value={favorite ? 'false' : 'true'}
				className="favorite"
			>
				{favorite ? '★' : '☆'}
			</button>
		</fetcher.Form>
	)
}
