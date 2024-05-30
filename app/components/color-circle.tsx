import Circle from '@uiw/react-color-circle'
import { useState /* useContext */ } from 'react'
// import { Context } from './Store.tsx'

export default function Circles() {
	const [hex, setHex] = useState('#bfa440')
	return (
		<Circle
			className="circle-picker my-12"
			colors={[
				'#bfa440',
				'#b0bf40',
				'#86bf40',
				'#5bbf40',
				'#40bf4f',
				'#40bfa4',
				'#40b0bf',
				'#4086bf',
				'#405bbf',
				'#4f40bf',
				'#7940bf',
				'#a440bf',
				'#bf40b0',
				'#bf4086',
				'#bf405b',
				'#bf4f40',
				'#bf7940',
			]}
			color={hex}
			pointProps={{
				style: {
					marginRight: 20,
				},
			}}
			onChange={color => {
				setHex(color.hex)
				console.log('🟡 setHex(color.hex) →', setHex(color.hex))
			}}
		/>
	)
}
