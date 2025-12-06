import React, { useEffect, useState } from 'react';

const MyEmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            const res = await fetch('/api/employees/my-team'); // Using new route
            const data = await res.json();
            setEmployees(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleRemove = async (id) => {
        if (window.confirm('Are you sure you want to remove this employee from your team?')) {
            try {
                const res = await fetch(`/api/employees/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    fetchEmployees();
                } else {
                    alert('Failed to remove employee');
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) return <div className="text-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">My Team</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((member) => (
                    <div key={member._id} className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body items-center text-center">
                            <div className="avatar placeholder mb-2">
                                <div className="bg-neutral text-neutral-content rounded-full w-16">
                                    <span className="text-xl">{member.employeeName.charAt(0)}</span>
                                </div>
                            </div>
                            <h2 className="card-title">{member.employeeName}</h2>
                            <p className="text-sm text-gray-500">{member.employeeEmail}</p>
                            <div className="card-actions mt-4">
                                <button onClick={() => handleRemove(member._id)} className="btn btn-sm btn-outline btn-error">Remove from Team</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {employees.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    <p>No employees in your team yet.</p>
                    <p className="text-sm">Employees will appear here once you approve their asset requests.</p>
                </div>
            )}
        </div>
    );
};

export default MyEmployeeList;
