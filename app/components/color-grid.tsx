import React, { useState } from 'react'

let hues = [
	'0',
	'20',
	'40',
	'60',
	'80',
	'100',
	'120',
	'140',
	'160',
	'180',
	'200',
	'220',
	'240',
	'260',
	'280',
	'300',
	'320',
	'340',
]

function ColorCircle({ hue }: { hue: string }) {
	const [, setHue] = useState(hue ?? '0')
	return (
		<div
			className="h-20 w-20 rounded-full"
			style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
			data-hue={`${hue}`}
			onClick={e => setHue(e.currentTarget.dataset.hue ?? '0')}
		/>
	)
}

export default function ColorGrid() {
	return (
		<div className="m-10 grid grid-cols-3 gap-4">
			{hues.map(hue => (
				<ColorCircle key={hue} hue={hue} />
			))}
		</div>
	)
}
