import { boot } from 'quasar/wrappers'
import moment from 'moment-timezone'

function changeNumberFormat(number, decimals, recursiveCall) {
  /**
   * Returns a number in Indian numbering system as a String
   * https://www.codegulp.com/js-function-numbers-to-indian-units/
   *
   * @param {Number/String} number The integer to be converted.
   * @param {Number} decimals The number of digits needed after decimal point.
   * @return {String} Converted number as a String in Indian numbering unit.
   */

  const decimalPoints = decimals || 2
  const noOfLakhs = number / 100000
  let displayStr
  let isPlural

  // Rounds off digits to decimalPoints decimal places
  function roundOf(integer) {
    return +integer

    /**
     * this gives error when number is less than 1 lakh, anyway, we dont need
     * that as we dont want decimal digits
     */

    // return +integer.toLocaleString(undefined, {
    //   minimumFractionDigits: decimalPoints,
    //   maximumFractionDigits: decimalPoints
    // })
  }

  if (noOfLakhs >= 1 && noOfLakhs <= 99) {
    const lakhs = roundOf(noOfLakhs)
    isPlural = lakhs > 1 && !recursiveCall
    displayStr = `${lakhs} Lakh${isPlural ? 's' : ''}`
  } else if (noOfLakhs >= 100) {
    const crores = roundOf(noOfLakhs / 100)
    const crorePrefix =
      crores >= 100000 ? changeNumberFormat(crores, decimals, true) : crores
    isPlural = crores > 1 && !recursiveCall
    displayStr = `${crorePrefix} Crore${isPlural ? 's' : ''}`
  } else {
    displayStr = roundOf(+number)
  }

  return displayStr
}

function humanTime(time) {
  return new moment(time).format('h:mm A')
}

function humanDateTime(time) {
  return new moment(time).tz('Asia/Kolkata').calendar()
}

function formatDate(time) {
  return new moment(time).format('D MMM YYYY')
}

function formatDateTime(time) {
  return new moment(time).format('D MMM h:mm A')
}

function formatDateTimeFull(time) {
  return new moment(time).format('D MMM YYYY h:mm A')
}

function last4Digits(value) {
  return (value + '').slice(value.length - 4)
}

const filters = {
  indianMoney: changeNumberFormat,
  humanTime,
  humanDateTime,
  formatDate,
  formatDateTime,
  formatDateTimeFull,
  last4Digits
}

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$filters

  app.config.globalProperties.$filters = filters
  // ^ ^ ^ this will allow you to use this.$filters (for Vue Options API form)
  //       so you won't necessarily have to import filters in each vue file
})

export { filters }
