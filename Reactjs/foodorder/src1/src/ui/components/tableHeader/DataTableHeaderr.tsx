import { ICONS } from '../../../resources/icons/Icons';
import { IoAddSharp } from 'react-icons/io5';
import '../../oweHub/configure/configure.css';
import React, { SetStateAction, useEffect } from 'react';
import { BiSearch, BiChevronDown } from 'react-icons/bi';
import '../tableHeader/dataTableHeader.css';
import { getDataTableName } from '../../../redux/apiActions/dataTableAction';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import Select from 'react-select';
interface TableProps {
  title: string;
  onPressFilter: () => void;
  onPressImport: () => void;
  showImportIcon: boolean;
  showSelectIcon: boolean;
  showFilterIcon: boolean;
  selectMarginLeft?: string;
  selectMarginLeft1?: string;
  selectedTable: any;
  setSelectedTable: any;
  menuWidth?: string;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}

const DataTableHeaderr = (props: TableProps) => {
  const { option } = useAppSelector((state) => state.dataTableSlice);
  const dispatch = useAppDispatch();

  const {
    title,
    onPressFilter,
    onPressImport,
    selectMarginLeft,
    selectMarginLeft1,
    selectedTable,
    setSelectedTable,
  } = props;

  useEffect(() => {
    dispatch(getDataTableName({ get_all_table: false }));
  }, []);

  const tableOption = option?.map((opt: any) => ({
    value: opt.table_name,
    label: opt.table_name,
  }));

  const handleTableChange = (selectedOption: any | null) => {
    setSelectedTable(selectedOption);
    props.setCurrentPage(1);
  };

  return (
    <div className="commissionSection" style={{ textTransform: 'capitalize' }}>
      <h3>{title}</h3>

      <div className="data-header-section">
        <div className="search-container-data">
          {props.showSelectIcon && (
            <Select
              options={tableOption}
              value={selectedTable}
              onChange={handleTableChange}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  marginTop: 'px',
                  borderRadius: '8px',
                  outline: 'none',
                  color: 'black',
                  width: '219px',
                  fontSize: '13px',
                  border: '1px solid #d0d5dd',
                  marginRight: selectMarginLeft,
                  cursor: 'pointer',
                }),
                dropdownIndicator: (baseStyles, state) => ({
                  ...baseStyles,
                  color: '#0493CE',
                  '&:hover': {
                    color: '#0493CE',
                  },
                }),
                indicatorSeparator: () => ({
                  display: 'none',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  fontSize: '13px',
                  color: state.isSelected ? '#ffffff' : '#0000000',
                  backgroundColor: state.isSelected ? '#0493CE' : '#ffffff',
                  '&:hover': {
                    backgroundColor: state.isSelected ? '#0493CE' : '#DDEBFF',
                  },
                }),
                singleValue: (baseStyles, state) => ({
                  ...baseStyles,
                  color: '#0493CE',
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  width: props.menuWidth || '199px',
                  zIndex: 9999, // Add this line to set a higher zIndex value
                }),
              }}
            />
          )}
        </div>

        <div
          className="iconsSection-filter"
          style={{ marginRight: selectMarginLeft1 }}
        >
          {props.showFilterIcon && (
            <button type="button" onClick={onPressFilter}>
              <img
                src={ICONS.filtercomm}
                alt=""
                style={{ width: '15px', height: '15px' }}
              />
            </button>
          )}
        </div>
        <div className="iconsSection2">
          {props.showImportIcon && (
            <button type="button" onClick={onPressImport}>
              <img src={ICONS.importIcon} alt="" /> Import
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTableHeaderr;
