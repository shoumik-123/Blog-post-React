import { useState, useEffect, useRef } from "react";
import "../assets/css/blog.css";
import { useNavigate } from "react-router-dom";
import { getPosts, getSinglePost } from "../apiRequest/api"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";


const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const observerRef = useRef(null);

  
  // Function to retrieve click counts from localStorage
  const getStoredClickCounts = () => {
    const storedCounts = localStorage.getItem('clickCounts');
    return storedCounts ? JSON.parse(storedCounts) : {};
  };
  
  // Function to retrieve total clicks from localStorage
  const getStoredTotalClicks = () => {
    const storedTotalClicks = localStorage.getItem('totalClicks');
    return storedTotalClicks ? parseInt(storedTotalClicks, 10) : 0;
  };
  
  // Function to store click counts in localStorage
  const storeClickCounts = (clickCounts) => {
    localStorage.setItem('clickCounts', JSON.stringify(clickCounts));
  };
  
  // Function to store total clicks in localStorage
  const storeTotalClicks = (totalClicks) => {
    localStorage.setItem('totalClicks', totalClicks.toString())
  };

  const [clickCounts, setClickCounts] = useState(getStoredClickCounts()); 
  const [totalClicks, setTotalClicks] = useState(getStoredTotalClicks()); 

  const handleReadMore = async (id) => {
    try {

      const newClickCounts = {
        ...clickCounts,
        [id]: (clickCounts[id] || 0) + 1,
      };
      setClickCounts(newClickCounts);
      storeClickCounts(newClickCounts);


      // Calculate the new total clicks
      const newTotalClicks = Object.values(newClickCounts).reduce((total, count) => total + count, 0);
      setTotalClicks(newTotalClicks); 
      storeTotalClicks(newTotalClicks);

      const blogData = await getSinglePost(id); 
      navigate(`/details/${id}`, { state: { blog: blogData } }); 
      window.location.reload()
    } catch (error) {
      alert("Blog post not found.", error);
    }
  };

  // Function to fetch blogs from API
  const fetchBlogs = async (page) => {
    setLoading(true);
    try {
      const data = await getPosts();
      const paginatedData = data.slice((page - 1) * 6, page * 6);
      setBlogs((prevBlogs) => [...prevBlogs, ...paginatedData]);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // IntersectionObserver callback
  const handleObserver = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setPage((prevPage) => prevPage + 1); 
    }
  };

  useEffect(() => {
    fetchBlogs(page); 
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null, // Observe in the viewport
      rootMargin: "0px",
      threshold: 1.0, // Trigger when the target is fully visible
    });
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

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
              <img src={blog.image || "https://via.placeholder.com/150"} alt={blog.title} />
              <div className="counter-box">
                <i className="fas fa-eye"></i>
                <span className="count">{clickCounts[blog.id] || 0}</span>
              </div>
            </div>
            <div className="card-content">
              <div className="card-date">
                <p>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="calendar-icon"
                  />{" "}
                  {blog.publishedAt || "No date available"}
                </p>
                <p className="category">{blog.category || "Uncategorized"}</p>
              </div>
              <h3>{blog.title || "No title available"}</h3>
              <p className="teaser">
                {blog.body ? blog.body.slice(0, 200) : "No content available"}...
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
            Loading more posts...
          </p>
        )}
        {/* The observer target */}
        <div ref={observerRef} style={{ height: "1px" }}></div>
      </div>
    </div>
  );
};

export default Blog;
