import axios from "axios";

export default axios.create({
 //baseURL: "http://localhost:1337",
baseURL: "https://dra-nicadevs.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});
