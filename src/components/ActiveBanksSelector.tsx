import { WordBankName } from "@/models/wordBanks";
import { FocusTrap } from "focus-trap-react";
import { useGlobalKeys } from "@/utils/useGlobalKeys";
import { RiCloseLine } from "@remixicon/react";

type Props = {
	banks: WordBankName[];
	activeBanks: WordBankName[];
	onToggleBank: (bank: WordBankName) => void;
	onToggleAll: () => void;
	onClose: () => void;
};

export default function ActiveBanksOverlay({
	banks,
	activeBanks,
	onToggleBank,
	onToggleAll,
	onClose,
}: Props) {
	useGlobalKeys("Escape", onClose, {
		ignoreInputs: true,
	});
	useGlobalKeys("b", onClose, {
		ignoreInputs: true,
	});
	const allActive = activeBanks.length === banks.length;

	return (
		<FocusTrap>
			<div
				className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
				onClick={onClose}
			>
				<div
					className="relative bg-rain-800 border-2 border-rain-700 p-8 rounded-2xl mx-8 w-max max-h-[90vh] overflow-y-auto flex items-center flex-col gap-8"
					onClick={(e) => e.stopPropagation()}
				>
					<button
						onClick={onClose}
						className="btn--icon absolute top-4 right-4"
						aria-label="Close help"
					>
						<RiCloseLine />
					</button>
					<h2 className="text-center font-bold uppercase">Active Banks</h2>

					<div className="grid gap-4">
						<p className="leading-tight text-lg text-rain-300 place-self-center">
							Add or remove specific banks to generate words from.
						</p>
						<p className="leading-tight text-lg text-rain-500 place-self-center">
							{activeBanks.length} / {banks.length} active
						</p>
						<button
							onClick={onToggleAll}
							className="btn--tertiary bg-rain-800 hover:bg-rain-700 uppercase text-md w-max place-self-center"
						>
							{allActive ? "Disable all" : "Enable all"}
						</button>
					</div>

					<div className="grid grid-cols-2 lg:grid-cols-5 grid-rows-2 gap-3">
						{[...banks]
							.sort((a, b) => a.localeCompare(b))
							.map((bank) => {
								const isActive = activeBanks.includes(bank);
								return (
									<button
										key={bank}
										onClick={() => onToggleBank(bank)}
										className={`btn--tertiary px-4 py-1 text-md uppercase shadow-black/30 shadow-[0_6px_10px] ${
											!isActive && "bg-rain-900/0 text-rain-300 hover:text-rain-200 shadow-none"
										}`}
									>
										{bank}
									</button>
								);
							})}
					</div>
				</div>
			</div>
		</FocusTrap>
	);
}
