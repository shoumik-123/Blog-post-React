import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/blogDetails.css";
import Review from "./Review";

const BlogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  // Navigate back to the home page if no blog data is passed
  useEffect(() => {
    if (!blog) {
      navigate("/");
    }
  }, [blog, navigate]);

  if (!blog) {
    return null; // Render nothing while navigating away
  }

  return (
    <div className="blog-details-container">
      <div className="blog-details-content">
        <img
          src={blog.imgUrl}
          alt={blog.title}
          className="blog-details-image"
        />
        <div className="blog-details-info">
          <div className="blog-details-header">
            <div>
            <h1>{blog.title}</h1>
            <p className="blog-details-meta">
               {blog.date} 
            </p>
            </div>
            <span className="category">{blog.category}</span>
          </div>
          <p className="blog-details-teaser">{blog.teaser}</p>
        </div>
      </div>
      
      <Review/>
    </div>
  );
};

export default BlogDetails;