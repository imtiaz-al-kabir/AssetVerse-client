import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const fetchEmployees = async () => {
    try {
      const res = await axiosSecure.get("/employees/my-team");

      setEmployees(res.data);
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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This employee will be removed from your team!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/employees/${id}`);

        if (res.status === 200) {
          Swal.fire("Removed!", "Employee has been removed.", "success");
          fetchEmployees();
        } else {
          Swal.fire("Error", "Failed to remove employee", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">My Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((member) => (
          <div
            key={member._id}
            className="card bg-base-100 shadow-xl border border-base-200"
          >
            <div className="card-body items-center text-center">
              <div className="avatar placeholder mb-2">
                <div className="bg-neutral text-neutral-content rounded-full w-16">
                  <span className="text-xl">
                    {member.employeeName.charAt(0)}
                  </span>
                </div>
              </div>
              <h2 className="card-title">{member.employeeName}</h2>
              <p className="text-sm text-gray-500">{member.employeeEmail}</p>
              <div className="card-actions mt-4">
                <button
                  onClick={() => handleRemove(member._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Remove from Team
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {employees.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <p>No employees in your team yet.</p>
          <p className="text-sm">
            Employees will appear here once you approve their asset requests.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyEmployeeList;
