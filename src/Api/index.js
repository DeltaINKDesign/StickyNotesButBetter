import { LOGIN_ENDPOINT, REGISTER_ENDPOINT, RECOVER_ENDPOINT } from "../consts";
import axios from "axios";

const getNotes = () => {};

const loginAPI = (login, passw) => {
  const data = {
    email: login,
    password: passw
  };
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: LOGIN_ENDPOINT,
      data: data
    })
      .then(response => {
        console.log(response);
        if (
          response.status === 200 &&
          response.data.jwt &&
          response.data.expireAt
        ) {
          let jwt = response.data.jwt;
          let expire_at = response.data.expireAt;

          localStorage.setItem("acces_token", jwt);
          localStorage.setItem("expire_at", expire_at);
          console.log(response);
          resolve(response);
        }
      })
      .catch(e => {
        reject(e);
      });
  });
};

const recoverAPI = (login, email) => {
  const data = { login: login, email: email };
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      responseType: "json",
      url: RECOVER_ENDPOINT,
      data: data
    })
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

const registerAPI = (login, password, email) => {
  const data = {
    login: login,
    password: password,
    email: email
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      responseType: "json",
      url: REGISTER_ENDPOINT,
      data: data
    })
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export { loginAPI, registerAPI, recoverAPI };
