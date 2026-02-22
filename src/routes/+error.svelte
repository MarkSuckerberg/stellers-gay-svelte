<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>Error {page.status} - {page.error?.message}</h1>
<img src="https://http.cat/{page.status}" alt="Decorative cat representing error {page.status}" />
