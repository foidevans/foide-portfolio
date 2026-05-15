<script lang="ts">
	import { onMount } from 'svelte';
	import { projects, moreProjectsFull } from '$lib/data/projects';
	type AnyProject = typeof projects[0] | typeof moreProjectsFull[0];

	let container: HTMLElement;
	let currentIndex = $state(0);
	let modalOpen = $state(false);
	let modalProject = $state<AnyProject | null>(null);
	let modalClosing = $state(false);
	let hoveredMore = $state<number | null>(null);

	const moreShapes = [
		{ type: 'circle',   color: '#D97706', size: 200 },
		{ type: 'star',     color: '#0EA5E9', size: 180 },
		{ type: 'triangle', color: '#8B5CF6', size: 160 },
		{ type: 'circle',   color: '#10B981', size: 170 },
		{ type: 'square',   color: '#EC4899', size: 160 },
	];

	function scrollToProject(index: number) {
		const item = container?.children[index] as HTMLElement;
		item?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
	}

	function handleScroll() {
		if (!container) return;
		currentIndex = Math.round(container.scrollLeft / container.clientWidth);
	}

	function openModal(project: AnyProject) {
		modalProject = project;
		modalOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closeModal() {
		modalClosing = true;
		setTimeout(() => {
			modalOpen = false;
			modalClosing = false;
			modalProject = null;
			document.body.style.overflow = '';
		}, 350);
	}

	onMount(() => {
		container?.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && modalOpen) closeModal();
		});
		return () => container?.removeEventListener('scroll', handleScroll);
	});
</script>

<section id="projects" aria-labelledby="projects-heading">

	<div class="projects-header">
		<h2 id="projects-heading" class="label mono">Selected Projects</h2>
		<span class="year-range mono">2023 — 2025</span>
	</div>

	<div
		class="scroll-container"
		bind:this={container}
		role="region"
		aria-label="Projects gallery — scroll horizontally or use dot navigation"
	>
		{#each projects as project, i}
			<article class="project-slide" aria-labelledby="ptitle-{project.id}">

				<div class="shapes" aria-hidden="true">
					{#each project.shapes as shape, si}
						{#if shape.type === 'triangle'}
							<div
								class="shape shape-triangle"
								style="
									top: {shape.top !== undefined ? shape.top + '%' : 'auto'};
									bottom: {shape.bottom !== undefined ? shape.bottom + '%' : 'auto'};
									right: {shape.right !== undefined ? shape.right + '%' : 'auto'};
									left: {shape.left !== undefined ? shape.left + '%' : 'auto'};
									border-bottom-color: {shape.color};
									animation-delay: {si * 0.15}s;
								"
							></div>
						{:else}
							<div
								class="shape shape-{shape.type}"
								style="
									width: {shape.size}px;
									height: {shape.size}px;
									background: {shape.color};
									top: {shape.top !== undefined ? shape.top + '%' : 'auto'};
									bottom: {shape.bottom !== undefined ? shape.bottom + '%' : 'auto'};
									right: {shape.right !== undefined ? shape.right + '%' : 'auto'};
									left: {shape.left !== undefined ? shape.left + '%' : 'auto'};
									animation-delay: {si * 0.15}s;
								"
							></div>
						{/if}
					{/each}
				</div>

				<div class="project-info">
					<div class="project-number mono">0{i + 1}</div>
					<button
						class="project-title-block"
						onclick={() => openModal(project)}
						aria-label="Open details for {project.title}"
					>
						<h3 id="ptitle-{project.id}" class="project-title display">
							{project.title}<br/>{project.subtitle}
						</h3>
					</button>
					<p class="project-desc">{project.description}</p>
					<div class="project-tech" aria-label="Tech stack">
						{#each project.tech as t}
							<span class="tech-tag mono">{t}</span>
						{/each}
					</div>
					<div class="project-links">
						<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="link-btn primary">Live ↗</a>
						<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="link-btn">GitHub ↗</a>
						<button class="link-btn" onclick={() => openModal(project)}>Details →</button>
					</div>
				</div>

				<span class="project-year mono">{project.year}</span>
			</article>
		{/each}
	</div>

	<div class="dots" role="tablist" aria-label="Project navigation">
		{#each projects as p, i}
			<button
				class="dot" class:active={currentIndex === i}
				onclick={() => scrollToProject(i)}
				role="tab"
				aria-selected={currentIndex === i}
				aria-label="Project {i + 1}: {p.title}"
				tabindex={currentIndex === i ? 0 : -1}
			></button>
		{/each}
	</div>
	<p class="scroll-hint mono" aria-hidden="true">← Scroll to explore →</p>

	<div class="more-projects">
		<div class="more-header">
			<span class="label mono">More Projects</span>
			<span class="year-range mono">2017 — 2024</span>
		</div>
		<ul class="more-list" aria-label="Additional projects">
			{#each moreProjectsFull as p, i}
				<li
					class="more-item"
					onmouseenter={() => hoveredMore = i}
					onmouseleave={() => hoveredMore = null}
				>
					{#if hoveredMore === i}
						<div class="more-shape-preview" aria-hidden="true">
							{#if moreShapes[i].type === 'circle'}
								<div style="width:{moreShapes[i].size}px;height:{moreShapes[i].size}px;background:{moreShapes[i].color};border-radius:50%;"></div>
							{:else if moreShapes[i].type === 'triangle'}
								<div style="width:0;height:0;border-left:{moreShapes[i].size/2}px solid transparent;border-right:{moreShapes[i].size/2}px solid transparent;border-bottom:{moreShapes[i].size}px solid {moreShapes[i].color};"></div>
							{:else if moreShapes[i].type === 'star'}
								<div style="font-size:{moreShapes[i].size}px;color:{moreShapes[i].color};line-height:1;">★</div>
							{:else}
								<div style="width:{moreShapes[i].size}px;height:{moreShapes[i].size}px;background:{moreShapes[i].color};border-radius:8px;transform:rotate(15deg);"></div>
							{/if}
						</div>
					{/if}

					<button
						class="more-item-btn"
						onclick={() => openModal(p)}
						aria-label="View details for {p.title}"
					>
						<span class="more-title">{p.title}</span>
						<span class="more-subtitle mono">{p.subtitle}</span>
						<span class="more-year mono">{p.year}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</section>

{#if modalOpen && modalProject}
	<dialog
		class="modal-overlay"
		class:closing={modalClosing}
		aria-labelledby="modal-title"
		open
		onclick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
	>
		<div class="modal" class:closing={modalClosing}>
			<div class="modal-left" style="background:{modalProject.color}22">
				<div class="modal-preview">
					<div class="modal-circle" style="background:{modalProject.color}" aria-hidden="true"></div>
					<span class="modal-img-label mono">Screenshot coming soon</span>
				</div>
			</div>

			<div class="modal-right" style="background:{modalProject.color}">
				<button class="modal-close" onclick={closeModal} aria-label="Close">×</button>
				<div class="modal-content">
					<h2 id="modal-title" class="display modal-title">
						{modalProject.title}<br/>{modalProject.subtitle}
					</h2>
					<p class="modal-desc">{modalProject.description}</p>
					<div class="modal-tech" aria-label="Technologies">
						{#each modalProject.tech as t}
							<span class="modal-tag mono">{t}</span>
						{/each}
					</div>
					<div class="modal-links">
						<a href={modalProject.liveUrl} target="_blank" rel="noopener noreferrer" class="modal-btn">Live Demo ↗</a>
						<a href={modalProject.githubUrl} target="_blank" rel="noopener noreferrer" class="modal-btn outline">GitHub ↗</a>
					</div>
				</div>
			</div>
		</div>
	</dialog>
{/if}

<style>
	section { background: var(--bg); }

	.projects-header {
		display: flex; justify-content: space-between;
		align-items: baseline; padding: 3rem 3rem 2rem;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; opacity: 0.45; }
	.year-range { font-size: 0.75rem; opacity: 0.35; }

	.scroll-container {
		display: flex; overflow-x: auto; overflow-y: hidden;
		scroll-snap-type: x mandatory; scrollbar-width: none; cursor: grab;
	}
	.scroll-container:active { cursor: grabbing; }
	.scroll-container::-webkit-scrollbar { display: none; }

	.project-slide {
		flex: 0 0 100vw; scroll-snap-align: start;
		min-height: 88vh; position: relative;
		background: var(--bg); overflow: hidden;
		display: flex; align-items: center;
		border-left: 1px solid rgba(0,0,0,0.06);
	}

	.shapes { position: absolute; inset: 0; pointer-events: none; }
	.shape {
		position: absolute;
		animation: floatUp 5s ease-in-out infinite alternate;
		will-change: transform;
	}
	.shape-circle { border-radius: 50%; animation-name: floatCircle; }
	.shape-square { border-radius: 6px; animation-name: floatSquare; }
	.shape-triangle {
		width: 0 !important; height: 0 !important;
		background: transparent !important;
		border-left: 110px solid transparent;
		border-right: 110px solid transparent;
		border-bottom: 190px solid black;
		animation-name: floatUp;
	}

	@keyframes floatCircle {
		0%   { transform: translateY(0px) scale(1); }
		100% { transform: translateY(-24px) scale(1.04); }
	}
	@keyframes floatSquare {
		0%   { transform: translateY(0px) rotate(12deg); }
		100% { transform: translateY(-18px) rotate(16deg); }
	}
	@keyframes floatUp {
		0%   { transform: translateY(0px); }
		100% { transform: translateY(-20px); }
	}

	.project-info { position: relative; z-index: 2; padding: 4rem 3rem; max-width: 580px; }
	.project-number { font-size: 0.72rem; opacity: 0.35; letter-spacing: 0.18em; margin-bottom: 1.5rem; }

	.project-title-block {
		background: #0a0a0a; border: none; cursor: pointer;
		margin-bottom: 2rem; padding: 0; display: inline-block;
		transition: transform 0.25s ease, box-shadow 0.25s ease;
	}
	.project-title-block:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.25); }
	.project-title {
		font-size: clamp(2rem, 4.5vw, 4.5rem);
		color: #fff; padding: 0.6rem 1.1rem; line-height: 1; text-align: left;
	}

	.project-desc {
		font-size: 0.92rem; line-height: 1.75;
		color: rgba(0,0,0,0.62); max-width: 400px; margin-bottom: 1.5rem;
	}
	.project-tech { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 2rem; }
	.tech-tag {
		font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
		padding: 0.28rem 0.7rem; background: rgba(0,0,0,0.07); border-radius: 100px;
	}
	.project-links { display: flex; gap: 0.6rem; flex-wrap: wrap; }
	.link-btn {
		padding: 0.65rem 1.4rem; border: 1.5px solid #0a0a0a;
		text-decoration: none; color: #0a0a0a; font-size: 0.82rem;
		font-weight: 600; background: none; cursor: pointer;
		font-family: 'Syne', sans-serif;
		transition: background 0.2s, color 0.2s, transform 0.15s;
	}
	.link-btn:hover { background: #0a0a0a; color: #fff; transform: translateY(-2px); }
	.link-btn.primary { background: #0a0a0a; color: #fff; }
	.link-btn.primary:hover { background: #7C3AED; border-color: #7C3AED; }

	.project-year { position: absolute; bottom: 1.75rem; right: 2rem; font-size: 0.72rem; opacity: 0.3; }

	.dots { display: flex; justify-content: center; gap: 0.6rem; padding: 1.5rem; }
	.dot {
		width: 8px; height: 8px; border-radius: 50%;
		border: 1.5px solid #0a0a0a; background: transparent;
		cursor: pointer; padding: 0;
		transition: background 0.2s, transform 0.2s;
	}
	.dot.active { background: #7C3AED; border-color: #7C3AED; transform: scale(1.4); }
	.scroll-hint { text-align: center; font-size: 0.68rem; opacity: 0.3; letter-spacing: 0.1em; text-transform: uppercase; padding-bottom: 1rem; }

	.more-projects { border-top: 1px solid rgba(0,0,0,0.1); padding: 3rem; }
	.more-header { display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(0,0,0,0.08); }
	.more-list { list-style: none; }

	.more-item {
		border-bottom: 1px solid rgba(0,0,0,0.07);
		position: relative; overflow: hidden;
		transition: padding-left 0.3s ease;
	}
	.more-item:hover { padding-left: 1rem; }

	.more-item-btn {
		display: grid; grid-template-columns: 1fr auto auto;
		gap: 1rem; align-items: center; width: 100%;
		background: none; border: none; cursor: pointer;
		font-family: 'Syne', sans-serif; text-align: left;
		padding: 1.3rem 0; position: relative; z-index: 1;
	}

	.more-shape-preview {
		position: absolute; right: 15%; top: 50%;
		transform: translateY(-50%);
		pointer-events: none; z-index: 0; opacity: 0;
		animation: shapeAppear 0.35s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
	}
	@keyframes shapeAppear {
		from { opacity: 0; transform: translateY(-50%) scale(0.4); }
		to   { opacity: 0.22; transform: translateY(-50%) scale(1); }
	}

	.more-title { font-size: 1.5rem; font-weight: 700; }
	.more-subtitle { font-size: 0.75rem; opacity: 0.45; text-transform: uppercase; letter-spacing: 0.08em; }
	.more-year { font-size: 0.75rem; opacity: 0.35; }

	/* Modal */
	.modal-overlay {
		position: fixed; inset: 0; z-index: 1000;
		width: 100vw; max-width: 100vw;
		height: 100vh; max-height: 100vh;
		margin: 0; padding: 0; border: none;
		background: rgba(0,0,0,0.8);
		display: flex; align-items: stretch;
		animation: fadeIn 0.3s ease forwards;
	}
	.modal-overlay::backdrop { display: none; }
	.modal-overlay.closing { animation: fadeOut 0.35s ease forwards; }

	@keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
	@keyframes fadeOut { to   { opacity: 0; } }

	.modal {
		display: grid; grid-template-columns: 1fr 1fr;
		width: 100%; max-height: 100vh;
		animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
	.modal.closing { animation: slideDown 0.35s ease forwards; }

	@keyframes slideUp   { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
	@keyframes slideDown { to   { transform: translateY(40px); opacity: 0; } }

	.modal-left {
		display: flex; align-items: center; justify-content: center;
		position: relative; overflow: hidden;
	}
	.modal-preview {
		display: flex; flex-direction: column;
		align-items: center; justify-content: center;
		gap: 1.5rem; width: 100%; height: 100%;
	}
	.modal-circle {
		width: 200px; height: 200px; border-radius: 50%; opacity: 0.6;
		animation: floatCircle 4s ease-in-out infinite alternate;
	}
	.modal-img-label { font-size: 0.72rem; opacity: 0.45; letter-spacing: 0.1em; text-transform: uppercase; }

	.modal-right {
		position: relative; padding: 4rem 3rem;
		display: flex; align-items: center; overflow-y: auto;
	}
	.modal-close {
		position: absolute; top: 1.5rem; right: 1.5rem;
		width: 44px; height: 44px; border-radius: 50%;
		background: #0a0a0a; color: #fff; border: none;
		font-size: 1.5rem; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		transition: transform 0.2s, background 0.2s; line-height: 1;
	}
	.modal-close:hover { transform: rotate(90deg); background: #fff; color: #0a0a0a; }

	.modal-content { max-width: 440px; }
	.modal-title { font-size: clamp(2rem, 4vw, 3.5rem); color: #fff; line-height: 0.95; margin-bottom: 1.5rem; }
	.modal-desc { color: rgba(255,255,255,0.82); line-height: 1.75; margin-bottom: 2rem; }
	.modal-tech { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 2.5rem; }
	.modal-tag {
		padding: 0.3rem 0.8rem; border: 1px solid rgba(255,255,255,0.3);
		border-radius: 100px; font-size: 0.7rem;
		color: rgba(255,255,255,0.82); text-transform: uppercase; letter-spacing: 0.08em;
	}
	.modal-links { display: flex; gap: 0.75rem; flex-wrap: wrap; }
	.modal-btn {
		padding: 0.8rem 1.8rem; background: #fff;
		color: #0a0a0a; text-decoration: none; font-weight: 700;
		font-size: 0.9rem; transition: transform 0.2s, background 0.2s; display: inline-block;
	}
	.modal-btn:hover { transform: translateY(-2px); background: #0a0a0a; color: #fff; }
	.modal-btn.outline {
		background: transparent; color: #fff;
		border: 1.5px solid rgba(255,255,255,0.5);
	}
	.modal-btn.outline:hover { background: rgba(255,255,255,0.12); border-color: #fff; }

	@media (max-width: 768px) {
		.projects-header, .more-projects { padding: 2rem 1.5rem; }
		.project-info { padding: 3rem 1.5rem; }
		.modal { grid-template-columns: 1fr; }
		.modal-left { min-height: 35vh; }
		.modal-right { padding: 2.5rem 1.5rem; }
		.more-item-btn { grid-template-columns: 1fr auto; }
		.more-year { display: none; }
	}
</style>