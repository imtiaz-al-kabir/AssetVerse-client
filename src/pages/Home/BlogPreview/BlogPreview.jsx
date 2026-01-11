import { FaArrowRight, FaCalendar, FaUser } from "react-icons/fa";
import { Link } from "react-router";

const BlogPreview = () => {

    const blogs = [
        {
            id: 1,
            title: "5 Tips for Better Asset Tracking",
            excerpt: "Learn how to optimize your inventory management with these simple strategies.",
            date: "Jan 10, 2025",
            author: "Sarah Smith",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            title: "Why Employee Accountability Matters",
            excerpt: "Discover the impact of proper asset assignment on company culture and cost.",
            date: "Jan 05, 2025",
            author: "John Doe",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            title: "The Future of Digital Inventories",
            excerpt: "Explore the upcoming trends in asset management technology and AI.",
            date: "Dec 28, 2024",
            author: "Mike Johnson",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">Latest Insights</h2>
                        <p className="text-base-content/70">Trends, tips, and news from our team.</p>
                    </div>
                    <Link to="/blog" className="btn btn-outline btn-primary">
                        View All Posts
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-shadow duration-300">
                            <figure className="h-48 overflow-hidden">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                            </figure>
                            <div className="card-body">
                                <div className="flex items-center gap-4 text-xs text-base-content/60 mb-2">
                                    <span className="flex items-center gap-1"><FaCalendar /> {blog.date}</span>
                                    <span className="flex items-center gap-1"><FaUser /> {blog.author}</span>
                                </div>
                                <h3 className="card-title text-xl mb-2">{blog.title}</h3>
                                <p className="text-base-content/70 text-sm mb-4">{blog.excerpt}</p>
                                <div className="card-actions justify-end">
                                    <Link to="/blog" className="btn btn-link btn-sm px-0 no-underline hover:text-primary transition-colors flex items-center gap-2">
                                        Read More <FaArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default BlogPreview;
