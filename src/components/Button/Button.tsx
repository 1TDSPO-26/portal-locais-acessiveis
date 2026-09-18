import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router";

interface ButtonProps {
  to?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  to,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "inline-flex h-[44px] items-center justify-center rounded-lg px-4 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC]";

  const variants = {
    primary:
      "bg-[#005FCC] text-white hover:scale-[1.02] hover:bg-blue-700 active:scale-95",
    secondary:
      "border border-[#CBD5E1] bg-white text-[#0052B4]",
  };

  const disabledClasses = disabled
    ? "cursor-not-allowed opacity-50"
    : "";

  const classes = `${baseClasses} ${variants[variant]} ${disabledClasses} ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={classes}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {children}
    </button>
  );
}