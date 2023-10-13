import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Legend,
  Bar,
} from "recharts";

const data = [
  { name: "Page A", uv: 400, pv: 8400, amt: 6400 },
  { name: "Page B", uv: 500, pv: 7400, amt: 2700 },
  { name: "Page C", uv: 600, pv: 6400, amt: 8400 },
  { name: "Page D", uv: 900, pv: 3400, amt: 9400 },
  { name: "Page E", uv: 200, pv: 6400, amt: 1400 },
];

const Charts = () => {
  return (
    <>
      <div>
        <h1>Line Chart</h1>
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="uv" stroke="#0df3f3" />
          <CartesianGrid stroke="#f3754c" strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
      <div style={{ paddingTop: "16px" }}>
        <BarChart width={800} height={400} data={data}>
          <CartesianGrid stroke="#f3754c" strokeDasharray="3 3" />
          <XAxis dataKey="amt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </div>
    </>
  );
};

export default Charts;
