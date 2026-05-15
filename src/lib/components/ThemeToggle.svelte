<script lang="ts">
	import { onMount } from 'svelte';

	let dark = $state(false);
	let mounted = $state(false);

	function toggle() {
		dark = !dark;
		if (dark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}

	onMount(() => {
		const saved = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		dark = saved === 'dark' || (!saved && prefersDark);
		if (dark) document.documentElement.classList.add('dark');
		mounted = true;
	});
</script>

<button
	class="theme-toggle"
	onclick={toggle}
	aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
	aria-pressed={dark}
	title={dark ? 'Light mode' : 'Dark mode'}
>
	<div class="toggle-track" class:dark>
		<div class="toggle-thumb">
			{#if dark}
				<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
				</svg>
			{:else}
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<circle cx="12" cy="12" r="5"/>
					<line x1="12" y1="1" x2="12" y2="3"/>
					<line x1="12" y1="21" x2="12" y2="23"/>
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
					<line x1="1" y1="12" x2="3" y2="12"/>
					<line x1="21" y1="12" x2="23" y2="12"/>
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
				</svg>
			{/if}
		</div>
	</div>
</button>

<style>
	.theme-toggle {
		background: none;
		border: none;
		/* Override global cursor:none so this is always clickable */
		cursor: pointer !important;
		padding: 4px;
		display: flex;
		align-items: center;
	}

	.toggle-track {
		width: 48px;
		height: 26px;
		background: rgba(0, 0, 0, 0.15);
		border: 1.5px solid rgba(0, 0, 0, 0.25);
		border-radius: 100px;
		position: relative;
		transition: background 0.3s ease, border-color 0.3s ease;
		flex-shrink: 0;
	}

	.toggle-track.dark {
		background: var(--purple);
		border-color: var(--purple);
	}

	.toggle-thumb {
		position: absolute;
		top: 50%;
		left: 3px;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		background: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #0a0a0a;
		transition: left 0.3s cubic-bezier(0.34, 1.4, 0.64, 1);
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
	}

	.toggle-track.dark .toggle-thumb {
		left: calc(100% - 23px);
		color: var(--purple);
	}
</style>