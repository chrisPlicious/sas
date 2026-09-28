// Verified business facts (source: SAS business profile PDF, Sept 2026).
// Do not add licence numbers, founding years, project counts or rates here —
// none are verified. See PRODUCT.md › Evidence on Hand.

export const site = {
	name: 'SAS Construction',
	legalName: 'SAS Construction Services and Equipment Rentals – Cebu',
	tagline: 'Affordable Construction Equipment for Rent in Cebu',
	proprietor: 'Alvin Sasing',
	address: {
		line1: 'Enriquez Compound, Atillo Street',
		line2: 'Punta Princesa, Cebu City',
		region: 'Cebu, Philippines',
		mapsUrl:
			'https://www.google.com/maps/search/?api=1&query=Enriquez+Compound+Atillo+Street+Punta+Princesa+Cebu+City'
	},
	serviceArea: ['Cebu City', 'Mandaue', 'Talisay'],
	hours: 'Inquiries open 24 hours',
	phones: [
		{ label: '0915 448 3783', tel: '+639154483783', sms: '+639154483783' },
		{ label: '0927 224 9302', tel: '+639272249302', sms: '+639272249302' }
	],
	email: 'alvinsasing97@gmail.com',
	// Add the page URL once confirmed, e.g. 'https://www.facebook.com/…'. Links render only when set.
	facebookUrl: null as string | null
} as const;

export const primaryPhone = site.phones[0];

export const nav = [
	{ href: '/services', label: 'Services' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/rentals', label: 'Rentals' },
	{ href: '/contact', label: 'Contact' }
] as const;
