import { ICONS } from '../../../resources/icons/Icons';
import { IoAddSharp } from 'react-icons/io5';
import '../../oweHub/configure/configure.css';
import React, { useEffect } from 'react';
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
}
interface OptionType {
  value: string;
  label: string;
}

const DataTableHeader = (props: TableProps) => {
  const dispatch = useAppDispatch();

  const {
    title,
    onPressFilter,
    onPressImport,
    selectMarginLeft,
    selectMarginLeft1,
  } = props;

  useEffect(() => {
    dispatch(getDataTableName({ get_all_table: false }));
  }, []);

  return (
    <div className="commissionSection">
      <h3>{title}</h3>

      <div className="data-header-section">
        <div className="search-container-data">
          {props.showSelectIcon && (
            <Select
              isSearchable
              value={''}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  marginTop: 'px',
                  borderRadius: '8px',
                  outline: 'none',
                  color: 'black',
                  width: '200px',
                  fontSize: '13px',
                  border: '1px solid #d0d5dd',
                  marginRight: selectMarginLeft,
                  cursor: 'pointer',
                }),
                indicatorSeparator: () => ({
                  display: 'none', // Hide the indicator separator
                }),
                option: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: '13px',
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 999,
                  width: '200px',
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

export default DataTableHeader;
