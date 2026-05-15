<script lang="ts">
	import { onMount } from 'svelte';
	import Loader from '$lib/components/Loader.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let loaded = $state(false);

	function handleLoaded() {
		loaded = true;
	}
</script>

<Loader on:done={handleLoaded} />

{#if loaded}
	<Nav />
	<Hero />
	<Marquee />
	<Projects />
	<About />
	<Skills />
	<Contact />
	<Footer />
{/if}
