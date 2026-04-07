import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const Dashboard = () => {
  const dispatch = useDispatch();
  const leaderboard = useSelector(state => state.leaderboard);

  useEffect(() => {
    dispatch({type: 'GET_LEADERBOARD'});
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {leaderboard.map(item => (
        <p key={item.id}>
          {item.name} - {item.wpm} WPM
        </p>
      ))}
    </div>
  );
};

export default Dashboard;