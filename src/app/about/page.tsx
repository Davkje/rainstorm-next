export default function AboutPage() {
	return (
		<div className="flex flex-col items-center text-center tracking-wide">
			<div className="grid grid-cols-4 px-8 max-w-[1000px]">
				<div className="col-span-4 text-center place-self-center">
					<h1 className="text-3xl font-bold uppercase">About Rainstorm</h1>
					<p className="text-md font-normal leading-snug tracking-wide text-rain-200 mb-6">
						RainStorm is a creative tool designed to help you quickly generate, organize, and define
						ideas without getting lost in details. It is inspired by role-playing games like
						Dungeons & Dragons, where “roll-tables” provide random prompts to spark improvisation.
						The core idea behind RainStorm is simple: provide constraints that encourage creativity,
						rather than overwhelming users with pre-generated content. Unlike AI-based generators,
						which often predict what you want and give multiple options, RainStorm focuses on
						letting you discover associations on your own, guiding your thinking through randomness
						and interpretation.
					</p>
				</div>
				<div className="col-span-3 text-left">
					<h2 className="text-xl font-bold uppercase mb-2">How it works</h2>
					<p className="text-md font-normal leading-snug tracking-wide text-rain-200 mb-6">
						Using RainStorm is flexible — the tool adapts to your workflow. Start by choosing a
						template, such as Song, Story, Game, or an empty canvas. Templates give you predefined
						sections to organize your ideas, but everything can be renamed, rearranged, or removed.
						In Ideate mode, you generate words and drag them into different sections, using them to
						inspire ideas. You can force yourself to use the first word you get, or keep generating
						until something sparks your imagination. The process is about exploring connections,
						finding patterns, and letting your mind take the lead.
					</p>
				</div>
				<div className="col-start-2 col-span-3 text-left">
					<h2 className="text-xl font-bold uppercase mb-2">From ideas to defined concepts </h2>
					<p className="text-md font-normal leading-snug tracking-wide text-rain-200 mb-6">
						Once you have collected your words, switch to Define mode to add short notes and
						interpretations for each section. Here you reflect on what the words mean to you and how
						they connect to the bigger idea. For example, a section labeled Theme might include
						words like Green, River, and Lost, and your notes could describe how these ideas fit
						together in a song, story, or game concept. Define mode encourages concise, focused
						thinking, helping you refine the most important aspects of your idea without diving into
						full-scale writing too early.
					</p>
				</div>

				<div className="col-span-3 text-left">
					<h2 className="text-xl font-bold uppercase mb-2">Exporting and continuing your work</h2>
					<p className="text-md font-normal leading-snug tracking-wide text-rain-200 mb-6">
						When your idea feels ready, you can export it as text or PDF to continue working in your
						preferred tool. RainStorm is not meant to replace detailed writing or production
						software — it is a starting point, a creative playground for ideation. Whether you
						continue on your computer, in a notebook, or in a digital document, RainStorm ensures
						that your ideas are organized, accessible, and ready to expand.
					</p>
				</div>

				<div className="col-start-2 col-span-3 text-left">
					<h2 className="text-xl font-bold uppercase mb-2">Why RainStorm</h2>
					<p className="text-md font-normal leading-snug tracking-wide text-rain-200 mb-6">
						RainStorm was created to give writers, musicians, game designers, and creators a
						lightweight, focused, and inspiring tool for idea generation. Its combination of
						randomness, constraints, and structured sections encourages independent thinking,
						helping users overcome creative blocks and find unique connections. By making ideation
						both fun and purposeful, RainStorm supports the early stages of creation while keeping
						the process simple, playful, and deeply personal.
					</p>
				</div>

				<div className="col-span-3 text-left">
					<h2 className="text-xl font-bold uppercase mb-2">Data & privacy</h2>
					<p className="text-md font-normal leading-snug tracking-wide text-rain-200 mb-6">
						RainStorm stores your projects and settings locally in your browser using local storage.
						This data never leaves your device, is not sent to any server, and is not shared with
						third parties. Deleting your ideas or clearing your browser data will remove all locally
						saved content.
					</p>
				</div>
			</div>
		</div>
	);
}
