// region imports
import { invariantResponse } from '@epic-web/invariant'
import { type Artwork } from '@prisma/client'
import {
	type LinksFunction,
	type LoaderFunctionArgs,
	json,
	redirect,
	type ActionFunctionArgs,
} from '@remix-run/node'
import {
	NavLink,
	useFetcher,
	useLoaderData,
	useNavigate,
} from '@remix-run/react'
import { type FunctionComponent } from 'react'
// import BtnBack from '#app/components/ui/btn-back'
// import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.js'
import { getArtwork, updateArtwork } from '../resources+/search-data.server'
import artworkId from './artworks.$artworkId.css?url'

// import artworkStyles from "../artworkStyles.css?url";
// #endregion imports
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

//___ ___________________________________ MARK:  Loader function to fetch artwork data ↓

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

	const bgHsl = `hsl(${artwork.color_h} ${artwork.color_s}% ${artwork.color_l}%)`
	// convert to lch for better filtering in prisma query
	// const bgColor = `lch(from ${bgHsl} l c h)`

	console.log('🟡 filteredArtwork →', filteredArtwork)
	return json({ artwork: filteredArtwork, bgHsl })
}

//+ ___________________________________________________________________  Export Default ↓

export default function Artwork() {
	const { artwork } = useLoaderData<typeof loader>()
	const artist = {
		__html: '<span class="font-normal"> Artist:  </span> <br>' + artwork.Artist,
	}
	const description = {
		__html: artwork.Description
			? '<span class="font-normal">Description: </span>' + artwork.Description
			: '',
	}
	// for back-button
	const navigate = useNavigate()
	const bgHsl = useLoaderData<typeof loader>().bgHsl
  
	//___  __________________________________________ // MARK:toggle details

	const handleClick = (e: { target: any }) => {
		console.log('🟡 e.target →', e.target)
		e.target.classList.toggle('open')
	}
	//+ ________________________________________  return  JSX ↓___
	return (

		<div
			id="background"
			className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
			style={{ backgroundColor: bgHsl }}
		>

			<main className="h-[calc(100vh-4rem)] max-w-[calc(844px-0rem)] overflow-y-auto px-4 pt-4">
				<div className="toolbar -top-4 flex w-full max-w-[calc(844px-0rem)] items-center justify-between pb-4">
					<button className="btn-back h-10 w-10" onClick={() => navigate(-1)}>
						<Icon name="cross-1" className="h-6 w-6" style={{ color: bgHsl }} />
					</button>
					<Favorite artwork={artwork} />
				</div>
				<figure className="flex w-full flex-col items-center justify-center pt-4">
					<img
						className="rounded-sm"
						alt={artwork.alt_text ?? undefined}
						key={artwork.id}
						src={artwork.image_url ?? '../../../four-mona-lisas-sm.jpg'}
					/>
					<figcaption className="relative mx-auto flex w-full flex-col items-center justify-end">
						{/* //___ _______________________________ Details */}

						<details
							id="artwork-info"
							className="styled max-h-[98dvh] w-full overflow-y-auto sm:max-w-[843px]"
						>
							{/* //___ _____________________ Summary (title) */}

							<summary className="sticky top-0 m-0 w-full pb-4 pt-10 backdrop-blur-xl">
								<div
									onClick={handleClick}
									className="flex items-end justify-between font-medium"
								>
									<div className="text-balance grow shrink-0 text-center text-lg opacity-75">
										{artwork.Title}
									</div>
									<div
										className="right-[calc(50%-1rem)] grow-0 shrink"
										style={{ color: bgHsl }}
									>
										<Icon
											name="info-i2"
											className="h-12 w-12"
											style={{ color: bgHsl }}
										/>
									</div>
								</div>
							</summary>
							{/*
            // #region details //! MARK: region DETAILS data
            omitting items that are empty or not needed for display
            */}
							<div className="expander" id="expander">
								<div className="expander-content min-h-0 w-full">
									<ul className="fex-col flex h-full gap-0.5 py-8">
										<li
											dangerouslySetInnerHTML={artist}
											className="hyphens-auto pb-4 font-light"
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
			<NavLink to="/" className="home fixed bottom-4 right-6 p-1">
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
		</div>
	)
}

const Favorite: FunctionComponent<{
	artwork: Pick<Artwork, 'favorite'>
}> = ({ artwork }) => {
	const fetcher = useFetcher()
	const favorite = fetcher.formData
		? fetcher.formData.get('favorite') === 'true'
		: artwork.favorite

	const bgColor = useLoaderData<typeof loader>().bgHsl

	return (
		<fetcher.Form method="post">
			<button
				aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
				name="favorite"
				className={
					favorite
						? 'favorite h-10 w-10 text-[28px]'
						: 'not-favorite h-10 w-10 text-3xl'
				}
				value={favorite ? 'false' : 'true'}
				style={{ color: bgColor }}
			>
				{favorite ? (
					<Icon
						name="star-filled"
						className="h-6 w-6"
						style={{ color: bgColor }}
					/>
				) : (
					<Icon name="star" className="h-6 w-6" style={{ color: bgColor }} />
				)}
			</button>
		</fetcher.Form>
	)
}
