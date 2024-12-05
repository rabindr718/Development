import React from 'react';
import { ICONS } from '../../resources/icons/Icons';
import { IoArrowUp, IoArrowDown } from 'react-icons/io5';
import MicroLoader from '../components/loader/MicroLoader';

interface DataType {
  name: string;
  img: string;
  bar: string;
  count: number;
  key: string;
  color: string;
  bgColor: string;
  percent: any;
  arrow: JSX.Element;
}

interface TotalCardProps {
  data: any;
  isLoading: boolean;
  selectOption:any;
}

const TotalCard: React.FC<TotalCardProps> = ({ data, isLoading, selectOption }) => {
  const data1: DataType[] = [
    {
      name: 'Total Sales',
      img: ICONS.rep1,
      bar: ICONS.repBar1,
      count: data?.total_sale || '0',
      key: 'total_sales',
      color: '#0096D3',
      bgColor: '#E3F3FC',
      percent: parseFloat((data?.sale_increase_percent || 0).toFixed(2)),
      arrow: data?.sale_increase_percent < 0 ? <IoArrowDown /> : <IoArrowUp />,
    },
    {
      name: 'Total NTP',
      img: ICONS.rep2,
      bar: ICONS.repBar2,
      count: data?.total_ntp || '0',
      key: 'total_ntp',
      color: '#7AA420',
      bgColor: '#EBF4DA',
      percent: parseFloat((data?.ntp_increase_percent || 0).toFixed(2)),
      arrow: data?.ntp_increase_percent < 0 ? <IoArrowDown /> : <IoArrowUp />,
    },
    {
      name: 'Total Installs',
      img: ICONS.rep3,
      bar: ICONS.repBar3,
      count: data?.total_install || '0',
      key: 'total_installs',
      color: '#2DC278',
      bgColor: '#EAFFF5',
      percent: parseFloat((data?.install_increase_percent || 0).toFixed(2)),
      arrow: data?.install_increase_percent < 0 ? <IoArrowDown /> : <IoArrowUp />,
    },
  ];

  const timePeriodText = () => {
    switch (selectOption?.value) {
      case 'day':
        return 'From the last day';
      case 'week':
        return 'From the last week';
      case 'month':
        return 'From the last month';
      default:
        return 'From the last year';
    }
  };

  console.log(data, 'data');
  return (
    <div className="totalcard">
      {isLoading ? (
        <div
          className="flex items-center justify-center mx-auto"
        >
          <MicroLoader />
        </div>
      ) : (
        <>
          {data1.length > 0 &&
            data1.map((el, i) => (
              <div
                key={el.key}
                className="total-card-count"
                style={{ backgroundColor: el.bgColor }}
              >
                <div
                  className="dealer-tot-amt"
                  style={{ width: '100%', gap: '10px' }}
                >
                  <div className="total-section">
                    <div className="flex items-center" style={{ gap: '10px' }}>
                      <h5 className="card-heading" style={{ color: el.color }}>
                        {el.name}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="total-count-desc">
                  <h5 className="heading-count">{el.count}</h5>
                  <p className="total-percent">
                    <span
                      className="flex items-center"
                      style={{
                        color: el.color,
                        fontWeight: '600',
                        fontSize: '12px',
                      }}
                    >
                      {el.arrow}&nbsp;{el.percent}%
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      marginLeft: '20px',
                      color: "#292B2E"
                    }}
                  >
                         {timePeriodText()}
                  </p>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default TotalCard;
