import axios from "axios";

export default {
  createRequest: function (cafeData) {
    return axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/requests",
      cafeData
    );
  },
  addLike: function (id) {
    return axios.put(
      process.env.REACT_APP_SERVER_URL + "/api/cafes/like/"
      + id
      );
  },
  getAllCafes: function () {
    return axios.get(process.env.REACT_APP_SERVER_URL + "/api/cafes");
  }
}