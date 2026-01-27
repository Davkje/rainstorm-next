import * as Slider from "@radix-ui/react-slider";

type Props = {
	value: number;
	onChange: (v: number) => void;
};

export function VerticalSlider({ value, onChange }: Props) {
	return (
		<Slider.Root
			orientation="vertical"
			min={0}
			max={1}
			step={0.01}
			value={[value]}
			onValueChange={([v]) => onChange(v)}
			className="relative flex place-content-center h-32 w-4 touch-none select-none"
		>
			{/* TRACK */}
			<Slider.Track className="relative rounded-xs h-full w-4 bg-rain-700">
				<Slider.Range className="absolute w-full bg-rain-200 " />
			</Slider.Track>

			{/* THUMB */}
			<Slider.Thumb
				className="
				block h-3 w-6
				bg-rain-600
				border-2 border-rain-200
				rounded
			"
			/>
		</Slider.Root>
	);
}
