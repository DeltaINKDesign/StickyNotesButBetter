import React from "react";
import style from "./style.less";
import axios from "axios";

class App extends React.Component {
  state = {
    login: "",
    password: ""
  };

  handleFormSubmit = e => {
    const { login, password } = this.state;
    e.preventDefault();
    axios({
      metod: "post",
      url: "http://localhost/backend/",
      data: {
        login: login,
        password: password
      }
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className={style.background} />
        <div className={style.container}>
          <h1 className={style.logo}>Sticky Notes</h1>
          <form action="/login.php">
            <div className={style.box}>
              <input
                type="text"
                name="login"
                placeholder="login"
                onChange={e => this.setState({ login: e.target.value })}
              />
              <input
                type="password"
                name="password"
                placeholder="hasło"
                onChange={e => this.setState({ password: e.target.value })}
              />
              <h2>
                <a href="#">Zapomniałeś hasła?</a>
              </h2>
              <ul className={style.box__buttonList}>
                <li>
                  <button className={style.button}>Nie masz konta?</button>
                </li>
                <li>
                  <button
                    className={style.highlightedButton}
                    onClick={e => this.handleFormSubmit(e)}
                  >
                    Zaloguj
                  </button>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default App;
