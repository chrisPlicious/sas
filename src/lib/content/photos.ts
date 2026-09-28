// Stock placeholders (Unsplash and Pexels, both free licences). Replace with
// SAS's own photos as they come in — keep the same keys so every page updates
// at once. Pages render them in grayscale, so colour photos work as-is.

export type Photo = { id: string; alt: string; w: number; h: number; host?: 'unsplash' | 'pexels' };

const u = (id: string, alt: string, w = 1600, h = 1067): Photo => ({ id, alt, w, h });
const px = (id: string, alt: string, w = 1600, h = 1067): Photo => ({ id, alt, w, h, host: 'pexels' });

export const photos = {
	frameGrid: u('photo-1615461475674-44dbb54dd557', 'Reinforced concrete frame of a building under construction against the sky'),
	frameClose: u('photo-1615461476249-718ef8bc369c', 'Concrete columns and slabs of an unfinished building'),
	frameTall: u('photo-1508450859948-4e04fabaa4ea', 'Grey concrete building under construction', 1200, 1455),
	scaffoldBlock: u('photo-1747192904662-e03e8da1e0ab', 'Multi-storey concrete building wrapped in scaffolding'),
	rebarLadder: u('photo-1563166423-482a8c14b2d6', 'Rebar columns rising from a concrete slab with a ladder'),
	rebarTops: u('photo-1555485023-93580b46ab80', 'Tops of reinforced concrete posts with exposed rebar'),
	rebarCage: u('photo-1610551675799-50d4d0fe0252', 'Steel rebar cage seen in perspective'),
	siteCrew: u('photo-1712711649566-16c7cfcf341c', 'Crew standing around a building under construction'),
	slabWork: u('photo-1720278516199-55256b5040ef', 'Large building under construction with formwork'),
	wallRebar: u('photo-1673978483073-f6e8e5b086c1', 'Concrete wall with rebar and timber formwork'),
	craneFrame: u('photo-1714066289789-c67b83577842', 'Workers on a concrete frame under construction'),
	interiorShell: u('photo-1673978484281-e9370ac3b81c', 'Unfinished interior room with bare walls, ready for finishing'),
	interiorFraming: u('photo-1656733911001-16912b79d2bf', 'Interior framing and ceiling joists during renovation'),
	houseScaffold: u('photo-1593786267440-550458cc882a', 'House under construction with scaffolding'),
	houseFrame: u('photo-1693639767415-27ff64ce4da2', 'Frame of a two-storey house under construction'),
	// Rental equipment (stand-ins until SAS photographs its own units)
	chippingGun: u('photo-1615657220350-ad1f77adc232', 'Worker chipping a concrete surface with a handheld breaker'),
	jackhammer: u('photo-1665631153909-ae7a1b6c137f', 'Operator breaking paving with a jackhammer'),
	generator: px('32713414', 'Portable open-frame generator on a job site'),
	waterPump: u('photo-1700318092011-6e4666e94ab5', 'Engine-driven water pump in a steel frame'),
	plateCompactor: px('17315723', 'Operator compacting a soil base with a plate compactor'),
	concreteCutter: u('photo-1746240020915-f33f6c38fc0f', 'Concrete cutter blade under its guard'),
	cutterAtWork: u('photo-1707948951027-be030a12510d', 'Walk-behind concrete cutter scoring a street slab'),
	mixer: u('photo-1588415796310-b9a124beabb0', 'Drum concrete mixer on a construction site'),
	mixerCrew: u('photo-1770822662967-7f66605f9103', 'Crew loading a small drum concrete mixer'),
	concretePour: px('36847988', 'Worker working a hose into freshly poured concrete'),
	plansDrawing: u('photo-1503387762-592deb58ef4e', 'Hands drafting architectural plans on a desk'),
	plansRoll: u('photo-1503387837-b154d5074bd2', 'Architect working over rolled building plans'),
	plansSheet: u('photo-1542621334-a254cf47733d', 'Construction drawings with a pencil and ruler'),
	concrete: u('photo-1598092655914-44f06584e31a', 'Cracked concrete surface texture')
} satisfies Record<string, Photo>;

export function src(p: Photo, width: number) {
	if (p.host === 'pexels')
		return `https://images.pexels.com/photos/${p.id}/pexels-photo-${p.id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
	return `https://images.unsplash.com/${p.id}?w=${width}&q=70&auto=format&fit=crop`;
}

export function srcset(p: Photo, widths = [480, 800, 1200, 1800, 2400]) {
	return widths.map((w) => `${src(p, w)} ${w}w`).join(', ');
}
