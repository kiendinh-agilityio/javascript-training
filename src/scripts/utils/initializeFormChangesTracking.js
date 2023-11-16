export const initializeFormChangesTracking = (formInputs, title, submitBtn) => {
  let changesMade = false;

  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      changesMade = true;
      if (title === TITLE_MODAL.EDIT) {
        submitBtn.removeAttribute('disabled');
      }
    });
  });

  return { changesMade };
};
