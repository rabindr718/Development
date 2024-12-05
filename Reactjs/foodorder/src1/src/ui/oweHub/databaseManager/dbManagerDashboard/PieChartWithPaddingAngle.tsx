import React from 'react';
import { PieChart, Pie, Cell, Label, LabelList, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import useMatchMedia from '../../../../hooks/useMatchMedia';

interface DataItem {
  name: string;
  value: number;
  Historical_Records: number;
  Total_Records: number;
}

interface PieChartProps {
  data: DataItem[];
}

const COLORS = ['#63ACA3', '#EE824D'];

const renderCustomizedLabelPercentage = (data: any, total = 32000) => {
  let percentageCalculated = data.value;
  return `${percentageCalculated}`;
};

function PieChartWithPaddingAngle({ data }: PieChartProps) {
  // Destructure data from props
  const navigate = useNavigate();

  const isTablet = useMatchMedia('(max-width: 1024px)');

  const handleClick = (entry: DataItem, index: number) => {
    navigate(`/dbManager/webhooks`);
  };

  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        outline: 'none',
      }}
      className="dashbar-db"
    >
      <div
        style={{
          position: 'relative',
          width: '300px',
          height: '400px',
          marginTop: '-75px',
          marginLeft: '40px',
          outline: 'none',
        }}
      >
        <PieChart
          width={300}
          height={400}
          style={{ outline: 'none', cursor: 'pointer' }}
        >
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                const { value } = payload[0];
                return (
                  <div
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '10px',
                      padding: '5px',
                    }}
                  >
                    {value} webhooks
                  </div>
                );
              }
              return null;
            }}
          />
          <Pie
            style={{ outline: 'none', cursor: 'pointer' }}
            data={data}
            cx={120}
            cy={200}
            innerRadius={isTablet ? 70 : 80}
            outerRadius={isTablet ? 105 : 125}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            onClick={handleClick}
            focusable={false}
          >
            <Label
              content={() => (
                <text
                  x={120}
                  y={200}
                  dy={-10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="center-label"
                >
                  Total
                  <tspan x={120} dy={24} fontSize="1.5em" fontWeight="bold">
                    {totalValue}
                  </tspan>
                </text>
              )}
            />
            <LabelList
              dy={0}
              fill="white"
              dataKey={renderCustomizedLabelPercentage}
              position="inside"
              angle={45}
              stroke="none"
              className="label-percentage"
            />

            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}

export default PieChartWithPaddingAngle;
