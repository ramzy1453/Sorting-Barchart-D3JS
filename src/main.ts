import * as d3 from "d3";

let data = Array.from({ length: 5 }, (_, i) => ({
  name: "bar " + i,
  value: Math.floor(Math.random() * 100) + 1,
})) as {
  name: string;
  value: number;
}[];

const width = 600;
const height = 400;
const margin = { top: 20, right: 20, bottom: 50, left: 50 };

const x = d3
  .scaleBand()
  .domain(data.map((d) => d.name))
  .range([margin.left, width - margin.right])
  .padding(0.1);

const y = d3
  .scaleLinear()
  .domain([0, 100])
  .range([height - margin.bottom, margin.top]);

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const permuter = () => {
  for (let i = 0; i < data.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < data.length; j++) {
      if (data[j].value < data[minIndex].value) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      let temp = data[i];
      data[i] = data[minIndex];
      data[minIndex] = temp;

      x.domain(data.map((d) => d.name));

      svg
        .selectAll<SVGRectElement, (typeof data)[0]>(".bar")
        .data(data, (d) => d.name)
        .transition()
        .duration(2000)
        .delay((_, i) => i * 1000)
        .on("start", function (_, d) {
          console.log(d, data[i]);
          if (d === i || d === minIndex) {
            d3.select(this).attr("fill", "orange");
          }
        })
        .attr("x", (d) => x(d.name)!)
        .on("end", function () {
          d3.select(this).attr("fill", "steelblue");
        });
    }
  }
};

const bars = svg.selectAll(".bar").data(data, (d) => (d as any).name);

bars
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d) => x(d.name)!)
  .attr("y", height - margin.bottom)
  .attr("width", x.bandwidth())
  .attr("height", 0)
  .attr("fill", "steelblue")
  .transition()
  .duration(1000)
  .delay((_, i) => i * 150)
  .attr("y", (d) => y(d.value))
  .attr("height", (d) => height - margin.bottom - y(d.value));
d3.select("body").append("button").text("permuter").on("click", permuter);
