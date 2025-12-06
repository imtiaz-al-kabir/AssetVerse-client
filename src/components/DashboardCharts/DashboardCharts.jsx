import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const DashboardCharts = () => {
    const [stats, setStats] = useState({ pieData: [], barData: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/stats/hr');
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const COLORS = ['#0088FE', '#FFBB28']; // Blue for Returnable, Yellow for Non-Returnable

    if (loading) return <div>Loading charts...</div>;

    // Check if empty
    if (stats.pieData[0]?.value === 0 && stats.pieData[1]?.value === 0) {
        return <div className="text-gray-500 italic">Add assets to see analytics.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Pie Chart */}
            <div className="bg-base-100 p-4 rounded-lg shadow h-[400px]">
                <h3 className="text-lg font-bold text-center mb-4">Inventory Distribution</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                        <Pie
                            data={stats.pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {stats.pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-base-100 p-4 rounded-lg shadow h-[400px]">
                <h3 className="text-lg font-bold text-center mb-4">Top 5 Requested Items</h3>
                {stats.barData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={stats.barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="requests" fill="#82ca9d" name="Requests" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex justify-center items-center h-full text-gray-400">No requests yet</div>
                )}
            </div>
        </div>
    );
};

export default DashboardCharts;
