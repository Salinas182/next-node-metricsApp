"use client";

export default function Button({
  label,
  styles,
  type = "primary",
  disabled = false,
  onClick = () => {},
}) {
  return (
    <button
      className={`rounded-full ${styles ?? "w-28 h-12"} ${buttonStyles[type]} ${
        disabled && buttonStyles.disabled
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

const buttonStyles = {
  primary: "bg-brand-primary text-white font-bold",
  secondary: "border-black border-solid border-[1px] font-bold",
  disabled: "cursor-not-allowed opacity-50",
};
