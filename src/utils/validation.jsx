export const validateField = (name, value) => {
  let error = "";

  switch (name) {
    case "first_name":
    case "last_name":
      if (!value.trim()) error = "This field is required.";
      else if (value.length < 2) error = "Must be at least 2 characters.";
      break;

    case "phone":
      if (!value.trim()) error = "Phone number is required.";
      else if (!/^\d{10,15}$/.test(value))
        error = "Phone must be 10–15 digits.";
      break;

    case "department":
      if (!value.trim()) error = "Department is required.";
      break;

    case "bio":
      if (value.length > 300) error = "Bio cannot exceed 300 characters.";
      break;

    case "address":
      if (value.length > 200) error = "Address cannot exceed 200 characters.";
      break;

    case "date_of_birth":
      if (!value) error = "Date of Birth is required.";
      else if (new Date(value) > new Date())
        error = "Date of Birth cannot be in the future.";
      break;

    default:
      break;
  }

  return error;
};

export const validateForm = (formData) => {
  const errors = {};
  errors.first_name = validateField("first_name", formData.first_name);
  errors.last_name = validateField("last_name", formData.last_name);
  errors.phone = validateField("phone", formData.phone);
  errors.department = validateField("department", formData.department);
  errors.bio = validateField("bio", formData.profile.bio);
  errors.address = validateField("address", formData.profile.address);
  errors.date_of_birth = validateField(
    "date_of_birth",
    formData.profile.date_of_birth
  );

  Object.keys(errors).forEach((key) => {
    if (!errors[key]) delete errors[key];
  });

  return errors;
};
