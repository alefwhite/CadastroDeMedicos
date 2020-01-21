import Axios from "axios";

const api = Axios.create({
    baseURL : "http://localhost:3333",
    headers : {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"*",
        "Authorization" : "Bearer " + localStorage.getItem("usuario")
    }
});

export default api;