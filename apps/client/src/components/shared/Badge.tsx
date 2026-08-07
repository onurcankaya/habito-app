type BadgeProps = {
  label: string;
  color?: string;
};

export default function Badge({ label, color }: BadgeProps) {
  return (
    <div className="flex items-center gap-1.5 h-6 px-3 bg-muted rounded-full">
      {color && (
        <span
          className="h-[7px] w-[7px] rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      <p className="body-4 whitespace-nowrap">{label}</p>
    </div>
  );
}
