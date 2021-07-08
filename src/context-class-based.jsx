import React, { Component, createContext } from "react";

export const Context = createContext();

export class Provider extends Component {
  state = {
    stuff: "",
    things: "",
    setStuff: (stuff) => this.setState(() => ({ stuff })),
    setThings: (things) => this.setState(() => ({ things }))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
