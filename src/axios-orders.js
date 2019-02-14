import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-react-5f49e.firebaseio.com/"
});

export default instance;