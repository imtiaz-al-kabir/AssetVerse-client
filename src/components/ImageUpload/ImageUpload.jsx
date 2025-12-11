import { useState } from "react";
import axios from "axios";

const ImageUpload = ({ label, onUpload, defaultUrl }) => {
    const [imageUrl, setImageUrl] = useState(defaultUrl || "");
    const [loading, setLoading] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                formData
            );

            if (res.data.success) {
                const url = res.data.data.display_url;
                setImageUrl(url);
                onUpload(url);
            }
        } catch (error) {
            console.error("Image upload failed:", error);
            alert("Image upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-control w-full mt-2">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                type="file"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
                accept="image/*"
                disabled={loading}
            />
            {loading && <p className="text-sm text-info mt-1">Uploading...</p>}
            {imageUrl && (
                <div className="mt-2">
                    <p className="text-xs mb-1">Preview:</p>
                    <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="w-20 h-20 object-cover rounded-lg border"
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
