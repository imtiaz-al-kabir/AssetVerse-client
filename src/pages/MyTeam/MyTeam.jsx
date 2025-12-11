import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaUsers, FaBuilding, FaEnvelope, FaUserCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

// User Avatar Component with error handling
const UserAvatar = ({ imageUrl, name, size = "w-20 h-20" }) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(imageUrl);

  useEffect(() => {
    setImageSrc(imageUrl);
    setImageError(false);
  }, [imageUrl]);

  const shouldShowPlaceholder = !imageSrc || imageSrc.trim() === "" || imageError;

  return (
    <div className="avatar placeholder mb-3">
      <div className={`bg-white/20 backdrop-blur-sm text-white rounded-full ${size} ring ring-white ring-offset-2 ring-offset-transparent group-hover:scale-110 transition-transform`}>
        {shouldShowPlaceholder ? (
          <span className="text-3xl font-bold">
            {(name || "U").charAt(0).toUpperCase()}
          </span>
        ) : (
          <img
            src={imageSrc}
            alt={name || "User"}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </div>
    </div>
  );
};

const MyTeam = () => {
  const [teamData, setTeamData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axiosSecure.get("/employees/team-list");
        const data = res.data;

        if (data.type === "companies") {
          setCompanies(data.data);
          if (data.data.length > 0) {
            setSelectedCompanyId(data.data[0].hrId);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [axiosSecure]);

  useEffect(() => {
    const fetchTeam = async () => {
      if (!selectedCompanyId) return;

      try {
        const res = await axiosSecure.get(`/employees/team-list`, {
          params: { hrId: selectedCompanyId },
        });

        const data = res.data;
        if (data.type === "team") {
          setTeamData(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeam();
  }, [selectedCompanyId, axiosSecure]);

  const handleCompanyChange = (e) => {
    setSelectedCompanyId(e.target.value);
  };

  if (loading) return <Loading />;

  if (companies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-info/5 via-base-100 to-accent/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-12 bg-base-100 rounded-3xl shadow-2xl border border-base-300 max-w-md"
        >
          <FaUsers className="text-6xl text-base-content/20 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">No Team Yet</h2>
          <p className="text-base-content/70 mb-6">
            You are not affiliated with any company yet. Request an asset to join a team!
          </p>
          <button
            onClick={() => window.location.href = "/request-asset"}
            className="btn btn-primary"
          >
            Request Asset
          </button>
        </motion.div>
      </div>
    );
  }

  const selectedCompany = companies.find(c => c.hrId === selectedCompanyId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-info/5 via-base-100 to-accent/5 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-info to-accent bg-clip-text text-transparent mb-2">
                My Team
              </h2>
              <p className="text-base-content/70">Connect with your colleagues</p>
            </div>

            {companies.length > 1 && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaBuilding className="text-info" />
                    Select Company
                  </span>
                </label>
                <select
                  className="select select-bordered focus:outline-none focus:ring-2 focus:ring-info transition-all"
                  value={selectedCompanyId}
                  onChange={handleCompanyChange}
                >
                  {companies.map((c) => (
                    <option key={c.hrId} value={c.hrId}>
                      {c.companyName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Company Info Card */}
          {selectedCompany && (
            <div className="bg-gradient-to-r from-info/10 to-accent/10 rounded-2xl p-6 mb-8 border border-info/20">
              <div className="flex items-center gap-3">
                <FaBuilding className="text-3xl text-info" />
                <div>
                  <h3 className="text-xl font-bold">{selectedCompany.companyName}</h3>
                  <p className="text-sm text-base-content/60">{teamData.length} team members</p>
                </div>
              </div>
            </div>
          )}

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 hover:border-info/50 transition-all duration-300 overflow-hidden">
                  {/* Gradient Header */}
                  <div className="bg-gradient-to-r from-info to-accent p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                    <div className="relative">
                      <UserAvatar
                        imageUrl={member.employeeImage}
                        name={member.employeeName}
                        size="w-20 h-20"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">{member.employeeName}</h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-base-content/60">
                      <FaEnvelope className="text-info" />
                      <p className="truncate">{member.employeeEmail}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {teamData.length === 0 && (
            <div className="text-center py-12">
              <FaUserCircle className="text-6xl text-base-content/20 mx-auto mb-4" />
              <p className="text-lg text-base-content/60">No team members found</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyTeam;
