/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tnGe4zuKxvJ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from '#app/components/ui/input.tsx'
import { Label } from '#app/components/ui/label.tsx'

export default function Vercel() {
	return (
		<form className="space-y-12">
			<div className="grid gap-1.5">
				<Label htmlFor="color">Vercel: Select a color</Label>
				<Input className="h-12 w-full rounded-md" id="color" type="color" />
			</div>
			<div className="grid gap-1.5">
				<Label htmlFor="hsl">HSL Value</Label>
				<Input
					className="rounded-md bg-gray-100 px-3 py-2 text-sm dark:bg-gray-800"
					id="hsl"
					readOnly
					type="text"
				/>
			</div>
		</form>
	)
}
