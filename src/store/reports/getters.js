import moment from 'moment-timezone'

export function report({ report }) {
  return report
}

export function shiftState({ shiftState }) {
  return shiftState
}

export function facilities({ shiftState }, getters, rootState, rootGetters) {
  const loggedUser = rootGetters['auth/user']

  return shiftState.mappings
    .filter(m => m.reporter == loggedUser._id)
    .map(m => {
      // calculate status

      let checkStatus
      if (!m.facility.lastChecked) checkStatus = 'todo'
      else {
        let now = new moment().tz('Asia/Kolkata')
        let lastChecked = new moment(m.facility.lastChecked).tz('Asia/Kolkata')
        let nextCheck = lastChecked.add('hours', m.interval)

        checkStatus = now.isAfter(nextCheck) ? 'todo' : 'done'
      }
      return { ...m.facility, reporter: m.reporter, checkStatus }
    })
}

export function facilityById({ shiftState }, getters) {
  return facilityId => {
    let facility =
      getters['facilities'].filter(f => f._id == facilityId)[0] || null

    return facility
  }
}

export function selectedFacility({ selectedFacilityId }, getters) {
  return getters.facilityById(selectedFacilityId)
}

export function selectedMapping({ selectedFacilityId, shiftState }) {
  return (
    shiftState.mappings.filter(m => m.facility._id == selectedFacilityId)[0] ||
    null
  )
}
