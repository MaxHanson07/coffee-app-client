import axios from "axios";

export default {
  createRequest: function (cafeData) {
    return axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/requests",
      cafeData
    );
  },
  getAllCafes: function () {
    return axios.get(process.env.REACT_APP_SERVER_URL + "/api/cafes");
  },
};
