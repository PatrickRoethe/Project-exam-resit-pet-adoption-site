export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
  helperText,
  disabled = false,
  ...props
}) {
  // Styling for input states
  const base =
    "w-full rounded-input bg-white text-neutral-dark px-4 py-3 text-base md:text-lg border border-border-default placeholder:placeholder transition-colors focus:outline-none";
  const errorClass = error ? "border-error" : "focus:border-secondary";
  const disabledClass = disabled
    ? "bg-neutral-light text-placeholder cursor-not-allowed border-neutral-light"
    : "";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-sm md:text-base font-medium text-neutral-dark mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${name}-error` : helperText ? `${name}-helper` : undefined
        }
        className={`${base} ${errorClass} ${disabledClass}`}
        {...props}
      />
      {error && (
        <span id={`${name}-error`} className="text-error text-xs mt-1">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${name}-helper`} className="text-primary text-xs mt-1">
          {helperText}
        </span>
      )}
    </div>
  );
}
