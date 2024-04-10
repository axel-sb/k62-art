import { type Artwork } from '@prisma/client'

import { prisma } from '#app/utils/db.server.ts'

//+  ______________________________________________________  BY ID
export function getArtwork({ id }: Pick<Artwork, 'id'>) {
	return prisma.artwork.findFirst({
		select: {
			id: true,
			Artist: true,
			artist_title: true,
			Title: true,
			date_end: true,
			Date: true,
			Medium: true,
			image_id: true,
			is_boosted: true,
			image_url: true,
			favorite: true,
			Term: true,
			Subject: true,
			Category: true,
			Style: true,
			Styles: true,
			Classification: true,
			Technique: true,
			Theme: true,
			Description: true,
			provenance_text: true,
			alt_text: true,
			Place: true,
			Type: true,
		},
		where: { id },
	})
}

// +  _______________________________________________  allArtworks
export function getArtworks() {
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
		orderBy: { is_boosted: 'desc' },
		skip: 0,
		take: 500,
	})
}

//+  _____________________________________________________  BY ANY
export function getArtworksByAny(queryAny?: string | '') {
	if (!queryAny) {
		queryAny = 'Query cannot be null'
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
				{ Title: { contains: queryAny } },
				{ Artist: { contains: queryAny } },
				{ Term: { contains: queryAny } },
				{ Subject: { contains: queryAny } },
				{ Theme: { contains: queryAny } },
				{ Classification: { contains: queryAny } },
				{ Category: { contains: queryAny } },
				{ Style: { contains: queryAny } },
				{ Styles: { contains: queryAny } },
				{ Technique: { contains: queryAny } },
				{ provenance_text: { contains: queryAny } },
				{ alt_text: { contains: queryAny } },
				{ Description: { contains: queryAny } },
				{ Place: { contains: queryAny } },
				{ Medium: { contains: queryAny } },
				{ Type: { contains: queryAny } },
				{ image_id: { contains: queryAny } },
				// { image_url: { contains: queryAny } },
				{ date_end: { equals: parseInt(queryAny) } },
				{ Date: { contains: queryAny } },
			],
		},
		orderBy: { is_boosted: 'desc' },
		skip: 0,
		take: 50,
	})
}

//+  __________________________________________________  BY ARTIST
export function getArtworksByArtist(queryArtist?: string | '') {
	if (!queryArtist) {
		queryArtist = 'Query cannot be null'
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
		where: { Artist: { contains: queryArtist } },
		orderBy: { is_boosted: 'desc' },
		skip: 0,
		take: 20,
	})
}

//+  __________________________________________________  BY ------

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
export function getArtworksByStyle(queryStyle?: string | '') {
	if (!queryStyle) {
		queryStyle = 'Query cannot be null'
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
		where: { Style: { contains: queryStyle } },
		orderBy: { is_boosted: 'desc' },
		skip: 0,
		take: 20,
	})
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

//+ byStyle COUNT
// byStyle COUNT  ____________________________________
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
// byArtistDisplay COUNT  ____________________________________
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
/* #endregion */

//+ UPDATE FAVORITE
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

//+ UPDATE COLORS

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
