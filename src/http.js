import axios from "axios";

export default axios.create({
//  baseURL: "http://localhost:1337",
baseURL: "https://sheltered-basin-12699.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});
