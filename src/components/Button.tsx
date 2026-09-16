import Link from "next/link";
import { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
  disabled?: false;
};

type DisabledProps = CommonProps & {
  href?: undefined;
  disabled: true;
};

const base =
  "inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500";

const variants = {
  primary:
    "bg-forest-600 text-white hover:bg-forest-500 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
  ghost:
    "border-[1.5px] border-ink-900/15 text-ink-900 hover:border-forest-500 hover:text-forest-600 hover:-translate-y-0.5",
};

export default function Button(props: LinkProps | DisabledProps) {
  const variant = props.variant ?? "primary";
  const classes = `${base} ${variants[variant]} ${props.className ?? ""}`;

  if (props.disabled) {
    return (
      <span className={`${classes} cursor-not-allowed opacity-45`} aria-disabled="true">
        {props.children}
      </span>
    );
  }

  if (props.external) {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {props.children}
      </a>
    );
  }

  return (
    <Link href={props.href} className={classes}>
      {props.children}
    </Link>
  );
}
