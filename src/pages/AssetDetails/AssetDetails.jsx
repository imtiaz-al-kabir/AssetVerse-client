
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaArrowLeft, FaCheckCircle, FaStar, FaBox } from "react-icons/fa";
import Loading from "../../pages/Loading/Loading";

const AssetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: asset, isLoading } = useQuery({
        queryKey: ["asset", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets/${id}`); // Assuming this endpoint exists or will just return 404 if not
            // If the endpoint is single asset by ID, verify backend support.
            // If not supported, we might need to filter from list.
            // But usually details endpoint is /assets/:id
            return res.data;
        },
    });

    // Mock Related Items
    const relatedItems = [
        { id: 101, name: "Mechanical Keyboard", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800", type: "Returnable" },
        { id: 102, name: "Wireless Mouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800", type: "Non-returnable" },
        { id: 103, name: "Monitor Stand", image: "https://images.unsplash.com/photo-1595514020182-4299b158c67c?w=800", type: "Returnable" },
    ];

    if (isLoading) return <Loading />;
    if (!asset) return <div className="text-center py-20">Asset not found</div>;

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <button onClick={() => navigate(-1)} className="btn btn-ghost mb-6 gap-2">
                    <FaArrowLeft /> Back to List
                </button>

                <div className="grid lg:grid-cols-2 gap-12 bg-base-100 rounded-2xl shadow-xl p-8 mb-12">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <figure className="w-full h-96 rounded-xl overflow-hidden border border-base-300">
                            <img src={asset.productImage} alt={asset.productName} className="w-full h-full object-cover" />
                        </figure>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {/* Mock Gallery Thumbs */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-24 h-24 rounded-lg overflow-hidden border border-base-300 shrink-0 cursor-pointer hover:border-primary">
                                    <img src={asset.productImage} className="w-full h-full object-cover" alt="thumb" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-4xl font-bold">{asset.productName}</h1>
                            <span className={`badge badge-lg ${asset.productType === "Returnable" ? "badge-warning" : "badge-info"}`}>
                                {asset.productType}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </div>
                            <span className="text-sm opacity-60">(4.0 Reviews)</span>
                        </div>

                        <div className="divider"></div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between p-4 bg-base-200 rounded-lg">
                                <span className="font-semibold">Quantity Available:</span>
                                <span className="font-bold text-primary text-xl">{asset.availableQuantity} / {asset.productQuantity}</span>
                            </div>
                            <div className="flex justify-between p-4 bg-base-200 rounded-lg">
                                <span className="font-semibold">Date Added:</span>
                                <span>{new Date(asset.dateAdded).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between p-4 bg-base-200 rounded-lg">
                                <span className="font-semibold">Asset ID:</span>
                                <span className="font-mono text-sm opacity-70">{asset._id}</span>
                            </div>
                        </div>

                        <div className="prose max-w-none text-base-content/80 mb-8">
                            <h3 className="text-xl font-bold mb-2">Description</h3>
                            <p>
                                This high-quality {asset.productName} is designed for optimal performance in a corporate environment.
                                It comes with all necessary accessories and is ready for immediate assignment.
                                Durable, reliable, and compliant with company safety standards.
                            </p>
                        </div>

                        <button
                            className="btn btn-primary btn-lg w-full shadow-lg"
                            disabled={asset.availableQuantity === 0}
                        >
                            {asset.availableQuantity > 0 ? "Request This Asset" : "Out of Stock"}
                        </button>
                    </div>
                </div>

                {/* Related Items Section */}
                <div>
                    <h2 className="text-3xl font-bold mb-6">Related Items</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedItems.map((item) => (
                            <div key={item.id} className="card bg-base-100 shadow-md hover:shadow-xl transition-all border border-base-200">
                                <figure className="h-48 overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </figure>
                                <div className="card-body">
                                    <h3 className="card-title text-lg">{item.name}</h3>
                                    <div className="badge badge-outline">{item.type}</div>
                                    <button className="btn btn-outline btn-sm btn-primary mt-4">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetDetails;
