
const margin = {top: 100, right: 20, bottom: 100, left: 100},
width = 1440 - margin.left - margin.right,
height = 768 - margin.top - margin.bottom;

let svg = d3.select("#target").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom);
let parseTime = d3.timeParse("%Y-%m-%d");

let x = d3.scaleTime()
    .rangeRound([0, width]);

let y = d3.scaleLinear()
    .rangeRound([height, 0]);
var valueline = d3.line()
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.price); });
d3.json("data/books.json").then((data) => {
    console.log(data)
    data.sales = data.sales.reverse();

    data.sales.forEach(function (d) {
        d.date = parseTime(d.date);
        d.price = + d.price;
    });
    console.log(data)

    x.domain(d3.extent(data.sales, function (d) { return d.date; }));
    y.domain([0, d3.max(data.sales, function (d) { console.log(d.price);return d.price; })]);
    let g = svg.append("g").attr("transform", `translate(${margin.top},${margin.left})`)

    g.append("path")
        .data([data.sales])
        .attr("class", "line")
        .attr("d", valueline);


    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));


    g.append("g")
        .call(d3.axisLeft(y));

});

