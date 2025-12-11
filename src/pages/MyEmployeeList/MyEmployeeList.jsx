import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaUsers, FaTrash, FaEnvelope, FaUserCircle } from "react-icons/fa";
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
          Swal.fire({
            icon: "success",
            title: "Removed!",
            text: "Employee has been removed from your team.",
            showConfirmButton: false,
            timer: 1500,
          });
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
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-base-100 to-accent/5 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2">
              My Team
            </h2>
            <p className="text-base-content/70">
              Manage your team members and their access
            </p>
          </div>

          {/* Employee Grid */}
          {employees.length === 0 ? (
            <div className="text-center py-20">
              <FaUsers className="text-6xl text-base-content/20 mx-auto mb-4" />
              <p className="text-lg text-base-content/60 mb-2">
                No employees in your team yet
              </p>
              <p className="text-sm text-base-content/50">
                Employees will appear here once you approve their asset requests
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {employees.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 hover:border-secondary/50 transition-all duration-300 overflow-hidden h-full">
                    {/* Gradient Header */}
                    <div className="bg-gradient-to-r from-secondary to-accent p-6 text-white text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                      <div className="relative">
                        <div className="avatar mb-3">
                          <div className="w-20 h-20 rounded-full ring ring-white ring-offset-2 ring-offset-transparent group-hover:scale-110 transition-transform">
                            {member.employeeImage ? (
                              <img
                                src={member.employeeImage}
                                alt={member.employeeName}
                              />
                            ) : (
                              <div className="w-full h-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-3xl font-bold">
                                  {member.employeeName.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-center">
                        {member.employeeName}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-sm text-base-content/60 mb-4">
                        <FaEnvelope className="text-secondary" />
                        <p className="truncate">{member.employeeEmail}</p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(member._id)}
                        className="btn btn-error btn-sm w-full gap-2 hover:scale-105 transition-transform"
                      >
                        <FaTrash />
                        Remove from Team
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Stats Card */}
          {employees.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-2xl p-6 border border-secondary/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaUsers className="text-3xl text-secondary" />
                  <div>
                    <h3 className="text-xl font-bold">Total Team Members</h3>
                    <p className="text-sm text-base-content/60">
                      Active employees in your organization
                    </p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-secondary">
                  {employees.length}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyEmployeeList;
