import * as React from 'react'

import { cn } from '#app/utils/misc.tsx'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'aria-[invalid]:border-input-invalid md:text-body-md flex h-10 w-full rounded-md border-[.5px] border-input bg-background bg-gradient-to-br px-3 py-2 text-sm font-extralight text-yellow-300 ring-offset-background transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				{...props}
			/>
		)
	},
)
Input.displayName = 'Input'

export { Input }
