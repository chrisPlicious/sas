// Stock placeholders (Unsplash and Pexels, both free licences; Wikimedia Commons
// where they had no clean shot, credited on the card). Replace with SAS's own
// photos as they come in — keep the same keys so every page updates at once.
// Pages render them in grayscale, so colour photos work as-is; equipment shots
// set `color` because renters need to see the actual machine.

export type Credit = { author: string; license: string; href: string };

export type Photo = {
	id: string;
	alt: string;
	w: number;
	h: number;
	host?: 'unsplash' | 'pexels' | 'commons' | 'local';
	/** Render in full colour instead of the site's grayscale treatment. */
	color?: boolean;
	/** Attribution the licence asks for (Commons files). */
	credit?: Credit;
};

const u = (id: string, alt: string, w = 1600, h = 1067): Photo => ({ id, alt, w, h });
const px = (id: string, alt: string, w = 1600, h = 1067): Photo => ({ id, alt, w, h, host: 'pexels' });
// Commons id is the upload path after /commons/, e.g. '9/96/Plate_compactor.jpg'.
const wm = (id: string, alt: string, w: number, h: number, credit: Credit): Photo => ({
	id,
	alt,
	w,
	h,
	host: 'commons',
	credit
});
const commonsPage = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

// SAS's own photos, served from static/. Each is saved as `<id>-<width>.jpg` at
// 800w and at full size (w, at most 1600), e.g. 'projects/tungkop/1-800.jpg'.
export const own = (id: string, alt: string, w: number, h: number): Photo => ({ id, alt, w, h, host: 'local' });

// Equipment catalogue shots: the machine alone, in colour.
const kit = (p: Photo): Photo => ({ ...p, color: true });

export const photos = {
	frameGrid: u('photo-1615461475674-44dbb54dd557', 'Reinforced concrete frame of a building under construction against the sky'),
	scaffoldBlock: u('photo-1747192904662-e03e8da1e0ab', 'Multi-storey concrete building wrapped in scaffolding'),
	rebarLadder: u('photo-1563166423-482a8c14b2d6', 'Rebar columns rising from a concrete slab with a ladder'),
	rebarTops: u('photo-1555485023-93580b46ab80', 'Tops of reinforced concrete posts with exposed rebar'),
	rebarCage: u('photo-1610551675799-50d4d0fe0252', 'Steel rebar cage seen in perspective'),
	siteCrew: u('photo-1712711649566-16c7cfcf341c', 'Crew standing around a building under construction'),
	wallRebar: u('photo-1673978483073-f6e8e5b086c1', 'Concrete wall with rebar and timber formwork'),
	interiorShell: u('photo-1673978484281-e9370ac3b81c', 'Unfinished interior room with bare walls, ready for finishing'),
	houseScaffold: u('photo-1593786267440-550458cc882a', 'House under construction with scaffolding'),
	houseFrame: u('photo-1693639767415-27ff64ce4da2', 'Frame of a two-storey house under construction'),
	// Rental equipment (stand-ins until SAS photographs its own units)
	mixer: kit(u('photo-1786269691601-ac1357298c61', 'Orange one-bagger drum concrete mixer on its wheeled stand', 6000, 4089)),
	mixerYard: kit(px('2333694', 'Orange drum concrete mixer standing in a yard by a brick wall', 2560, 1707)),
	plateCompactor: kit(
		wm('9/96/Plate_compactor.jpg', 'Yellow plate compactor standing on paving', 3789, 2848, {
			author: 'Mr.checker',
			license: 'CC BY-SA 3.0',
			href: commonsPage('Plate_compactor.jpg')
		})
	),
	concreteCutter: kit(u('photo-1746240020915-f33f6c38fc0f', 'Concrete cutter blade under its guard', 7008, 4672)),
	generator: kit(
		wm('7/7d/Portable_electrical_generator_angle.jpg', 'Red open-frame portable generator on wheels', 2240, 1680, {
			author: 'Gbleem',
			license: 'CC BY-SA 3.0',
			href: commonsPage('Portable_electrical_generator_angle.jpg')
		})
	),
	waterPump: kit(u('photo-1700318092011-6e4666e94ab5', 'Engine-driven water pump in a red steel frame', 4000, 4000)),
	jackhammer: kit(
		wm('8/81/Pneumatic_drill.jpeg', 'Pneumatic jackhammer with its air hose, lying on asphalt', 1024, 768, {
			author: 'Anthony Appleyard',
			license: 'CC BY-SA 3.0',
			href: commonsPage('Pneumatic_drill.jpeg')
		})
	),
	chippingGun: kit(
		wm('9/98/AbbruchhammerSAH1500-HK.jpg', 'Electric demolition hammer lying on packed soil', 1024, 768, {
			author: 'sarang',
			license: 'Public domain',
			href: commonsPage('AbbruchhammerSAH1500-HK.jpg')
		})
	),
	concreteVibrator: kit(
		wm('2/20/50_mm_Innenr%C3%BCttler.jpg', 'Concrete poker vibrator with its coiled hose and switch box', 1024, 744, {
			author: 'Baumaschinen Engelbogen GmbH',
			license: 'CC BY-SA 4.0',
			href: commonsPage('50_mm_Innenr%C3%BCttler.jpg')
		})
	),
	mixerCrew: u('photo-1770822662967-7f66605f9103', 'Crew loading a small drum concrete mixer'),
	plansDrawing: u('photo-1503387762-592deb58ef4e', 'Hands drafting architectural plans on a desk'),
	plansRoll: u('photo-1503387837-b154d5074bd2', 'Architect working over rolled building plans'),
	plansSheet: u('photo-1542621334-a254cf47733d', 'Construction drawings with a pencil and ruler'),
	concrete: u('photo-1598092655914-44f06584e31a', 'Cracked concrete surface texture')
} satisfies Record<string, Photo>;

// Commons only serves thumbnails at its standard widths, and never wider than the file.
const COMMONS_WIDTHS = [500, 960, 1280, 1920];
const commonsWidths = (p: Photo) => [...COMMONS_WIDTHS.filter((w) => w < p.w), p.w];
const localWidths = (p: Photo) => [...[800].filter((w) => w < p.w), p.w];

export function src(p: Photo, width: number) {
	if (p.host === 'local') return `/${p.id}-${localWidths(p).find((s) => s >= width) ?? p.w}.jpg`;
	if (p.host === 'commons') {
		const w = commonsWidths(p).find((s) => s >= width) ?? p.w;
		const base = 'https://upload.wikimedia.org/wikipedia/commons';
		return w >= p.w ? `${base}/${p.id}` : `${base}/thumb/${p.id}/${w}px-${p.id.split('/').pop()}`;
	}
	if (p.host === 'pexels')
		return `https://images.pexels.com/photos/${p.id}/pexels-photo-${p.id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
	return `https://images.unsplash.com/${p.id}?w=${width}&q=70&auto=format&fit=crop`;
}

export function srcset(p: Photo, widths = [480, 800, 1200, 1800, 2400]) {
	if (p.host === 'commons') widths = commonsWidths(p);
	if (p.host === 'local') widths = localWidths(p);
	return widths.map((w) => `${src(p, w)} ${w}w`).join(', ');
}
