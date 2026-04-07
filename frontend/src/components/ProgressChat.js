import {
  LineChart, Line, XAxis, YAxis, Tooltip
} from 'recharts';

const ProgressChart = ({data}) => (
  <LineChart width={400} height={250} data={data}>
    <XAxis dataKey="time" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="wpm" />
  </LineChart>
);

export default ProgressChart;