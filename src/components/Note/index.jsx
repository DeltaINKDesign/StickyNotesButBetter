import React from "react";
import style from "./style.less";

export default class Note extends React.Component {
  state = {
    name: "",
    description: "",
    color: "blue"
  };

  handleInputChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };
  componentDidMount() {
    const { note } = this.props;

    this.setState({
      name: note.name,
      description: note.description,
      color: note.color,
      id: note.id
    });
  }

  render() {
    const { aktualizuj, note,usun } = this.props;

    const ActualNote = {
      name: this.state.name,
      description: this.state.description,
      color: this.state.color,
      id: this.state.id
    };

    return (
      <li key={this.props.id} className={style.karteczka}>
        <div className={style.karteczka__ozdoba} />
        <input
          spellCheck="false"
          maxLength="18"
          name="name"
          className={style.karteczka__nameInput}
          defaultValue={note.name}
          onChange={e => {
            this.handleInputChange(e);
            aktualizuj(ActualNote);
          }}
        />
        <textarea
          ref={r => (this.r = r)}
          spellCheck="false"
          name="description"
          className={style.karteczka__descriptionInput}
          defaultValue={note.description}
          onChange={e => {
            this.handleInputChange(e);
            aktualizuj(ActualNote);
          }}
        />
        <div className={style.row}>
          <div className={style.options}>Color</div>
          <div
            className={style.options}
            onClick={() => usun(ActualNote.id)}
          >
            Delete
          </div>
        </div>
      </li>
    );
  }
}
