import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

export default class Modal extends React.Component {
  componentDidMount() {
    this.modalTarget = document.createElement("div");
    this.modalBackdrop = document.createElement("div");
    this.modalTarget.className = "Modal";
    this.modalBackdrop.className = "Modal__backdrop";
    document.body.appendChild(this.modalTarget);
    document.body.appendChild(this.modalBackdrop);
    this._render();

    setTimeout(() => {
      this.modalTarget.classList.add("Modal--in");
      this.modalBackdrop.classList.add("Modal__backdrop--in");
    }, 40);
  }

  componentDidUpdate() {
    this._render();
  }

  componentWillUnmount() {
    this.modalTarget.classList.remove("Modal--in");
    this.modalBackdrop.classList.remove("Modal__backdrop--in");
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(this.modalTarget);
      document.body.removeChild(this.modalTarget);
      document.body.removeChild(this.modalBackdrop);
    }, 500);
  }

  renderModalDialogue() {
    return <div className="Modal__dialogue">{this.props.children}</div>;
  }

  _render() {
    ReactDOM.render(this.renderModalDialogue(), this.modalTarget);
  }

  render() {
    return <noscript />;
  }
}
