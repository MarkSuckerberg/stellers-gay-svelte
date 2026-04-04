<script lang="ts">
	let { data } = $props();
	import { enhance } from '$app/forms';
</script>

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
				<td style="width: min-content">{new Date(message.MessageTime).toLocaleString()}</td>
				<td style="width: min-content">{message.MessageUser}</td>
				<td style="width: max-content">{message.MessageText}</td>
			</tr>
		{/each}
	</tbody>
</table>

<hr class="win" />

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

	tr:nth-child(even) {
		background-color: #c0c0c0;
	}
</style>
