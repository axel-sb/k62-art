import { PrismaClient } from '@prisma/client'
import dataArtic from './dataArtic.json'

const prisma = new PrismaClient()

async function seed() {
	interface Artwork {
		id: string
		title: string
		artist_display: string
		artist_title: string
		date_end: number
		date_display: string
		provenance_text: string
		alt_text: string
		width: number
		height: number
		description: string
		place_of_origin: string
		medium_display: string
		artwork_type_title: string
		category_titles: string
		term_titles: string
		style_title: string
		style_titles: string
		subject_titles: string
		classification_titles: string
		technique_titles: string
		theme_titles: string
		colorfulness: number
		color_percentage: number
		color_population: number
		color_h: number
		color_s: number
		color_l: number
		is_zoomable: boolean
		has_multimedia_resources: boolean
		has_educational_resources: boolean
		has_advanced_imaging: boolean
		is_boosted: boolean
		image_id: string
		image_url: string
		favorite: boolean
	}

	/* The error you're encountering is due to TypeScript's type safety checks. When you use JSON.parse(JSON.stringify(dataArtic)), TypeScript cannot guarantee that the result will be of type Artwork[] because JSON.parse returns a value of type unknown. This is because JSON.parse can parse any valid JSON string, and TypeScript doesn't know the structure of the JSON string at compile time.

  To resolve this issue, you can use a type assertion to tell TypeScript that you're confident about the type of the parsed data. Here's how you can modify the line to include a type assertion: */

	const artworksArray: Artwork[] = JSON.parse(
		JSON.stringify(dataArtic),
	) as Artwork[]

	console.log('🟡 artworksArray →', artworksArray[0])

	for (const artwork of artworksArray) {
		await prisma.artwork.create({
			data: {
				id: parseInt(artwork.id),
				Title: artwork.title,
				Artist: artwork.artist_display,
				date_end: artwork.date_end,
				Date: artwork.date_display,
				Artist_Name: artwork.artist_title,
				// provenance_text: artwork.provenance_text,
				alt_text: artwork.alt_text,
				width: artwork.width,
				height: artwork.height,
				Description: artwork.description,
				Place: artwork.place_of_origin,
				Medium: artwork.medium_display,
				Type: artwork.artwork_type_title,
				Category: artwork.category_titles,
				Term: artwork.term_titles,
				Style: artwork.style_title,
				Styles: artwork.style_titles,
				Subject: artwork.subject_titles,
				Classification: artwork.classification_titles,
				Technique: artwork.technique_titles,
				Theme: artwork.theme_titles,
				colorfulness: artwork.colorfulness,
				color_percentage: artwork.color_percentage,
				color_population: artwork.color_population,
				color_h: artwork.color_h,
				color_s: artwork.color_s,
				color_l: artwork.color_l,
				is_zoomable: artwork.is_zoomable,
				has_multimedia_resources: artwork.has_multimedia_resources,
				has_educational_resources: artwork.has_educational_resources,
				has_advanced_imaging: artwork.has_advanced_imaging,
				is_boosted: artwork.is_boosted,
				//image_id: artwork.image_id,
				image_url: artwork.image_url,
				favorite: artwork.favorite,
			},
		})
		console.log(artwork['title'])
	}
}
seed()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
