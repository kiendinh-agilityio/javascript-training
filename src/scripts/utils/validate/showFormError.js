const updateErrorMessages = (errors) => {
  Object.entries(errors).forEach(([key, value]) => {
    const target = document.getElementById(`${key}-error`);
    if (target) {
      target.innerText = value;
    }
  });
};

export const showFormErrors = (errors) => {
  updateErrorMessages(errors);
};
