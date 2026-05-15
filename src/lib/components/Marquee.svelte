<script lang="ts">
	const items = [
		'Frontend Engineer',
		'React',
		'TypeScript',
		'SvelteKit',
		'TanStack Query',
		'Zustand',
		'Tailwind CSS',
		'WebGL',
		'Port Harcourt',
		'Nigeria',
		'Creative Dev',
		'Open to Work',
	];

	const repeated = [...items, ...items];
</script>

<div class="marquee-section" aria-label="Skills and keywords">
	<div class="marquee-track" aria-hidden="true">
		<div class="marquee-inner">
			{#each repeated as item}
				<span class="marquee-item">
					{item}
					<span class="dot">●</span>
				</span>
			{/each}
		</div>
	</div>
</div>

<style>
	.marquee-section {
		background: var(--black);
		color: var(--white);
		padding: 1.1rem 0;
		overflow: hidden;
		border-top: 1px solid #1a1a1a;
		border-bottom: 1px solid #1a1a1a;
	}

	.marquee-track {
		overflow: hidden;
	}

	.marquee-inner {
		display: flex;
		width: max-content;
		animation: marquee 30s linear infinite;
	}

	.marquee-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0 1rem;
		font-size: 0.875rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-family: 'Syne Mono', monospace;
		white-space: nowrap;
	}

	.dot {
		color: var(--purple-light);
		font-size: 0.5rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-inner { animation: none; }
	}
</style>
