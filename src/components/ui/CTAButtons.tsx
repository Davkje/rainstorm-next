"use client";

import { createIdeaFromTemplate, loadIdeas, saveIdeas } from "@/helpers/storage";
import { Template } from "@/models/templates";
import { Variants, motion } from "framer-motion";
import { useRouter } from "next/navigation";

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

	// CREATE IDEA
	const handleCreateIdea = (template?: Template) => {
		if (!template) return;

		const idea = createIdeaFromTemplate(template);
		const allIdeas = loadIdeas();

		saveIdeas([...allIdeas, idea]);
		router.push(`/ideas/${idea.id}`);
	};

	return (
		<>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="show"
				className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap text-lg"
			>
				{templates
					.filter((t) => t.highlighted)
					.map((t) => (
						<motion.button
							key={t.id}
							variants={itemVariants}
							className="btn--primary uppercase text-lg sm:text-md font-bold hover:scale-[1.1]
             			  transition-all duration-500 ease-in-out"
							onClick={() => handleCreateIdea(t)}
						>
							{t.name}
						</motion.button>
					))}
			</motion.div>
		</>
	);
}
