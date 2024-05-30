import { useState } from 'react'

import pkg from 'react-color'
const { HuePicker } = pkg
export default function HueSlider() {
	const [color, setColor] = useState({ h: 0, s: 1, l: 1, a: 1 })
	const handleChange = (color: any) => {
		setColor(color)
		console.log('🟡 color →', color)
		let hue = color.h
		console.log('🟡 hue →', hue)
	}

	return (
		<div className="color-picker">
			<HuePicker
				color={color}
				className={'hue-picker my-8'}
				onChangeComplete={handleChange}
			/>
		</div>
	)
}
