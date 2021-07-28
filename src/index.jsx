import { StrictMode, useState, createContext, useContext } from 'react';
import './styles.css';
import ReactDOM from 'react-dom';

const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

const Context = createContext();
const Provider = ({ children }) => {
  const [stuff, setStuff] = useState();
  const [things, setThings] = useState();
  const value = { stuff, setStuff, things, setThings };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const ContextItemComponent = ({ context, contextItemName }) => {
  let contextData, setContextData;
  if (contextItemName === 'stuff') {
    ({ stuff: contextData, setStuff: setContextData } = useContext(context));
  } else if (contextItemName === 'things') {
    ({ things: contextData, setThings: setContextData } = useContext(context));
  }
  const label = capitalize(contextItemName);
  const handleClick = () => {
    setContextData(Date.now());
  };
  return (
    <div>
      <div>
        {label}:
        <br />
        {contextData}
      </div>
      <div>
        <button onClick={handleClick}>Change {label.toLowerCase()}</button>
      </div>
    </div>
  );
};

export const ComponentWrapper = (props) => <div>{props.children}</div>;

const App = () => (
  <div className='App'>
    <h1>React Context: Class vs. Function</h1>
    <div className='Demo'>
      <h2>Context Demo</h2>
      <Provider>
        <ComponentWrapper>
          <ComponentWrapper>
            <ComponentWrapper>
              <div className='component'>
                <div>
                  <ContextItemComponent
                    context={Context}
                    contextItemName='stuff'
                  />
                  <ContextItemComponent
                    context={Context}
                    contextItemName='things'
                  />
                </div>
              </div>
            </ComponentWrapper>
          </ComponentWrapper>
        </ComponentWrapper>
      </Provider>
    </div>
  </div>
);

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
