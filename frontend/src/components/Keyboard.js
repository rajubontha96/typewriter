const keys = ['a','s','d','f','j','k','l',';'];

const Keyboard = ({currentKey}) => (
  <div className="keyboard">
    {keys.map(k => (
      <span
        key={k}
        className={`key ${k === currentKey ? 'active' : ''}`}
      >
        {k}
      </span>
    ))}
  </div>
);

export default Keyboard;