import { own, type Photo } from './photos';

export type ProjectCategory = 'Residential' | 'Renovation' | 'Finishing' | 'Concreting';

export type Project = {
	slug: string;
	title: string;
	location: string;
	category: ProjectCategory;
	/** Card photo. For real jobs this is the first photo of the gallery. */
	photo: Photo;
	/** SAS's own photos of the job, cover first. The card opens them in the photo viewer. */
	gallery?: Photo[];
	/** The SAS Facebook post the photos come from. */
	source?: string;
	/** true = sample entry or stock photo; renders a visible "Sample" tag. */
	sample: boolean;
	note?: string;
};

const shot = (slug: string, n: number, alt: string, w: number, h: number) =>
	own(`projects/${slug}/${n}`, alt, w, h);

const withGallery = (p: Omit<Project, 'photo' | 'sample'> & { gallery: Photo[] }): Project => ({
	...p,
	photo: p.gallery[0],
	sample: false
});

// Real SAS jobs with photos from their own Facebook posts (confirmed Sept 29, 2026).
// Photos are saved in static/projects/<slug>/.
export const projects: Project[] = [
	withGallery({
		slug: 'tungkop',
		title: 'Two-storey house',
		location: 'Tungkop, Minglanilla',
		category: 'Residential',
		note: 'Design: Cuyos&Gonzaga Design + Architecture',
		source:
			'https://www.facebook.com/sasconstructioncebu/posts/pfbid0277aM55cBUqbD89q63u4GGSFsFCLrbWA3gT7fwJMQJkgtyx4sFhaDVUztiHnAvVPvl',
		gallery: [
			shot('tungkop', 1, 'Double-height hall with a stone feature wall, pendant lights and tall black-framed windows', 1170, 1560),
			shot('tungkop', 2, 'Upper hallway with a steel railing looking over the double-height hall', 1170, 1560),
			shot('tungkop', 3, 'Timber stair with a steel railing and linear wall lights', 1170, 1560),
			shot('tungkop', 4, 'Grooved timber front door with a long black pull handle', 1376, 1824),
			shot('tungkop', 5, 'Bedroom seen through a timber door, with a tiled floor and a black-framed window', 1376, 1824)
		]
	}),
	withGallery({
		slug: 'lagtang',
		title: 'Major renovation',
		location: 'Preciousville, Lagtang, Talisay',
		category: 'Renovation',
		source:
			'https://www.facebook.com/sasconstructioncebu/posts/pfbid0Cy12rxanSkGYRpUFS884nxQknNr9KEujrnMhUefjY2o3DN6Cc5e6hnqYT8KQNLXnl',
		gallery: [
			shot('lagtang', 1, 'Renovated ground floor with grey tiles, a steel-railed stair and a new bathroom', 1600, 1200),
			shot('lagtang', 2, 'Stair finished with wood-look treads and a black steel railing', 1536, 2048),
			shot('lagtang', 3, 'Kitchen counter with a stainless sink and a grey backsplash', 1600, 1200),
			shot('lagtang', 4, 'Upstairs room with wood-look flooring and two windows', 1536, 2048),
			shot('lagtang', 5, 'Before: the unit as a bare shell with block walls and an open roof frame', 1170, 1560)
		]
	}),
	withGallery({
		slug: 'kitchen',
		title: 'Kitchen cabinetry',
		location: 'Minglanilla',
		category: 'Renovation',
		source:
			'https://www.facebook.com/sasconstructioncebu/posts/pfbid035wY4gMsKqN7BNJPeXPFkKRDVhPUu5BRkyZNp5f8Adzw2SbhcPYuLhvpeuJrSSNL3l',
		gallery: [
			shot('kitchen', 1, 'Galley kitchen with timber-look overhead and base cabinets, strip lights and a granite countertop', 1600, 1200),
			shot('kitchen', 2, 'Cooking wall with a range, a hood and a microwave set into the cabinets', 1600, 1200),
			shot('kitchen', 3, 'Stainless sink with a black gooseneck faucet on the granite countertop', 1600, 1199),
			shot('kitchen', 4, 'Kitchen run from the window end, with an open shelf in the overhead cabinets', 1600, 1200)
		]
	}),
	withGallery({
		slug: 'tiling',
		title: 'Tiling works',
		location: 'Cebu',
		category: 'Finishing',
		source:
			'https://www.facebook.com/sasconstructioncebu/posts/pfbid0299XF4j5gHAbLrZEbew6Juun5cScC6riWuJ5v1aLeyi38Qwoz39aB8BEX8HkKozJHl',
		gallery: [
			shot('tiling', 1, 'Open ground floor laid with glossy marble-look floor tiles', 1290, 1720),
			shot('tiling', 2, 'Bathroom in white marble-look tiles with a tub, a floating vanity and a window', 1290, 1720),
			shot('tiling', 3, 'Shower with grey stone-look wall tiles and a lit niche', 1536, 2048),
			shot('tiling', 4, 'Kitchen with a white stacked-tile backsplash under lit cabinets', 1290, 968),
			shot('tiling', 5, 'Bathroom walls and floor in dark marble-look tiles', 1290, 1720)
		]
	}),
	withGallery({
		slug: 'concreting',
		title: 'Concreting works',
		location: 'Cebu',
		category: 'Concreting',
		source:
			'https://www.facebook.com/sasconstructioncebu/posts/pfbid0SDBhWXPWbVTphGPgvcnNb3m2meV3XSaCQtCmMeoi3Uqj1q6yx7FARyyKZTVHrgW1l',
		gallery: [
			shot('concreting', 1, 'Freshly cast concrete walls, columns and floor on a ground floor', 1440, 1080),
			shot('concreting', 2, 'Slab reinforcement tied over formwork, with conduit runs in place', 1040, 780),
			shot('concreting', 3, 'Beam reinforcement and shoring for an upper-floor slab', 1080, 1440),
			shot('concreting', 4, 'Drum concrete mixer on site in front of a house under construction', 720, 960),
			shot('concreting', 5, 'Plate compactor packing the gravel sub-base inside a footing', 1440, 580)
		]
	}),
	withGallery({
		slug: 'tungkil',
		title: 'One-storey house',
		location: 'Tungkil, Minglanilla',
		category: 'Residential',
		source: 'https://www.facebook.com/sasconstructioncebu/posts/873631254790416',
		gallery: [
			shot('tungkil', 1, 'Kitchen with white gloss cabinets, a grey stone-look backsplash and a timber door', 1440, 1080),
			shot('tungkil', 2, 'Front of the finished house, with a timber-lined porch roof, a steel railing and a person standing on the porch', 1440, 1080),
			shot('tungkil', 3, 'Built-in white wardrobe with its doors open, over marble-look floor tiles', 1440, 1080),
			shot('tungkil', 4, 'Bedroom with a white open-shelf wardrobe and a black-framed window', 1440, 1080),
			shot('tungkil', 5, 'Porch with a timber post and beam and a black steel railing, scaffolding still up', 1440, 1080)
		]
	})
];

export const projectCategories: ProjectCategory[] = [...new Set(projects.map((p) => p.category))];
