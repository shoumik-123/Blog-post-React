import { useState, useEffect } from "react";
import "../assets/css/blog.css";
import { useNavigate } from "react-router-dom";
import demoData from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Blog = () => {
  const navigate = useNavigate();
  const [blogsToShow, setBlogsToShow] = useState(4);
  const [loading, setLoading] = useState(false);

  const handleReadMore = (id) => {
    const blogData = demoData.find((blog) => blog.id === id);
    if (blogData) {
      navigate(`/details/${id}`, { state: { blog: blogData } });
    } else {
      alert("Blog post not found.");
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading &&
      blogsToShow < demoData.length
    ) {
      setLoading(true);
      setTimeout(() => {
        setBlogsToShow((prev) => Math.min(prev + 4, demoData.length));
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [blogsToShow, loading]);

  return (
    <div className="blog">
      <div className="search-div">
        <h1 className="placeholder-posts">Placeholder Posts</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>

      <div className="blogs">
        {demoData.slice(0, blogsToShow).map((blog) => (
          <div className="card" key={blog.id}>
            <div className="img-div">
              <img src={blog.imgUrl} alt={blog.title} />

              <div className="counter-box">
                <span className="icon">👁️</span>
                <span className="count">{blog.count}</span>
              </div>
            
            </div>
            <div className="card-content">
              <div className="card-date">
                <p>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="calendar-icon"
                  />{" "}
                  {blog.date}
                </p>
                <p className="category">{blog.category}</p>
              </div>
              <h3>{blog.title}</h3>
              <p className="teaser">
                {blog.teaser.slice(0, 200)}...
                <span
                  className="read-more"
                  onClick={() => handleReadMore(blog.id)}
                >
                  Read More
                </span>
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <p style={{ fontSize: "24px", fontWeight: 400 }}>
            More posts loading ...
          </p>
        )}
      </div>
    </div>
  );
};

export default Blog;
