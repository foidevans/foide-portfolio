export interface Project {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	tech: string[];
	liveUrl: string;
	githubUrl: string;
	year: string;
	color: string;
	shapes: Shape[];
}

export interface Shape {
	type: 'circle' | 'square' | 'triangle';
	size: number;
	color: string;
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
}

export const projects: Project[] = [
	{
		id: 'vulue',
		title: 'Vulue',
		subtitle: 'Collaborative Finance Platform',
		description: 'A fintech platform enabling collaborative investing and financial planning. Built a full marketplace feature with strategy cards, performance charts, and multi-step invest flows.',
		tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'TanStack Query', 'Zustand'],
		liveUrl: 'https://vulue.com',
		githubUrl: 'https://github.com/foidevans',
		year: '2024',
		color: '#F59E0B',
		shapes: [
			{ type: 'circle', size: 320, color: '#F59E0B', top: -5, right: 8 },
			{ type: 'circle', size: 140, color: '#0a0a0a', bottom: 15, right: 30 },
			{ type: 'circle', size: 40, color: '#0a0a0a', bottom: 30, right: 20 },
			{ type: 'circle', size: 12, color: '#0a0a0a', top: 60, left: 30 },
		]
	},
	{
		id: 'void',
		title: 'VOID',
		subtitle: 'End-to-End Encrypted Messaging',
		description: 'A secure messaging app built with Web Crypto APIs (RSA-OAEP, AES-GCM, PBKDF2), WebSocket real-time communication, and IndexedDB key storage. Zero knowledge architecture.',
		tech: ['Next.js 15', 'Web Crypto API', 'WebSocket', 'IndexedDB', 'TypeScript'],
		liveUrl: 'https://void-cyan.vercel.app',
		githubUrl: 'https://github.com/foidevans',
		year: '2024',
		color: '#7C3AED',
		shapes: [
			{ type: 'circle', size: 280, color: '#7C3AED', top: 5, right: 5 },
			{ type: 'square', size: 180, color: '#0a0a0a', bottom: 10, right: 25 },
			{ type: 'circle', size: 60, color: '#0a0a0a', top: 20, right: 35 },
			{ type: 'circle', size: 20, color: '#7C3AED', bottom: 40, left: 35 },
		]
	},
	{
		id: 'gigsta',
		title: 'Gigsta',
		subtitle: 'Home Services Platform',
		description: 'A home services marketplace based in Uyo, Nigeria. Contributed UI features including animated counters, booking configurators, and a complete feature section redesign.',
		tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Zod', 'Framer Motion'],
		liveUrl: 'https://gigsta.pro',
		githubUrl: 'https://github.com/foidevans',
		year: '2024',
		color: '#10B981',
		shapes: [
			{ type: 'circle', size: 360, color: '#10B981', top: -10, right: 3 },
			{ type: 'circle', size: 120, color: '#0a0a0a', bottom: 20, right: 28 },
			{ type: 'circle', size: 55, color: '#0a0a0a', bottom: 10, right: 42 },
			{ type: 'circle', size: 25, color: '#0a0a0a', top: 50, left: 25 },
		]
	},
	{
		id: 'gff-browser',
		title: 'GFF Browser',
		subtitle: 'Genomic Feature Visualizer',
		description: 'A browser for GFF3 genomic annotation files built for Google Summer of Code 2026. Uses sql.js for in-browser SQLite queries and renders complex gene feature tracks interactively.',
		tech: ['React', 'TypeScript', 'sql.js', 'SQLite', 'Bioinformatics'],
		liveUrl: 'https://github.com/foidevans',
		githubUrl: 'https://github.com/foidevans',
		year: '2025',
		color: '#EF4444',
		shapes: [
			{ type: 'circle', size: 300, color: '#EF4444', top: 0, right: 6 },
			{ type: 'triangle', size: 220, color: '#0a0a0a', bottom: 5, right: 22 },
			{ type: 'circle', size: 45, color: '#0a0a0a', top: 35, right: 40 },
			{ type: 'circle', size: 15, color: '#EF4444', bottom: 45, left: 30 },
		]
	},
];

export interface MoreProject {
	title: string;
	subtitle: string;
	year: string;
	description: string;
	tech: string[];
	liveUrl: string;
	githubUrl: string;
	color: string;
}

export const moreProjectsFull: MoreProject[] = [
	{
		title: 'Serena & Co',
		subtitle: 'Interior Design Portfolio',
		year: '2023',
		description: 'A luxury interior design portfolio site built during a She Code Africa mentorship. Features smooth scroll animations, a curated project gallery, and an elegant contact experience.',
		tech: ['React', 'TypeScript', 'Tailwind CSS', 'Scroll Animations'],
		liveUrl: 'https://serena-co.vercel.app/',
		githubUrl: 'https://github.com/foidevans',
		color: '#D97706',
	},
	{
		title: 'Dev Journal',
		subtitle: 'Full-stack Node.js App',
		year: '2023',
		description: 'A full-stack journaling app built with raw Node.js HTTP (no Express), proper CORS/preflight handling, and fs-based data storage. A deep dive into Node fundamentals.',
		tech: ['Node.js', 'Vanilla JS', 'HTML', 'CSS', 'File System API'],
		liveUrl: 'https://github.com/foidevans',
		githubUrl: 'https://github.com/foidevans',
		color: '#0EA5E9',
	},
	{
		title: 'Invoice Manager',
		subtitle: 'HNG Stage 2 Project',
		year: '2024',
		description: 'An invoice management application built for HNG Internship Stage 2. Features full CRUD operations, status tracking, and a Node/Express backend with TypeScript throughout.',
		tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express'],
		liveUrl: 'https://github.com/foidevans',
		githubUrl: 'https://github.com/foidevans',
		color: '#8B5CF6',
	},
	{
		title: 'Smart Cart',
		subtitle: 'Multi-tenant POS SaaS (WIP)',
		year: '2025',
		description: 'A multi-tenant point-of-sale system for supermarkets using shared-database multi-tenancy with tenant_id isolation. Designed for real-world retail operations across multiple store branches.',
		tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Node.js', 'Prisma'],
		liveUrl: 'https://github.com/foidevans',
		githubUrl: 'https://github.com/foidevans',
		color: '#10B981',
	},
	{
		title: 'Griot',
		subtitle: 'African Literature Platform (WIP)',
		year: '2025',
		description: 'A subscription platform for African literature — stories, poetry, essays — with reading progress tracking, community features, and Paystack payment integration.',
		tech: ['Next.js', 'Supabase', 'Paystack', 'TypeScript', 'Tailwind CSS'],
		liveUrl: 'https://github.com/foidevans',
		githubUrl: 'https://github.com/foidevans',
		color: '#EC4899',
	},
];