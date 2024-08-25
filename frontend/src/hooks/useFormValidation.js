export default function useFormValidation(initialValues) {
  const validateForm = () => {
    const valid = Object.values(initialValues).every(
      (value) => value.trim() !== ""
    );
    return { valid };
  };

  return { validateForm };
}
