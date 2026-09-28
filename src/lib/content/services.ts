import { photos, type Photo } from './photos';

export type ServiceItem = { name: string; detail: string };

export type ServiceGroup = {
	slug: 'construction' | 'plans-permits' | 'renovation' | 'rentals';
	title: string;
	short: string;
	summary: string;
	icon: 'frame' | 'plan' | 'tile' | 'compactor';
	photo: Photo;
	href: string;
	items: ServiceItem[];
};

// SAS's service list (confirmed by the user, 2026-09-28): general construction,
// residential and commercial buildings, house improvement and renovation, a
// complete set of building plans, sign & seal, and building, occupancy, fencing
// and demolition permit assistance. Plus equipment rental. Don't add services
// that aren't on it.
export const services: ServiceGroup[] = [
	{
		slug: 'construction',
		title: 'Construction',
		short: 'General construction, residential and commercial buildings',
		summary:
			'General construction of residential and commercial buildings: single-family homes, multi-storey houses, townhouses and light commercial spaces.',
		icon: 'frame',
		photo: photos.frameGrid,
		href: '/services#construction',
		items: [
			{
				name: 'General construction',
				detail: 'The build itself, from the foundations and concrete frame to the roof, run by one contractor.'
			},
			{
				name: 'Residential buildings',
				detail: 'Single-family residences, multi-storey houses and townhouses, from plans to handover.'
			},
			{
				name: 'Commercial buildings',
				detail: 'Light commercial structures and commercial spaces.'
			}
		]
	},
	{
		slug: 'renovation',
		title: 'Renovation',
		short: 'House improvement and house renovation',
		summary: 'Work on the house you already have: improvements that add to it, and renovations that rework it.',
		icon: 'tile',
		photo: photos.interiorShell,
		href: '/services#renovation',
		items: [
			{
				name: 'House improvement',
				detail: 'Extensions, added rooms, repairs and upgrades to a house you already live in.'
			},
			{
				name: 'House renovation',
				detail: 'Reworking an existing house: alterations, layout changes and refreshed interiors and exteriors.'
			}
		]
	},
	{
		slug: 'plans-permits',
		title: 'Plans & permits',
		short: 'Building plans, sign & seal, permit assistance',
		summary:
			'A complete set of building plans drawn for your lot, signed and sealed by PRC-licensed professionals, and walked through the permit your project needs.',
		icon: 'plan',
		photo: photos.plansSheet,
		href: '/services#plans-permits',
		items: [
			{
				name: 'Complete set of building plans',
				detail: 'Architectural, structural, electrical and sanitary/plumbing plans, drawn for your lot.'
			},
			{
				name: 'Sign & seal of plans',
				detail: 'Every sheet signed and sealed by PRC-licensed professionals, ready for the permit office.'
			},
			{
				name: 'Building permit assistance',
				detail: 'Prepared and processed with you before the first excavation.'
			},
			{
				name: 'Occupancy permit assistance',
				detail: 'Prepared and processed with you before you move in.'
			},
			{
				name: 'Fencing permit assistance',
				detail: 'For perimeter walls and gates.'
			},
			{
				name: 'Demolition permit assistance',
				detail: 'For clearing an old structure off the lot.'
			}
		]
	},
	{
		slug: 'rentals',
		title: 'Equipment rental',
		short: 'Machinery and tools, rates per job',
		summary:
			'Construction machinery and tools for contractors, subcontractors and private homebuilders anywhere in Cebu. Rates are quoted per job.',
		icon: 'compactor',
		photo: photos.mixerCrew,
		href: '/rentals',
		items: [
			{
				name: 'Machinery',
				detail: 'One-bagger concrete mixer, plate compactor, concrete cutter, generator and water pump.'
			},
			{ name: 'Tools', detail: 'Jackhammer, chipping gun and concrete vibrator.' }
		]
	}
];

export const permits = [
	{ name: 'Building permit', note: 'Before the first excavation' },
	{ name: 'Occupancy permit', note: 'Before you move in' },
	{ name: 'Fencing permit', note: 'Perimeter walls and gates' },
	{ name: 'Demolition permit', note: 'Clearing an old structure' }
] as const;

export const process = [
	{
		title: 'Inquiry',
		body: 'Call, text or send the job order form with your lot details, your idea, or the plans you already have.',
		photo: photos.houseFrame
	},
	{
		title: 'Ocular inspection',
		body: 'We visit the site anywhere in Cebu to check ground conditions, road access and how the lot sits.',
		photo: photos.rebarLadder
	},
	{
		title: 'Bill of materials & quotation',
		body: 'You get a detailed cost estimate, built around your budget and the design you want.',
		photo: photos.plansRoll
	},
	{
		title: 'Build & progress updates',
		body: 'Work starts on site, and you receive progress videos and walkthroughs as the building goes up.',
		photo: photos.scaffoldBlock
	}
] as const;
