import HomePage from "../components/pages/home";
import LoginPage from "../components/pages/login";

const publicRouters = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },

];

export { publicRouters };
