import AnimatedImage from "@/components/ui/AnimatedImage";

export default function AboutPage() {
	return (
		<div className="p-2 flex flex-col items-center text-center tracking-wide overflow-hidden">
			<div className="grid grid-cols-4 gap-8 sm:gap-16 px-8 w-[clamp(200px,90vw,1400px)]">
				<div className="col-span-4 text-center place-self-center">
					<h1 className="text-2xl font-bold uppercase">About Rainstorm</h1>
					<p className="text-md font-normal leading-snug tracking-wide max-w-[1200px]">
						Rainstorm is a creative writing tool designed by me, David, to help you quickly generate
						and define ideas without getting lost in the details. It is inspired by role-playing
						games like Dungeons & Dragons, where “roll-tables” provide random prompts to spark
						improvisation. Similarly, Rainstorm provides a simple word generator that encourages
						creativity and lets you discover and associate on your own.
					</p>
				</div>
				<div className="col-span-3 text-left">
					<h2 className="text-xl font-bold uppercase mb-2">A NEW IDEA</h2>
					<p className="text-md font-normal leading-snug tracking-wide text-rain-200 mb-6">
						Start your Idea by choosing a Template. They start you of with a few categoires and
						wordbanks but you can always change them as you go. In Ideate mode, you generate words
						and drag them into named category sections. How you tackle this process is up to you.
						Limit yourself to use the first generated word, or keep trying until something sparks
						your imagination. Explore and let your mind take the lead.
					</p>
				</div>
				<div className="relative col-start-2 col-span-3 text-left">
					<AnimatedImage
						src="/images/image6.svg"
						width={500}
						height={500}
						wrapperClassName="absolute -left-100 "
						className="object-cover mix-blend-color-dodge"
						parallax={60}
					/>

					<h2 className="text-xl font-bold uppercase mb-2">From idea to concept</h2>
					<p className="text-md font-normal leading-snug tracking-wide text-rain-200 mb-6">
						Once you have collected your words, switch to Define mode to add notes and descriptions
						for each section. Reflect on what the words could mean to you in the category context.
						For example, in a Story idea, a category named <i className="font-bold">Genre</i> might
						include the words <i className="font-bold">Night </i>and
						<i className="font-bold"> West</i> and my first associasion could be{" "}
						<i className="font-bold">A Dark Western Thriller</i>. Describe it even further or let
						that be enough! Define the most important parts of your idea before finnishing up.
					</p>
				</div>

				<div className="relative col-span-3 text-left">
					<AnimatedImage
						src="/images/image4.svg"
						width={900}
						height={700}
						wrapperClassName="absolute -right-200"
						className="object-cover mix-blend-color-dodge"
						parallax={40}
					/>

					<h2 className="text-xl font-bold uppercase mb-2">Decide to be done</h2>
					<p className="text-md font-normal leading-snug tracking-wide text-rain-200 mb-6">
						When you&apos;re ready, you can export your idea however you want. Copy it to your
						Clipboard and continue elswere or export it as a PDF or Text file. There&apos;s no rush
						because they are also saved in your browser if you whant to continue another day.
						Rainstorm is not meant to replace other writing software, it&apos;s a starting point. If
						you continue in a digital document, a notebook or if these notes are perfectly enough,
						thats up to you!
					</p>
				</div>

				<div className="col-start-2 col-span-3 text-left">
					<h2 className="text-xl font-bold uppercase mb-2">Why RainStorm</h2>
					<p className="text-md font-normal leading-snug tracking-wide text-rain-200 mb-6">
						RainStorm was created to give creators of all kinds a lightweight, focused, and
						inspiring tool. It&apos;s combination of randomness and constraints encourages
						independent thinking, helping users overcome creative blocks and find unique ideas.
						RainStorm supports your early creative process by keeping it simple, purposeful and
						personal.
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
