import { WordBank } from "@/models/wordBanks"

key={bank}
						bank={bank}
						isSelected={selectedBanks.includes(bank)}
						onToggle={() => toggleSelectedBank(bank)}

type Props = {
  key: string;
  bank: WordBank
  // setIdea: React.Dispatch<React.SetStateAction<Idea | null>>;
  // onRemoveCategory: (id: string) => void;
  // onAddCategory: () => void;
};

export default function BankToggle() {
	return <div>Bank Toggle</div>;
}
