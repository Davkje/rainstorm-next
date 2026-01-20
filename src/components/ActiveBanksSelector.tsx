import { WordBankName } from "@/models/wordBanks";
import { FocusTrap } from "focus-trap-react";

type Props = {
	banks: WordBankName[];
	activeBanks: WordBankName[];
	onToggleBank: (bank: WordBankName) => void;
	onClose: () => void;
};

export default function ActiveBanksOverlay({ banks, activeBanks, onToggleBank, onClose }: Props) {
	return (
		<FocusTrap>
			<div
				className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
				onClick={onClose}
			>
				<div
					className="bg-rain-800 p-6 rounded-2xl w-max max-h-[80vh] overflow-y-auto flex flex-col gap-4"
					onClick={(e) => e.stopPropagation()}
				>
					<h2 className="text-center uppercase">Active Banks</h2>
					<div className="grid grid-cols-2 grid-rows-5 gap-3 grid-flow-col">
						{[...banks]
							.sort((a, b) => a.localeCompare(b))
							.map((bank) => {
								const isActive = activeBanks.includes(bank);
								return (
									<button
										key={bank}
										onClick={() => onToggleBank(bank)}
										className={`btn--primary capitalize ${
											isActive
												? "bg-rain-700 text-rain-200"
												: "bg-rain-900/50 text-rain-400 border-transparent"
										}`}
									>
										{bank}
									</button>
								);
							})}
					</div>

					<button onClick={onClose} className="btn--primary">
						Close
					</button>
				</div>
			</div>
		</FocusTrap>
	);
}
