const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const fmt = new Intl.RelativeTimeFormat(undefined, {
	style: 'narrow'
});

export function relativeDate(input: string | number | Date) {
	const date = typeof input == 'object' ? input : new Date(input);
	const ago = Date.now() - date.valueOf();

	if (ago < MIN) {
		return 'just now';
	}
	if (ago < HOUR) {
		return fmt.format(-Math.round(ago / MIN), 'minutes');
	}
	if (ago < DAY) {
		return fmt.format(-Math.round(ago / HOUR), 'hours');
	}
	if (ago < WEEK) {
		return fmt.format(-Math.round(ago / DAY), 'days');
	}

	return date.toLocaleDateString();
}
