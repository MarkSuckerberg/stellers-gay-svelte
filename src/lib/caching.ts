const rfc822BuildTime = new Date(Date.now()).toUTCString();

const hashMap: Map<string, string> = new Map();

async function GetHash(input: string) {
	const currentValue = hashMap.get(input);

	if (currentValue !== undefined) {
		return currentValue;
	}

	const newValue = [
		...new Uint8Array(await crypto.subtle.digest('sha-1', new TextEncoder().encode(input)))
	]
		.map((value) => value.toString(16).padStart(2, '0'))
		.join('');

	hashMap.set(input, newValue);

	return newValue;
}

export async function AlreadyHas(
	request: Request,
	value: string,
	lastModified: string | Date | number | undefined = undefined
) {
	if (lastModified == undefined) {
		lastModified = rfc822BuildTime;
	} else if (typeof lastModified !== 'string') {
		lastModified = new Date(lastModified).toUTCString();
	}

	const hash = await GetHash(value);
	const noneMatch = request.headers.get('If-None-Match') == hash;
	const modSince = request.headers.get('If-Modified-Since') == lastModified;

	if (noneMatch && modSince) {
		return true;
	}

	return false;
}

export async function EtagHeaders(
	value: string,
	lastModified: string | Date | number | undefined = undefined
) {
	if (lastModified == undefined) {
		lastModified = rfc822BuildTime;
	} else if (typeof lastModified !== 'string') {
		lastModified = new Date(lastModified).toUTCString();
	}

	const hash = await GetHash(value);

	return {
		Etag: hash,
		'Last-Modified': lastModified
	};
}
