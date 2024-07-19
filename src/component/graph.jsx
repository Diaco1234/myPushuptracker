import React from "react";
import { createUseStyles } from "react-jss";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

const useStyles = createUseStyles(() => ({
  container: {
    color: "#fff",
    backgroundColor: "rgb(255, 255, 255)",
    padding: "1rem",
    transition: "0.3s ease-in-out",
    width: "100%",
    height: "400px",
  }
}));

const GradientColors = () => {
  return (
    <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
      <stop offset="30%" stopColor="#8884d8" stopOpacity={0.4} />
      <stop offset="75%" stopColor="#ff9bff81" stopOpacity={0.3} />
      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2} />
    </linearGradient>
  );
};

const MyGraph = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1>Pushup Stats</h1>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <GradientColors />
          </defs>
          <Tooltip
            itemStyle={{ color: "#fff", backgroundColor: "#0A1322" }}
            contentStyle={{ backgroundColor: "#0A1322" }}
          />
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#8884d8"
            opacity={0.4}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "#B6BAC3" }}
            stroke="#EEEEEE"
          />
          <YAxis
            tick={{ fill: "#B6BAC3" }}
            stroke="#EEEEEE"
          />
          <Area
            dataKey="value"
            type="monotone"
            stroke="#8884d8"
            strokeWidth={3}
            strokeOpacity={1}
            fill="url(#colorView)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyGraph;
