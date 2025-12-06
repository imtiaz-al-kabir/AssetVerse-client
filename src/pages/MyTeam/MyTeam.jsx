import { useEffect, useState } from "react";

const MyTeam = () => {
  const [teamData, setTeamData] = useState([]); // List of employees
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [loading, setLoading] = useState(true);

  // Initial load: Get list of affiliated companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/employees/team-list"); // No param = get companies
        const data = await res.json();
        if (data.type === "companies") {
          setCompanies(data.data);
          if (data.data.length > 0) {
            setSelectedCompanyId(data.data[0].hrId); // Default select first
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // When company selected, fetch team
  useEffect(() => {
    const fetchTeam = async () => {
      if (!selectedCompanyId) return;
      try {
        const res = await fetch(
          `/api/employees/team-list?hrId=${selectedCompanyId}`
        );
        const data = await res.json();
        if (data.type === "team") {
          setTeamData(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeam();
  }, [selectedCompanyId]);

  const handleCompanyChange = (e) => {
    setSelectedCompanyId(e.target.value);
  };

  if (loading)
    return (
      <div className="text-center p-10">
        <span className="loading loading-spinner"></span>
      </div>
    );

  if (companies.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold">My Team</h2>
        <p className="mt-4 text-gray-500">
          You are not affiliated with any company yet.
        </p>
        <p>Request an asset to join a team!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Team</h2>
        {companies.length > 1 && (
          <select
            className="select select-bordered"
            value={selectedCompanyId}
            onChange={handleCompanyChange}
          >
            {companies.map((c) => (
              <option key={c.hrId} value={c.hrId}>
                {c.companyName}
              </option>
            ))}
          </select>
        )}
      </div>
      {companies.length === 1 && (
        <p className="mb-4 text-lg">
          Company: <span className="font-bold">{companies[0].companyName}</span>
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamData.map((member) => (
          <div
            key={member._id}
            className="card bg-base-100 shadow-md border hover:shadow-xl transition-all"
          >
            <div className="card-body items-center text-center">
              <div className="avatar placeholder mb-2">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  <span className="text-xl">
                    {member.employeeName.charAt(0)}
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-lg">{member.employeeName}</h3>
              <p className="text-sm text-gray-500">{member.employeeEmail}</p>
              {/* <div className="badge badge-ghost mt-2">Developer</div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeam;
