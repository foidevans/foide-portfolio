<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	let cursorX = $state(0);
	let cursorY = $state(0);
	let followerX = $state(0);
	let followerY = $state(0);
	let hovering = $state(false);
	let mounted = $state(false);

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
		window.addEventListener('mousemove', moveCursor);
		document.addEventListener('mouseenter', (e) => {
			if ((e.target as Element)?.closest('a, button')) hovering = true;
		}, true);
		document.addEventListener('mouseleave', (e) => {
			if ((e.target as Element)?.closest('a, button')) hovering = false;
		}, true);
		return () => {
			window.removeEventListener('mousemove', moveCursor);
			cancelAnimationFrame(rafId);
		};
	});
</script>

<svelte:head>
	<title>Foide Evans — Frontend Engineer</title>
	<meta name="description" content="Favour Evans (Foide) — Frontend Engineer building immersive digital experiences from Port Harcourt, Nigeria." />
</svelte:head>

<a href="#main-content" class="skip-nav">Skip to main content</a>

{#if mounted}
	<div class="cursor" class:hovering style="left:{cursorX}px;top:{cursorY}px;" aria-hidden="true"></div>
	<div class="cursor-follower" class:hovering style="left:{followerX}px;top:{followerY}px;" aria-hidden="true"></div>
{/if}

<div id="main-content">
	{@render children()}
</div>
