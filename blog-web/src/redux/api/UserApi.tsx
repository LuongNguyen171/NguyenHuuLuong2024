import axios from 'axios';


const userAPI = {
    login: (username: string, password: string) => {
        return axios.post(
            `http://localhost:3001/users/login`,
            {
                username: username,
                password: password
            }
        );
    },

};

export default userAPI;
