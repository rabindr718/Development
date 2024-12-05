import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Sale Rep. 1',
    Recived: 8000,
    amt: 10000,
  },
  {
    name: 'Sale Rep. 2',
    Recived: 5500,
    amt: 2210,
  },
  {
    name: 'Sale Rep. 3',
    Recived: 2000,
    amt: 2290,
  },
  {
    name: 'Sale Rep. 4',
    Recived: 2780,
    amt: 2000,
  },
  {
    name: 'Sale Rep. 5',
    Recived: 1890,
    amt: 2181,
  },
  {
    name: 'Sale Rep. 6',
    Recived: 2390,
    amt: 2500,
  },
  {
    name: 'Sale Rep. 7',
    Recived: 3490,
    amt: 2100,
  },
  {
    name: 'Sale Rep. 8',
    Recived: 3490,
    amt: 2100,
  },
  {
    name: 'Sale Rep. 9',
    Recived: 3490,
    amt: 2100,
  },
  {
    name: 'Sale Rep. 10',
    Recived: 3490,
    amt: 2100,
  },
];

export default class LineChart extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    return (
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={500}
          data={data}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Recived"
            fill="#4498ED"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          {/* <Bar dataKey="Pending" fill="#FF583D" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
