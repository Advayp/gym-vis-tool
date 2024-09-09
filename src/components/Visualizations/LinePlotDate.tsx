import * as d3 from "d3";

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
  const x = d3
    .scaleUtc()
    .domain(d3.extent(data, (d) => d.date) as [Date, Date])
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)] as number[])
    .range([height - marginBottom, marginTop]);

  const line = d3
    .line<LineDataPoint>()
    .x((d) => x(d.date))
    .y((d) => y(d.value));

  return (
    <svg width={width} height={height}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data)!!}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d.value)} r="2.5" />
        ))}
      </g>
    </svg>
  );
};
