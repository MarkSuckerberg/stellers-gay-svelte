<script lang="ts">
	import { resolve } from '$app/paths';

	type DeviceEntry = string | { name: string; url: string };

	interface Device {
		name: string;
		Model?: DeviceEntry;
		CPU?: DeviceEntry;
		GPU?: DeviceEntry;
		RAM?: DeviceEntry;
		Storage?: DeviceEntry;
		Display?: DeviceEntry;
		OS?: DeviceEntry;
		DE?: DeviceEntry;

		[entry: string]: DeviceEntry | undefined;
	}

	const devices: Device[] = [
		{
			name: 'Main PC',
			CPU: {
				name: 'Intel i7-7700 (4c/8t, 3.60GHz/4.20GHz boost)',
				url: 'https://www.intel.com/content/www/us/en/products/sku/97128/intel-core-i77700-processor-8m-cache-up-to-4-20-ghz/specifications.html'
			},
			GPU: 'AMD RX 6750',
			RAM: '32gb DDR4',
			Storage: 'Intel 670p 1tb NVMe, 4tb HDD, 10tb HDD',
			Display: '2x Dell E221HB FHD 60Hz 21.5", 1x ??? FHD 72Hz',
			OS: 'Arch Linux + (unused) Windows 10 Dual Boot',
			DE: 'KDE Plasma Wayland'
		},
		{
			name: 'Laptop',
			Model: 'Dell XPS 15 9520',
			CPU: {
				name: 'Intel i9-12900HK (14c/20t, 6p/8e, 3.80GHz eCore/5.00GHz pCore)',
				url: 'https://www.intel.com/content/www/us/en/products/sku/132215/intel-core-i912900hk-processor-24m-cache-up-to-5-00-ghz/specifications.html'
			},
			GPU: 'NVIDIA GeForce RTX 3050 Ti Mobile',
			RAM: '64GB DDR5',
			Storage: 'SK hynix 1tb NVMe',
			Display: '??? FHD 60Hz',
			OS: 'Arch Linux',
			DE: 'KDE Plasma Wayland'
		},
		{
			name: 'Server',
			CPU: 'Intel Xeon W3550 (4c/8t, 3.06GHz/3.33GHz boost)',
			RAM: '24GB DDR3',
			Storage: '2x 2TB HDD, 2x 500GB HDD, 1x 256GB SSD',
			OS: 'Proxmox VE'
		},
		{
			name: 'Phone',
			Model: 'Google Pixel 5',
			RAM: '8GB',
			Storage: '128GB eMMC',
			Display: '1080x2340 90Hz 6"',
			'3.5mm Jack': 'no :(',
			OS: 'Android 14'
		},
		{
			name: 'VR Headset',
			Model: 'Markulus Grift v0',
			Display: '1440x2560 72Hz 5.5"',
			Tracking: '2x MPU-6050 Rot, PixArt IR Pos',
			Driver: 'Monado Custom'
		}
	];
</script>

<svelte:head>
	<title>About - Steller's Gay</title>
</svelte:head>

<article>
	<h1>About Me</h1>

	<p>
		Well, I already explained most of who I am on my <a href={resolve('/')}>homepage</a>, but
		this is for the probably less-interesting details.
	</p>

	<section id="projects">
		<h2>Projects</h2>

		<hr class="powerline-divider" />

		<ul>
			<li>
				<a href="https://github.com/blocktest-game/blocktest">Blocktest</a>
				- heavily wip 2d block builder, MonoGame/C#
			</li>
			<li>
				<a href="https://github.com/shiptest-ss13/shiptest">Shiptest</a>
				- ss13 server focusing on ships, BYOND/DM
			</li>
			<li>
				<a href="https://github.com/MarkSuckerberg/txtumblr">txTumblr</a>
				- the best tumblr embeds ever, Cloudflare Workers/TS
			</li>
			<li>
				<a href="https://github.com/MarkSuckerberg/typeble">Typeble</a>
				- mostly unused typescript library for the tumblr api, TS
			</li>
			<li>
				<a href="https://fortuna.stellers.gay/">Tabletuna</a>
				- site for a fanmade
				<a href="https://cosmosdex.com">fortuna</a> ttrpg, SvelteKit/TS
			</li>
			<li>
				<a href="https://github.com/MarkSuckerberg/stellers-gay-svelte">Steller's Gay</a>-
				this site! how amazing! Sveltekit/TS
			</li>
			<li>
				<a href="https://github.com/MarkSuckerberg/fss">FA-RSS</a>
				- an RSS relay for subscribing to account galleries on a certain site, Flask/Python
			</li>
			<li>
				<a href="https://github.com/MarkSuckerberg/svelte-pxls">Pxls.space clone</a>
				- a clone of Pxls.space written in the wake of the wplace craze, SvelteKit/TS
			</li>
			<li>Numerous unnamed games, scripts, sketches, and more</li>
		</ul>
	</section>

	<hr class="paperclip-divider" />

	<section id="interests">
		<h2>Interests</h2>

		<ul style="column-count: 2">
			<li>Birds</li>
			<li>Dinosaurs</li>
			<li>Coding</li>
			<li>Systems Administration</li>
			<li>Game Dev</li>
			<li>Tabletop RPGs</li>
			<li>Cooking</li>
			<li>Old Computers</li>
			<li>Homebrew and Modding</li>
			<li>Art</li>
			<li>Tennis</li>
			<li>Did I mention birds?</li>
		</ul>
	</section>

	<hr class="rainbow-divider" />

	<section id="specs">
		<h2>Specs</h2>

		<ul>
			{#each devices as device (device.name)}
				<li>
					<details>
						<summary>{device.name}</summary>
						<table>
							<tbody>
								{#each Object.entries(device) as [value, entry] (value)}
									{#if value == 'name'}{:else if typeof entry === 'string'}
										<tr>
											<th>{value}</th>
											<td>{entry}</td>
										</tr>
									{:else if entry != undefined}
										<tr>
											<th>{value}</th>
											<td
												><a href={entry.url} rel="external" target="_blank"
													>{entry.name}</a
												></td
											>
										</tr>
									{/if}
								{/each}
							</tbody>
						</table>
					</details>
				</li>
			{/each}
		</ul>
	</section>

	<!--<hr />

	<section id="id">
		<h2>Identity</h2>

		<details>
			<summary>GPG Key</summary>
		</details>
	</section>-->
</article>

<style>
	table {
		border-collapse: collapse;
	}

	td {
		padding-right: 0.5em;
	}

	tr:nth-child(odd) {
		background-color: #c0c0c0;
	}
</style>
