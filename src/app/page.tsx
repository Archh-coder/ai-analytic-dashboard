"use client";
import MetricCard from "../components/MetricCard";
import ChartPanel from "../components/ChartPanel";
import DataTable from "../components/DataTable";
import { UserGroupIcon, CurrencyDollarIcon, ArrowTrendingUpIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

//Dummy status options
const statuses = ["Active", "Paused", "Completed"];
const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Paused: "bg-yellow-100 text-yellow-700",
  Completed: "bg-gray-200 text-gray-700",
};

const metrics = [
  {
    title: "Revenue",
    value: "$120,400",
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
    change: "+12.5%",
    changeType: "up" as const,
  },
  {
    title: "Users",
    value: "8,230",
    icon: <UserGroupIcon className="w-5 h-5" />,
    change: "+3.2%",
    changeType: "up" as const,
  },
  {
    title: "Conversions",
    value: "1,024",
    icon: <SparklesIcon className="w-5 h-5" />,
    change: "-1.1%",
    changeType: "down" as const,
  },
  {
    title: "Growth",
    value: "18.7%",
    icon: <ArrowTrendingUpIcon className="w-5 h-5" />,
    change: "+0.8%",
    changeType: "up" as const,
  },
];

const lineData = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 4200 },
  { month: "Mar", value: 4800 },
  { month: "Apr", value: 5000 },
  { month: "May", value: 5300 },
  { month: "Jun", value: 6000 },
];
const barData = [
  { channel: "Google", value: 3400 },
  { channel: "Facebook", value: 2100 },
  { channel: "Instagram", value: 1800 },
  { channel: "LinkedIn", value: 900 },
];
const pieData = [
  { name: "Desktop", value: 65 },
  { name: "Mobile", value: 30 },
  { name: "Tablet", value: 5 },
];
const pieColors = ["#6366f1", "#22d3ee", "#f59e42"];

const tableColumns = [
  { accessorKey: "campaign", header: "Campaign" },
  { accessorKey: "impressions", header: "Impressions" },
  { accessorKey: "clicks", header: "Clicks" },
  { accessorKey: "conversions", header: "Conversions" },
  { accessorKey: "ctr", header: "CTR" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "date", header: "Date" },
];

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded shadow transition z-50">
      {message}
    </div>
  );
}

function Modal({ open, onClose, campaign }: { open: boolean; onClose: () => void; campaign: any }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-lg p-8 shadow-lg min-w-[300px] max-w-[90vw]"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold mb-2">{campaign.campaign}</h3>
        <div className="space-y-1 text-sm">
          <div>Impressions: {campaign.impressions}</div>
          <div>Clicks: {campaign.clicks}</div>
          <div>Conversions: {campaign.conversions}</div>
          <div>CTR: {campaign.ctr}</div>
          <div>
            Status: <span className={`px-2 py-1 rounded ${statusColors[campaign.status]}`}>{campaign.status}</span>
          </div>
          <div>Date: {campaign.date}</div>
        </div>
        <button
          className="mt-4 px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([
    { campaign: "Spring Sale", impressions: 12000, clicks: 3200, conversions: 400, ctr: "26.7%", status: "Active", date: "2024-07-01" },
    { campaign: "Brand Awareness", impressions: 9000, clicks: 2100, conversions: 210, ctr: "23.3%", status: "Paused", date: "2024-07-05" },
    { campaign: "Retargeting", impressions: 7000, clicks: 1800, conversions: 180, ctr: "25.7%", status: "Completed", date: "2024-07-10" },
    { campaign: "Holiday Promo", impressions: 15000, clicks: 4000, conversions: 600, ctr: "26.7%", status: "Active", date: "2024-07-15" },
    { campaign: "Product Launch", impressions: 11000, clicks: 2900, conversions: 350, ctr: "26.4%", status: "Paused", date: "2024-07-20" },
    { campaign: "Summer Push", impressions: 8000, clicks: 2000, conversions: 220, ctr: "25.0%", status: "Completed", date: "2024-07-25" },
    { campaign: "Back to School", impressions: 9500, clicks: 2300, conversions: 300, ctr: "24.2%", status: "Active", date: "2024-08-01" },
    { campaign: "Winter Deals", impressions: 13000, clicks: 3500, conversions: 500, ctr: "26.9%", status: "Paused", date: "2024-08-05" },
    { campaign: "Flash Sale", impressions: 10500, clicks: 2700, conversions: 330, ctr: "25.7%", status: "Completed", date: "2024-08-10" },
    { campaign: "Anniversary", impressions: 12000, clicks: 3100, conversions: 410, ctr: "25.8%", status: "Active", date: "2024-08-15" },
    { campaign: "Referral Boost", impressions: 7000, clicks: 1600, conversions: 190, ctr: "22.9%", status: "Paused", date: "2024-08-20" },
    { campaign: "Autumn Launch", impressions: 11500, clicks: 2800, conversions: 360, ctr: "24.3%", status: "Completed", date: "2024-08-25" },
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filterCampaign, setFilterCampaign] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [showToast, setShowToast] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCampaign, setModalCampaign] = useState<any>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Simulate loading state for demo
  // useEffect(() => { setLoading(true); setTimeout(() => setLoading(false), 1200); }, []);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTableData(prev =>
        prev.map(row => ({
          ...row,
          impressions: row.impressions + Math.floor(Math.random() * 100),
          clicks: row.clicks + Math.floor(Math.random() * 10),
          conversions: row.conversions + Math.floor(Math.random() * 2),
        }))
      );
    }, 10000); // every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Advanced filter logic (date range)
  const filteredTableData = tableData.filter(row => {
    if (startDate && row.date < startDate) return false;
    if (endDate && row.date > endDate) return false;
    if (filterCampaign && !row.campaign.toLowerCase().includes(filterCampaign.toLowerCase())) return false;
    return true;
  });

  // Sorting
  const sortedTableData = [...filteredTableData].sort((a, b) => {
    const aValue = (a as Record<string, any>)[sortKey];
    const bValue = (b as Record<string, any>)[sortKey];
    if (sortDir === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const pageCount = Math.ceil(sortedTableData.length / pageSize);
  const pagedTableData = sortedTableData.slice(page * pageSize, (page + 1) * pageSize);

  // Chart tooltip (simple example)
  const [chartTooltip, setChartTooltip] = useState<string | null>(null);

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""} bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4 sm:p-8 font-sans`}>
    
      {showToast && <Toast message="CSV exported!" />}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} campaign={modalCampaign} />
      <header className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700 dark:text-cyan-300 drop-shadow-lg leading-tight mb-1">
            ADmyBRAND Insights
          </h1>
          <span className="text-zinc-500 dark:text-zinc-400 text-base font-medium">
            Analytics Dashboard for Digital Marketing Agencies
          </span>
        </div>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <AnimatePresence>
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: i * 0.08, duration: 0.5, type: "spring" }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px 0 rgba(99,102,241,0.12)",
              }}
            >
              <MetricCard {...m} />
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          ) : (
            <ChartPanel
              type="line"
              data={lineData}
              dataKey="month"
              valueKey="value"
              title="Monthly Revenue"
            />
          )}
          {chartTooltip && (
            <div className="absolute top-8 left-8 bg-white dark:bg-zinc-900 text-xs px-3 py-2 rounded shadow border border-zinc-200 dark:border-zinc-800">
              {chartTooltip}
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          ) : (
            <ChartPanel
              type="bar"
              data={barData}
              dataKey="channel"
              valueKey="value"
              title="Channel Performance"
            />
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          ) : (
            <ChartPanel
              type="pie"
              data={pieData}
              dataKey="name"
              nameKey="name"
              valueKey="value"
              colors={pieColors}
              title="Device Split"
            />
          )}
        </motion.div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-zinc-100 tracking-tight">
          Campaign Performance
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          ) : (
            <>
              {/* Advanced Filters */}
              <div className="flex gap-4 mb-4">
                {/* Animated Date Picker Button */}
                <motion.div
                  whileHover={{ scale: 1.04, boxShadow: "0 2px 8px rgba(99,102,241,0.12)" }}
                  whileFocus={{ scale: 1.04, boxShadow: "0 2px 8px rgba(99,102,241,0.15)" }}
                  className="flex flex-col w-32"
                >
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="px-2 py-1 border rounded-md bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-cyan-400 transition-all duration-200 shadow-sm"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04, boxShadow: "0 2px 8px rgba(99,102,241,0.12)" }}
                  whileFocus={{ scale: 1.04, boxShadow: "0 2px 8px rgba(99,102,241,0.15)" }}
                  className="flex flex-col w-32"
                >
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">End Date</label>
                  <input
                    type="date"
                    className="px-2 py-1 border rounded-md bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-cyan-400 transition-all duration-200 shadow-sm"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                  />
                </motion.div>
                {/* Animated Export Button */}
                <motion.button
                  whileHover={{
                    scale: 1.09,
                    backgroundColor: "#4f46e5",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.15)",
                    color: "#fff"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:from-indigo-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2 text-base"
                  onClick={() => {                   
                    const csvRows = [
                      tableColumns.map(col => col.header).join(","),
                      ...filteredTableData.map(row => tableColumns.map(col => (row as Record<string, any>)?.[col.accessorKey] ?? "").join(","))
                    ];
                    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
                    const link = document.createElement("a");
                    link.href = encodeURI(csvContent);
                    link.download = "campaign_performance.csv";
                    link.click();
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2000);
                  }}
                  aria-label="Export CSV"
                >
                  <span className="flex items-center gap-1">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block animate-bounce">
                      <path d="M4 14v2h10v-2M9 2v10m0 0l-3-3m3 3l3-3"/>
                    </svg>
                    <span className="drop-shadow">Export CSV</span>
                  </span>
                </motion.button>
              </div>
              {/* Table with sorting, pagination, row actions, status badges */}
              <div className="overflow-x-auto rounded-xl shadow border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                  <thead>
                    <tr>
                      {tableColumns.map(col => (
                        <th
                          key={col.accessorKey}
                          className="px-4 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase cursor-pointer select-none"
                          onClick={() => {
                            if (sortKey === col.accessorKey) {
                              setSortDir(sortDir === "asc" ? "desc" : "asc");
                            } else {
                              setSortKey(col.accessorKey);
                              setSortDir("asc");
                            }
                          }}
                          aria-sort={sortKey === col.accessorKey ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                        >
                          {col.header}
                          {sortKey === col.accessorKey ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
                        </th>
                      ))}
                      <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {pagedTableData.map((row, idx) => (
                      <tr
                        key={row.campaign + row.date}
                        className="transition-colors duration-150 hover:bg-indigo-50 dark:hover:bg-cyan-950 cursor-pointer"
                      >
                        {tableColumns.map(col => (
                          <td
                            key={col.accessorKey}
                            className="px-4 py-2 whitespace-nowrap text-zinc-700 dark:text-zinc-200"
                          >
                            {col.accessorKey === "status" ? (
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[row.status]}`}>
                                {row.status}
                              </span>
                            ) : col.accessorKey === "date" ? (
                              <span className="text-xs">{row.date}</span>
                            ) : (
                              (row as Record<string, any>)[col.accessorKey]
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-2 whitespace-nowrap">
                          <button
                            className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-semibold hover:bg-indigo-200 transition"
                            onClick={() => { setModalCampaign(row); setModalOpen(true); }}
                            aria-label={`View details for ${row.campaign}`}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination controls */}
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border-t border-zinc-100 dark:border-zinc-700">
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-xs"
                      onClick={() => setPage(0)}
                      disabled={page === 0}
                      aria-label="First page"
                    >{"<<"}</button>
                    <button
                      className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-xs"
                      onClick={() => setPage(p => Math.max(p - 1, 0))}
                      disabled={page === 0}
                      aria-label="Previous page"
                    >{"<"}</button>
                    <span className="text-xs text-zinc-500 dark:text-zinc-300">
                      Page {page + 1} of {pageCount}
                    </span>
                    <button
                      className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-xs"
                      onClick={() => setPage(p => Math.min(p + 1, pageCount - 1))}
                      disabled={page >= pageCount - 1}
                      aria-label="Next page"
                    >{">"}</button>
                    <button
                      className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-xs"
                      onClick={() => setPage(pageCount - 1)}
                      disabled={page >= pageCount - 1}
                      aria-label="Last page"
                    >{">>"}</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="pageSize" className="text-xs text-zinc-500 dark:text-zinc-300">Rows:</label>
                    <select
                      id="pageSize"
                      className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-xs"
                      value={pageSize}
                      onChange={e => { setPageSize(Number(e.target.value)); setPage(0); }}
                    >
                      {[5, 10, 20, 50].map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </section>

      <footer className="text-center text-xs text-zinc-400 py-6 tracking-wide">
        © {new Date().getFullYear()} ADmyBRAND Insights. All rights reserved.
      </footer>
    </div>
  );
}