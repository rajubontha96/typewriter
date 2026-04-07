const ResultModal = ({stats, onRestart}) => (
  <div className="modal">
    <div className="modal-content">
      <h2>🔥 Session Complete</h2>
      <p>WPM: {stats.wpm}</p>
      <p>Accuracy: {stats.accuracy}%</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  </div>
);

export default ResultModal;