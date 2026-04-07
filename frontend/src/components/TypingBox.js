const TypingBox = ({onKeyPress}) => {
  const handleChange = e => {
    const key = e.target.value.slice(-1);
    if (key) onKeyPress(key);
    e.target.value = '';
  };

  return (
    <input
      onChange={handleChange}
      placeholder="Start typing..."
    />
  );
};

export default TypingBox;