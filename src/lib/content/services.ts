import { photos, type Photo } from './photos';

export type ServiceItem = { name: string; detail: string };

export type ServiceGroup = {
	slug: 'construction' | 'plans-permits' | 'finishing' | 'rentals';
	title: string;
	short: string;
	summary: string;
	icon: 'frame' | 'plan' | 'tile' | 'compactor';
	photo: Photo;
	href: string;
	items: ServiceItem[];
};

export const services: ServiceGroup[] = [
	{
		slug: 'construction',
		title: 'Construction',
		short: 'Houses, townhouses, light commercial, renovations',
		summary:
			'Design and construction of single-family homes, multi-storey houses and townhouses, light commercial buildings, and the renovations that keep them working.',
		icon: 'frame',
		photo: photos.frameGrid,
		href: '/services#construction',
		items: [
			{
				name: 'Residential buildings',
				detail: 'Complete design and construction of single-family residences, multi-storey houses and townhouses.'
			},
			{
				name: 'Commercial buildings',
				detail: 'Light commercial structures and commercial space build-outs.'
			},
			{
				name: 'Improvements & renovations',
				detail: 'Home extensions, structural alterations, repairs and layout reconfigurations.'
			},
			{
				name: 'Structural works',
				detail: 'Foundation laying, reinforced concrete framing and structural steel works.'
			}
		]
	},
	{
		slug: 'plans-permits',
		title: 'Plans & permits',
		short: 'Design, sign & seal, permit processing',
		summary:
			'Architectural plans drawn for your lot, signed and sealed by PRC-licensed professionals, and walked through the permit your project needs.',
		icon: 'plan',
		photo: photos.plansSheet,
		href: '/services#plans-permits',
		items: [
			{
				name: 'Architectural design',
				detail: 'Full floor plans, elevations, sections, and 2D/3D visualizations.'
			},
			{
				name: 'Sign & seal',
				detail:
					'Architectural, structural, electrical and sanitary/plumbing plans signed and sealed by PRC-licensed professionals.'
			},
			{
				name: 'Permit assistance',
				detail: 'Building, occupancy, fencing and demolition permits, prepared and processed with you.'
			}
		]
	},
	{
		slug: 'finishing',
		title: 'Finishing trades',
		short: 'Tiles, ceilings, paint, electrical, plumbing',
		summary:
			'The trades that turn a concrete shell into a room you can live in, handled by the same contractor that built the frame.',
		icon: 'tile',
		photo: photos.interiorShell,
		href: '/services#finishing',
		items: [
			{ name: 'Tiling', detail: 'Floor and wall tile for bathrooms, kitchens, living areas and exterior features.' },
			{ name: 'Ceilings & partitions', detail: 'Gypsum board, acoustic boards, drop ceilings and interior drywalls.' },
			{ name: 'Painting', detail: 'Interior and exterior paint, waterproofing coats and surface refinishing.' },
			{ name: 'Electrical', detail: 'Roughing-in, wiring, panel boards and fixture installation.' },
			{ name: 'Plumbing', detail: 'Rough-in piping, drainage, water supply lines and sanitary fixtures.' },
			{ name: 'Waterproofing', detail: 'Moisture protection for roof decks, balconies and wet areas.' },
			{ name: 'Cabinetry & countertops', detail: 'Custom kitchen cabinets, wardrobes and countertop installation.' },
			{ name: 'Landscaping', detail: 'Outdoor ground finishing and exterior decorative works.' }
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
