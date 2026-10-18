export const prerender = true;

const file = `version: STSv1
mode: testing
mx: mail.stellers.gay
max_age: 604800`;

export async function GET() {
	return new Response(file);
}
