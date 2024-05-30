// #region imports
import {
	type LinksFunction,
	// type LoaderFunctionArgs,
	type MetaFunction,
	// json,
} from '@remix-run/node'
// import { Form, Link,  useLoaderData, Form, Link, } from '@remix-run/react'
// import { useRef } from 'react'
// import { SearchBar } from '#app/components/search-bar.tsx'
// import { Avatar } from '#app/components/ugly-avatar'
/* import { Button } from '#app/components/ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from '#app/components/ui/dropdown-menu.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import Navbar from '#app/components/ui/navbar.tsx'

import { getUserImgSrc } from '#app/utils/misc.tsx'
import { useOptionalUser, useUser } from '#app/utils/user.ts'*/
/* import {
	getAny,
	getArtist,
	getStyle,
	getPlace,
	getDate,
	getColor,
} from '../resources+/search-data.server' */
import styleSheetUrl from './index.css?url'

// #endregion imports

// #region links & meta

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styleSheetUrl }]
}
export const meta: MetaFunction = () => [{ title: '*Kunsträuber' }]

// #endregion links & meta

/* function UserDropdown() {
	const user = useUser()
	const submit = useSubmit()
	const formRef = useRef<HTMLFormElement>(null)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button asChild variant="secondary" size="fill">
					<Link
						to={`/users/${user.username}`}
						// this is for progressive enhancement
						onClick={e => e.preventDefault()}
						className=""
					>
						<img
							className="h-auto w-full rounded-full object-cover"
							alt={user.name ?? user.username}
							src={getUserImgSrc(user.image?.id)}
						/>
						<span className="text-body-sm text-secondary-foreground">
							{user.name ?? user.username}
						</span>
            /*
					</Link>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent sideOffset={8} align="start">
					<DropdownMenuItem asChild>
						<Link prefetch="intent" to={`/users/${user.username}`}>
							<Icon className="text-body-md" name="avatar">
								Profile
							</Icon>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link prefetch="intent" to={`/users/${user.username}/notes`}>
							<Icon className="text-body-md" name="pencil-2">
								Notes
							</Icon>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						asChild
						// this prevents the menu from closing before the form submission is completed
						onSelect={event => {
							event.preventDefault()
							submit(formRef.current)
						}}
					>
						<Form action="/logout" method="POST" ref={formRef}>
							<Icon className="text-body-md" name="exit">
								<button type="submit">Logout</button>
							</Icon>
						</Form>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	)
} */

// #region loader
//🚩 > > > > > > > > > > > > > > > > > > > > > > >  ⬇︎ Loader ⬇︎  🟠

/* export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	const q = url.searchParams.get('q') ?? undefined
	const searchType = url.searchParams.get('searchType') ?? 'All'

	let avatar = Avatar()

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
			data = await getAny(q)
	}
	return json({ avatar, q, data })
} */

// #endregion loader

export default function Index() {
	/* const data = useLoaderData<typeof loader>()
	const user = useOptionalUser() */


			/* <header className="active top-0 z-40 flex h-40 w-full items-center  justify-stretch px-4 pt-6 transition-all md:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
				<Navbar className="fixed flex h-full w-full max-w-[calc(65vh*1.26)] items-start justify-between gap-4 sm:flex-nowrap md:gap-8">

					{user ? (
						<UserDropdown />
					) : (
						<Button asChild variant="default" size="fill" className="rounded">
							<Link to="/login" className=" h-8 w-8">
								<Avatar />
								<div dangerouslySetInnerHTML={{ __html: data.avatar }} />
							</Link>
						</Button>
					)}
				</Navbar>
			</header> */

			/* //                                        MARK: Default IMAGE
			 */
       return (
			<div className="flex h-full flex-col px-4 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
				<figure className="default-picture flex h-full flex-col items-center  justify-around pt-4">
					<img
						className="animate-hue w-[calc(70vh/1.26)] object-center"
						alt="Andy Warhol, Four Mona Lisas. A work made of acrylic and silkscreen ink on linen."
						src="four-mona-lisas-sm.jpg"
						srcSet="four-mona-lisas-sm.jpg 430w, four-mona-lisas.jpg 600w"
					/>
					<figcaption className="index text-lg text-foreground">
						Four Mona Lisas, 1978
					</figcaption>
				</figure>
			</div>
	)
}
