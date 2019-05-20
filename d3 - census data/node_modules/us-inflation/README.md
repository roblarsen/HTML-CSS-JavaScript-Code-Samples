# US inflation

Convert US prices from one year (and month if you want) to another.

[![pipeline status](https://gitlab.com/jeremiak/us-inflation/badges/master/pipeline.svg)](https://gitlab.com/jeremiak/us-inflation/commits/master)

## Usage

```
import inflation from 'us-inflation'

const current = inflation({ year: 1945, amount: 1.23 })
console.log(`$1.23 in 1945 was worth $${current} in 2017`)
```

## Documentation

There is a single function exported by the library that has one required and one optional argument. It returns the converted price.

### `inflation(from, [to])`

The required `from` argument and the optional `to` argument are similar objects.

#### `from`

- `amount` is the nominal price
- `year` is a year between 1913 and 2018
- `month` (optional) if want a more precise measure, you can supply the month the price was observed

#### `to` (optional)

- `year` is a year between 1913 and 2018 and is 2017 (the last full year of data) by default
- `month` (optional) if want a more precise measure, you can supply the month you want the new price for

## Data source

All data comes from the Bureau of Labor Statistics [Consumer Price Index inflation calculator](https://www.bls.gov/data/inflation_calculator.htm) and is therefore limited to years between 1913 and 2018.

## Prior art and motivation

I came across [@dillonchr/inflation](https://www.npmjs.com/package/@dillonchr/inflation) but wanted an implementation that didn't make an HTTP request for every function call and I also wanted to figure out how to calculate inflation using the CPI.
