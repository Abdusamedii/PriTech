export type ValidationResult = {
  valid: boolean;
  errors: {
    title?: string;
    description?: string;
  };
};

export function validateTaskInput(
  title: string,
  description: string,
): ValidationResult {
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();
  const errors: ValidationResult["errors"] = {};

  if (!trimmedTitle) {
    errors.title = "Title is required";
  } else if (trimmedTitle.length < 2) {
    errors.title = "Title must be at least 2 characters";
  } else if (trimmedTitle.length > 100) {
    errors.title = "Title must be 100 characters or less";
  }

  if (trimmedDescription.length > 500) {
    errors.description = "Description must be 500 characters or less";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
