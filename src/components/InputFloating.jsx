export default function InputFloating({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
  ...props
}) {
  return (
    <div className="relative w-full">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={type === "password" ? "current-password" : "on"}
        className={`
          w-full rounded-input bg-neutral-light px-4 pt-7 pb-2 text-base md:text-lg border border-border-default
          transition-colors focus:outline-none
          ${error ? "border-error" : "focus:border-secondary"}
          ${
            disabled
              ? "bg-neutral-light text-placeholder cursor-not-allowed border-neutral-light"
              : ""
          }
        `}
        {...props}
      />
      <label
        htmlFor={name}
        className="absolute left-4 -top-2 text-primary text-xs pointer-events-none"
      >
        {label}
      </label>
      {error && (
        <span id={`${name}-error`} className="text-error text-xs mt-1 block">
          {error}
        </span>
      )}
    </div>
  );
}
