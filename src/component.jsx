import { useContext, useState, useMemo } from 'react';

const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

const SubComponent = ({
  displayName,
  context,
  log,
  memoized,
  contextItem: contextItemName,
}) => {
  let contextData, setContextData;
  if (contextItemName === 'stuff') {
    ({ stuff: contextData, setStuff: setContextData } = useContext(context));
  } else if (contextItemName === 'things') {
    ({ things: contextData, setThings: setContextData } = useContext(context));
  }
  const label = capitalize(contextItemName);
  const logString = `${displayName} ${label} rendered: ${contextData}`;
  const handleClick = () => {
    setContextData(Date.now());
  };
  const regular = () => {
    log && console.log(logString);
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
  const memoizedVersion = useMemo(regular, [
    contextData,
    setContextData,
    log,
    logString,
  ]);
  return memoized ? memoizedVersion : regular();
};

export const BaseComponent = ({ displayName, context }) => {
  const [log, setLog] = useState(false);
  const [memoized, setMemoized] = useState(false);
  const newprops = { displayName, context, log, memoized };
  return (
    <div className='component'>
      <div>
        <SubComponent {...newprops} contextItem='stuff' />
        <SubComponent {...newprops} contextItem='things' />
      </div>
      <div>
        <div>
          <label htmlFor='log'>Toggle console log </label>
          <input
            type='checkbox'
            name='log'
            value={log}
            onChange={() => setLog(!log)}
          />
        </div>
        <div>
          <label htmlFor='memoized'>Toggle memoization </label>
          <input
            type='checkbox'
            name='memoized'
            value={memoized}
            onChange={() => setMemoized(!memoized)}
          />
        </div>
      </div>
    </div>
  );
};

export const ComponentWrapper = (props) => <div>{props.children}</div>;

// export const DeeplyNestedComponent = (props) => {
//   const { nestingLevel, ...newProps } = props;
//   if (nestingLevel <= 0) {
//     return <BaseComponent props={newProps} />;
//   } else {
//     const newNestingLevel = nestingLevel - 1;
//     return (
//       <DeeplyNestedComponent nestingLevel={newNestingLevel} {...newProps} />
//     );
//   }
// };
