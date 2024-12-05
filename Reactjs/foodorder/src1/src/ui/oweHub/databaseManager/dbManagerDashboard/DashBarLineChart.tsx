import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Table 1',
    Total_Records: 800,
    Historical_Records: 1400,
    amt: 2000,
  },
  {
    name: 'Table 2',
    Total_Records: 500,
    Historical_Records: 1500,
    amt: 2000,
  },
  {
    name: 'Table 3',
    Total_Records: 100,
    Historical_Records: 300,
    amt: 2000,
  },
  {
    name: 'Table 4',
    Total_Records: 300,
    Historical_Records: 900,
    amt: 2000,
  },
  {
    name: 'Table 5',
    Total_Records: 50,
    Historical_Records: 150,
    amt: 2000,
  },
  {
    name: 'Table 6',
    Total_Records: 800,
    Historical_Records: 200,
    amt: 2000,
  },
  {
    name: 'Table 7',
    Total_Records: 200,
    Historical_Records: 800,
    amt: 2000,
  },
];

export default class BarChartComponent extends PureComponent {
  render() {
    return (
      <div className="dashbar-db" style={{ width: '100%' }}>
        <div className="dash-section" style={{ padding: '1rem' }}>
          <p>Total Table Record</p>
        </div>
        <div style={{ width: '100%', height: '280px', marginTop: '1rem' }}>
          <ResponsiveContainer width="100%" height="110%">
            <BarChart
              width={500}
              height={800}
              data={data}
              margin={{
                right: 30,
                left: 20,
                bottom: 36,
              }}
            >
              <CartesianGrid vertical={false} />
              <Tooltip
                contentStyle={{
                  fontSize: '13px',
                  borderRadius: 'none',
                }}
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                tick={{ fill: '#000000', fontWeight: 500, fontSize: '10px' }}
                axisLine={{ stroke: 'rgb(204, 204, 204)' }}
              />
              <YAxis
                axisLine={false}
                tick={{
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: 12,
                  fill: '#101828',
                }}
                tickLine={false}
              />
              {/* <Legend
                wrapperStyle={{ fontSize: "12px", color: "#000000" }} payload={[{ value: 'Total Records', type: 'rect', color: '#FB7955'  }, { value: 'Historical Records', type: 'rect', color: '#007AF5' }]} iconSize={15} 
              /> */}
              <Bar
                dataKey="Total_Records"
                fill="#EE824D"
                label={{
                  position: 'top',
                  fill: '#565656',
                  fontSize: '10px',
                  fontWeight: 500,
                }}
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="Historical_Records"
                fill="#63ACA3"
                label={{
                  position: 'top',
                  fill: '#565656',
                  fontSize: '10px',
                  fontWeight: 500,
                }}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
