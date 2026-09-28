import { photos, type Photo } from './photos';

export type ProjectCategory = 'Residential' | 'Commercial' | 'Renovation';

export type Project = {
	title: string;
	location: string;
	category: ProjectCategory;
	photo: Photo;
	/** true = sample entry or stock photo; renders a visible "Sample" tag. */
	sample: boolean;
	note?: string;
};

// Only the Pardo project is a known SAS job (progress video on their Facebook page).
// Everything else is a sample until SAS supplies real projects and photos.
// Cards show finished work (handover shots), never sites under construction.
export const projects: Project[] = [
	{
		title: 'Two-storey residence',
		location: 'Pardo, Cebu City',
		category: 'Residential',
		photo: photos.houseTwoStorey,
		sample: true,
		note: 'Real SAS project · photo is a stand-in'
	},
	{
		title: 'Multi-storey house',
		location: 'Location to follow',
		category: 'Residential',
		photo: photos.houseMultiStorey,
		sample: true
	},
	{
		title: 'Commercial space build-out',
		location: 'Location to follow',
		category: 'Commercial',
		photo: photos.shopInterior,
		sample: true
	},
	{
		title: 'Home extension',
		location: 'Location to follow',
		category: 'Renovation',
		photo: photos.homeExtension,
		sample: true
	},
	{
		title: 'Kitchen & bath renovation',
		location: 'Location to follow',
		category: 'Renovation',
		photo: photos.kitchenFitOut,
		sample: true
	},
	{
		title: 'Townhouse row',
		location: 'Location to follow',
		category: 'Residential',
		photo: photos.townhouseRow,
		sample: true
	},
	{
		title: 'Low-rise commercial building',
		location: 'Location to follow',
		category: 'Commercial',
		photo: photos.commercialBlock,
		sample: true
	},
	{
		title: 'Layout reconfiguration',
		location: 'Location to follow',
		category: 'Renovation',
		photo: photos.openPlanLiving,
		sample: true
	}
];

export const projectCategories: ProjectCategory[] = ['Residential', 'Commercial', 'Renovation'];
