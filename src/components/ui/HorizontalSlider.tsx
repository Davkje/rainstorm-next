import * as Slider from "@radix-ui/react-slider";

type Props = {
	value: number;
	onChange: (v: number) => void;
};

// RADIX SLIDERS

export function HorizontalSlider({ value, onChange }: Props) {
	return (
		<Slider.Root
			min={0}
			max={1}
			step={0.01}
			value={[value]}
			onValueChange={([v]) => onChange(v)}
			className="relative flex place-items-center h-4 w-full touch-none select-none"
		>
			{/* TRACK */}
			<Slider.Track className="relative rounded-xs h-4 w-full bg-rain-700">
				<Slider.Range className="absolute h-full bg-rain-200 " />
			</Slider.Track>

			{/* THUMB */}
			<Slider.Thumb
				className="
        block h-6 w-3
        bg-rain-600
        border-2 border-rain-200
        rounded
      "
			/>
		</Slider.Root>
	);
}
