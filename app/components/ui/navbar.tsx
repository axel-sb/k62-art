import React, { useState, useEffect } from 'react'

interface NavbarProps {
	children?: React.ReactNode
	className?: string
}

const Navbar = ({ children }: NavbarProps) => {
	const [show, setShow] = useState(true)
	const [lastScrollY, setLastScrollY] = useState(0)

	// remember current page location to use in the next move

	useEffect(() => {
		const controlNavbar = () => {
			setLastScrollY(window.scrollY)
			if (window.scrollY > lastScrollY) {
				// if scroll down hide the navbar
				setShow(false)
			} else {
				// if scroll up show the navbar
				setShow(true)
			}
		}

		// Call the function to set up the event listener
		controlNavbar()

		// Add the event listener
		window.addEventListener('scroll', controlNavbar)

		// Cleanup function
		return () => {
			window.removeEventListener('scroll', controlNavbar)
		}
	}, [lastScrollY])

	return (
		<nav
			className={`active ${show} group flex w-screen h-12 items-start justify-between gap-4 sm:flex-nowrap md:gap-8`}
		>
      {children}
    </nav>
	)
}

export default Navbar
