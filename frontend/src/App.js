import {useDispatch, useSelector} from 'react-redux';
import {keyPress, start} from './redux/actions';
import TypingBox from './components/TypingBox';
import KeyDisplay from './components/KeyDisplay';
import StatsPanel from './components/StatsPanel';
import Timer from './components/Timer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  const {currentKey, total, correct, time, token} =
    useSelector(state => state);

  const accuracy =
    total === 0 ? 0 : ((correct / total) * 100).toFixed(2);

  const wpm = Math.round(correct / 5);

  const handleKey = key => {
    dispatch(start());
    dispatch(keyPress(key));
  };

  if (!token) return <Login />;

  return (
    <div className="app">
      <h1>Typing Trainer</h1>

      <Timer time={time} />
      <KeyDisplay currentKey={currentKey} />
      <TypingBox onKeyPress={handleKey} />

      <StatsPanel total={total} accuracy={accuracy} wpm={wpm} />

      <Dashboard />
    </div>
  );
};

export default App;