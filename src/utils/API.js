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
  }
};
