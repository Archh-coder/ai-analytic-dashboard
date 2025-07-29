"use client";

import React from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";

interface ChartPanelProps {
  type: "line" | "bar" | "pie";
  data: any[];
  dataKey: string;
  nameKey?: string;
  valueKey?: string;
  colors?: string[];
  title?: string;
}

const ChartPanel: React.FC<ChartPanelProps> = ({ type, data, dataKey, nameKey, valueKey, colors = [], title }) => {
  let chart = null;
  if (type === "line") {
    chart = (
      <LineChart data={data}>
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={valueKey || "value"} stroke="#6366f1" strokeWidth={3} dot={false} />
      </LineChart>
    );
  } else if (type === "bar") {
    chart = (
      <BarChart data={data}>
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={valueKey || "value"} fill="#22d3ee" />
      </BarChart>
    );
  } else if (type === "pie" && nameKey && valueKey) {
    chart = (
      <PieChart>
        <Pie data={data} dataKey={valueKey} nameKey={nameKey} cx="50%" cy="50%" outerRadius={80} label>
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={colors[idx % colors.length] || "#6366f1"} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 w-full h-[320px] border border-zinc-100 dark:border-zinc-800">
      {title && <div className="mb-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100">{title}</div>}
      <ResponsiveContainer width="100%" height="85%">
        {chart || <div />}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPanel; 