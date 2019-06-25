import React from "react";
import style from "./style.less";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { loginAPI, registerAPI } from "../../Api/index";

export default class LoginPage extends React.Component {
  state = {
    login: "",
    password: "",
    email: "",
    loginTooShort: false,
    passwordTooShort: false,
    emailTooShort: false,
    loginError: false
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
    const { login, password, email } = this.state;
    let loginError, passwordError, emailError;
    if (login.length < 5) {
      loginError = true;
    }
    if (password.length < 5) {
      passwordError = true;
    }
    if (type === "register" && email.length < 5) {
      emailError = true;
    }

    this.setState({
      loginTooShort: loginError,
      passwordTooShort: passwordError,
      emailTooShort: emailError
    });
    if (!loginError && !passwordError && !emailError) {
      return false;
    }
    return true;
  }

  handleSubmit(type) {
    const { login, password, email } = this.state;
    let response;
    let areErrors = this.checkForErrors(type);
    console.log(areErrors);
    if (!areErrors) {
      if (type === "login") {
        response = loginAPI(login, password);
      } else if (type === "register") {
        response = registerAPI(login, password, email);
      }
      console.log(response);
      // response === "succes" ? this.setState({ goFurther: true }) : null;
    }
  }

  handleRegistrationAttempt(e) {
    let areErrors = this.checkForErrors("register");
  }

  render() {
    const { pathname } = this.props.location;
    const isLoginPage = pathname === "/login";
    const isSigninPage = pathname === "/signin";
    const {
      goFurther,
      loginTooShort,
      passwordTooShort,
      emailTooShort
    } = this.state;
    return (
      <div className={style.box}>
        {goFurther ? <Redirect to="/home" /> : null}
        <form onSubmit={this.handleRedirection}>
          <div className={style.inputContainer}>
            {isSigninPage ? (
              <>
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
              </>
            ) : null}
            <input
              type="text"
              name="login"
              className={style.inputBox}
              placeholder="login"
              onChange={e => this.handleInputChange(e)}
            />
            <label
              className={classnames(
                loginTooShort ? style.errorLabel : style.errorLabel__hidden
              )}
            >
              Podaj login który ma więcej jak 5 znaków.
            </label>
            <input
              type="password"
              name="password"
              className={style.inputBox}
              placeholder="password"
              onChange={e => this.handleInputChange(e)}
            />
            <label
              className={classnames(
                passwordTooShort ? style.errorLabel : style.errorLabel__hidden
              )}
            >
              Podaj haslo ktore ma wiecej jak 5 znakow
            </label>
            {isLoginPage ? (
              <h2 className={style.przypominajka}>
                <Link to="#">Zapomniałeś hasła?</Link>
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
                    <button className={style.button}>Nie masz konta?</button>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className={style.buttonList}>
                <li>
                  <button
                    className={style.highlightedButton}
                    onClick={e => this.handleSubmit("register")}
                  >
                    Zarejestruj
                  </button>
                </li>
                <li>
                  <Link to="/login">
                    <button className={style.button}>Wróć?</button>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </form>
      </div>
    );
  }
}

// const LoginFormContent = () => (
//   <>
//     <input
//       type="password"
//       name="password"
//       className={classnames(
//         style.inputBox,
//         noPasswordEntered ? style.isError : null
//       )}
//       placeholder={noPasswordEntered ? "enter password" : "password"}
//       onChange={e => this.handleInputChange(e)}
//     />
//     <h2 className={style.przypominajka}>
//       <Link to="#">Zapomniałeś hasła?</Link>
//     </h2>
//     <ul className={style.buttonList}>
//       <li>
//         <button
//           className={style.highlightedButton}
//           onClick={e => this.handleLoginAttempt(e)}
//         >
//           Zaloguj
//         </button>
//       </li>
//       <li>
//         <Link to="/signin">
//           <button className={style.button}>Nie masz konta?</button>
//         </Link>
//       </li>
//     </ul>
//   </>
// );

// const RegisterFormContent = () => (
//   <div className={style.inputContainer}>
//     <input
//       type="text"
//       name="login"
//       className={style.inputBox}
//       placeholder="login"
//       onChange={e => this.handleInputChange(e)}
//     />
//     <input
//       type="password"
//       name="password"
//       className={style.inputBox}
//       placeholder="hasło"
//       onChange={e => this.handleInputChange(e)}
//     />
//     <input
//       name="email"
//       type="email"
//       className={style.inputBox}
//       placeholder="mail"
//       onChange={e => this.handleInputChange(e)}
//     />
//     <ul className={style.buttonList}>
//       <li>
//         <Link to="/login">
//           <button className={style.button}>Wróć?</button>
//         </Link>
//       </li>
//       <li>
//         <button
//           className={style.highlightedButton}
//           onClick={e => this.handleRegistrationAttempt()}
//         >
//           Zarejestruj
//         </button>
//       </li>
//     </ul>
//   </div>
// );
