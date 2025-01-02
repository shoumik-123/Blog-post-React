import { useState, useEffect } from "react";
import "../assets/css/blog.css";
import { useNavigate } from "react-router-dom";
import { getPosts , getSinglePost } from "../apiRequest/api"; // Import the getPosts function
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Blog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]); // State for holding fetched blogs
  const [error, setError] = useState(null); // State for handling any errors
  const [page, setPage] = useState(1); // For pagination control

  // Function to handle "Read More"
  const handleReadMore = async (id) => {
    try {
      const blogData = await getSinglePost(id);  // Fetch the single post data using the ID
      navigate(`/details/${id}`, { state: { blog: blogData } });  // Pass the blog data to the details page
    } catch (error) {
      alert("Blog post not found.", error);
    }
  };

  // Fetch blogs from the API
  const fetchBlogs = async (page) => {
    setLoading(true);
    try {
      const data = await getPosts(page); // Fetch data using the getPosts function
      setBlogs((prevBlogs) => [...prevBlogs, ...data]); // Append the new blogs to existing ones
      setLoading(false);
    } catch (err) {
      setError("Error fetching data", err);
      setLoading(false);
    }
  };

  // Handle scroll loading
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading
    ) {
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        fetchBlogs(newPage); // Fetch more blogs on reaching the bottom
        return newPage;
      });
    }
  };

  useEffect(() => {
    fetchBlogs(page); // Initial fetch of blogs when component mounts

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]); // Fetch data whenever the page number changes

  if (error) {
    return <p>{error}</p>; // Display error message if there is an issue fetching the data
  }

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
        {blogs.map((blog) => (
          <div className="card" key={blog.id}>
            <div className="img-div">
              <img src={blog.image} alt={blog.title} />
              <div className="counter-box">
                <span className="icon">👁️</span>
                <span className="count">{blog.userId}</span>
              </div>
            </div>
            <div className="card-content">
              <div className="card-date">
                <p>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="calendar-icon"
                  />{" "}
                  {blog.publishedAt}
                </p>
                <p className="category">{blog.category}</p>
              </div>
              <h3>{blog.title}</h3>
              <p className="teaser">
                {blog.content.slice(0, 200)}...
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
