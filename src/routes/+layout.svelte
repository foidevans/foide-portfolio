<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Loader from '$lib/components/Loader.svelte';

	let { children } = $props();

	let cursorX = $state(0);
	let cursorY = $state(0);
	let followerX = $state(0);
	let followerY = $state(0);
	let hovering = $state(false);
	let mounted = $state(false);
	let loaderDone = $state(false);

	onMount(() => {
		mounted = true;

		const moveCursor = (e: MouseEvent) => {
			cursorX = e.clientX;
			cursorY = e.clientY;
		};

		let rafId: number;
		const followCursor = () => {
			followerX += (cursorX - followerX) * 0.12;
			followerY += (cursorY - followerY) * 0.12;
			rafId = requestAnimationFrame(followCursor);
		};
		followCursor();

		const onEnter = (e: Event) => {
			if ((e.target as Element)?.closest('a, button')) hovering = true;
		};
		const onLeave = (e: Event) => {
			if ((e.target as Element)?.closest('a, button')) hovering = false;
		};

		window.addEventListener('mousemove', moveCursor);
		document.addEventListener('mouseenter', onEnter, true);
		document.addEventListener('mouseleave', onLeave, true);

		return () => {
			window.removeEventListener('mousemove', moveCursor);
			document.removeEventListener('mouseenter', onEnter, true);
			document.removeEventListener('mouseleave', onLeave, true);
			cancelAnimationFrame(rafId);
		};
	});
</script>

<svelte:head>
	<title>Foide Evans — Frontend Engineer</title>
	<meta name="description" content="Favour Evans (Foide) — Frontend Engineer building immersive digital experiences from Port Harcourt, Nigeria." />
</svelte:head>

<!-- Accessibility: skip to content -->
<a href="#main-content" class="skip-nav">Skip to main content</a>

<!-- Loader: z-index 9999, sits on top of everything during load -->
<Loader />

<!--
	Theme toggle: z-index 10000 — ONE above the loader so it's
	always clickable even during the load animation
-->
<div class="theme-toggle-wrap bg-green-500">
	<ThemeToggle />
</div>

<!-- Custom cursor (desktop only) -->
{#if mounted}
	<div
		class="cursor"
		class:hovering
		style="left:{cursorX}px;top:{cursorY}px;"
		aria-hidden="true"
	></div>
	<div
		class="cursor-follower"
		class:hovering
		style="left:{followerX}px;top:{followerY}px;"
		aria-hidden="true"
	></div>
{/if}

<!-- Nav -->
<Nav />

<!-- Page content -->
<main id="main-content">
	{@render children()}
</main>

<style>
	/* One above loader's 9999 so it's always visible */
	.theme-toggle-wrap {
		position: fixed;
		top: 1.5rem;
		right: 1.5rem;
		z-index: 10000;
	}
</style>