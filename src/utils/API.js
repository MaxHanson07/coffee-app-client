import axios from "axios";

export default {
  createRequest: function (cafeData) {
    return axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/requests",
      cafeData
    );
  },
  login: function (tokenId) {
    return axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/users/oauth`,
      tokenId
    );
  },
  addLike: function (id, data) {
    return axios.put(
      process.env.REACT_APP_SERVER_URL + "/api/cafes/like/"
      + id, data
    );
  },
  getAllCafes: function () {
    return axios.get(process.env.REACT_APP_SERVER_URL + "/api/cafes");
  },
  likeCafe: function (cafeId, user_id) {
    return axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/users/cafes/" + cafeId,
      user_id
    );
  }
}
