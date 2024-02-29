import axios from 'axios';


const PostAPI = {
  getAllPosts: () => {
    return axios.get(
      `http://localhost:3001/posts/`,
      {}
    );
  },

  deletePost: (id: number) => {
    return axios.delete(
      `http://localhost:3001/posts/deletePost/${id}`,
      {}
    );
  },

};

export default PostAPI;
