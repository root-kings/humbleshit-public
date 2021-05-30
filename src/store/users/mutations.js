export function fetchAllStaff_success(state, staffList) {
  state.staff.all = staffList
}

export function fetchReporteeStaff_success(state, staffList) {
  state.staff.reportees = staffList
}
