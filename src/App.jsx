import "./styles.css";
import { Component } from "./component";
import * as FunctionBased from "./context-function-based";
import * as ClassBased from "./context-class-based";

export default function App() {
  return (
    <div className="App">
      <h1>React Context: Class vs. Function</h1>
      <p>Open console below to see logged messages</p>
      <div className="Demo">
        <Demo displayName="ClassBased" context={ClassBased} />
        <Demo displayName="FunctionBased" context={FunctionBased} />
      </div>
    </div>
  );
}

const Demo = ({ context, displayName, log }) => {
  return (
    <>
      <h2>{displayName} Context Demo</h2>
      <context.Provider>
        <Component displayName={displayName} context={context.Context} />
      </context.Provider>
    </>
  );
};
