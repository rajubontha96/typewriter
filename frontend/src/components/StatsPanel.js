const StatsPanel = ({total, accuracy, wpm}) => (
  <div>
    <p>Total: {total}</p>
    <p>Accuracy: {accuracy}%</p>
    <p>WPM: {wpm}</p>
  </div>
);

export default StatsPanel;