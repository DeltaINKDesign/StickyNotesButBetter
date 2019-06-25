import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../consts";
import axios from "axios";

const loginAPI = async (login, passw) => {
  const data = {
    email: login,
    password: passw
  };
  try {
    let response = await axios.post(LOGIN_ENDPOINT, data);
    if (
      response.status === 200 &&
      response.data.jwt &&
      response.data.expireAt
    ) {
      let jwt = response.data.jwt;
      let expire_at = response.data.expireAt;

      localStorage.setItem("acces_token", jwt);
      localStorage.setItem("expire_at", expire_at);
      return "succes";
    }
    return "failure";
  } catch (e) {
    console.log("error:" + e);
  }
};

const registerAPI = async (login, password, email) => {
  try {
    const data = {
      login: login,
      password: password,
      email: email
    };
    let response = await axios({
      method: "post",
      responseType: "json",
      url: REGISTER_ENDPOINT,
      data: data
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export { loginAPI, registerAPI };
