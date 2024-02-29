import axios from 'axios';


const CommentAPI = {
    getAllComments: () => {
        return axios.get(
            `http://localhost:3001/comments/`,
            {}
        );
    },
    getAllCommentsByPost: (postId: number) => {
        return axios.get(
            `http://localhost:3001/comments/post/${postId}`,
            {}
        );
    },
    editCommentById: (id: number, newComment: string) => {
        return axios.put(
            `http://localhost:3001/comments/editComment/${id}`,
            { newComment: newComment }
        );
    },

};

export default CommentAPI;
