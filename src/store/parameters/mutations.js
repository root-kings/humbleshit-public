export function fetchCategories_success(state, categories) {
  state.categories = categories
}

export function fetchParameters_success(state, parameters) {
  state.parameters = parameters
}

export function fetchParametersGrouped_success(state, parameters) {
  state.groupedParameters = parameters
}
