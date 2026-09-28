import { photos, type Photo } from './photos';

export type ProjectCategory = 'Residential' | 'Commercial' | 'Renovation' | 'Finishing';

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
export const projects: Project[] = [
	{
		title: 'Two-storey residence',
		location: 'Pardo, Cebu City',
		category: 'Residential',
		photo: photos.frameClose,
		sample: true,
		note: 'Real SAS project · photo is a stand-in'
	},
	{
		title: 'Multi-storey house',
		location: 'Location to follow',
		category: 'Residential',
		photo: photos.scaffoldBlock,
		sample: true
	},
	{
		title: 'Commercial space build-out',
		location: 'Location to follow',
		category: 'Commercial',
		photo: photos.slabWork,
		sample: true
	},
	{
		title: 'Home extension',
		location: 'Location to follow',
		category: 'Renovation',
		photo: photos.houseFrame,
		sample: true
	},
	{
		title: 'Kitchen & bath fit-out',
		location: 'Location to follow',
		category: 'Finishing',
		photo: photos.interiorShell,
		sample: true
	},
	{
		title: 'Townhouse row',
		location: 'Location to follow',
		category: 'Residential',
		photo: photos.frameTall,
		sample: true
	},
	{
		title: 'Structural frame & slab',
		location: 'Location to follow',
		category: 'Commercial',
		photo: photos.craneFrame,
		sample: true
	},
	{
		title: 'Layout reconfiguration',
		location: 'Location to follow',
		category: 'Renovation',
		photo: photos.interiorFraming,
		sample: true
	}
];

export const projectCategories: ProjectCategory[] = ['Residential', 'Commercial', 'Renovation', 'Finishing'];
