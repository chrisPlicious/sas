import { photos, type Photo } from './photos';

export type Equipment = {
	slug: string;
	name: string;
	category: 'Machinery' | 'Tools';
	/** Short lines about what the unit is for. No model specs until SAS confirms them. */
	specs: string[];
	photo: Photo;
	/** true = sample listing (not confirmed by SAS). Renders a "Sample listing" tag. */
	sample: boolean;
	/** true = stand-in stock photo, not SAS's own unit. Renders a "Sample photo" tag. */
	stockPhoto: boolean;
};

// SAS rental inventory (confirmed by the client, Sept 2026).
// Photos are stock stand-ins: drop SAS's own photos in /static/equipment/,
// point `photo` at them and set `stockPhoto: false`.
const RATE = 'Rate quoted per job';

export const equipment: Equipment[] = [
	{
		slug: 'one-bagger-mixer',
		name: 'One-bagger concrete mixer',
		category: 'Machinery',
		specs: ['Mixes one bag of cement per batch', RATE],
		photo: photos.mixer,
		sample: false,
		stockPhoto: true
	},
	{
		slug: 'plate-compactor',
		name: 'Plate compactor',
		category: 'Machinery',
		specs: ['Compacts soil and gravel before slabs and paving', RATE],
		photo: photos.plateCompactor,
		sample: false,
		stockPhoto: true
	},
	{
		slug: 'concrete-cutter',
		name: 'Concrete cutter',
		category: 'Machinery',
		specs: ['Straight cuts through slabs and pavement', RATE],
		photo: photos.concreteCutter,
		sample: false,
		stockPhoto: true
	},
	{
		slug: 'generator',
		name: 'Generator',
		category: 'Machinery',
		specs: ['Site power where there is no line connection', RATE],
		photo: photos.generator,
		sample: false,
		stockPhoto: true
	},
	{
		slug: 'water-pump',
		name: 'Water pump',
		category: 'Machinery',
		specs: ['Dewaters excavations and moves site water', RATE],
		photo: photos.waterPump,
		sample: false,
		stockPhoto: true
	},
	{
		slug: 'jackhammer',
		name: 'Jackhammer',
		category: 'Tools',
		specs: ['Breaks concrete slabs, pavement and rock', RATE],
		photo: photos.jackhammer,
		sample: false,
		stockPhoto: true
	},
	{
		slug: 'chipping-gun',
		name: 'Chipping gun',
		category: 'Tools',
		specs: ['Chips concrete, tiles and plaster', RATE],
		photo: photos.chippingGun,
		sample: false,
		stockPhoto: true
	},
	{
		slug: 'concrete-vibrator',
		name: 'Concrete vibrator',
		category: 'Tools',
		specs: ['Settles fresh concrete and drives out air pockets', RATE],
		photo: photos.concretePour,
		sample: false,
		stockPhoto: true
	}
];
