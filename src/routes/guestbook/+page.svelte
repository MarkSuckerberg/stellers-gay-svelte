<script lang="ts">
	let { data, form } = $props();
	import { enhance } from '$app/forms';

	const SEC = 1000;
	const MIN = 60 * SEC;
	const HOUR = 60 * MIN;
	const DAY = 24 * HOUR;
	const WEEK = 7 * DAY;

	function formatDBDate(input: string) {
		const date = new Date(input);
		const ago = Date.now() - date.valueOf();
		const fmt = new Intl.RelativeTimeFormat(undefined, {
			style: 'narrow'
		});

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
</script>

<svelte:head>
	<title>Guestbook - Steller's Gay</title>

	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<h1>Guestbook</h1>

<p>Please be nice!</p>

<hr class="win" />

<table style="width: 100%">
	<thead>
		<tr>
			<th>Time</th>
			<th>Name</th>
			<th>Message</th>
		</tr>
	</thead>
	<tbody>
		{#each data.messages as message (message.MessageId)}
			<tr>
				<td class="details" title={new Date(message.MessageTime).toString()}>
					<time datetime={message.MessageTime}>{formatDBDate(message.MessageTime)}</time>
				</td>
				<td class="details">{message.MessageUser}</td>
				<td class="message">{message.MessageText}</td>
			</tr>
		{/each}
	</tbody>
</table>

<hr class="win" />

{#if form}
	<p><b>Error submitting:</b> {form}</p>
{/if}

<form
	action=""
	method="POST"
	style="display: grid; gap: 0.5em; grid-template-columns: min-content auto;"
	use:enhance
>
	<label for="name">Name:</label> <input type="text" name="name" id="names" maxlength="16" />

	<label for="message">Message:</label>
	<textarea name="message" id="message" maxlength="128" style="resize: vertical;"></textarea>

	<div
		class="cf-turnstile"
		data-sitekey="0x4AAAAAABtXmAIQt-jTsWC6"
		style="grid-column-end: span 2;"
	></div>

	<button type="submit" style="grid-column-end: span 2;">Submit</button>
</form>

<style>
	table {
		border-collapse: collapse;
	}

	td,
	th {
		padding-right: 0.5em;
	}

	tr:nth-child(even) {
		background-color: #c0c0c0;
	}

	.details {
		text-wrap: nowrap;
	}
</style>
