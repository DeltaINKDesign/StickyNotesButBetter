import React from "react";
import style from "./style.less";

export default class Note extends React.Component {
  componentDidMount() {
    const { note } = this.props;

    this.setState({
      name: note.name,
      description: note.description,
      color: note.color,
      id: note.id
    });
  }

  handleInputChange = e => {
    const { aktualizuj } = this.props;
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    this.timeout = setTimeout(() => {
      const ActualNote = {
        name: this.state.name,
        description: this.state.description,
        color: this.state.color,
        id: this.state.id
      };

      aktualizuj(ActualNote);
    }, 600);
  };

  render() {
    const { note, usun } = this.props;

    return (
      <li key={this.props.id} className={style.karteczka}>
        <div className={style.karteczka__ozdoba} />
        <input
          spellCheck="false"
          maxLength="18"
          name="name"
          className={style.karteczka__nameInput}
          defaultValue={note.name}
          onChange={e => this.handleInputChange(e)}
        />
        <textarea
          ref={r => (this.r = r)}
          spellCheck="false"
          name="description"
          className={style.karteczka__descriptionInput}
          defaultValue={note.description}
          onChange={e => this.handleInputChange(e)}
        />
        <div className={style.row}>
          <div className={style.options}>Color</div>
          <div
            className={style.options}
            onClick={() => {
              const id = this.state.id;
              usun(id);
            }}
          >
            Delete
          </div>
        </div>
      </li>
    );
  }
}
