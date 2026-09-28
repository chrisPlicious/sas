import { site } from '$lib/content/site';

export type InquiryType = 'build' | 'rent';

export type Inquiry = {
	type: InquiryType;
	name: string;
	mobile: string;
	email: string;
	location: string;
	locationOther: string;
	project: string;
	stage: string;
	budget: string;
	equipment: string;
	startDate: string;
	days: string;
	details: string;
	reply: 'Call' | 'Text';
};

export const locations = ['Cebu City', 'Mandaue City', 'Talisay City', 'Other town in Cebu'] as const;

export const projectTypes = [
	'New house',
	'Multi-storey house or townhouse',
	'Commercial space',
	'Renovation or extension',
	'Plans & permits',
	'Finishing trades'
] as const;

export const stages = ['Just an idea', 'I have a lot', 'I have plans'] as const;

export function emptyInquiry(type: InquiryType = 'build'): Inquiry {
	return {
		type,
		name: '',
		mobile: '',
		email: '',
		location: '',
		locationOther: '',
		project: '',
		stage: '',
		budget: '',
		equipment: '',
		startDate: '',
		days: '',
		details: '',
		reply: 'Call'
	};
}

export type Errors = Partial<Record<keyof Inquiry, string>>;

// PH mobile: 09XXXXXXXXX or +639XXXXXXXXX, spaces and dashes allowed.
const mobileRe = /^(\+?63|0)9\d{9}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(q: Inquiry): Errors {
	const e: Errors = {};
	if (!q.name.trim()) e.name = 'Enter your name so we know who to ask for.';
	const mobile = q.mobile.replace(/[\s-]/g, '');
	if (!mobile) e.mobile = 'Enter a mobile number so we can call or text you back.';
	else if (!mobileRe.test(mobile)) e.mobile = 'Use a PH mobile number, like 0915 448 3783.';
	if (q.email.trim() && !emailRe.test(q.email.trim())) e.email = 'Check the email address, or leave it blank.';
	if (!q.location) e.location = 'Pick where the site is.';
	else if (q.location === 'Other town in Cebu' && !q.locationOther.trim())
		e.locationOther = 'Type the town or barangay.';

	if (q.type === 'build') {
		if (!q.project) e.project = 'Pick the kind of project.';
	} else {
		if (!q.equipment.trim()) e.equipment = 'Tell us what equipment you need.';
		if (q.days && (!/^\d+$/.test(q.days) || Number(q.days) < 1))
			e.days = 'Enter the number of days as a whole number.';
	}
	return e;
}

// A dated draft stamp, not a reference number: SAS issues nothing until they reply.
export function draftStamp(date = new Date()) {
	const d = date.toLocaleDateString('en-PH', { day: '2-digit', month: 'short', year: 'numeric' });
	return `Draft · ${d}`;
}

export function place(q: Inquiry) {
	return q.location === 'Other town in Cebu' ? q.locationOther.trim() || 'Cebu' : q.location;
}

export function summaryRows(q: Inquiry): [string, string][] {
	const rows: [string, string][] = [
		['Job', q.type === 'build' ? 'Build / renovate' : 'Equipment rental'],
		['Name', q.name.trim()],
		['Mobile', q.mobile.trim()],
		['Site', q.location ? place(q) : '']
	];
	if (q.type === 'build') {
		rows.push(['Project', q.project], ['Stage', q.stage], ['Budget', q.budget.trim() ? `₱ ${q.budget.trim()}` : '']);
	} else {
		rows.push(
			['Equipment', q.equipment.trim()],
			['Start', q.startDate],
			['Days', q.days.trim()]
		);
	}
	rows.push(['Reply by', q.reply]);
	return rows;
}

export function messageText(q: Inquiry) {
	const lines = summaryRows(q)
		.filter(([, v]) => v)
		.map(([k, v]) => `${k}: ${v}`);
	if (q.email.trim()) lines.push(`Email: ${q.email.trim()}`);
	if (q.details.trim()) lines.push('', q.details.trim());
	return ['SAS job order request (from the website)', ...lines].join('\n');
}

export function smsHref(q: Inquiry) {
	return `sms:${site.phones[0].sms}?body=${encodeURIComponent(messageText(q))}`;
}

export function mailtoHref(q: Inquiry) {
	const subject = `Job order request: ${q.type === 'build' ? q.project || 'Build' : q.equipment || 'Rental'}`;
	return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageText(q))}`;
}

/**
 * Delivery hook. The form is front-end only for now: it validates, builds the
 * job order, and hands it to SMS or email. When a backend is ready (e.g. a
 * SvelteKit form action + Resend, or Formspree), send `q` here and return
 * `{ delivered: true }` so the confirmation screen can say it was received.
 */
export async function submitInquiry(q: Inquiry): Promise<{ delivered: boolean }> {
	void q;
	return { delivered: false };
}
