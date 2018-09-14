const margin = {
  "top": 100,
  "right": 20,
  "bottom": 100,
  "left": 100
}
const width = 1440;
const height = 768;
const yPadding = margin.top + margin.bottom;
const xPadding = margin.right + margin.left;

const svg = d3.select("#target")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const g = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
const radius = 5
const parseTime = d3.timeParse("%Y-%m-%d");

const x = d3.scaleTime()
  .rangeRound([0, width - xPadding]);

const y = d3.scaleLinear()
  .rangeRound([height - yPadding, 0]);


const line = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.price); });

const inflationLine = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.inflationAdjustedPrice); });


function yGridlines() {
  return d3.axisLeft(y)
    .ticks(5)
}

d3.json("data/books.json").then((data) => {
  data.sales = data.sales.reverse();

  data.sales.forEach((d) => {
    d.date = parseTime(d.date);
    d.price = parseInt(d.price);
    const year = parseInt(moment(d.date).format("YYYY"));
    d.inflationAdjustedPrice = inflation({ "amount": d.price, "year": year })
  });

  x.domain([
    d3.min(data.sales, (d)=> { 
      return moment(d.date).startOf("year").toDate(); 
    }),moment().toDate()]);
  y.domain([0, d3.max(data.sales, (d)=> { 
    return Math.ceil(d.price / 500000) * 500000; 
  })]);
  const years = parseInt(moment().format("YYYY")) - parseInt(moment(x.domain()[0]).format("YYYY"));
  
  let axis = g.append("g")
    .attr("class", "axis")

  axis.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y)
    .tickSize(-(width-xPadding)));
  axis.append("g")
  .attr("class", "x axis")
    .attr("transform", `translate(0, ${height - yPadding})`)
    .call(d3.axisBottom(x).ticks(years).tickSize(-(height - yPadding)));

let paths = g.append("g")
    .attr("class", "paths")

  paths.append("path")
    .data([data.sales])
    .attr("class", "line")
    .attr("d", line)

  paths.append("path")
    .data([data.sales])
    .attr("class", "inflation line")
    .attr("d", inflationLine);

  let dots = g.append("g")
    .attr("class", "dots")

  dots.selectAll(".dot")
    .data(data.sales)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function (d) { return x(d.date) })
    .attr("cy", function (d) { return y(d.price) })
    .attr("r", radius)
    .append("title").text(function (d) { return `${d.title} ${d.grade} ${d.price.toLocaleString('us-EN', { style: 'currency', currency: 'USD' })}: ${d.venue}` });
  dots.selectAll(".inflation dot")
    .data(data.sales)
    .enter().append("circle")
    .attr("class", "inflation dot")
    .attr("cx", function (d) { return x(d.date) })
    .attr("cy", function (d) { return y(d.inflationAdjustedPrice) })
    .attr("r", radius)
    .append("title").text(function (d) { return `${d.title} ${d.grade} ${d.inflationAdjustedPrice.toLocaleString('us-EN', { style: 'currency', currency: 'USD' })}: ${d.venue}` });
});
