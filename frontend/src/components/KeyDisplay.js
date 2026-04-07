const keys = ['a','s','d','f','j','k','l',';'];

const KeyDisplay = ({currentKey}) => (
  <div>
    {keys.map(k => (
      <span
        key={k}
        style={{
          margin: 10,
          color: k === currentKey ? 'lime' : 'white',
        }}
      >
        {k}
      </span>
    ))}
  </div>
);

export default KeyDisplay;