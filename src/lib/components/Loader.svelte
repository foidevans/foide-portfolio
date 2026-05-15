<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let phase = $state<'circles' | 'burst' | 'done'>('circles');
	let show = $state(true);

	onMount(() => {
	
		setTimeout(() => { phase = 'burst'; }, 1200);
		setTimeout(() => { phase = 'done'; }, 1900);
		setTimeout(() => {
			show = false;
			dispatch('done');
		}, 2500);
	});
</script>

{#if show}
	<div class="loader" class:burst={phase === 'burst'} class:done={phase === 'done'} aria-hidden="true">
		<div class="circles-wrap">
			<div class="circle c1" class:visible={phase !== 'done'}></div>
			<div class="circle c2" class:visible={phase !== 'done'}></div>
			<div class="circle c3" class:visible={phase !== 'done'}></div>
			<div class="circle c4" class:visible={phase !== 'done'}></div>
		</div>
	</div>
{/if}

<style>
	.loader {
		position: fixed;
		inset: 0;
		background: #f0ede6;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.5s cubic-bezier(0.76, 0, 0.24, 1);
	}

	.loader.burst {
		background: #7C3AED;
	}

	.loader.done {
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s ease 0.1s, background 0.5s cubic-bezier(0.76, 0, 0.24, 1);
	}

	.circles-wrap {
		position: relative;
		width: 80px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.circle {
		position: absolute;
		border-radius: 50%;
		opacity: 0;
		transform: scale(0);
		transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.circle.visible {
		opacity: 1;
		transform: scale(1);
	}

	.c1 {
		width: 48px; height: 48px;
		background: #d1d5db;
		left: -28px;
		transition-delay: 0.1s;
	}
	.c2 {
		width: 40px; height: 40px;
		background: #FBBF24;
		left: -8px;
		transition-delay: 0.2s;
	}
	.c3 {
		width: 44px; height: 44px;
		background: #7C3AED;
		left: 8px;
		transition-delay: 0.3s;
	}
	.c4 {
		width: 36px; height: 36px;
		background: #EF4444;
		left: 26px;
		transition-delay: 0.4s;
	}

	.burst .circle {
		opacity: 0;
		transform: scale(8);
		transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>
