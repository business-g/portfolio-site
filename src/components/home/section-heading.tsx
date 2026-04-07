type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl leading-tight tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl">
        {title}
      </h2>
      <p className="max-w-xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}
