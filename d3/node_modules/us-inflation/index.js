const data = require("./bls-cpi-data.json")

const lastFullYear = 2017
const months = [
  { abbr: "Jan", name: "January", order: 1 },
  { abbr: "Feb", name: "February", order: 2 },
  { abbr: "Mar", name: "March", order: 3 },
  { abbr: "Apr", name: "April", order: 4 },
  { abbr: "May", name: "May", order: 5 },
  { abbr: "Jun", name: "June", order: 6 },
  { abbr: "Jul", name: "July", order: 7 },
  { abbr: "Aug", name: "August", order: 8 },
  { abbr: "Sep", name: "September", order: 9 },
  { abbr: "Oct", name: "October", order: 10 },
  { abbr: "Nov", name: "November", order: 11 },
  { abbr: "Dec", name: "December", order: 12 }
]

function getCpi(year, initialMonth) {
  const month = initialMonth
    ? months.find(m => m.order === initialMonth).abbr
    : "Annual"
  const yearData = data.find(d => d.Year === year)
  return yearData[month]
}

module.exports = function inflation(initialFrom, initialTo) {
  const from = initialFrom || {}
  const to = initialTo || { year: lastFullYear }
  if (!from.year) {
    throw new Error("from.year must be provided")
  } else if (!from.amount) {
    throw new Error("from.amount must be provided")
  } else if (typeof from.year !== "number") {
    throw new Error("from.year must be a number, like 1922")
  } else if (from.year < 1913) {
    throw new Error("from.year must be 1913 or later")
  }

  const fromCpi = getCpi(from.year, from.month)
  const toCpi = getCpi(to.year, to.month)

  const inflationFactor = (toCpi - fromCpi) / fromCpi
  const inflationValue = inflationFactor * from.amount
  const currentValue = inflationValue + from.amount

  return +currentValue.toFixed(2)
}
