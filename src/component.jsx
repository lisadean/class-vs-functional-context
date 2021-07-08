import { useContext, useState, useMemo } from "react";

export function Component(props) {
  const [log, setLog] = useState(false);
  const [memoized, setMemoized] = useState(false);
  const newprops = { ...props, log, memoized };
  return (
    <div className="component">
      <div>
        <Stuff {...newprops} />
        <Things {...newprops} />
      </div>
      <div>
        <div>
          <label htmlFor="log">Toggle console log </label>
          <input
            type="checkbox"
            name="log"
            value={log}
            onChange={() => setLog(!log)}
          />
        </div>
        <div>
          <label htmlFor="memoized">Toggle memoization </label>
          <input
            type="checkbox"
            name="memoized"
            value={memoized}
            onChange={() => setMemoized(!memoized)}
          />
        </div>
      </div>
    </div>
  );
}

const Stuff = (props) => {
  const { stuff, setStuff } = useContext(props.context);
  const logString = `${props.displayName} Stuff rendered: ${stuff}`;
  const regular = () => {
    const handleClick = () => {
      setStuff(Date.now());
    };
    props.log && console.log(logString);
    return (
      <div>
        <div>
          Stuff:
          <br />
          {stuff}
        </div>
        <div>
          <button onClick={handleClick}>Change stuff</button>
        </div>
      </div>
    );
  };
  const memoized = useMemo(() => {
    const handleClick = () => {
      setStuff(Date.now());
    };
    props.log && console.log(logString);
    return (
      <div>
        <div>
          Stuff:
          <br />
          {stuff}
        </div>
        <div>
          <button onClick={handleClick}>Change stuff</button>
        </div>
      </div>
    );
  }, [stuff, setStuff, props.log, logString]);
  return props.memoized ? memoized : regular();
};

const Things = (props) => {
  const { things, setThings } = useContext(props.context);
  const logString = `${props.displayName} Things rendered: ${things}`;
  const regular = () => {
    const handleClick = () => {
      setThings(Date.now());
    };
    props.log && console.log(logString);
    return (
      <div>
        <div>
          Things:
          <br />
          {things}
        </div>
        <div>
          <button onClick={handleClick}>Change things</button>
        </div>
      </div>
    );
  };
  const memoized = useMemo(() => {
    const handleClick = () => {
      setThings(Date.now());
    };
    props.log && console.log(logString);
    return (
      <div>
        <div>
          Things:
          <br />
          {things}
        </div>
        <div>
          <button onClick={handleClick}>Change things</button>
        </div>
      </div>
    );
  }, [things, setThings, props.log, logString]);
  return props.memoized ? memoized : regular();
};
