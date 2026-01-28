import {
	RiAddBoxLine,
	RiAddLine,
	RiCloseLine,
	RiDeleteBinLine,
	RiEdit2Fill,
	RiFileCopyLine,
	RiFileDownloadLine,
	RiPencilFill,
	RiRainyFill,
} from "@remixicon/react";
import { FocusTrap } from "focus-trap-react";
import RainstormIcon from "./ui/RainstormIcon";

type Props = {
	open: boolean;
	onClose: () => void;
};

export default function HelpOverlay({ open, onClose }: Props) {
	if (!open) return null;

	return (
		<FocusTrap>
			<div
				className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
				onClick={onClose}
			>
				<div
					className="flex flex-col bg-rain-800 border-2 border-rain-700 rounded-xl p-4 sm:p-8 lg:p-12 shadow-xl relative mx-8 w-[max] max-h-[90vh]"
					onClick={(e) => e.stopPropagation()}
				>
					<button
						onClick={onClose}
						className="btn--icon absolute top-4 right-4"
						aria-label="Close help"
					>
						<RiCloseLine />
					</button>
					<h2 className="text-2xl font-bold uppercase text-center">Help</h2>

					<section className="grid gap-2 mt-2 overflow-y-scroll">
						<div className="flex flex-col grow">
							<h3 className="text-center uppercase">How to use</h3>
							<ul className="border-l-2 border-rain-400 text-md leading-relaxed flex flex-col justify-between grow px-4">
								<li className="">Generate words in Ideate View and drag them into categories.</li>
								<li className="">Filter and toggle acitve word banks.</li>
								<li className="">Edit project and category names by clicking them.</li>
								<li className="">Reorder or delete words if you change your mind.</li>
								<li className="">Add more catories if needed.</li>
								<li className="">Go to Define View to write describing text about your idea.</li>
								<li className="">Export your idea in a prefered format.</li>
							</ul>
						</div>
						<div className="grid sm:grid-cols-2 gap-8">
							<div>
								<h3 className="text-center uppercase">Icons</h3>
								<ul className="text-md pl-4 grid gap-4 p-4 leading-normal text-center">
									<li className="flex gap-4 items-center">
										<RainstormIcon />
										<span>Toggle Ideate View</span>
									</li>
									<li className="flex gap-4 items-center">
										<RiEdit2Fill />
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
										<RiDeleteBinLine className="place-self-start" />
										<div className="flex gap-2 flex-col text-left">
											<span>Click: Remove all words</span>
											<span>Drop: Remove sinlge word</span>
										</div>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="text-center uppercase">Keyboard Shortcuts</h3>
								<ul className="text-md grid gap-2 p-4">
									<li className="flex gap-2">
										<div className="aspect-square w-10 text-center rounded-sm leading-normal bg-rain-500 uppercase place-content-center">
											N
										</div>
										<span>Generate new word</span>
									</li>
									<li className="flex gap-2">
										<div className="aspect-square w-10 text-center rounded-sm leading-normal bg-rain-500 uppercase place-content-center">
											V
										</div>
										<span>Toggle Views</span>
									</li>
									<li className="flex gap-2">
										<div className="aspect-square w-10 text-center rounded-sm leading-normal bg-rain-500 uppercase place-content-center">
											B
										</div>
										<span>Toggle Help</span>
									</li>
									<li className="flex gap-2">
										<div className="aspect-square w-10 text-center rounded-sm leading-normal bg-rain-500 uppercase place-content-center">
											B
										</div>
										<span>Toggle Banks</span>
									</li>
									<li className="flex gap-2">
										<div className="aspect-square w-10 text-center rounded-sm leading-normal bg-rain-500 uppercase place-content-center">
											R
										</div>
										<span>Toggle Rain Mixer</span>
									</li>
									<li className="flex gap-2">
										<div className="aspect-square w-10 text-center rounded-sm leading-normal bg-rain-500 uppercase place-content-center">
											P
										</div>
										<span>Play / Pause Rain</span>
									</li>
									<li className="flex gap-2">
										<div className="aspect-square w-10 text-center rounded-sm leading-normal bg-rain-500 uppercase place-content-center">
											Esc
										</div>
										<span>Close dialogs and cancel</span>
									</li>
								</ul>
							</div>
						</div>
					</section>
				</div>
			</div>
		</FocusTrap>
	);
}
