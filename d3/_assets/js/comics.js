
const width = 1000,
  height = 600;

/*let svg = d3.select("#target").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width / 2},${height / 2})`);*/

d3.json("data/books.json").then((data) => {
  console.log(data)
  d3.select("#target").selectAll("p")
    .data(data.sales)
    .enter()
    .append("p")
    .text((d)=>{ return `${d.date} ${d.title} ${d.issue} ${d.grade} ${d.note} ${d.venue} ${d.price}`});

});