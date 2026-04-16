import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type SharedButtonProps = {
  children: ReactNode;
  tone?: "primary" | "secondary" | "ghost";
  className?: string;
};

type AnchorButtonProps = SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = AnchorButtonProps | NativeButtonProps;

export function Button({
  children,
  className = "",
  tone = "primary",
  ...props
}: ButtonProps) {
  const base =
    "type-body-medium inline-flex h-9 cursor-pointer items-center justify-center rounded-full px-4 py-3 transition-[transform,background-color,color] duration-150 ease-[ease] active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100";
  const tones = {
    primary:
      "bg-[var(--text-strong)] text-[#FAFAFA] hover:bg-[#2e2d35]",
    secondary:
      "bg-[#F5F5F5] text-[var(--text-strong)] hover:bg-[#EBEBEB]",
    ghost:
      "border border-[#EEEEEE] bg-[#F5F5F5] text-[var(--text-strong)] hover:bg-[#EBEBEB]",
  };

  const resolvedClassName = `${base} ${tones[tone]} ${className}`.trim();

  if ("href" in props && typeof props.href === "string") {
    return (
      <a className={resolvedClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={resolvedClassName} type="button" {...props}>
      {children}
    </button>
  );
}
