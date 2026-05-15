<script lang="ts">
	import { onMount } from 'svelte';

	let section: HTMLElement;
	let visible = $state(false);

	const skillGroups = [
		{
			label: 'Core',
			skills: ['React 19', 'TypeScript', 'Next.js', 'SvelteKit', 'JavaScript'],
			color: '#7C3AED',
		},
		{
			label: 'Styling',
			skills: ['Tailwind CSS v4', 'CSS Modules', 'SCSS', 'Framer Motion'],
			color: '#F59E0B',
		},
		{
			label: 'State & Data',
			skills: ['Zustand', 'TanStack Query', 'Zod', 'React Hook Form'],
			color: '#10B981',
		},
		{
			label: 'Tools',
			skills: ['Git', 'Vite', 'Radix UI', 'shadcn/ui', 'Vercel'],
			color: '#EF4444',
		},
	];

	onMount(() => {
		const obs = new IntersectionObserver(
			([e]) => { if (e.isIntersecting) visible = true; },
			{ threshold: 0.15 }
		);
		obs.observe(section);
		return () => obs.disconnect();
	});
</script>

<section id="skills" bind:this={section} class="skills" class:visible aria-labelledby="skills-heading">
	<div class="skills-inner">
		<div class="skills-header">
			<div class="label mono">Skills</div>
			<h2 id="skills-heading" class="display skills-title">
				The tools<br/><em>I work with</em>
			</h2>
		</div>

		<div class="skills-grid">
			{#each skillGroups as group, gi}
				<div class="skill-group" style="--delay: {gi * 0.1}s">
					<div class="group-label mono" style="color: {group.color}">{group.label}</div>
					<div class="bubbles" role="list" aria-label="{group.label} skills">
						{#each group.skills as skill, si}
							<div
								class="bubble"
								role="listitem"
								style="
									--bubble-color: {group.color};
									--i: {si};
									animation-delay: {(gi * 0.1) + (si * 0.06)}s;
								"
							>
								{skill}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills {
		background: var(--black);
		color: var(--white);
		padding: 6rem 3rem;
		overflow: hidden;
	}

	.skills-inner { max-width: 1200px; margin: 0 auto; }

	.label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		opacity: 0.4;
		margin-bottom: 1.5rem;
	}

	.skills-title {
		font-size: clamp(3rem, 7vw, 7rem);
		line-height: 0.9;
		margin-bottom: 4rem;
	}

	.skills-title em {
		font-style: italic;
		color: var(--purple-light);
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 3rem 4rem;
	}

	.skill-group {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.6s ease var(--delay), transform 0.6s ease var(--delay);
	}

	.visible .skill-group {
		opacity: 1;
		transform: translateY(0);
	}

	.group-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		margin-bottom: 1rem;
	}

	.bubbles {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.bubble {
		padding: 0.5rem 1.1rem;
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: 100px;
		font-size: 0.8rem;
		font-family: 'Syne Mono', monospace;
		color: rgba(255,255,255,0.75);
		transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
		cursor: default;
	}

	.bubble:hover {
		background: var(--bubble-color);
		border-color: var(--bubble-color);
		color: white;
		transform: translateY(-3px) scale(1.05);
	}

	@media (max-width: 768px) {
		.skills { padding: 4rem 1.5rem; }
		.skills-grid { grid-template-columns: 1fr; gap: 2rem; }
	}
</style>
