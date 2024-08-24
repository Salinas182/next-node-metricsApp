"use client";

export default function Input({
  name,
  label,
  type = "text",
  placeholder = "",
  value = "",
  styles = defaultStyles,
  disabled = false,
  onChange,
  onBlur = () => {},
}) {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.input}
        disabled={disabled}
      />
    </div>
  );
}

const defaultStyles = {
  container: "flex flex-col gap-2 w-full",
  label: "font-bold",
  input: "border border-brand-primary rounded-full h-10 pl-2 text-center",
};
