
const defaultPermissions = () => {
  return {
    facilityRead      : true,
    facilityWrite     : false,
    organizationRead  : false,
    organizationWrite : false,
    parameterRead     : true,
    parameterWrite    : false,
    reportRead        : true,
    reportWrite       : true,
    shiftRead         : true,
    shiftWrite        : false,
    staffRead         : true,
    staffWrite        : false,
    statisticsRead    : true,
    ticketRead        : true,
    ticketWrite       : false,
    userRead          : true,
    userWrite         : false
  }
}

const allPermissions = () => Object.keys(defaultPermissions)

module.exports = { 
  defaultPermissions, 
  allPermissions
}
