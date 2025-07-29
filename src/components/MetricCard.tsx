import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  changeType?: "up" | "down";
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, change, changeType }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 flex flex-col gap-2 min-w-[160px] w-full max-w-xs border border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
        {icon}
        {title}
      </div>
      <div className="text-3xl font-bold text-zinc-900 dark:text-white">{value}</div>
      {change && (
        <div className={`flex items-center gap-1 text-xs font-semibold ${changeType === "up" ? "text-green-600" : "text-red-500"}`}>
          {changeType === "up" ? "▲" : "▼"} {change}
        </div>
      )}
    </div>
  );
};

export default MetricCard; 