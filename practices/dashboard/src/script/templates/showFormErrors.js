import { camelCaseToHyphenCase } from '../constants'

export const showFormErrors = (errors) => {
  Object.entries(errors).forEach(([key, value]) => {
    const newKey = camelCaseToHyphenCase(key)
    errors[newKey] = value
  })

  const showMessageErrors = (errors) => {
    Object.entries(errors).forEach(([key, value]) => {
      const target = document.getElementById(`${key}-error`)
      if (target) {
        target.innerText = value
      }
    })
  }
  showMessageErrors(errors)
}
