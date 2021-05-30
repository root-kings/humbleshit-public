export function allStaff({ staff }) {
  return staff.all
}

export function reporteeStaff({ staff }) {
  return staff.reportees
}

export function possibleReporters({ staff }) {
  return staff.all.filter(s => s.permissions.reportWrite)
}

export function possibleSupervisors({ staff }) {
  return staff.all.filter(s => s.permissions.ticketWrite)
}
