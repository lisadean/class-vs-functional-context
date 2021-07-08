import { useState, createContext } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [stuff, setStuff] = useState();
  const [things, setThings] = useState();
  const value = { stuff, setStuff, things, setThings };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
