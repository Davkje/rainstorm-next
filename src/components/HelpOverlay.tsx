import {
	RiAddBoxLine,
	RiAddLine,
	RiCloseLine,
	RiDeleteBinLine,
	RiFileCopyLine,
	RiFileDownloadLine,
	RiLockLine,
	RiPencilFill,
	RiRainyFill,
} from "@remixicon/react";
import { FocusTrap } from "focus-trap-react";

type Props = {
	open: boolean;
	onClose: () => void;
};

export default function HelpOverlay({ open, onClose }: Props) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
			<FocusTrap>
				<div className="flex flex-col bg-rain-800 w-full max-w-4xl max-h-[80vh] rounded-xl p-4 sm:p-8 lg:p-12 mx-6 shadow-xl relative">
					<button
						onClick={onClose}
						className="btn--icon absolute top-4 right-4"
						aria-label="Close help"
					>
						<RiCloseLine />
					</button>
					<h2 className="text-2xl font-bold uppercase text-center">Help</h2>

					<section className="grid md:grid-cols-2 gap-2 mt-6 overflow-y-scroll">
						<div className="flex flex-col grow">
							<h3 className="text-center uppercase">How to use</h3>
							<ul className="text-md leading-relaxed flex flex-col justify-between grow p-4">
								<li className="list-disc list-inside">
									Generate words in Ideate View and drag them into categories.
								</li>
								<li className="list-disc list-inside">
									Edit project and category names by clicking them.
								</li>
								<li className="list-disc list-inside">
									Reorder or delete words if you change your mind.
								</li>
								<li className="list-disc list-inside">Add more catories if needed.</li>
								<li className="list-disc list-inside">
									Go to Define View to write describings text about your idea.
								</li>
								<li className="list-disc list-inside">Export your idea in a prefered format.</li>
							</ul>
						</div>
						<div className="grid gap-8">
							<div>
								<h3 className="text-center uppercase">Icons</h3>
								<ul className="text-md pl-4 space-y-1 p-4">
									<li className="flex gap-4 items-center">
										<RiRainyFill />
										<span>Toggle Ideate View</span>
									</li>
									<li className="flex gap-4 items-center">
										<RiPencilFill />
										<span>Toggle Define View</span>
									</li>
									<li className="flex gap-4 items-center">
										<RiAddBoxLine />
										<span>Add new category</span>
									</li>
									<li className="flex gap-4 items-center">
										<RiFileDownloadLine />
										<span>Download Idea in prefered format</span>
									</li>
									<li className="flex gap-4 items-center">
										<RiFileCopyLine />
										<span>Copy Idea in prefered format</span>
									</li>
									<li className="flex gap-4 items-center">
										<RiAddLine />
										<span>Add current word to category</span>
									</li>
									<li className="flex gap-4 items-center">
										<RiDeleteBinLine />
										<span>Remove all words or drag single word to delete.</span>
									</li>
									<li className="flex gap-4 items-center">
										<RiLockLine />
										<span>Toggle Lock Wordbank</span>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="text-center uppercase">Keyboard Shortcuts</h3>
								<ul className="text-md pl-4 space-y-1 p-4">
									<li>
										<span>N - Generate new word</span>
									</li>
									<li>
										<span>V - Toggle view</span>
									</li>
									<li>
										<span>L - Toggle Bank Lock</span>
									</li>
									<li>
										<span>H - Toggle Help</span>
									</li>
									<li>
										<span>Esc - Close dialogs and cancel</span>
									</li>
								</ul>
							</div>
						</div>
					</section>
				</div>
			</FocusTrap>
		</div>
	);
}
