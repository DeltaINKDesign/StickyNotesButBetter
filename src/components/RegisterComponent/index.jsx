import React from "react";
import style from "./style.less";
import { Link } from "react-router-dom";
import { registerAPI } from "../../Api/index";

export default class RegisterPage extends React.Component {
  state = {
    login: "",
    email: "",
    password: ""
  };

  handleRegistrationAttempt() {
    const { login, password, email } = this.state;
    registerAPI(login,password,email);
  }

  handleInputChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  handleRedirection = e => {
    e.preventDefault();
  };

  render() {
    return (
    <form onSubmit={this.handleRedirection}>
        <div className={style.inputContainer}>
          <input
            type="text"
            name="login"
            className={style.inputBox}
            placeholder="login"
            onChange={e => this.handleInputChange(e)}
          />
          <input
            type="password"
            name="password"
            className={style.inputBox}
            placeholder="hasło"
            onChange={e => this.handleInputChange(e)}
          />
          <input
            name="email"
            type="email"
            className={style.inputBox}
            placeholder="mail"
            onChange={e => this.handleInputChange(e)}
          />
          <ul className={style.buttonList}>
            <li>
              <Link to="/login">
                <button 
                className={style.button}>Wróć?</button>
              </Link>
            </li>
            <li>
              <button
                className={style.highlightedButton}
                onClick={e => this.handleRegistrationAttempt()}
              >
                Zarejestruj
              </button>
            </li>
          </ul>
        </div>
      </form>
    );
  }
}
