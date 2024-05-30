import { useNavigate } from '@remix-run/react'

export default function BtnBack() {
	const navigate = useNavigate()
	return (
		<button
			onClick={() => {
				navigate(-1)
			}}
		/>
	)
}
