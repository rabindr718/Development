import React, { useEffect } from 'react';
import FilterModal from './FilterModal';
import './filterHoc.css';
import { useAppDispatch } from '../../../redux/hooks';
import { disableFilter } from '../../../redux/apiSlice/filterSlice/filterSlice';
import { useLocation } from 'react-router-dom';

interface Column {
  name: string;
  displayName: string;
  type: string;
}
interface TableProps {
  isOpen: boolean;
  handleClose: () => void;
  columns: Column[];
  page_number: number;
  page_size: number;
  fetchFunction: (req: any) => void;
  resetOnChange: boolean;
}
const FilterHoc = ({ isOpen = false, ...rest }: TableProps) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    return () => {
      dispatch(disableFilter({ name: pathname }));
    };
  }, []);
  return (
    <div className={`filter-modal ${isOpen ? 'modal-open' : 'modal-close'} `}>
      <FilterModal {...rest} />
    </div>
  );
};

export default FilterHoc;
