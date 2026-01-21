import { WordBankName } from "@/models/wordBanks";
import { FocusTrap } from "focus-trap-react";
import { useGlobalKeys } from "@/utils/useGlobalKeys";

type Props = {
	banks: WordBankName[];
	activeBanks: WordBankName[];
	onToggleBank: (bank: WordBankName) => void;
	onClose: () => void;
};

export default function ActiveBanksOverlay({ banks, activeBanks, onToggleBank, onClose }: Props) {
	useGlobalKeys("Escape", onClose, {
		ignoreInputs: true,
	});

	return (
		<FocusTrap>
			<div
				className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
				onClick={onClose}
			>
				<div
					className="bg-rain-800 p-8 rounded-2xl mx-8 w-max max-h-[60vh] overflow-y-auto flex items-center flex-col gap-4"
					onClick={(e) => e.stopPropagation()}
				>
					<h2 className="text-center uppercase">Active Banks</h2>
					<div className="grid grid-cols-2 lg:grid-cols-5 grid-rows-2 gap-3">
						{[...banks]
							.sort((a, b) => a.localeCompare(b))
							.map((bank) => {
								const isActive = activeBanks.includes(bank);
								return (
									<button
										key={bank}
										onClick={() => onToggleBank(bank)}
										className={`btn--primary px-4 py-1 text-md capitalize ${
											isActive
												? "bg-rain-700 text-rain-200 border-rain-600"
												: "bg-rain-900/40 text-rain-400 border-transparent"
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
