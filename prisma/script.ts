// import { PrismaClient } from '@prisma/client'
import { prisma } from '#app/utils/db.server.ts'

prisma
	.$extends({
		result: {
			artwork: {
				color: {
					needs: { color_h: true, color_s: true, color_l: true },
					compute(artwork) {
						return `hsl(${artwork.color_h} ${artwork.color_s}% ${artwork.color_l}%)`
					},
				},
			},
		},
	})
	.$extends({
		result: {
			artwork: {
				colorLCH: {
					needs: { color: true },
					compute(artwork) {
						return `lch(from $color} l c h)`
					},
				},
			},
		},
	})

async function main() {
	const artworks = await prisma.artwork.findMany({ take: 5 })

	for (const artwork of artworks) {
		console.info(`- ${artwork.colorLCH}`)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
