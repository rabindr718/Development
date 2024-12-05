import React, { useEffect, useState, useRef } from 'react';
import './ardashboard.css';
import { ICONS } from '../../../../resources/icons/Icons';
import ArDashBoardTable, { Commissioncolumns } from './artable';
import ArDropdownWithCheckboxes from './Dropdown';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { handleChange as filterChange } from '../../../../redux/apiSlice/AR/ArDataSlice';
import { FilterModel } from '../../../../core/models/data_models/FilterSelectModel';
import FilterHoc from '../../../components/FilterModal/FilterHoc';
import { useLocation } from 'react-router-dom';

export const ARDashboardPage: React.FC = () => {
  const [active, setActive] = React.useState<number>(0);
  const [filterModal, setFilterModal] = React.useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useAppDispatch();
  const [additionalFilter, setAdditionalFilter] = useState<FilterModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const options = [
    { value: 'All', label: 'All', key: 'all' },
    { value: 'Shaky', label: 'Shaky', key: 'shaky' },
    { value: 'Cancel', label: 'Cancel', key: 'cancel' },
    { value: 'QC/Permit/NTP', label: 'QC/Permit/NTP', key: 'permits' },
    { value: 'Install', label: 'Install', key: 'install' },
    { value: 'PTO', label: 'PTO', key: 'pto' },
    { value: 'SOLD', label: 'SOLD', key: 'sold' },
  ];
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    options.map((o) => o.value)
  );
  const filterClose = () => {
    setFilterModal(false);
  };

  const options1 = [
    { value: 'ALL', label: 'All' },
    { value: 'Current Due', label: 'Current Due' },
    { value: 'Overpaid', label: 'Overpaid' },
  ];
  const options2 = [{ value: 'ALL', label: 'All' }];
  const options3 = [
    { value: 'Partner', label: 'Partner' },
    { value: 'installer', label: 'Installer' },
    { value: 'type', label: 'Type' },
    { value: 'unique_id', label: 'Service' },
    { value: 'home_owner', label: 'Home Owner' },
    { value: 'address', label: 'Street Address' },
    { value: 'city', label: 'City' },
    { value: 'state', label: 'State' },
    { value: 'zip', label: 'Zip' },
    { value: 'system_size', label: 'KW' },
    { value: 'contract_date', label: 'Contract Date' },
    { value: 'install_date', label: 'Install date' },
    { value: 'current_status', label: 'Current Status' },
    { value: 'status_date', label: 'Status date' },
    { value: 'contract_calc', label: 'Contract' },
    { value: 'owe_ar', label: 'AR Total' },
    { value: 'amount_paid', label: 'Amt paid' },
    { value: 'current_due', label: 'Current Due' },
    { value: 'balance', label: 'Est Pipeline' },
  ];

  // used for close date click outside anywhere
  const datePickerRef = useRef<HTMLDivElement>(null);
  const { filters } = useAppSelector((state) => state.ardata);
  const { isActive } = useAppSelector((state) => state.filterSlice);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [selectedOption3, setSelectedOption3] = useState<string>(
    options[0].label
  );

  const handleChange = (name: string, value: string) => {
    dispatch(filterChange({ name, value }));
    resetPagination();
  };
  const resetPagination = () => {
    setCurrentPage(1);
  };
  const fetchFunction = (req: any) => {
    setCurrentPage(1);
    setAdditionalFilter(req.filters);
  };

  return (
    <>
      <div className="ar-Dashboard-section-container">
        <div className="ar-white-back">
          <div className="ar-Dashboard-container">
            <div className="rep-manage-user">
              <div className="ar-dash-head-input" style={{ width: '128px' }}>
                <div
                  className="rep-drop_label"
                  style={{ backgroundColor: '#63ACA3', flexShrink: 0 }}
                >
                  <img src={ICONS.report1} alt="" />
                </div>
                <div className="rep-up relative">
                  <label
                    className="inputLabel"
                    style={{
                      color: '#344054',
                      position: 'absolute',
                      left: '9px',
                      top: '-6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Report Types
                  </label>

                  <Select
                    options={options1}
                    value={options1.find(
                      (opt) => opt.value === filters.report_type
                    )}
                    onChange={(value) =>
                      handleChange('report_type', value?.value!)
                    }
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '12px',
                        fontWeight: '500',
                        borderRadius: '.40rem',
                        border: 'none',
                        outline: 'none',
                        width: 'fit-content',
                        minHeight: 'unset',
                        height: '8px',
                        alignContent: 'center',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        boxShadow: 'none',
                        marginTop: '18px',
                      }),
                      placeholder: (baseStyles) => ({
                        ...baseStyles,
                        color: '#0493CE', // Change the placeholder color here
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
                        marginLeft: '-18px',
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '12px',
                        color: state.isSelected ? '#ffffff' : '#000000',
                        backgroundColor: state.isSelected
                          ? '#377CF6'
                          : '#ffffff',
                        '&:hover': {
                          backgroundColor: state.isSelected
                            ? '#377CF6'
                            : '#DDEBFF',
                        },
                      }),
                      singleValue: (baseStyles, state) => ({
                        ...baseStyles,
                        color: '#292929',
                      }),
                      menu: (baseStyles) => ({
                        ...baseStyles,
                        width: '7rem',
                        zIndex: 999,
                        marginLeft: '-31px',
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
              </div>

              <div className="ar-dash-head-input" style={{ width: '134px' }}>
                <div
                  className="rep-drop_label"
                  style={{ backgroundColor: '#C470C7', flexShrink: 0 }}
                >
                  <img src={ICONS.user} alt="" />
                </div>
                <div className="rep-up relative">
                  <label
                    className="inputLabel"
                    style={{
                      color: '#344054',
                      position: 'absolute',
                      left: '8px',
                      top: '-6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Sales Partner
                  </label>
                  <Select
                    options={options2}
                    value={options1.find(
                      (opt) => opt.value === filters.sale_partner
                    )}
                    onChange={(value) =>
                      handleChange('sale_partner', value?.value!)
                    }
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '12px',
                        fontWeight: '500',
                        borderRadius: '.40rem',
                        border: 'none',
                        outline: 'none',
                        width: 'fit-content',
                        minHeight: 'unset',
                        height: '8px',
                        alignContent: 'center',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        marginRight: '11px',
                        boxShadow: 'none',
                        marginBottom: '2px',
                        marginTop: '18px',
                      }),
                      placeholder: (baseStyles) => ({
                        ...baseStyles,
                        color: '#0493CE', // Change the placeholder color here
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
                        marginLeft: '-18px',
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '12px',
                        color: state.isSelected ? '#ffffff' : '#000000',
                        backgroundColor: state.isSelected
                          ? '#377CF6'
                          : '#ffffff',
                        '&:hover': {
                          backgroundColor: state.isSelected
                            ? '#377CF6'
                            : '#DDEBFF',
                        },
                      }),
                      singleValue: (baseStyles, state) => ({
                        ...baseStyles,
                        color: '#292929',
                      }),
                      menu: (baseStyles) => ({
                        ...baseStyles,
                        width: '6rem',
                        marginLeft: '-31px',
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
              </div>

              <div className="ar-dash-head-input" style={{ width: '115px' }}>
                <div
                  className="rep-drop_label"
                  style={{ backgroundColor: '#8E81E0', flexShrink: 0 }}
                >
                  <img src={ICONS.vector} alt="" />
                </div>
                <div className="rep-up">
                  <label
                    className="inputLabel"
                    style={{ color: '#344054', marginLeft: '8px' }}
                  >
                    Includes
                  </label>
                  <ArDropdownWithCheckboxes
                    resetPagination={resetPagination}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                    options={options}
                  />
                </div>
              </div>

              <div className="ar-dash-head-input">
                <div
                  className="rep-drop_label"
                  style={{ backgroundColor: '#EE824D', flexShrink: 0 }}
                >
                  <img src={ICONS.element} alt="" />
                </div>
                <div className="rep-up relative">
                  <label
                    className="inputLabel"
                    style={{
                      color: '#344054',
                      position: 'absolute',
                      left: '9px',
                      top: '-6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Sort By
                  </label>
                  <Select
                    options={options3}
                    value={options3.find(
                      (opt) => opt.value === filters.sort_by
                    )}
                    onChange={(value) => handleChange('sort_by', value?.value!)}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '12px',
                        fontWeight: '500',
                        borderRadius: '.40rem',
                        border: 'none',
                        outline: 'none',
                        width: 'fit-content',
                        minHeight: 'unset',
                        height: '8px',
                        alignContent: 'center',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        boxShadow: 'none',
                        marginBottom: '2px',
                        marginTop: '18px',
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
                        marginLeft: '-18px',
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '12px',
                        color: state.isSelected ? '#ffffff' : '#000000',
                        backgroundColor: state.isSelected
                          ? '#377CF6'
                          : '#ffffff',
                        '&:hover': {
                          backgroundColor: state.isSelected
                            ? '#377CF6'
                            : '#DDEBFF',
                        },
                      }),
                      singleValue: (baseStyles, state) => ({
                        ...baseStyles,
                        color: '#292929',
                      }),
                      menu: (baseStyles) => ({
                        ...baseStyles,
                        width: '8rem',
                        // height: 'auto',
                        // overflowY: 'auto',
                        zIndex: 999,
                        marginLeft: '-32px',
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
              </div>
            </div>

            <div className="dashboard-payroll">
              <div className="Line-container">
                <div className="ar-line-graph">
                  <div
                    className={`rep-filter-line ${
                      active === 0 ? 'rep-active-filter-line' : ''
                    }`}
                    onClick={() => setActive(0)}
                  >
                    {active === 0 ? (
                      <img src={ICONS.dashActive} alt="" />
                    ) : (
                      <img src={ICONS.dashActive} alt="" />
                    )}
                  </div>
                  <div
                    className={`filter-disable ${
                      active === 1 ? 'rep-active-filter-line' : ''
                    }`}
                    // onClick={() => setActive(1)}
                    style={{ backgroundColor: '#377CF6' }}
                  >
                    {active === 1 ? (
                      <img src={ICONS.viewActive} alt="" />
                    ) : (
                      <img src={ICONS.viewActive} alt="" />
                    )}
                  </div>
                  <div
                    className="rep-filter-line relative"
                    onClick={() => setFilterModal(true)}
                    style={{ backgroundColor: '#377CF6' }}
                  >
                    {isActive[pathname] && (
                      <span
                        className="absolute"
                        style={{
                          border: '1px solid #fff',
                          borderRadius: '50%',
                          backgroundColor: '#2DC74F',
                          width: 8,
                          height: 8,
                          top: 0,
                          right: -2,
                        }}
                      ></span>
                    )}
                    <img
                      src={ICONS.fil_white}
                      alt=""
                      style={{ height: '15px', width: '15px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FilterHoc
          isOpen={filterModal}
          resetOnChange={false}
          handleClose={filterClose}
          columns={Commissioncolumns}
          page_number={1}
          page_size={10}
          fetchFunction={fetchFunction}
        />

        <div className="" style={{ marginTop: '8px' }}>
          {active === 0 && (
            <ArDashBoardTable
              additionalFilter={additionalFilter}
              includedFilter={selectedOptions}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};
