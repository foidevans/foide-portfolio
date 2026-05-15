<script lang="ts">
	import { onMount } from 'svelte';
	let visible = $state(false);
	onMount(() => setTimeout(() => visible = true, 100));
</script>

<nav class="nav" class:visible aria-label="Main navigation">
	<div class="nav-left">
		<a href="#hero" class="nav-name" aria-label="Foide Evans - go to top">
			Foide Evans
		</a>
		<div class="nav-links">
			<a href="#projects">Work</a>
			<span aria-hidden="true">,</span>
			<a href="#about">About</a>
			<span aria-hidden="true">,</span>
			<a href="#contact">Contact</a>
		</div>
	</div>

	<a
		href="#contact"
		class="nav-arrow"
		aria-label="Go to contact section"
	>
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<path d="M5 12h14M12 5l7 7-7 7"/>
		</svg>
	</a>
</nav>

<style>
	.nav {
		position: fixed;
		bottom: 2rem;
		left: 2rem;
		right: 2rem;
		z-index: 100;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		opacity: 0;
		transform: translateY(10px);
		transition: opacity 0.6s ease, transform 0.6s ease;
		pointer-events: none;
	}

	.nav.visible {
		opacity: 1;
		transform: translateY(0);
		pointer-events: all;
	}

	.nav-left {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.nav-name {
		font-family: 'Syne', sans-serif;
		font-weight: 700;
		font-size: 1rem;
		color: inherit;
		text-decoration: none;
		line-height: 1.2;
		transition: color 0.2s;
	}

	.nav-name:hover { color: var(--purple); }

	.nav-links {
		display: flex;
		gap: 0.25rem;
		font-size: 0.85rem;
		color: inherit;
	}

	.nav-links a {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 2px;
		font-style: italic;
		transition: color 0.2s;
	}

	.nav-links a:hover { color: var(--purple); }

	.nav-links span { font-style: normal; }

	.nav-arrow {
		width: 44px;
		height: 44px;
		border: 1.5px solid currentColor;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: inherit;
		text-decoration: none;
		transition: background 0.2s, color 0.2s, transform 0.2s;
	}

	.nav-arrow:hover {
		background: var(--purple);
		color: white;
		border-color: var(--purple);
		transform: rotate(45deg);
	}

	@media (max-width: 640px) {
		.nav {
			bottom: 1.25rem;
			left: 1.25rem;
			right: 1.25rem;
		}
		.nav-name { font-size: 0.875rem; }
	}
</style>
