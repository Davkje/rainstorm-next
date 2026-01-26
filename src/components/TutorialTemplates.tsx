"use client";

import { useState } from "react";

export default function TutorialTemplates() {
	const [chooseTemp, setChooseTemp] = useState("Template?");

	return (
		<div className="text-center">
			<h3 className="text-xl font-bold mb-4">{chooseTemp}</h3>

			<div className="grid grid-cols-3 gap-2 place-content-center">
				<button className="btn--tertiary h-max" onClick={() => setChooseTemp("Story?")}>
					Story?
				</button>
				<button className="btn--tertiary h-max" onClick={() => setChooseTemp("Song?")}>
					Song?
				</button>
				<button className="btn--tertiary h-max" onClick={() => setChooseTemp("Game?")}>
					Game?
				</button>
			</div>
		</div>
	);
}
