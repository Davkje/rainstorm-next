import { useEffect, useRef } from "react";

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	baseVx: number; // Store original velocity
	baseVy: number; // Store original velocity
	size: number;
	opacity: number;
	speed: number; // Speed multiplier for varying movement
}

export function DitheredParticles() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mouseRef = useRef({ x: -1000, y: -1000 }); // Track mouse position

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas size
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		// Track mouse movement
		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
		};
		window.addEventListener("mousemove", handleMouseMove);

		// Create particles with dithered pattern
		const particleCount = Math.floor((canvas.width * canvas.height) / 1000); // Less dense
		const particles: Particle[] = [];

		// Create some cluster points for clumping
		const clusterCount = 5;
		const clusters = Array.from({ length: clusterCount }, () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
		}));

		for (let i = 0; i < particleCount; i++) {
			// Vary speed - most fast, some slow
			const speedMultiplier =
				Math.random() < 0.7
					? 0.5 + Math.random() * 3 // 70% faster particles
					: 0.5 + Math.random() * 1.5; // 30% slower particles (but not too slow)

			// All particles move diagonally (right and down) like rain
			const baseVx = (0.2 + Math.random() * 0.3) * speedMultiplier; // All move right
			const baseVy = (0.15 + Math.random() * 0.15) * speedMultiplier; // All move down

			// 40% chance to spawn near a cluster
			let x, y;
			if (Math.random() < 0.4) {
				const cluster = clusters[Math.floor(Math.random() * clusters.length)];
				const clusterRadius = 100 + Math.random() * 150;
				const angle = Math.random() * Math.PI * 2;
				x = cluster.x + Math.cos(angle) * Math.random() * clusterRadius;
				y = cluster.y + Math.sin(angle) * Math.random() * clusterRadius;
				// Wrap around if outside bounds
				x = ((x % canvas.width) + canvas.width) % canvas.width;
				y = ((y % canvas.height) + canvas.height) % canvas.height;
			} else {
				x = Math.random() * canvas.width;
				y = Math.random() * canvas.height;
			}

			particles.push({
				x,
				y,
				vx: baseVx, // Very slow horizontal movement
				vy: baseVy, // Very slow vertical movement
				baseVx: baseVx, // Store base velocity
				baseVy: baseVy, // Store base velocity
				size: 4, // Slightly larger pixels
				// opacity: 0.3 + Math.random() * 0.7, // Varying opacity for depth
				opacity: 1, // Varying opacity for depth
				speed: speedMultiplier,
			});
		}

		// Animation loop
		let animationId: number;
		const animate = () => {
			// Clear with dark background
			ctx.fillStyle = "#0e0f19";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Update and draw particles
			particles.forEach((particle) => {
				// Mouse repulsion
				const dx = particle.x - mouseRef.current.x;
				const dy = particle.y - mouseRef.current.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				const repulsionRadius = 20; // Larger radius of mouse influence

				if (distance < repulsionRadius && distance > 0) {
					const force = (repulsionRadius - distance) / repulsionRadius;
					const angle = Math.atan2(dy, dx);
					particle.vx += Math.cos(angle) * force * 1.2; // Stronger force
					particle.vy += Math.sin(angle) * force * 1.2; // Stronger force
				}

				// Gradually return to base velocity
				particle.vx += (particle.baseVx - particle.vx) * 0.05;
				particle.vy += (particle.baseVy - particle.vy) * 0.05;

				// Move particle
				particle.x += particle.vx * particle.speed;
				particle.y += particle.vy * particle.speed;

				// Wrap around edges
				if (particle.x < -10) particle.x = canvas.width + 10;
				if (particle.x > canvas.width + 10) particle.x = -10;
				if (particle.y < -10) particle.y = canvas.height + 10;
				if (particle.y > canvas.height + 10) particle.y = -10;

				// Draw square pixel
				ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
				ctx.fillRect(Math.floor(particle.x), Math.floor(particle.y), particle.size, particle.size);
			});

			animationId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			window.removeEventListener("mousemove", handleMouseMove);
			cancelAnimationFrame(animationId);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 w-full"
			style={{ background: "#0e0f19" }}
			// style={{ background: "#0e0f190", mixBlendMode: "color" }}
		/>
	);
}
