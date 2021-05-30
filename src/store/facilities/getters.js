export function facilities({ facilities }) {
  return facilities
}

export function facilityById({ facilities }) {
  return facilityId => {
    return facilities.filter(f => f._id == facilityId)[0] || null
  }
}
