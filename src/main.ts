import * as d3 from "d3";
import { usStates } from "./data";
const margin = { top: 20, right: 30, bottom: 40, left: 90 },
  width = 600,
  height = 450;

const svg = d3
  .select(document.querySelector("#container"))
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleLinear().domain([0, 10000000]).range([0, width]);
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0) rotate(-45)")
  .style("text-anchor", "end");

const y = d3
  .scaleBand()
  .range([0, height])
  .domain(
    usStates.map(function (d) {
      return d.place;
    })
  )
  .padding(0.1);
svg.append("g").call(d3.axisLeft(y));

svg
  .selectAll("rect")
  .data(usStates)
  .enter()
  .append("rect")
  .attr("x", x(0))
  .attr("y", function (d) {
    return y(d.place) as any;
  })
  .attr("width", function (d) {
    return x(d.population);
  })
  .attr("height", y.bandwidth())
  .attr("fill", "#69b3a2");
