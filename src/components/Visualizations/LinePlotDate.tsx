import { LineDataPoint } from "@/types";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface Props {
  data: LineDataPoint[];
  width: number;
  height: number;
  margin: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  axesLabels: {
    yLabel: string;
    xLabel: string;
  };
}

export const LinePlot = ({
  data,
  width = 640,
  height = 400,
  margin: { left, right, top, bottom },
  axesLabels,
}: Props) => {
  const svgRef = useRef(null);

  useEffect(() => {
    d3.select(svgRef.current).selectChildren("*").remove();

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + left + right)
      .attr("height", height + bottom + top)
      .append("g")
      .attr("transform", `translate(${left},${top})`);

    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([left, width - right]);

    const T = x.ticks();
    const f = x.tickFormat(12, "%b %d");
    T.map(f);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)] as number[])
      .range([height - bottom, top]);

    // X-Axis

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - bottom})`)
      //@ts-ignore
      .call(
        //@ts-expect-error
        d3.axisBottom(x).ticks(d3.timeMonth, 1).tickFormat(d3.timeFormat("%b"))
      )
      .selectAll("text")
      .style("text-anchor", "middle");

    // Y-Axis
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .attr("transform", `translate(${left}, 0)`);

    // Add X axis label:
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", width - right + 10)
      .attr("y", height - bottom + 40)
      .text(axesLabels.xLabel);

    // Y axis label:
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -left + 20)
      .attr("x", -top)
      .text(axesLabels.yLabel);

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
