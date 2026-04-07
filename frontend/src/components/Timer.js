import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {tick} from '../redux/actions';

const Timer = ({time}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <h2>Time: {time}s</h2>;
};

export default Timer;