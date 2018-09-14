const test = require("tape")

const inflation = require("./index")

test("should convert $0.25 in 1922 to $3.65 in 2017 if no to argument is provided", t => {
  const actual = inflation({ year: 1922, amount: 0.25 })
  t.equal(actual, 3.65)
  t.end()
})

test("should convert $0.25 in 1922 to $3.24 in 2010", t => {
  const actual = inflation({ year: 1922, amount: 0.25 }, { year: 2010 })
  t.equal(actual, 3.24)
  t.end()
})

test("should convert $0.25 in 1922 to $2.38 in March of 1997", t => {
  const actual = inflation(
    { year: 1922, amount: 0.25 },
    { year: 1997, month: 3 }
  )
  t.equal(actual, 2.38)
  t.end()
})

test("should require a from argument with a year and an amount", t => {
  t.throws(() => inflation(), /from.year must be provided/)
  t.throws(() => inflation({ year: 1992 }), /from.amount must be provided/)
  t.end()
})

test("should only convert prices from 1913 or later", t => {
  t.throws(
    () => inflation({ year: 1900, amount: 1.23 }),
    /from.year must be 1913 or later/
  )
  t.end()
})
