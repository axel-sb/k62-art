// #region  import export
import {
	type LinksFunction,
	type LoaderFunctionArgs,
	json,
} from '@remix-run/node'
import {
	//	Form,
	Link,
	// NavLink,
	// Outlet,
	useLoaderData,
	// useLocation,
	// useNavigation,
	// useSubmit,
} from '@remix-run/react'
//import { useEffect, useState } from 'react'
import { Icon } from '#app/components/ui/icon.js'
import {
	getArtworksByArtist,
	/* getArtworksByArtist,
	getArtworksByStyle,
	getArtworksBySubject, */
} from '../resources+/search-data'
import artworks from './artworks-index.css?url'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: artworks },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	console.log('🟢 url →', url, '🔴 url.search', url.search, 'searchParams, ')
	const query = url.searchParams.get('query') ?? undefined
	const dataArtist = await getArtworksByArtist(query)
	return json({ query, dataArtist })
}

/* const query = url.searchParams.get('query') ?? undefined
	const queryStyle = url.searchParams.get('queryStyle') ?? undefined
	const querySubject = url.searchParams.get('querySubject') ?? undefined */
// const dataAll = await getArtworks()

// Inside your component

/* const queryAny = url.searchParams.get('queryAny') ?? undefined
	const dataAny = await getArtworksByAny(queryAny)
	return json({ dataAny, queryAny })
} */
/* const dataArtist = await getArtworksByArtist(query)
	const dataStyle = await getArtworksByStyle(queryStyle)
	const dataSubject = await getArtworksBySubject(querySubject) */

/* return json({
		dataAny,
		dataArtist,
		dataStyle,
		dataSubject,
		queryAny,
		query,
		queryStyle,
		querySubject,
	})
} */

// #endregion import export

/* interface CheckboxProps {
	label: string
	value: boolean
	onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onChange }) => {
	return (
		<label>
			<input type="checkbox" checked={value} onChange={onChange} />
			{label}
		</label>
	)
} */

//+                                                          export default

export default function ArtworksPage() {
	const { dataArtist } = useLoaderData<typeof loader>()

	// console.log('🟡 dataArtist →', dataArtist)

	return (
		//+ ____________________________________________________________________  return  JSX ↓
		<main className="flex items-center justify-center">
			{/*
      <header className="row-start-1 row-end-2 flex h-fit w-screen items-center justify-between">
				{' '}
				<NavLink to="/" className="home">
					<video
						className="h-1/2 w-1/2"
						playsInline
						autoPlay
						muted
						src="../animation2.mp4"
					/>
				</NavLink>{' '}

			</header>
      */}

			<ul className="artworks-preview p-b-8 flex w-full flex-col items-center justify-start gap-16 md:max-h-[calc(fit/2)] md:flex-wrap ">
				{dataArtist.map(artwork => (
					<li
						key={artwork.id}
						className="display-flex gap-4 md:w-[calc((100%/2)-1rem)] "
					>
						<Link to={`${artwork.id}`}>
							{artwork.Title ? (
								<>
									<figure className="p-4 hover:grid hover:items-start">
										<img
											alt={artwork.alt_text ?? undefined}
											key={artwork.id}
											src={artwork.image_url ?? '../dummy.jpeg'}
										/>
										<figcaption>
											<div>{artwork.Title}</div>
											<div className="flex max-w-full justify-between">
												<span>{artwork.artist_title}</span>
												<Icon name="arrow-right" className="flex-1 justify-self-end"></Icon>
											</div>
										</figcaption>
									</figure>
								</>
							) : (
								<i>No Artworks found for </i>
							)}
						</Link>
					</li>
				))}
			</ul>

			{/*{' '}
					{dataArtist.map(artwork => (
						<li key={artwork.id}>
							<NavLink
								className={({ isActive, isPending }) =>
									isActive ? 'active' : isPending ? 'pending' : ''
								}
								to={`artworks/${artwork.id}`}
							>
								{artwork.title ? (
									<>
										<figure>
											<img
												alt={artwork.alt_text ?? undefined}
												key={artwork.id}
												src={artwork.image_url ?? '../dummy.jpeg'}
											/>
											<figcaption>{artwork.title}</figcaption>
										</figure>
									</>
								) : (
									<i>No Art</i>
								)}{' '}
								{artwork.favorite ? <span>★</span> : null}
							</NavLink>
						</li>
					))}
					{dataStyle.map(artwork => (
						<li key={artwork.id}>
							<NavLink
								className={({ isActive, isPending }) =>
									isActive ? 'active' : isPending ? 'pending' : ''
								}
								to={`${artwork.id}`}
							>
								{artwork.title ? (
									<>
										<figure>
											<img
												alt={artwork.alt_text ?? undefined}
												key={artwork.id}
												src={artwork.image_url ?? '../dummy.jpeg'}
											/>
											<figcaption>{artwork.title}</figcaption>
										</figure>
									</>
								) : (
									<i>No Art</i>
								)}{' '}
								{artwork.favorite ? <span>★</span> : null}
							</NavLink>
						</li>
					))}
					{dataSubject.map(artwork => (
						<li key={artwork.id}>
							<NavLink
								className={({ isActive, isPending }) =>
									isActive ? 'active' : isPending ? 'pending' : ''
								}
								to={`${artwork.id}`}
							>
								{artwork.title ? (
									<>
										<figure>
											<img
												alt={artwork.alt_text ?? undefined}
												key={artwork.id}
												src={artwork.image_url ?? '../dummy.jpeg'}
											/>
											<figcaption>{artwork.title}</figcaption>
										</figure>
									</>
								) : (
									<i>No Art</i>
								)}{' '}
								{artwork.favorite ? <span>★</span> : null}
							</NavLink>
						</li>
					))}{' '}
					*/}
		</main>
	)
}
