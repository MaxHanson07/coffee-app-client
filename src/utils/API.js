import axios from "axios";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
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
      process.env.REACT_APP_SERVER_URL + "/api/cafes/like/" + id,
      data
    );
  },
  getAllCafes: function () {
    return axios.get(process.env.REACT_APP_SERVER_URL + "/api/cafes");
  },
  likeCafe: function (cafe_id, user_id) {
    return axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/users/cafes/" + cafe_id,
      user_id
    );
  },
  checkIn: function (cafe_id, data) {
    return axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/users/checkin/" + cafe_id,
      data
    );
  },
};
