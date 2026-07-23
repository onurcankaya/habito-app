type BadgeProps = {
  label: string;
};

export default function Badge({ label }: BadgeProps) {
  return (
    <div className="flex items-center gap-1.5 h-6 px-3 bg-muted rounded-full">
      <span className="h-[7px] w-[7px] rounded-full bg-primary" />
      <p className="body-4">{label}</p>
    </div>
  );
}
