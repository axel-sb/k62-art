import { type Artwork } from '@prisma/client'

import { prisma } from '#app/utils/db.server.ts'

//+  ______________________________________________________  BY ID
export function getArtwork({ id }: Pick<Artwork, 'id'>) {
	return prisma.artwork.findFirst({
		select: {
			id: true,
			artist_display: true,
			artist_title: true,
			title: true,
			date_end: true,
			date_display: true,
			medium_display: true,
			image_id: true,
			is_boosted: true,
			image_url: true,
			favorite: true,
			term_titles: true,
			subject_titles: true,
			category_titles: true,
			style_title: true,
			style_titles: true,
			classification_titles: true,
			technique_titles: true,
			theme_titles: true,
			description: true,
			provenance_text: true,
			alt_text: true,
			place_of_origin: true,
			artwork_type_title: true,
		},
		where: { id },
	})
}

// +  _______________________________________________  allArtworks
export function getArtworks() {
	return prisma.artwork.findMany({
		select: {
			id: true,
			artist_display: true,
			artist_title: true,
			title: true,
			place_of_origin: true,
			date_display: true,
			date_end: true,
			description: true,
			style_title: true,
			style_titles: true,
			term_titles: true,
			subject_titles: true,
			theme_titles: true,
			classification_titles: true,
			category_titles: true,
			artwork_type_title: true,
			medium_display: true,
			technique_titles: true,
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
			title: true,
			artist_display: true,
			artist_title: true,
			date_end: true,
			date_display: true,
			provenance_text: true,
			alt_text: true,
			width: true,
			height: true,
			description: true,
			place_of_origin: true,
			medium_display: true,
			artwork_type_title: true,
			category_titles: true,
			term_titles: true,
			style_title: true,
			style_titles: true,
			subject_titles: true,
			classification_titles: true,
			technique_titles: true,
			theme_titles: true,
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
				{ title: { contains: queryAny } },
				{ artist_display: { contains: queryAny } },
				{ term_titles: { contains: queryAny } },
				{ subject_titles: { contains: queryAny } },
				{ theme_titles: { contains: queryAny } },
				{ classification_titles: { contains: queryAny } },
				{ category_titles: { contains: queryAny } },
				{ style_title: { contains: queryAny } },
				{ style_titles: { contains: queryAny } },
				{ technique_titles: { contains: queryAny } },
				{ provenance_text: { contains: queryAny } },
				{ alt_text: { contains: queryAny } },
				{ description: { contains: queryAny } },
				{ place_of_origin: { contains: queryAny } },
				{ medium_display: { contains: queryAny } },
				{ artwork_type_title: { contains: queryAny } },
				{ image_id: { contains: queryAny } },
				// { image_url: { contains: queryAny } },
				// { date_end: { equals: parseInt(q) } },
				{ date_display: { contains: queryAny } },
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
			title: true,
			artist_display: true,
			artist_title: true,
			date_end: true,
			date_display: true,
			is_boosted: true,
			image_url: true,
			medium_display: true,
			image_id: true,
			term_titles: true,
			subject_titles: true,
			category_titles: true,
			style_title: true,
			style_titles: true,
			classification_titles: true,
			technique_titles: true,
			theme_titles: true,
			provenance_text: true,
			alt_text: true,
			description: true,
			place_of_origin: true,
			artwork_type_title: true,
			favorite: true,
		},
		where: { artist_display: { contains: queryArtist } },
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
			title: true,
			artist_display: true,
			artist_title: true,
			date_end: true,
			date_display: true,
			is_boosted: true,
			image_url: true,
			medium_display: true,
			image_id: true,
			term_titles: true,
			subject_titles: true,
			category_titles: true,
			style_title: true,
			style_titles: true,
			classification_titles: true,
			technique_titles: true,
			theme_titles: true,
			provenance_text: true,
			alt_text: true,
			description: true,
			place_of_origin: true,
			artwork_type_title: true,
			favorite: true,
		},
		where: { subject_titles: { contains: querySubject } },
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
			title: true,
			artist_display: true,
			artist_title: true,
			date_end: true,
			date_display: true,
			is_boosted: true,
			image_url: true,
			medium_display: true,
			image_id: true,
			term_titles: true,
			subject_titles: true,
			category_titles: true,
			style_title: true,
			style_titles: true,
			classification_titles: true,
			technique_titles: true,
			theme_titles: true,
			provenance_text: true,
			alt_text: true,
			description: true,
			place_of_origin: true,
			artwork_type_title: true,
			favorite: true,
		},
		where: { style_title: { contains: queryStyle } },
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
			title: true,
			artist_display: true,
			artist_title: true,
			date_end: true,
			date_display: true,
			is_boosted: true,
			image_url: true,
			medium_display: true,
			image_id: true,
			term_titles: true,
			subject_titles: true,
			category_titles: true,
			style_title: true,
			style_titles: true,
			classification_titles: true,
			technique_titles: true,
			theme_titles: true,
			provenance_text: true,
			alt_text: true,
			description: true,
			place_of_origin: true,
			artwork_type_title: true,
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
		by: ['style_title'],
		_count: {
			style_title: true,
			style_titles: true,
		},
		having: {
			style_title: { _count: { gt: 9 } },
		},
	})

	return result
}

//+ byArtistDisplay COUNT
// byArtistDisplay COUNT  ____________________________________
export async function getArtistDisplayCount() {
	const result = await prisma.artwork.groupBy({
		by: ['artist_display'],
		_count: {
			artist_display: true,
			artist_title: true,
		},
		having: {
			artist_display: { _count: { gt: 0 } },
		},
	})

	return result
}
/* #endregion */

//+ UPDATE FAVORITE
export function updateArtwork(
	id: Artwork['id'],
	// favorite: Artwork['favorite'],
	favorite: artwork.favorite,
) {
	const update = prisma.artwork.update({
		where: { id },
		data: { favorite: favorite },
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
	title,
	artist_display,
	artist_title,
	date_end,
	date_display,
	provenance_text,
	alt_text,
	description,
	place_of_origin,
	medium_display,
	artwork_type_title,
	category_titles,
	term_titles,
	style_title,
	classification_titles,
	technique_titles,
	theme_titles,
	is_boosted,
	subject_titles,
	image_id,
	image_url,
	favorite,
}: Pick<
	Artwork,
	| 'id'
	| 'title'
	| 'artist_display'
	| 'artist_title'
	| 'date_end'
	| 'date_display'
	| 'provenance_text'
	| 'alt_text'
	| 'description'
	| 'place_of_origin'
	| 'medium_display'
	| 'artwork_type_title'
	| 'category_titles'
	| 'term_titles'
	| 'style_title'
	| 'classification_titles'
	| 'technique_titles'
	| 'theme_titles'
	| 'is_boosted'
	| 'subject_titles'
	| 'image_id'
	| 'image_url'
	| 'favorite'
>) {
	return prisma.artwork.create({
		data: {
			id,
			title,
			artist_display,
			artist_title,
			date_end,
			date_display,
			provenance_text,
			alt_text,
			description,
			place_of_origin,
			medium_display,
			artwork_type_title,
			category_titles,
			term_titles,
			style_title,
			classification_titles,
			technique_titles,
			theme_titles,
			is_boosted,
			subject_titles,
			image_id,
			image_url,
			favorite,
		},
	})
}
