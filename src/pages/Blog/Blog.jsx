import { Helmet } from "react-helmet-async";

const Blog = () => {
    const blogs = [
        {
            id: 1,
            title: "5 Tips for Better Asset Tracking",
            excerpt: "Learn how to optimize your inventory management with these simple strategies.",
            date: "Jan 10, 2025",
            author: "Sarah Smith",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "Management"
        },
        {
            id: 2,
            title: "Why Employee Accountability Matters",
            excerpt: "Discover the impact of proper asset assignment on company culture and cost.",
            date: "Jan 05, 2025",
            author: "John Doe",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "HR"
        },
        {
            id: 3,
            title: "The Future of Digital Inventories",
            excerpt: "Explore the upcoming trends in asset management technology and AI.",
            date: "Dec 28, 2024",
            author: "Mike Johnson",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "Tech"
        },
        {
            id: 4,
            title: "Reducing Overhead Costs",
            excerpt: "How automated tracking saves money in the long run.",
            date: "Dec 15, 2024",
            author: "Emily Davis",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "Finance"
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-base-200">
            <Helmet>
                <title>Blog | AssetVerse</title>
            </Helmet>

            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-2">Our Blog</h1>
                    <p className="text-base-content/70">Insights, news, and updates from the AssetVerse team.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-base-200 group">
                            <figure className="h-64 overflow-hidden">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </figure>
                            <div className="card-body">
                                <div className="flex justify-between items-center text-sm text-base-content/60 mb-2">
                                    <span className="badge badge-primary badge-outline">{blog.category}</span>
                                    <span>{blog.date}</span>
                                </div>
                                <h2 className="card-title text-2xl hover:text-primary transition-colors cursor-pointer">{blog.title}</h2>
                                <p className="text-base-content/70">{blog.excerpt}</p>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-primary btn-sm">Read Article</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
