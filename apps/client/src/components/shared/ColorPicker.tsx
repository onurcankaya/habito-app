import { CATEGORY_COLORS } from "@/constants";
import { cn } from "@/lib/utils";

type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
  error?: string;
};

export default function ColorPicker({
  value,
  onChange,
  error,
}: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground text-left block">
        Color
      </label>

      <div className="flex gap-2 flex-wrap">
        {CATEGORY_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={cn(
              "h-6 w-6 rounded-full transition-transform",
              value === color &&
                "ring-2 ring-offset-2 ring-offset-background ring-foreground scale-105",
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
