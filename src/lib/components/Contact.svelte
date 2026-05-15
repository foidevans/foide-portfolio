<script lang="ts">
	import { onMount } from 'svelte';

	let section: HTMLElement;
	let visible = $state(false);

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let errors = $state<Record<string, string>>({});
	let submitting = $state(false);
	let submitted = $state(false);

	function validate() {
		const e: Record<string, string> = {};
		if (!name.trim()) e.name = 'Name is required';
		if (!email.trim()) e.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email address';
		if (!message.trim()) e.message = 'Message is required';
		else if (message.trim().length < 10) e.message = 'Message is too short';
		return e;
	}

	async function handleSubmit() {
		errors = validate();
		if (Object.keys(errors).length > 0) return;

		submitting = true;
		await new Promise(r => setTimeout(r, 1200));
		submitting = false;
		submitted = true;
	}

	onMount(() => {
		const obs = new IntersectionObserver(
			([e]) => { if (e.isIntersecting) visible = true; },
			{ threshold: 0.1 }
		);
		obs.observe(section);
		return () => obs.disconnect();
	});
</script>

<section id="contact" bind:this={section} class="contact" class:visible aria-labelledby="contact-heading">
	<div class="contact-inner">
		<div class="contact-left">
			<div class="label mono">Contact</div>
			<h2 id="contact-heading" class="display contact-heading">
				Let's build<br/>
				<em>something</em><br/>
				together.
			</h2>
			<div class="contact-info">
				<a href="mailto:favourevans@example.com" class="email-link">
					favourevans@example.com
				</a>
				<div class="socials">
					<a href="https://github.com/foidevans" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GH</a>
					<a href="https://linkedin.com/in/favour-evans" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LI</a>
					<a href="https://twitter.com/foidevans" target="_blank" rel="noopener noreferrer" aria-label="Twitter">TW</a>
				</div>
			</div>

			<div class="deco-circle" aria-hidden="true"></div>
		</div>

		<div class="contact-right">
			{#if submitted}
				<div class="success-msg" role="alert" aria-live="polite">
					<div class="success-icon">✓</div>
					<h3 class="display">Message sent!</h3>
					<p>Thanks for reaching out. I'll get back to you soon.</p>
					<button onclick={() => { submitted = false; name = ''; email = ''; message = ''; }}>
						Send another
					</button>
				</div>
			{:else}
				<form
					onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}
					novalidate
					aria-label="Contact form"
				>
					<div class="field">
						<label for="contact-name">Name</label>
						<input
							id="contact-name"
							type="text"
							placeholder="Your name"
							bind:value={name}
							aria-describedby={errors.name ? 'name-err' : undefined}
							aria-invalid={!!errors.name}
							autocomplete="name"
						/>
						{#if errors.name}
							<span id="name-err" class="error mono" role="alert">{errors.name}</span>
						{/if}
					</div>

					<div class="field">
						<label for="contact-email">Email</label>
						<input
							id="contact-email"
							type="email"
							placeholder="your@email.com"
							bind:value={email}
							aria-describedby={errors.email ? 'email-err' : undefined}
							aria-invalid={!!errors.email}
							autocomplete="email"
						/>
						{#if errors.email}
							<span id="email-err" class="error mono" role="alert">{errors.email}</span>
						{/if}
					</div>

					<div class="field">
						<label for="contact-message">Message</label>
						<textarea
							id="contact-message"
							rows="5"
							placeholder="Tell me about your project..."
							bind:value={message}
							aria-describedby={errors.message ? 'msg-err' : undefined}
							aria-invalid={!!errors.message}
						></textarea>
						{#if errors.message}
							<span id="msg-err" class="error mono" role="alert">{errors.message}</span>
						{/if}
					</div>

					<button type="submit" class="submit-btn" disabled={submitting} aria-busy={submitting}>
						{#if submitting}
							<span class="spinner" aria-hidden="true"></span>
							Sending...
						{:else}
							Send Message →
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	.contact {
		background: var(--bg);
		padding: 6rem 3rem;
		border-top: 1px solid rgba(0,0,0,0.1);
		overflow: hidden;
	}

	.contact-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5rem;
		max-width: 1200px;
		margin: 0 auto;
		align-items: start;
	}

	.label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		opacity: 0.4;
		margin-bottom: 1.5rem;
	}

	.contact-heading {
		font-size: clamp(2.5rem, 5vw, 5.5rem);
		line-height: 0.95;
		margin-bottom: 2.5rem;
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.8s ease, transform 0.8s ease;
	}

	.visible .contact-heading {
		opacity: 1;
		transform: translateY(0);
	}

	.contact-heading em {
		font-style: italic;
		color: var(--purple);
	}

	.contact-info { margin-bottom: 3rem; }

	.email-link {
		display: block;
		color: var(--black);
		text-decoration: none;
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
		transition: color 0.2s;
	}

	.email-link:hover { color: var(--purple); }

	.socials {
		display: flex;
		gap: 1rem;
	}

	.socials a {
		width: 40px;
		height: 40px;
		border: 1.5px solid rgba(0,0,0,0.2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: var(--black);
		font-size: 0.7rem;
		font-weight: 700;
		font-family: 'Syne Mono', monospace;
		transition: background 0.2s, color 0.2s, border-color 0.2s;
	}

	.socials a:hover {
		background: var(--purple);
		color: white;
		border-color: var(--purple);
	}

	.deco-circle {
		width: 200px;
		height: 200px;
		background: var(--purple);
		border-radius: 50%;
		opacity: 0.12;
		position: absolute;
		bottom: -60px;
		left: -60px;
		pointer-events: none;
	}

	.contact-left { position: relative; }

	/* Form */
	form {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
	}

	.visible form {
		opacity: 1;
		transform: translateY(0);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		margin-bottom: 1.5rem;
	}

	label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-family: 'Syne Mono', monospace;
		opacity: 0.5;
	}

	input, textarea {
		background: transparent;
		border: none;
		border-bottom: 1.5px solid rgba(0,0,0,0.2);
		padding: 0.75rem 0;
		font-size: 1rem;
		font-family: 'Syne', sans-serif;
		color: var(--black);
		transition: border-color 0.2s;
		outline: none;
		resize: none;
		width: 100%;
	}

	input:focus, textarea:focus {
		border-bottom-color: var(--purple);
	}

	input[aria-invalid="true"], textarea[aria-invalid="true"] {
		border-bottom-color: #EF4444;
	}

	.error {
		color: #EF4444;
		font-size: 0.7rem;
		letter-spacing: 0.05em;
	}

	.submit-btn {
		background: var(--black);
		color: white;
		border: none;
		padding: 1rem 2.5rem;
		font-size: 1rem;
		font-family: 'Syne', sans-serif;
		font-weight: 700;
		cursor: pointer;
		transition: background 0.2s, transform 0.2s;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.submit-btn:hover:not(:disabled) {
		background: var(--purple);
		transform: translateY(-2px);
	}

	.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255,255,255,0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin { to { transform: rotate(360deg); } }

	/* Success */
	.success-msg {
		text-align: center;
		padding: 3rem;
		border: 1.5px solid rgba(0,0,0,0.1);
	}

	.success-icon {
		width: 60px;
		height: 60px;
		background: var(--purple);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		margin: 0 auto 1.5rem;
	}

	.success-msg h3 { font-size: 2rem; margin-bottom: 0.75rem; }
	.success-msg p { color: rgba(0,0,0,0.6); margin-bottom: 1.5rem; }

	.success-msg button {
		background: none;
		border: 1.5px solid var(--black);
		padding: 0.6rem 1.5rem;
		font-family: 'Syne', sans-serif;
		cursor: pointer;
		font-size: 0.875rem;
		transition: background 0.2s, color 0.2s;
	}

	.success-msg button:hover {
		background: var(--black);
		color: white;
	}

	@media (max-width: 900px) {
		.contact-inner { grid-template-columns: 1fr; gap: 3rem; }
		.contact { padding: 4rem 1.5rem; }
	}
</style>
