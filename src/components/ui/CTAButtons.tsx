"use client";

import { createIdeaFromTemplate, loadIdeas, saveIdeas } from "@/helpers/storage";
import { Template } from "@/models/templates";
import { Variants, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
	templates: Template[];
};

// --------------- ANIM FOR BUTTONS ---------------

const containerVariants: Variants = {
	hidden: {},
	show: {
		transition: { delayChildren: 1, staggerChildren: 0.2 },
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, scale: 0.9 },
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			type: "tween" as const,
			duration: 0.8,
			ease: [0.16, 1, 0.3, 1],
		},
	},
};

export default function CTAButtons({ templates }: Props) {
	const router = useRouter();
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	// CREATE IDEA
	const handleCreateIdea = (template?: Template) => {
		if (!template) return;

		const idea = createIdeaFromTemplate(template);
		const allIdeas = loadIdeas();

		saveIdeas([...allIdeas, idea]);
		router.push(`/ideas/${idea.id}`);
	};

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="show"
			className="flex flex-col sm:flex-row justify-center gap-6 flex-wrap text-lg"
		>
			{templates
				.filter((t) => t.highlighted)
				.map((t) => {
					const isDimmed = hoveredId && hoveredId !== t.id;

					return (
						<motion.button
							key={t.id}
							variants={itemVariants}
							onHoverStart={() => setHoveredId(t.id)}
							onHoverEnd={() => setHoveredId(null)}
							animate={{
								opacity: isDimmed ? 0.5 : 1,
								scale: hoveredId === t.id ? 1.1 : 1,
							}}
							transition={{ duration: 0.3, ease: "easeOut" }}
							className="
							bg-rain-800/70
							px-16
							uppercase
							text-lg sm:text-md
							text-rain-300
							hover:text-rain-100
							hover:border-rain-300
							shadow-rain-900/50 shadow-md
							font-bold
							transition-colors
							duration-300"
							onClick={() => handleCreateIdea(t)}
						>
							{t.name}
						</motion.button>
					);
				})}
		</motion.div>
	);
}
