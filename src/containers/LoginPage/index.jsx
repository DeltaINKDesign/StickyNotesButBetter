import React from "react";
import style from "./style.less";
import classnames from "classnames";
import { Link, Redirect } from "react-router-dom";
import { loginAPI, registerAPI, recoverAPI } from "../../Api/index";

export default class LoginPage extends React.Component {
  state = {
    age: "",
    password: "",
    email: "",
    ageTooShort: false,
    passwordTooShort: false,
    emailTooShort: false,
    ageError: false,
    newPassword: "",
    goFurther: false
  };

  handleRedirection = e => {
    e.preventDefault();
  };

  handleInputChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  checkForErrors(type) {
    const { age, password, email } = this.state;
    let ageError = false,
      passwordError = false,
      emailError = false;
    if (age === "" && type === "register") {
      ageError = true;
    }
    if (email.length < 5) {
      emailError = true;
    }
    if (password.length < 5 && type !== "recover") {
      passwordError = true;
    }
    if (type === "register" && email.length < 5 && email.search("@")) {
      emailError = true;
    }

    this.setState({
      ageError: ageError,
      passwordTooShort: passwordError,
      emailTooShort: emailError
    });
    if (!ageError && !passwordError && !emailError) {
      return false;
    }
    return true;
  }

  async handleSubmit(type) {
    const { age, password, email } = this.state;
    let areErrors = this.checkForErrors(type);
    if (!areErrors) {
      try {
        if (type === "login") {
          await loginAPI(email, password);
          this.setState({ goFurther: true });
        } else if (type === "register") {
          await registerAPI(age, password, email);
          await loginAPI(email, password);
          this.setState({ goFurther: true });
        } else if (type === "recover") {
          let recoveredPassword = await recoverAPI(age, email);
          this.setState({ newPassword: recoveredPassword.data.password });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    const { pathname } = this.props.location;
    const isLoginPage = pathname === "/login";
    const isSigninPage = pathname === "/signin";
    const isRecoverPage = pathname === "/login/recoverpassword";
    const {
      goFurther,
      ageError,
      passwordTooShort,
      emailTooShort,
      newPassword
    } = this.state;
    return (
      <div className={style.box}>
        {pathname === "/" && !goFurther ? <Redirect to="/login" /> : null}
        {goFurther ? <Redirect to="/loginsucces" /> : null}
        <form onSubmit={this.handleRedirection}>
          <div className={style.inputContainer}>
            {isSigninPage || isRecoverPage ? (
              <>
                <input
                  type="number"
                  name="age"
                  className={style.inputBox}
                  placeholder="age"
                  onChange={e => this.handleInputChange(e)}
                />
                <label
                  className={classnames(
                    ageError ? style.errorLabel : style.errorLabel__hidden
                  )}
                >
                  Podaj prawidłowy wiek.
                </label>
              </>
            ) : null}
            <input
              name="email"
              type="email"
              className={style.inputBox}
              placeholder="mail"
              onChange={e => this.handleInputChange(e)}
            />
            <label
              className={classnames(
                emailTooShort ? style.errorLabel : style.errorLabel__hidden
              )}
            >
              Podaj poprawny email
            </label>
            {!isRecoverPage ? (
              <>
                <input
                  type="password"
                  name="password"
                  className={style.inputBox}
                  placeholder="password"
                  onChange={e => this.handleInputChange(e)}
                />
                <label
                  className={classnames(
                    passwordTooShort
                      ? style.errorLabel
                      : style.errorLabel__hidden
                  )}
                >
                  Podaj haslo ktore ma wiecej jak 5 znakow
                </label>
              </>
            ) : null}
            {isLoginPage ? (
              <h2 className={style.przypominajka}>
                <Link to="/login/recoverpassword">Zapomniałeś hasła?</Link>
              </h2>
            ) : null}
            {isLoginPage ? (
              <ul className={style.buttonList}>
                <li>
                  <button
                    className={style.highlightedButton}
                    onClick={() => this.handleSubmit("login")}
                  >
                    Zaloguj
                  </button>
                </li>
                <li>
                  <Link to="/signin">
                    <button
                      onClick={() => {
                        this.setState({
                          ageError: false,
                          passwordTooShort: false,
                          emailTooShort: false
                        });
                      }}
                      className={style.button}
                    >
                      Nie masz konta?
                    </button>
                  </Link>
                </li>
              </ul>
            ) : (
              <>
                <ul className={style.buttonList}>
                  <li>
                    <button
                      className={style.highlightedButton}
                      onClick={e => {
                        !isRecoverPage
                          ? this.handleSubmit("register")
                          : this.handleSubmit("recover");
                      }}
                    >
                      {!isRecoverPage ? "Zarejestruj" : "Pokaż hasło"}
                    </button>
                  </li>
                  <li>
                    <Link to="/login">
                      <button
                        onClick={() => {
                          this.setState({
                            ageError: false,
                            passwordTooShort: false,
                            emailTooShort: false
                          });
                        }}
                        className={style.button}
                      >
                        Wróć?
                      </button>
                    </Link>
                  </li>
                </ul>

                {newPassword.length > 0 ? (
                  <label className={style.passwordLabel}>
                    Twoje nowe hasło to: <b>{newPassword}</b>
                  </label>
                ) : null}
              </>
            )}
          </div>
        </form>
      </div>
    );
  }
}
