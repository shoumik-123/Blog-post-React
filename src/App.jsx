import "./App.css";
import Blog from "./components/Blog";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogDetails from "./components/BlogDetails";
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/details/:id" element={<BlogDetails />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
