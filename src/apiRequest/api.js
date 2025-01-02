import axios from "axios";

export const getPosts = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.org/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getSinglePost = async (postId) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.org/posts/${postId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching single post:", error);
    throw error;
  }
};
