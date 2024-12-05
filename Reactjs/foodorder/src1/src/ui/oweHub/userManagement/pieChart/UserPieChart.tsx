import React, { Dispatch, SetStateAction, useState } from 'react';
import './barchart.css';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';
import { OnboardingChartModel } from '../../../../core/models/api_models/UserManagementModel';
import DataNotFound from '../../../components/loader/DataNotFound';
import perfomance_mask from '../lib/perfomance_mask.png';
import onboarding_mask from '../lib/onboarding_mask.png';
import useMatchMedia from '../../../../hooks/useMatchMedia';
import {
  ALL_USER_ROLE_LIST,
  TYPE_OF_USER,
} from '../../../../resources/static_data/Constant';
interface UserPieChartProps {
  onboardingList: OnboardingChartModel[];
  userPerformanceList: OnboardingChartModel[];
  loading: boolean;
  onValueChange: (value: string) => void;
  activeSalesRep: string;
  setSelectedOption: Dispatch<
    SetStateAction<{ label?: string; value?: string }>
  >;
}

const UserPieChart: React.FC<UserPieChartProps> = ({
  onboardingList,
  userPerformanceList,
  loading,
  onValueChange,
  activeSalesRep,
  setSelectedOption,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  // const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [isHovered1, setIsHovered1] = useState(false);
  // const [isClicked1, setIsClicked1] = useState(false);

  const handleClick = (value: string) => {
    onValueChange(value);
    setSelectedOption({
      label: TYPE_OF_USER.SALES_REPRESENTATIVE,
      value: TYPE_OF_USER.SALES_REPRESENTATIVE,
    });
  };
  const handleChartClick = (value: string, type: 'sales' | string) => {
    console.log('value', value);
    if (type === 'sales') {
      onValueChange(value);
      setSelectedOption({
        label: TYPE_OF_USER.SALES_REPRESENTATIVE,
        value: TYPE_OF_USER.SALES_REPRESENTATIVE,
      });
    } else {
      setSelectedOption({ label: value, value: value });
      onValueChange('');
    }
  };

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };
  const totalOnboarding = onboardingList.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

  const isTablet = useMatchMedia('(max-width: 1024px)');
  return (
    <div className="chart-view">
      <div
        className="pie-section-1"
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
        }}
      >
        <div className="pieChart-section">
          <h2>Onboarding Detail</h2>
        </div>
        <div
          className="flex items-start mt2"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
          }}
        >
          {!!onboardingList.length ? (
            <div
              style={{ width: 'fit-content', outline: 'none' }}
              className="relative"
            >
              <PieChart
                width={isTablet ? 210 : 360}
                height={isTablet ? 200 : 300}
                style={{ outline: 'none' }}
              >
                <Pie
                  data={onboardingList}
                  cx="40%"
                  cy="50%"
                  className="onboarding-pie"
                  innerRadius={isTablet ? 60 : 90} // Adjust the inner radius for the doughnut thickness
                  outerRadius={isTablet ? 85 : 130}
                  fill="#8884d8"
                  paddingAngle={0.1}
                  dataKey="value"
                  strokeWidth={3}
                  focusable={false}
                  onClick={(e: any) => handleChartClick(e['data-value'], 'all')}
                >
                  {onboardingList.map((entry, index) => (
                    <Cell
                      style={{ outline: 'none', cursor: 'pointer' }}
                      id={`${index}`}
                      key={`cell-${index}`}
                      className="cursor-pointer"
                      data-svg-id={entry.name}
                      data-value={entry.name}
                      fill={entry.fill}
                    />
                  ))}
                </Pie>
                <Tooltip
                  cursor={false}
                  content={(va) => {
                    return va.payload?.[0]?.value;
                  }}
                  wrapperClassName="pie-tooltip"
                />
              </PieChart>
              <img
                src={onboarding_mask}
                alt=""
                className="onboarding-mask-img"
              />
            </div>
          ) : (
            !loading && (
              <div className="data-not-found " style={{ width: '100%' }}>
                <DataNotFound
                  title={loading ? 'Searching..' : 'No SaleRep Found'}
                />
              </div>
            )
          )}

          <div>
            {!!onboardingList.length && (
              <div className="flex items-center mb2 justify-between">
                <h4
                  className={`${isTablet ? '' : 'h4'}  text-dark`}
                  style={{
                    fontWeight: '600',
                    fontSize: isTablet ? 14 : undefined,
                  }}
                >
                  {totalOnboarding} - Number of users
                </h4>
              </div>
            )}
            {onboardingList.map((user) => {
              return (
                <div key={user.fill} className="flex mb1 items-center">
                  <div
                    className="pie-circle-denote  mr1"
                    style={{ backgroundColor: user.fill }}
                  />

                  <div
                    style={{ fontSize: isTablet ? 12 : undefined }}
                    className={`grid-wrapper-list  text-dark  ${isTablet ? '' : 'h5'}`}
                  >
                    <span style={{ fontWeight: 600 }}>
                      {user.value.toString().length === 1 ? 0 : ''}
                      {user.value}{' '}
                    </span>
                    <span> - </span>
                    <span style={{ fontWeight: 500, fontSize: 12 }}>
                      {' '}
                      {user.name}{' '}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="pie-section-2 flex-auto"
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="pieChart-section">
          <h2>Performance</h2>
        </div>
        <div className="pie2-mob-resp">
          {userPerformanceList && userPerformanceList.length > 0 ? (
            <div className="pie-chart-container  relative">
              <ResponsiveContainer width={'100%'} height="100%">
                <PieChart>
                  <Pie
                    data={userPerformanceList}
                    cx="50%"
                    className="dougnout"
                    cy="50%"
                    innerRadius={isTablet ? 60 : 90} // Adjust the inner radius for the doughnut thickness
                    outerRadius={isTablet ? 90 : 130}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={3}
                    onClick={(e: any) =>
                      handleChartClick(
                        e['data-value']
                          .split(' ')[0]
                          .replace('Inactive', 'InActive'),
                        'sales'
                      )
                    }
                  >
                    {userPerformanceList.map((entry, index) => (
                      <Cell
                        style={{ outline: 'none', cursor: 'pointer' }}
                        id={`${index}`}
                        data-value={entry.name}
                        key={`cell-${index}`}
                        fill={entry.fill}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    cursor={false}
                    content={(va) => {
                      return va.payload?.[0]?.value;
                    }}
                    wrapperClassName="pie-tooltip"
                  />
                </PieChart>
              </ResponsiveContainer>
              <img src={perfomance_mask} alt="" className="mask-chart-img" />
            </div>
          ) : (
            !loading && (
              <div className="data-not-found">
                <DataNotFound
                  title={loading ? 'Searching..' : 'No SaleRep Found'}
                />
              </div>
            )
          )}

          {!!userPerformanceList.length && (
            <div className="flex stats-wrapper items-center justify-center pb2 mt3">
              <div
                className={`flex items-center active-slrp ${activeSalesRep === 'Active' ? 'clicked' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick('Active')}
              >
                <div className="flex items-center act-top">
                  <div
                    className="flex items-center mr1 inner-circle"
                    style={{
                      background: '#63ACA3',
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border:
                        isHovered || activeSalesRep === 'Active'
                          ? '3px solid #fff'
                          : '3px solid #D2FFF9',
                      flexShrink: 0,
                    }}
                  />

                  <span
                    className="bold upl"
                    style={{
                      color:
                        isHovered || activeSalesRep === 'Active'
                          ? '#fff'
                          : '#263747',
                    }}
                  >
                    {userPerformanceList?.[0]?.value}
                  </span>
                </div>

                <span className="mx1">-</span>

                <h3
                  className="act-sr"
                  style={{ fontWeight: '500', lineHeight: '20px' }}
                >
                  Active Sales Rep
                </h3>
              </div>

              <div
                className={`flex items-center inactive-slrp  ${activeSalesRep === 'InActive' ? 'clicked1' : ''}`}
                onMouseEnter={handleMouseEnter1}
                onMouseLeave={handleMouseLeave1}
                onClick={() => handleClick('InActive')}
              >
                <div className="flex items-center">
                  <div
                    className="flex items-center mr1"
                    style={{
                      background: '#E0728C',
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border:
                        isHovered1 || activeSalesRep === 'InActive'
                          ? '3px solid #fff'
                          : '3px solid rgb(253, 196, 209)',
                      flexShrink: 0,
                    }}
                  />

                  <span
                    className="bold"
                    style={{
                      color:
                        isHovered1 || activeSalesRep === 'InActive'
                          ? '#fff'
                          : '#263747',
                    }}
                  >
                    {userPerformanceList?.[1]?.value}
                  </span>
                </div>
                <span className="mx1">-</span>

                <h3
                  className="inact-sr"
                  style={{ fontWeight: '500', lineHeight: '20px' }}
                >
                  Inactive Sales Rep
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPieChart;
