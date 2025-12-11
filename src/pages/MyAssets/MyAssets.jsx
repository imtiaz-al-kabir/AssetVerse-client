import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const MyAssets = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const axiosSecure = useAxiosSecure();

  const fetchAssets = async () => {
    try {
      let query = `/assigned-assets?page=${page}&limit=${limit}`;

      if (search) query += `&search=${search}`;
      if (filterType) query += `&type=${filterType}`;

      const res = await axiosSecure.get(query);

      setAssets(res.data.assets || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [search, filterType, page]);

  const handlePrint = () => {
    window.print();
  };

  const handleReturn = async (assetId) => {
    try {
      const result = await Swal.fire({
        title: "Return Asset?",
        text: "This will send a return request to HR.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, return it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.post("/requests", {
          assetId: assetId,
          requestType: "Return",
          note: "Returning asset",
        });

        if (res.status === 201 || res.status === 200) {
          Swal.fire("Requested!", "Return request sent to HR.", "success");
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to send request",
        "error"
      );
    }
  };

  return (
    <div className="container mx-auto py-10">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Assets</h2>
        <button onClick={handlePrint} className="btn btn-outline">
          Print List
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search my assets..."
          className="input input-bordered focus-within:outline-0 w-full max-w-xs"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          className="select select-bordered w-full max-w-xs focus-within:outline-0"
          value={filterType}
          onChange={(e) => {
            setPage(1);
            setFilterType(e.target.value);
          }}
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Item</th>
                <th>Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Assigned Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {assets.map((asset) => (
                <tr key={asset._id}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            asset.productImage ||
                            asset.assetImage ||
                            "https://via.placeholder.com/150"
                          }
                          alt={asset.productName}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="font-bold">
                    {asset.productName || asset.assetName}
                  </td>

                  <td>{asset.productType || asset.assetType}</td>
                  <td>{asset.companyName || "N/A"}</td>
                  <td>
                    {new Date(
                      asset.dateAdded || Date.now()
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <span className="badge badge-success">Assigned</span>
                  </td>

                  <td>
                    {(asset.productType === "Returnable" ||
                      asset.assetType === "Returnable") && (
                      <button
                        onClick={() => handleReturn(asset.assetId)}
                        className="btn btn-xs btn-warning"
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {assets.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No assets assigned yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}

          <div className="flex justify-center mt-6 gap-4">
            <button
              className="btn btn-outline btn-sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <div className="join">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setPage(index + 1)}
                  className={`join-item btn btn-sm ${
                    page === index + 1 ? "btn-active bg-blue-700" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              className="btn btn-outline btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAssets;
