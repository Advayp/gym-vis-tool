import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface Props {
  data: LineDataPoint[];
  width: number;
  height: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
}

export const LinePlot = ({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}: Props) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${marginLeft},${marginTop})`);

    svg.selectAll("*").remove();

    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([marginLeft, width - marginRight - 0.2 * width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)] as number[])
      .range([height - marginBottom, marginTop]);

    // X-Axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "middle");

    // Y-Axis
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .attr("transform", `translate(${marginLeft}, 0)`);

    // Line generator
    const line = d3
      .line<LineDataPoint>()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "#8e44ad")
      .attr("strokeWidth", "2")
      .attr("d", line(data));
  });

  return <svg width={width} height={height} ref={svgRef}></svg>;
};
