import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Updated import
import Loading from "../../pages/Loading/Loading";

const DashboardCharts = () => {
  const [stats, setStats] = useState({ pieData: [], barData: [] });
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure(); // Updated hook

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get("/stats/hr"); // Removed explicit credentials options as they are often handled by interceptor or default
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  const COLORS = ["#0088FE", "#FFBB28"]; // Blue for Returnable, Yellow for Non-Returnable

  if (loading) return <Loading />;

  // Check if empty
  // Check if data is missing or empty (Fetch failure or empty state)
  if (!stats.pieData || stats.pieData.length === 0 || (stats.pieData[0]?.value === 0 && stats.pieData[1]?.value === 0 && stats.barData.length === 0)) {
    return (
      <div className="grid grid-cols-1 mb-10">
        <div className="alert shadow-lg bg-base-100 border-base-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>
            <h3 className="font-bold text-base-content">No Analytics Data Yet</h3>
            <div className="text-xs text-base-content/70">Start managing assets to see your inventory and request statistics here.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      {/* Pie Chart */}
      <div className="bg-base-100 p-4 rounded-lg shadow h-[400px]">
        <h3 className="text-lg font-bold text-center mb-4 text-base-content">
          Inventory Distribution
        </h3>
        {stats.pieData.reduce((acc, curr) => acc + curr.value, 0) > 0 ? (
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={stats.pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2A303C",
                  color: "#fff",
                  borderColor: "#4B5563",
                }}
              />
              <Legend wrapperStyle={{ color: "#A6ADBB" }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-full text-base-content/50">
            No Assets to Display
          </div>
        )}
      </div>

      {/* Bar Chart */}
      <div className="bg-base-100 p-4 rounded-lg shadow h-[400px]">
        <h3 className="text-lg font-bold text-center mb-4 text-base-content">
          Top 5 Requested Items
        </h3>
        {stats.barData.length > 0 ? (
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={stats.barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="name" stroke="#A6ADBB" />
              <YAxis allowDecimals={false} stroke="#A6ADBB" />
              <Tooltip contentStyle={{ backgroundColor: "#2A303C", color: "#fff", borderColor: "#4B5563" }} />
              <Bar dataKey="requests" fill="#82ca9d" name="Requests" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-full text-base-content/50">
            No requests yet
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCharts;
