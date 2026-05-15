<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);
	let parallaxReady = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let section: HTMLElement;
	let canvas: HTMLCanvasElement;
	let animId: number;

	const bigCircles = [
		{ size: 500, top: -10, right: -2,  dropDelay: 0    , speed: 1   },
		{ size: 260, top: 15,  right: 37,  dropDelay: 0.08 , speed: 1.8 },
		{ size: 110, bottom: 12, right: 8, dropDelay: 0.15 , speed: 2.5 },
		{ size: 55,  bottom: 28, right: 22,dropDelay: 0.2  , speed: 3   },
		{ size: 35,  top: 55,  left: 42,   dropDelay: 0.25 , speed: 3.5 },
		{ size: 20,  bottom: 40, right: 44,dropDelay: 0.3  , speed: 4   },
		{ size: 14,  top: 38,  right: 48,  dropDelay: 0.35 , speed: 4.5 },
	];

	interface Bubble { x: number; y: number; size: number; vx: number; vy: number; opacity: number; }
	let bubbles: Bubble[] = [];

	function initBubbles() {
		bubbles = Array.from({ length: 28 }, () => ({
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			size: Math.random() * 10 + 3,
			vx: (Math.random() - 0.5) * 0.6,
			vy: (Math.random() - 0.5) * 0.6,
			opacity: Math.random() * 0.25 + 0.08,
		}));
	}

	function animateBubbles() {
		if (!canvas) return;
		const ctx = canvas.getContext('2d')!;
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		bubbles.forEach(b => {
			b.x += b.vx; b.y += b.vy;
			if (b.x < -20) b.x = canvas.width + 20;
			if (b.x > canvas.width + 20) b.x = -20;
			if (b.y < -20) b.y = canvas.height + 20;
			if (b.y > canvas.height + 20) b.y = -20;
			ctx.beginPath();
			ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(0,0,0,${b.opacity})`;
			ctx.fill();
		});
		animId = requestAnimationFrame(animateBubbles);
	}

	function handleMouseMove(e: MouseEvent) {
		if (!section) return;
		const rect = section.getBoundingClientRect();
		mouseX = (e.clientX - rect.left) / rect.width - 0.5;
		mouseY = (e.clientY - rect.top) / rect.height - 0.5;
	}

	function getCircleTransform(speed: number) {
		if (!parallaxReady) return '';
		return `translate(${mouseX * speed * 8}px, ${mouseY * speed * 6}px)`;
	}

	onMount(() => {
		setTimeout(() => visible = true, 100);
		// let longest animation finish (0.35s delay + 1.1s duration + buffer)
		setTimeout(() => parallaxReady = true, 1600);
		initBubbles();
		animateBubbles();
		return () => cancelAnimationFrame(animId);
	});
</script>

<section
	id="hero"
	bind:this={section}
	class="hero"
	class:visible
	onmousemove={handleMouseMove}
	aria-labelledby="hero-name"
>
	<canvas bind:this={canvas} class="bubble-canvas" aria-hidden="true"></canvas>

	{#each bigCircles as c}
		<div
			class="hero-circle"
			aria-hidden="true"
			style="
				width: {c.size}px;
				height: {c.size}px;
				{c.top !== undefined ? `top: ${c.top}%` : ''};
				{c.bottom !== undefined ? `bottom: ${c.bottom}%` : ''};
				{c.right !== undefined ? `right: ${c.right}%` : ''};
				{c.left !== undefined ? `left: ${c.left}%` : ''};
				animation-delay: {c.dropDelay}s;
				{parallaxReady ? `transform: ${getCircleTransform(c.speed)}` : ''}
			"
		></div>
	{/each}

	<div class="hero-content">
		<h1 id="hero-name" class="hero-name">
			<span class="line">Favour</span>
			<span class="line line-2">
				Evans
				<span class="aka">"Foide"</span>
			</span>
		</h1>

		<div class="hero-bottom">
			<div class="hero-tag mono">Frontend Engineer — Port Harcourt, Nigeria</div>
			<p class="hero-desc">
				I build immersive digital experiences at the intersection of design and engineering.
			</p>
			<div class="hero-cta">
				<a href="#projects" class="btn-primary">View Work</a>
				<a
					href="/Favour_Evans_CV.pdf"
					class="btn-outline"
					download="Favour_Evans_Resume.pdf"
					aria-label="Download resume as PDF"
				>Resume ↓</a>
			</div>
			<div class="hero-socials">
				<a href="https://github.com/foidevans" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
				<a href="https://linkedin.com/in/favour-evans" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
				<a href="https://twitter.com/foidevans" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100svh;
		background: #7C3AED;
		color: #fff;
		overflow: hidden;
		display: flex;
		align-items: flex-start;
		padding: 5rem 3rem 4rem;
	}

	.bubble-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
	}

	/* ── Circles: drop-bounce in, then parallax takes over ── */
	.hero-circle {
		position: absolute;
		background: #0a0a0a;
		border-radius: 50%;
		opacity: 0;
		will-change: transform;
		z-index: 2;
	}

	.hero.visible .hero-circle {
		animation: dropBounce 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	@keyframes dropBounce {
		from {
			transform: translateY(-130vh);
			opacity: 0;
		}
		12% {
			opacity: 1;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	/* ── Content layout ── */
	.hero-content {
		position: relative;
		z-index: 3;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: calc(100svh - 9rem);
	}

	/* ── Name: big, high up, left-aligned like Patrick Heng ── */
	.hero-name {
		font-size: clamp(3rem, 14vw, 11rem);
		color: #fff;
		line-height: 0.88;
		margin: 0;
		opacity: 0;
		max-width: 60%;
		font-weight: 700;
	}
	.hero.visible .hero-name {
		animation: fadeUp 0.8s ease 0.45s forwards;
	}

	.line { display: block; }
	.line-2 {
		display: flex;
		align-items: baseline;
		gap: 1.5rem;
		flex-wrap: wrap;
	}
	.aka {
		font-size: clamp(1rem, 2vw, 2rem);
		font-weight: 400;
		font-style: italic;
		color: rgba(255,255,255,0.42);
	}

	/* ── Bottom cluster: tag, desc, CTA, socials ── */
	.hero-bottom {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.hero-tag {
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.65);
		opacity: 0;
	}
	.hero.visible .hero-tag {
		animation: fadeUp 0.6s ease 0.6s forwards;
	}

	.hero-desc {
		font-size: clamp(0.95rem, 1.4vw, 1.2rem);
		line-height: 1.7;
		color: rgba(255,255,255,0.72);
		max-width: 420px;
		margin: 0;
		opacity: 0;
	}
	.hero.visible .hero-desc {
		animation: fadeUp 0.7s ease 0.72s forwards;
	}

	.hero-cta {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		opacity: 0;
	}
	.hero.visible .hero-cta {
		animation: fadeUp 0.7s ease 0.84s forwards;
	}

	.btn-primary {
		background: #fff;
		color: #7C3AED;
		padding: 0.9rem 2.2rem;
		border-radius: 100px;
		font-weight: 700;
		font-size: 0.95rem;
		text-decoration: none;
		transition: background 0.2s, color 0.2s, transform 0.2s;
	}
	.btn-primary:hover {
		background: #0a0a0a;
		color: #fff;
		transform: translateY(-2px);
	}

	.btn-outline {
		border: 1.5px solid rgba(255,255,255,0.45);
		color: #fff;
		padding: 0.9rem 2.2rem;
		border-radius: 100px;
		font-weight: 600;
		font-size: 0.95rem;
		text-decoration: none;
		transition: border-color 0.2s, background 0.2s, transform 0.2s;
	}
	.btn-outline:hover {
		border-color: #fff;
		background: rgba(255,255,255,0.1);
		transform: translateY(-2px);
	}

	.hero-socials {
		display: flex;
		gap: 1.5rem;
		opacity: 0;
	}
	.hero.visible .hero-socials {
		animation: fadeUp 0.7s ease 0.94s forwards;
	}
	.hero-socials a {
		color: rgba(255,255,255,0.55);
		text-decoration: none;
		font-size: 0.82rem;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		transition: color 0.2s;
		position: relative;
	}
	.hero-socials a::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: #fff;
		transition: width 0.3s ease;
	}
	.hero-socials a:hover { color: #fff; }
	.hero-socials a:hover::after { width: 100%; }

	/* ── Shared animation ── */
	@keyframes fadeUp {
		from { opacity: 0; transform: translateY(24px); }
		to   { opacity: 1; transform: translateY(0);    }
	}

	/* ── Mobile ── */
	@media (max-width: 768px) {
		.hero {
			padding: 4rem 1.5rem 3rem;
		}
		.hero-name {
			font-size: clamp(4rem, 18vw, 6rem);
			max-width: 100%;
		}
		.hero-content {
			min-height: calc(100svh - 7rem);
		}
		.hero-circle:nth-child(n+5) { display: none; }
	}
</style>