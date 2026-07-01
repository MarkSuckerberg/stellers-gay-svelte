<script lang="ts">
	let { data, form } = $props();
	import { enhance } from '$app/forms';
	import { relativeDate } from '$lib/time.js';
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
					<time datetime={message.MessageTime}>{relativeDate(message.MessageTime)}</time>
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
