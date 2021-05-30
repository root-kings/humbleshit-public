export function categories({ categories }) {
  return categories
}

export function parameters({ parameters }) {
  return parameters
}

export function groupedParameters({ groupedParameters }) {
  return groupedParameters
}

export function nameMap({ parameters }) {
  let map = {}
  parameters.forEach(p => (map[p._id] = p.name))
  return map
}
