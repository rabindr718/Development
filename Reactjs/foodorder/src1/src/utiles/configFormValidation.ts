// formValidation.ts

interface Rule {
  condition: (value: any) => boolean;
  message: string;
}

export const validateField = (value: any, rules: Rule[]): string | null => {
  let error: string | null = null;
  rules.forEach((rule) => {
    if (!error && !rule.condition(value)) {
      error = rule.message;
    }
  });
  return error;
};

export const validateConfigForm = (
  formData: { [key: string]: any },
  validationRules: { [key: string]: Rule[] }
): { isValid: boolean; errors: { [key: string]: string } } => {
  let isValid = true;
  const newErrors: { [key: string]: string } = {};

  Object.keys(formData).forEach((fieldName) => {
    const value = formData[fieldName];
    const rules = validationRules[fieldName] || [];
    const error = validateField(value, rules);
    if (error) {
      newErrors[fieldName] = error;
      isValid = false;
    }
  });

  return { isValid, errors: newErrors };
};
