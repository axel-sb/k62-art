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
import {
	getArtworksByArtist,
	/* getArtworksByArtist,
	getArtworksByStyle,
	getArtworksBySubject, */
} from '../resources+/search-data'
import artworks from './artworks.css?url'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: artworks },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	const queryArtist = url.searchParams.get('queryArtist') ?? undefined
	const dataArtist = await getArtworksByArtist(queryArtist)
	return json({ queryArtist, dataArtist })
}

/* const queryArtist = url.searchParams.get('queryArtist') ?? undefined
	const queryStyle = url.searchParams.get('queryStyle') ?? undefined
	const querySubject = url.searchParams.get('querySubject') ?? undefined */
// const dataAll = await getArtworks()

// Inside your component

/* const queryAny = url.searchParams.get('queryAny') ?? undefined
	const dataAny = await getArtworksByAny(queryAny)
	return json({ dataAny, queryAny })
} */
/* const dataArtist = await getArtworksByArtist(queryArtist)
	const dataStyle = await getArtworksByStyle(queryStyle)
	const dataSubject = await getArtworksBySubject(querySubject) */

/* return json({
		dataAny,
		dataArtist,
		dataStyle,
		dataSubject,
		queryAny,
		queryArtist,
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

	console.log('🟡 dataArtist →', dataArtist)

	return (
		//+ ____________________________________________________________________  return  JSX ↓
		<main>
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

			<ul className="artworks-preview">
				{dataArtist.map(artwork => (
					<li key={artwork.id}>
						<Link to={`${artwork.id}`}>
							{artwork.Title ? (
								<>
									<figure>
										<img
											alt={artwork.alt_text ?? undefined}
											key={artwork.id}
											src={artwork.image_url ?? '../dummy.jpeg'}
										/>
										<figcaption>
											{artwork.Title}
											{'  '}
											{artwork.Artist} <button type="button">more ⮁</button>
										</figcaption>
									</figure>
								</>
							) : (
								<i>No Art</i>
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
