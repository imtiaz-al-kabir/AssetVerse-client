import React, { useEffect, useState } from 'react';

const MyAssets = () => {
    const [assets, setAssets] = useState([]);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchAssets = async () => {
        try {
            let query = '/api/assigned-assets?';
            if (search) query += `search=${search}&`;
            if (filterType) query += `type=${filterType}&`;

            const res = await fetch(query);
            const data = await res.json();
            setAssets(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssets();
    }, [search, filterType]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Assets</h2>
                <button onClick={handlePrint} className="btn btn-outline">Print List</button>
            </div>

            {/* Filter Controls */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search my assets..."
                    className="input input-bordered w-full max-w-xs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                </select>
            </div>

            {loading ? <span className="loading loading-spinner loading-lg"></span> : (
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
                                                <img src={asset.assetImage || "https://via.placeholder.com/150"} alt={asset.assetName} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-bold">{asset.assetName}</td>
                                    <td>{asset.assetType}</td>
                                    <td>{asset.companyName}</td>
                                    <td>{new Date(asset.assignmentDate).toLocaleDateString()}</td>
                                    <td><span className="badge badge-success">Assigned</span></td>
                                    <td>
                                        {asset.assetType === 'Returnable' && (
                                            <button className="btn btn-xs btn-warning" disabled>Return (Contact HR)</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {assets.length === 0 && <tr><td colSpan="7" className="text-center">No assets assigned yet.</td></tr>}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyAssets;
