import {
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  RECOVER_ENDPOINT,
  GETNOTES_ENDPOINT,
  FILTER_NOTES_ENDPOINT,
  UPDATE_NOTE_ENDPOINT,
  DELETE_NOTE_ENDPOINT
} from "../consts";

import axios from "axios";

const deleteNotesAPI = id => {
  const jwt = localStorage.getItem("acces_token");

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: DELETE_NOTE_ENDPOINT,
      data: { jwt: jwt, id }
    })
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        reject(e);
      });
  });
};

const updateNotesAPI = karteczka => {
  const jwt = localStorage.getItem("acces_token");
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: UPDATE_NOTE_ENDPOINT,
      data: { jwt: jwt, karteczka }
    })
      .then(response => {
        resolve(response.data.data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

const getNotesAPI = () => {
  const jwt = localStorage.getItem("acces_token");
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: GETNOTES_ENDPOINT,
      data: { jwt: jwt }
    })
      .then(response => {
        resolve(response.data.data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

const filterNotesAPI = search => {
  const jwt = localStorage.getItem("acces_token");
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: FILTER_NOTES_ENDPOINT,
      data: { jwt: jwt, search: search }
    })
      .then(response => {
        resolve(response.data.data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

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

const recoverAPI = (age, email) => {
  const data = { age: age, email: email };
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

const registerAPI = (age, password, email) => {
  const data = {
    age: age,
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

export {
  updateNotesAPI,
  filterNotesAPI,
  loginAPI,
  registerAPI,
  recoverAPI,
  getNotesAPI,
  deleteNotesAPI
};
