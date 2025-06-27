export default function Button({
  children,
  variant = "primary",
  disabled = false,
  fullWidth = false,
  ...props
}) {
  // Sjekk om knappen faktisk er disabled (enten via variant eller prop)
  const isDisabled = disabled || variant === "disabled";

  let base =
    "rounded-btn font-semibold px-6 py-2 transition-colors text-base md:text-lg focus:outline-none";
  let styles = "";

  if (variant === "primary" && !isDisabled) {
    styles = "bg-primary text-white hover:bg-[#27642A]";
  } else if (variant === "primary" && isDisabled) {
    styles = "bg-neutral-light text-[#AAAAAA] cursor-not-allowed border-0";
  } else if (variant === "secondary" && !isDisabled) {
    styles =
      "bg-transparent border-2 border-primary text-primary hover:bg-primary-light";
  } else if (variant === "secondary" && isDisabled) {
    styles =
      "bg-neutral-light text-[#AAAAAA] border-2 border-neutral-light cursor-not-allowed";
  } else if (isDisabled) {
    styles = "bg-neutral-light text-[#AAAAAA] cursor-not-allowed border-0";
  }

  if (fullWidth) {
    styles += " w-full";
  }

  return (
    <button
      className={`${base} ${styles}`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
      {...props}
    >
      {children}
    </button>
  );
}
