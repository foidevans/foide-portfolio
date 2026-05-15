<script lang="ts">
	import { onMount } from 'svelte';

	let section: HTMLElement;
	let visible = $state(false);
	let parallaxOffset = $state(0);

	const facts = [
		'Plant Science grad turned frontend engineer',
		'Currently at Gigsta Technology & Vulue',
		'2+ years shipping production frontend',
		'Port Harcourt, Nigeria',
	];

	onMount(() => {
		const obs = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) visible = true; },
			{ threshold: 0.1 }
		);
		obs.observe(section);

		function onScroll() {
			if (!section) return;
			const rect = section.getBoundingClientRect();
			const sectionTop = rect.top + window.scrollY;
			const progress = window.scrollY - sectionTop + window.innerHeight;
			parallaxOffset = Math.max(0, Math.min(progress * 0.18, 120));
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => {
			obs.disconnect();
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>


<section
	id="about"
	bind:this={section}
	class="about"
	class:visible
	aria-labelledby="about-heading"
	style="transform: translateY({-parallaxOffset}px);"
>
	<div class="bg-orb orb-1" aria-hidden="true"></div>
	<div class="bg-orb orb-2" aria-hidden="true"></div>

	<div class="about-inner">

		<div class="about-left">
			<p class="label mono">— About me</p>

			<h2 id="about-heading" class="about-heading">
				<span class="word w1">The</span>
				<span class="word w2">girl</span>
				<span class="word w3">who</span>
				<br/>
				<span class="word w4 accent">studied</span>
				<span class="word w5">plants</span>
				<br/>
				<span class="word w6">&amp; builds</span>
				<span class="word w7 accent">webs.</span>
			</h2>

			<ul class="facts" aria-label="Quick facts about Favour Evans">
				{#each facts as f, i}
					<li class="fact" style="transition-delay: {0.3 + i * 0.1}s">
						<span class="fact-dash" aria-hidden="true">—</span>
						<span>{f}</span>
					</li>
				{/each}
			</ul>

			<div class="stats-row" role="list" aria-label="Experience highlights">
				{#each [
					{ num: '2+', label: 'Years shipping' },
					{ num: '5+', label: 'Live projects' },
					{ num: '10+', label: 'Happy clients' }
				] as stat, i}
					<div class="stat" role="listitem" style="transition-delay: {0.65 + i * 0.1}s">
						<span class="stat-num">{stat.num}</span>
						<span class="stat-label mono">{stat.label}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="about-right">
			<div class="glass-card">
				<div class="glass-card-inner">
					<div class="card-tag mono">The story</div>
					<p>
						I'm <strong>Favour Evans</strong>  known online as <strong class="foide-tag">Foide</strong>.
						I went to school for Plant Science &amp; Biotechnology, but the web had other plans for me.
					</p>
					<p>
						Right now I'm shipping production features at <strong>Gigsta Technology</strong> (home services)
						and <strong>Vulue</strong> (collaborative finance) — working across component architecture,
						real-time data, and performance optimization.
					</p>
					<p>
						I obsess over the craft: the spacing that feels right, the transition that makes someone pause,
						the interface that just <em>clicks</em>. Between sprints you'll find me in African lit,
						bioinformatics rabbit holes, or at a tech meetup somewhere in Nigeria.
					</p>
				</div>
				<div class="glass-shimmer" aria-hidden="true"></div>
			</div>
		</div>

	</div>
</section>

<style>
	.about {
		position: relative;
		background: var(--bg, #f5f3ee);
		color: var(--black, #0a0a0a);
		padding: 7rem 3rem 8rem;
		overflow: hidden;
		z-index: 2;
		/* Rounded top so it "slides over" the section above like a card */
		border-radius: 28px 28px 0 0;
		margin-top: -28px;
		will-change: transform;
		box-shadow: 0 -8px 40px rgba(0,0,0,0.08);
	}

	.bg-orb {
		position: absolute;
		border-radius: 50%;
		pointer-events: none;
		z-index: 0;
	}
	.orb-1 {
		width: 600px; height: 600px;
		top: -200px; right: -150px;
		background: radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%);
	}
	.orb-2 {
		width: 400px; height: 400px;
		bottom: -100px; left: -100px;
		background: radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%);
	}

	.about-inner {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: 5rem;
		max-width: 1200px;
		margin: 0 auto;
		align-items: start;
	}

	.label {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(0,0,0,0.35);
		margin-bottom: 2rem;
		opacity: 0;
		transform: translateY(10px);
		transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
	}
	.visible .label { opacity: 1; transform: translateY(0); }

	.about-heading {
		font-size: clamp(2.8rem, 5.5vw, 5.5rem);
		line-height: 1;
		font-weight: 800;
		margin-bottom: 3rem;
		letter-spacing: -0.02em;
		color: var(--black, #0a0a0a);
	}
	.word {
		display: inline-block;
		margin-right: 0.22em;
		opacity: 0;
		transform: translateY(40px) rotate(-3deg);
		transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1);
	}
	.w1 { transition-delay: 0.15s; }
	.w2 { transition-delay: 0.22s; }
	.w3 { transition-delay: 0.29s; }
	.w4 { transition-delay: 0.36s; }
	.w5 { transition-delay: 0.43s; }
	.w6 { transition-delay: 0.50s; }
	.w7 { transition-delay: 0.57s; }
	.visible .word { opacity: 1; transform: translateY(0) rotate(0deg); }
	.accent { color: #7C3AED; }

	.facts {
		list-style: none;
		padding: 0;
		margin: 0 0 3rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.fact {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.88rem;
		color: rgba(0,0,0,0.55);
		opacity: 0;
		transform: translateX(-18px);
		transition: opacity 0.5s ease, transform 0.5s ease;
	}
	.visible .fact { opacity: 1; transform: translateX(0); }
	.fact-dash { color: #7C3AED; font-weight: 700; flex-shrink: 0; }

	.stats-row {
		display: flex;
		gap: 2.5rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(0,0,0,0.08);
	}
	.stat {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		opacity: 0;
		transform: translateY(16px);
		transition: opacity 0.5s ease, transform 0.5s ease;
	}
	.visible .stat { opacity: 1; transform: translateY(0); }
	.stat-num {
		font-size: 2.8rem;
		font-weight: 800;
		line-height: 1;
		color: #7C3AED;
		letter-spacing: -0.03em;
	}
	.stat-label {
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(0,0,0,0.35);
	}

	.glass-card {
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		opacity: 0;
		transform: translateY(40px);
		transition: opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.34, 1.2, 0.64, 1) 0.3s;
	}
	.visible .glass-card { opacity: 1; transform: translateY(0); }

	.glass-card-inner {
		position: relative;
		z-index: 1;
		padding: 2.5rem;
		background: rgba(255, 255, 255, 0.55);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.8);
		border-radius: 20px;
		box-shadow:
			0 8px 32px rgba(124, 58, 237, 0.08),
			0 2px 8px rgba(0,0,0,0.05),
			inset 0 1px 0 rgba(255,255,255,0.95);
	}

	.glass-shimmer {
		position: absolute;
		inset: 0;
		border-radius: 20px;
		background: linear-gradient(
			130deg,
			transparent 0%,
			rgba(255,255,255,0.45) 40%,
			transparent 60%
		);
		background-size: 200% 200%;
		animation: shimmer 5s ease-in-out infinite;
		pointer-events: none;
		z-index: 2;
	}
	@keyframes shimmer {
		0%   { background-position: 200% 200%; opacity: 0.5; }
		50%  { background-position: -50% -50%; opacity: 1;   }
		100% { background-position: 200% 200%; opacity: 0.5; }
	}

	.card-tag {
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: #7C3AED;
		margin-bottom: 1.5rem;
	}
	.glass-card-inner p {
		font-size: 0.95rem;
		line-height: 1.85;
		color: rgba(0,0,0,0.65);
		margin-bottom: 1.1rem;
	}
	.glass-card-inner p:last-child { margin-bottom: 0; }
	.glass-card-inner strong { color: #0a0a0a; font-weight: 600; }
	.glass-card-inner em { font-style: italic; color: rgba(0,0,0,0.75); }

	.foide-tag {
		display: inline-block;
		background: #7C3AED;
		color: #fff !important;
		padding: 0.05em 0.5em;
		border-radius: 4px;
		font-style: normal;
		font-weight: 700;
	}

	@media (max-width: 900px) {
		.about {
			padding: 5rem 1.5rem 6rem;
			border-radius: 20px 20px 0 0;
		}
		.about-inner {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
		.about-heading { font-size: clamp(2.5rem, 10vw, 4rem); }
		.stats-row { gap: 1.5rem; }
	}
</style>