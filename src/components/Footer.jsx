import "../assets/css/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <h3>Follow the latest trends</h3>
          <p>With our daily newsletter</p>
          <div className="input-group">
            <input type="email" placeholder="you@example.com" />
            <button type="submit">Submit</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;