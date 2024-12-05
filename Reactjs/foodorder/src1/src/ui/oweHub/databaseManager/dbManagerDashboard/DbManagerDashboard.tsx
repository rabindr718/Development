import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';
import './dbManagerDash.css';
import DashBarLineChart from './DashBarLineChart';
import PieChartWithPaddingAngle from './PieChartWithPaddingAngle';
import { useNavigate } from 'react-router-dom';
import Boxes from './Boxes';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { fetchActive } from '../../../../redux/apiSlice/configSlice/config_get_slice/activeSlice';
import moment from 'moment';
import Loading from '../../../components/loader/Loading';
import { ICONS } from '../../../../resources/icons/Icons';

const DbManagerDashboard = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const { start_time, loading } = useAppSelector((state) => state.active);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActive());
  }, []);

  // Function to handle dropdown selection change
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (
      selectedValue === 'Today' ||
      selectedValue === 'This Week' ||
      selectedValue === 'All'
    ) {
      navigate(`/userManagement`);
    }
  };

  const data = [
    {
      name: 'Group A',
      value: 200,
      Historical_Records: 100,
      Total_Records: 150,
    },
    {
      name: 'Group B',
      value: 500,
      Historical_Records: 250,
      Total_Records: 300,
    },
  ];
  const data1 = [
    { name: 'Group A', value: 50, Historical_Records: 100, Total_Records: 130 },
    {
      name: 'Group B',
      value: 200,
      Historical_Records: 200,
      Total_Records: 340,
    },
  ];
  const data2 = [
    {
      name: 'Group A',
      value: 100,
      Historical_Records: 100,
      Total_Records: 150,
    },
    {
      name: 'Group B',
      value: 300,
      Historical_Records: 250,
      Total_Records: 300,
    },
  ];
  const options = [
    { value: 'today', label: 'Today' },
    { value: 'this_week', label: 'This week' },
    { value: 'all', label: 'All' },
  ];
  const options1 = [
    { value: 'today', label: 'Table 1 Data' },
    { value: 'this_week', label: 'Table 2 Data' },
    { value: 'all', label: 'Table 3 Data' },
  ];

  if (loading) {
    return (
      <div className="loader-container">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="common">
        <Breadcrumb
          head="DB Manager"
          linkPara="DB Manager"
          linkparaSecond="Dashboard"
          route={''}
        />
      </div>

      <div className="Db-manager-container">
        <div className="runner-section">
          <div className="dbm-top">
            <img src={ICONS.dbm} alt="" className="dbm-img" />
            <h3>DB Status</h3>
            <p>Application {!start_time && 'Not'} Running</p>
          </div>
          <div className="active-button">
            <div className="active-since-section">
              {!start_time ? (
                <button type="button" style={{ background: '#CA0B00' }}>
                  <span className="status-circle red"></span>
                  Inactive
                </button>
              ) : (
                <button type="button">
                  <span className="status-circle green"></span>
                  Active
                </button>
              )}
            </div>
            {start_time && (
              <div className="since-section">
                <h3>Since:</h3>
                <p>{moment(start_time).format('MM/DD/YYYY hh:mm A')}</p>
              </div>
            )}
          </div>
        </div>

        <div className="DashBarchart-section">
          <DashBarLineChart />
          <div className="identity1">
            <Boxes color="#63ACA3" borderColor="#D2FFF9" />{' '}
            <p>Historical Records</p>
            <Boxes color="#EE824D" borderColor="#FFE2D4" /> <p>Total Records</p>
          </div>
        </div>
      </div>

      <div className="webhook-container">
        <div className="status-section">
          <p>Webhooks Status</p>

          <Select
            options={options1}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                marginTop: 'px',
                borderRadius: '8px',
                outline: 'none',
                color: 'black',
                width: '212px',
                height: '36px',
                fontSize: '12px',
                border: '1px solid #d0d5dd',
                fontWeight: '500',
                cursor: 'pointer',
                alignContent: 'center',
                backgroundColor: '#ffffff',
                boxShadow: 'none',
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: '#292929', // Change the placeholder color here
              }),
              indicatorSeparator: () => ({
                display: 'none',
              }),
              dropdownIndicator: (baseStyles, state) => ({
                ...baseStyles,
                color: '#292929',
                '&:hover': {
                  color: '#292929',
                },
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: '13px',
                color: state.isSelected ? '#ffffff' : '#000000',
                backgroundColor: state.isSelected ? '#377CF6' : '#ffffff',
                '&:hover': {
                  backgroundColor: state.isSelected ? '#0493CE' : '#DDEBFF',
                },
                cursor: 'pointer',
              }),
              singleValue: (baseStyles, state) => ({
                ...baseStyles,
                color: '#292929',
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                width: '212px',
              }),
            }}
          />
        </div>

        <div className="container-graph">
          <div className="create-container">
            <div className="Create-section">
              <p>Create Webhooks</p>

              <Select
                options={options}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    marginTop: 'px',
                    borderRadius: '8px',
                    outline: 'none',
                    color: 'black',
                    width: '120px',
                    fontSize: '12px',
                    border: '1px solid #d0d5dd',
                    fontWeight: '500',
                    cursor: 'pointer',
                    boxShadow: 'none',
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: '#292929', // Change the placeholder color here
                  }),
                  dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    color: '#292929',
                    '&:hover': {
                      color: '#292929',
                    },
                  }),
                  indicatorSeparator: () => ({
                    display: 'none', // Hide the indicator separator
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: '13px',
                    color: state.isSelected ? '#ffffff' : '#000000',
                    backgroundColor: state.isSelected ? '#377CF6' : '#ffffff',
                    '&:hover': {
                      backgroundColor: state.isSelected ? '#0493CE' : '#DDEBFF',
                    },
                  }),
                  singleValue: (baseStyles, state) => ({
                    ...baseStyles,
                    color: '#292929',
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    width: '120px',
                    zIndex: 999,
                  }),
                  menuList: (base) => ({
                    ...base,
                    '&::-webkit-scrollbar': {
                      scrollbarWidth: 'thin',
                      display: 'block',
                      scrollbarColor: 'rgb(173, 173, 173) #fff',
                      width: 8,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgb(173, 173, 173)',
                      borderRadius: '30px',
                    },
                  }),
                }}
              />
            </div>
            <div className="PieBarchart-section">
              <div className="PieChart-container">
                <PieChartWithPaddingAngle data={data} />
              </div>
            </div>

            <div className="identity">
              <Boxes color="#63ACA3" borderColor="#D2FFF9" /> <p>30% Fail</p>
              <Boxes color="#EE824D" borderColor="#FFE2D4" /> <p>70% Pass</p>
            </div>
          </div>

          <div className="create-container">
            <div className="Create-section">
              <p>Update Webhooks</p>

              <Select
                options={options}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    marginTop: 'px',
                    borderRadius: '8px',
                    outline: 'none',
                    color: 'black',
                    width: '120px',
                    fontSize: '12px',
                    border: '1px solid #d0d5dd',
                    fontWeight: '500',
                    cursor: 'pointer',
                    boxShadow: 'none',
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: '#292929', // Change the placeholder color here
                  }),
                  indicatorSeparator: () => ({
                    display: 'none',
                  }),
                  dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    color: '#292929',
                    '&:hover': {
                      color: '#292929',
                    },
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: '13px',
                    color: state.isSelected ? '#ffffff' : '#000000',
                    backgroundColor: state.isSelected ? '#377CF6' : '#ffffff',
                    '&:hover': {
                      backgroundColor: state.isSelected ? '#0493CE' : '#DDEBFF',
                    },
                  }),
                  singleValue: (baseStyles, state) => ({
                    ...baseStyles,
                    color: '#292929',
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    width: '120px',
                    zIndex: 999,
                  }),
                  menuList: (base) => ({
                    ...base,
                    '&::-webkit-scrollbar': {
                      scrollbarWidth: 'thin',
                      display: 'block',
                      scrollbarColor: 'rgb(173, 173, 173) #fff',
                      width: 8,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgb(173, 173, 173)',
                      borderRadius: '30px',
                    },
                  }),
                }}
              />
            </div>
            <div className="PieBarchart-section">
              <div className="PieChart-container">
                <PieChartWithPaddingAngle data={data1} />
              </div>
            </div>
            <div className="identity">
              <Boxes color="#63ACA3" borderColor="#D2FFF9" /> <p>30% Fail</p>
              <Boxes color="#EE824D" borderColor="#FFE2D4" /> <p>70% Pass</p>
            </div>
          </div>

          <div className="create-container">
            <div className="Create-section">
              <p>Delete Webhooks</p>

              <Select
                options={options}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    marginTop: 'px',
                    borderRadius: '8px',
                    outline: 'none',
                    color: 'black',
                    width: '120px',
                    fontSize: '12px',
                    border: '1px solid #d0d5dd',
                    fontWeight: '500',
                    cursor: 'pointer',
                    boxShadow: 'none',
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: '#292929', // Change the placeholder color here
                  }),
                  indicatorSeparator: () => ({
                    display: 'none',
                  }),
                  dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    color: '#292929',
                    '&:hover': {
                      color: '#292929',
                    },
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: '13px',
                    color: state.isSelected ? '#ffffff' : '#000000',
                    backgroundColor: state.isSelected ? '#377CF6' : '#ffffff',
                    '&:hover': {
                      backgroundColor: state.isSelected ? '#0493CE' : '#DDEBFF',
                    },
                  }),
                  singleValue: (baseStyles, state) => ({
                    ...baseStyles,
                    color: '#292929',
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    width: '120px',
                    zIndex: 999,
                  }),
                  menuList: (base) => ({
                    ...base,
                    '&::-webkit-scrollbar': {
                      scrollbarWidth: 'thin',
                      display: 'block',
                      scrollbarColor: 'rgb(173, 173, 173) #fff',
                      width: 8,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgb(173, 173, 173)',
                      borderRadius: '30px',
                    },
                  }),
                }}
              />
            </div>
            <div className="PieBarchart-section">
              <div className="PieChart-container">
                <PieChartWithPaddingAngle data={data2} />
              </div>
            </div>
            <div className="identity">
              <Boxes color="#63ACA3" borderColor="#D2FFF9" /> <p>30% Fail</p>
              <Boxes color="#EE824D" borderColor="#FFE2D4" /> <p>70% Pass</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DbManagerDashboard;
