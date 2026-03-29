interface ProgressBarProps {
  step: number;
  total: number;
}

export function ProgressBar({ step, total }: ProgressBarProps) {
  const pct = (step / total) * 100;
  return (
    <div className="mb-8 w-full">
      <div className="h-1.5 w-full rounded-full bg-muted">
        <div
          className="h-1.5 rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Step {step} of {total}
      </p>
    </div>
  );
}
