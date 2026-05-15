<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="footer" role="contentinfo">
	<div class="footer-inner">
		<div class="footer-left">
			<span class="mono">© {year} Favour Evans</span>
			<span class="mono sep" aria-hidden="true">·</span>
			<span class="mono">Built with SvelteKit</span>
		</div>
		<div class="footer-right">
			<a href="https://github.com/foidevans" target="_blank" rel="noopener noreferrer" class="mono">
				foidevans ↗
			</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--black);
		color: rgba(255,255,255,0.3);
		padding: 1.5rem 3rem;
		border-top: 1px solid rgba(255,255,255,0.05);
	}

	.footer-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.footer-left {
		display: flex;
		gap: 0.75rem;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
	}

	.sep { opacity: 0.3; }

	.footer-right a {
		color: rgba(255,255,255,0.3);
		text-decoration: none;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		transition: color 0.2s;
	}

	.footer-right a:hover { color: var(--purple-light); }

	@media (max-width: 640px) {
		.footer { padding: 1.25rem 1.5rem; }
		.footer-inner { flex-direction: column; gap: 0.5rem; text-align: center; }
	}
</style>
