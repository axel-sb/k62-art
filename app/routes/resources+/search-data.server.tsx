import { type Artwork } from '@prisma/client'
import { prisma } from '../../utils/db.server.ts'

//+  ___________            ______________________________  BY ID
export function getArtwork({ id }: Pick<Artwork, 'id'>) {
	return prisma.artwork.findFirst({
		select: {
			id: true,
			Artist: true,
			// artist_title: true,
			Title: true,
			Date: true,
			Place: true,
			Style: true,
			Medium: true,
			Technique: true,
			Description: true,
			Subject: true,
			Classification: true,
			Theme: true,
			provenance_text: true,
			colorfulness: true,
			color_percentage: true,
			color_population: true,
			color_h: true,
			color_s: true,
			color_l: true,
			is_zoomable: true,
			has_multimedia_resources: true,
			has_educational_resources: true,
			has_advanced_imaging: true,
			image_url: true,
			alt_text: true,
			favorite: true,
		},
		where: { id },
	})
}

// +  _________________           ___________________  BY BOOSTED
export function getBoosted() {
	return prisma.artwork.findMany({
		select: {
			id: true,
			Artist: true,
			artist_title: true,
			Title: true,
			Place: true,
			Date: true,
			date_end: true,
			Description: true,
			Style: true,
			Styles: true,
			Term: true,
			Subject: true,
			Theme: true,
			Classification: true,
			Category: true,
			Type: true,
			Medium: true,
			Technique: true,
			provenance_text: true,
			favorite: true,
			is_boosted: true,
			image_id: true,
			image_url: true,
			alt_text: true,
		},
		where: { is_boosted: { equals: true } },
		skip: 0,
		take: 500,
	})
}

//+                                           BY FAVORITE
export function getFavorite() {
	return prisma.artwork.findMany({
		select: {
			id: true,
			Artist: true,
			artist_title: true,
			Title: true,
			Place: true,
			Date: true,
			date_end: true,
			Description: true,
			Style: true,
			Styles: true,
			Term: true,
			Subject: true,
			Theme: true,
			Classification: true,
			Category: true,
			Type: true,
			Medium: true,
			Technique: true,
			provenance_text: true,
			favorite: true,
			is_boosted: true,
			image_id: true,
			image_url: true,
			alt_text: true,
		},
		where: { favorite: { equals: true } },
		skip: 0,
		take: 500,
	})
}

//+  _____________________________________________________  BY ANY
export function getAny(qAny?: string | '') {
	if (!qAny) {
		qAny = 'Query cannot be null'
	}

	return prisma.artwork.findMany({
		select: {
			id: true,
			Title: true,
			Artist: true,
			artist_title: true,
			date_end: true,
			Date: true,
			provenance_text: true,
			alt_text: true,
			width: true,
			height: true,
			Description: true,
			Place: true,
			Medium: true,
			Type: true,
			Category: true,
			Term: true,
			Style: true,
			Styles: true,
			Subject: true,
			Classification: true,
			Technique: true,
			Theme: true,
			colorfulness: true,
			color_percentage: true,
			color_population: true,
			color_h: true,
			color_s: true,
			color_l: true,
			is_zoomable: true,
			has_multimedia_resources: true,
			has_educational_resources: true,
			has_advanced_imaging: true,
			is_boosted: true,
			image_id: true,
			image_url: true,
			favorite: true,
		},
		where: {
			OR: [
				{ Title: { contains: qAny } },
				{ Artist: { contains: qAny } },
				{ Term: { contains: qAny } },
				{ Subject: { contains: qAny } },
				{ Theme: { contains: qAny } },
				{ Classification: { contains: qAny } },
				{ Category: { contains: qAny } },
				{ Style: { contains: qAny } },
				{ Styles: { contains: qAny } },
				{ Technique: { contains: qAny } },
				// { provenance_text: { contains: qAny } },
				{ alt_text: { contains: qAny } },
				{ Description: { contains: qAny } },
				{ Place: { contains: qAny } },
				{ Medium: { contains: qAny } },
				{ Type: { contains: qAny } },
				// { image_id: { contains: qAny } },
				// { image_url: { contains: qAny } },
				{ artist_title: { contains: qAny } },
				{ date_end: { equals: parseInt(qAny) } },
				// { Date: { contains: qAny } },
			],
			AND: [{ Description: { not: "" } }],
		},
		orderBy: { is_boosted: 'desc' },
		skip: 0,
		take: 20,
	})
}

//+  __________________________________________________  BY ARTIST
export function getArtist(q?: string | '') {
	if (!q) {
		q = 'Query cannot be null'
	}
	console.log('🟡🟡 q →', q)

	return prisma.artwork.findMany({
		select: {
			id: true,
			Title: true,
			// Artist: true,
			artist_title: true,
			// date_end: true,
			Date: true,
			Place: true,
			Medium: true,
			Technique: true,
			Description: true,
			Style: true,
			//is_boosted: true,
			image_url: true,
			// image_id: true,
			Term: true,
			Subject: true,
			// Category: true,
			// Classification: true,
			Theme: true,
			provenance_text: true,
			alt_text: true,
			color_h: true,
			color_s: true,
			color_l: true,
			is_zoomable: true,
			// Type: true,
			// favorite: true,
		},
		where: {
			OR: [{ Artist: { contains: q } }, { artist_title: { contains: q } }],
		},
		orderBy: { is_boosted: 'desc' },
		skip: 0,
		take: 20,
	})
}

//+ __________________________________________________  BY SUBJECT
export function getArtworksBySubject(querySubject?: string | '') {
	if (!querySubject) {
		querySubject = 'Query cannot be null'
	}

	return prisma.artwork.findMany({
		select: {
			id: true,
			Title: true,
			Artist: true,
			artist_title: true,
			date_end: true,
			Date: true,
			is_boosted: true,
			image_url: true,
			Medium: true,
			image_id: true,
			Term: true,
			Subject: true,
			Category: true,
			Style: true,
			Styles: true,
			Classification: true,
			Technique: true,
			Theme: true,
			provenance_text: true,
			alt_text: true,
			Description: true,
			Place: true,
			Type: true,
			favorite: true,
		},
		where: { Subject: { contains: querySubject } },
		orderBy: { is_boosted: 'desc' },
		skip: 0,
		take: 20,
	})
}

//+  ___________________________________________________  BY STYLE
export function getStyle(q?: string | '') {
	if (!q) {
		q = 'Query cannot be null'
	}

	return prisma.artwork.findMany({
		select: {
			id: true,
			Title: true,
			Artist: true,
			artist_title: true,
			date_end: true,
			Date: true,
			is_boosted: true,
			image_url: true,
			Medium: true,
			image_id: true,
			Term: true,
			Subject: true,
			Category: true,
			Style: true,
			Styles: true,
			Classification: true,
			Technique: true,
			Theme: true,
			provenance_text: true,
			alt_text: true,
			Description: true,
			Place: true,
			Type: true,
			favorite: true,
		},
		where: { Style: { contains: q } },
		orderBy: { is_boosted: 'desc' },
		skip: 0,
		take: 20,
	})
}

//+  ___________________________________________________  BY PLACE
export function getPlace(qPlace?: string | '') {
	if (!qPlace) {
		qPlace = 'Query cannot be null'
	}

	return prisma.artwork.findMany({
		select: {
			id: true,
			Title: true,
			Artist: true,
			artist_title: true,
			date_end: true,
			Date: true,
			is_boosted: true,
			image_url: true,
			Medium: true,
			image_id: true,
			Term: true,
			Subject: true,
			Category: true,
			Style: true,
			Styles: true,
			Classification: true,
			Technique: true,
			Theme: true,
			provenance_text: true,
			alt_text: true,
			Description: true,
			Place: true,
			Type: true,
			favorite: true,
		},
		where: { Place: { contains: qPlace } },
		orderBy: { is_boosted: 'desc' },
		skip: 0,
		take: 20,
	})
}

//+  _________________________________________________  BY DATEEND

export function getDate(qDate?: number | 0) {
	if (!qDate) {
		qDate = 0
	}

	return prisma.artwork.findMany({
		select: {
			id: true,
			Title: true,
			Artist: true,
			artist_title: true,
			date_end: true,
			Date: true,
			is_boosted: true,
			image_url: true,
			Medium: true,
			image_id: true,
			Term: true,
			Subject: true,
			Category: true,
			Style: true,
			Styles: true,
			Classification: true,
			Technique: true,
			Theme: true,
			provenance_text: true,
			alt_text: true,
			Description: true,
			Place: true,
			Type: true,
			favorite: true,
		},
		where: { date_end: { equals: qDate } },
		orderBy: { is_boosted: 'desc' },
		skip: 0,
		take: 20,
	})
}

//+  ___________________________________________________  BY COLOR
export function getColor(q?: string | '') {
	let numQ = Number(q)
	if (isNaN(numQ)) {
		console.log('🟡 numQ is not a number ')
	} else {
		return prisma.artwork.findMany({
			select: {
				id: true,
				Title: true,
				// Artist: true,
				artist_title: true,
				// date_end: true,
				Date: true,
				Place: true,
				Medium: true,
				Technique: true,
				Description: true,
				Style: true,
				is_boosted: true,
				image_url: true,
				// image_id: true,
				Term: true,
				Subject: true,
				// Category: true,
				// Classification: true,
				Theme: true,
				provenance_text: true,
				alt_text: true,
				color_h: true,
				color_s: true,
				color_l: true,
				is_zoomable: true,
				// Type: true,
				// favorite: true,
			},
			where: {
				color_h: {
					gt: numQ - 10,
					lt: numQ + 10,
				},
				color_s: { gt: Number(25) },
				color_l: { gt: Number(25), lt: Number(75) },
			},
			orderBy: { is_boosted: 'desc' },
			skip: 0,
			take: 20,
		})
	}
}

//+                                                UPDATE FAVORITE
export async function updateArtwork(id: Artwork['id']) {
	const artwork = await prisma.artwork.findUnique({
		where: { id },
		select: {
			favorite: true,
		},
	})

	if (!artwork) {
		throw new Error('Artwork not found')
	}

	const updatedFavorite = !artwork.favorite

	const update = prisma.artwork.update({
		where: { id },
		data: { favorite: updatedFavorite },
	})

	return update
}

// + CREATE  _____________________________________________
export function createArtwork({
	id,
	Title,
	Artist,
	artist_title,
	date_end,
	Date,
	provenance_text,
	alt_text,
	Description,
	Place,
	Medium,
	Type,
	Category,
	Term,
	Style,
	Classification,
	Technique,
	Theme,
	is_boosted,
	Subject,
	image_id,
	image_url,
	favorite,
}: Pick<
	Artwork,
	| 'id'
	| 'Title'
	| 'Artist'
	| 'artist_title'
	| 'date_end'
	| 'Date'
	| 'provenance_text'
	| 'alt_text'
	| 'Description'
	| 'Place'
	| 'Medium'
	| 'Type'
	| 'Category'
	| 'Term'
	| 'Style'
	| 'Classification'
	| 'Technique'
	| 'Theme'
	| 'is_boosted'
	| 'Subject'
	| 'image_id'
	| 'image_url'
	| 'favorite'
>) {
	return prisma.artwork.create({
		data: {
			id,
			Title,
			Artist,
			artist_title,
			date_end,
			Date,
			provenance_text,
			alt_text,
			Description,
			Place,
			Medium,
			Type,
			Category,
			Term,
			Style,
			Classification,
			Technique,
			Theme,
			is_boosted,
			Subject,
			image_id,
			image_url,
			favorite,
		},
	})
}

// ?
// #region UNUSED

//+                                         UPDATE COLORS

/* export async function updateColorPercentage(
  id: Artwork["id"],
  color_percentage: Artwork["color_percentage"],
) {
  const updateColorPercentage = prisma.artwork.updateMany({
    where: { id },
    data: { color_percentage: color_percentage },
  });
  console.log(`Updated ${(await updateColorPercentage).count} artwork objects`);
  return updateColorPercentage;
} */

/* const artworksArray: Artwork[] = dataArtic;

export function updateColorPercentage(
  id: Artwork["id"],
  color_percentage: Artwork["color_percentage"],
) {
  for (const artwork of artworksArray) {
    const updateColorPercentage = prisma.artwork.updateMany({
      data: { color_percentage: { increment: 1 } },
    });
    return updateColorPercentage;
  }
} */

//+ byStyle COUNT
export async function getArtworksByStyleCount() {
	const result = await prisma.artwork.groupBy({
		by: ['Style'],
		_count: {
			Style: true,
			Styles: true,
		},
		having: {
			Style: { _count: { gt: 9 } },
		},
	})

	return result
}

//+ byArtistDisplay COUNT
export async function getArtistDisplayCount() {
	const result = await prisma.artwork.groupBy({
		by: ['Artist'],
		_count: {
			Artist: true,
			artist_title: true,
		},
		having: {
			Artist: { _count: { gt: 0 } },
		},
	})

	return result
}

//+   _______________________________________________  BY IMAGE_ID
export function getArtworksByImage_id(queryImage_id?: string | '') {
	if (!queryImage_id) {
		queryImage_id = 'Query cannot be null'
	}

	return prisma.artwork.findMany({
		select: {
			id: true,
			Title: true,
			Artist: true,
			artist_title: true,
			date_end: true,
			Date: true,
			is_boosted: true,
			image_url: true,
			Medium: true,
			image_id: true,
			Term: true,
			Subject: true,
			Category: true,
			Style: true,
			Styles: true,
			Classification: true,
			Technique: true,
			Theme: true,
			provenance_text: true,
			alt_text: true,
			Description: true,
			Place: true,
			Type: true,
			favorite: true,
		},
		where: { image_id: { contains: queryImage_id } },
		orderBy: { is_boosted: 'desc' },
		skip: 0,
		take: 10,
	})
}

//+                                         COMPUTE COLOR
/* export function computeColor(qColor) {
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
} */
// #endregion  */
