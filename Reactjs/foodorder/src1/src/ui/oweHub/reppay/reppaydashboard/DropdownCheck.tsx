import React, { useState, useEffect, useRef, SetStateAction } from 'react';
import './DropdownWithCheckboxes.css';
import { useAppDispatch } from '../../../../redux/hooks';

interface Option {
  label: string;
  value: string;
  key: string;
}

const options: Option[] = [
  { value: 'All', label: 'All', key: 'all' },
  { value: 'AP-OTH', label: 'AP-OTH', key: 'ap_oth' },
  { value: 'AP-PDA', label: 'AP-PDA', key: 'ap_pda' },
  { value: 'AP-ADV', label: 'AP-ADV', key: 'ap_adv' },
  { value: 'AP-DED', label: 'AP-DED', key: 'ap_ded' },
  { value: 'REP-COMM', label: 'REP-COMM', key: 'rep_comm' },
  { value: 'REP BONUS', label: 'REP BONUS', key: 'rep_bonus' },
  { value: 'LEADER-OVERRIDE', label: 'LEADER-OVRD', key: 'leader_ovrd' },
];
const DropIcon = () => {
  return (
    <svg
      style={{ flexShrink: 0 }}
      height="20"
      width="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      className="css-tj5bde-Svg"
    >
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const DropdownWithCheckboxes = ({
  isOpen,
  setIsOpen,
  selectedOptions,
  setSelectedOptions,
  resetPage,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<SetStateAction<string[]>>;
  resetPage: () => void;
}) => {
  const dispatch = useAppDispatch();
  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  console.log(selectedOptions, 'optionssss');
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent|TouchEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.closest('.dropdown-toggle') &&
        !(event.target as HTMLElement)!.closest('.react-select')
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionChange = (option: string, key: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (option === 'All') {
        if (prevSelectedOptions.length === options.length) {
          return [];
        } else {
          // If not all options are selected, select them all
          return options.map((o) => o.value);
        }
      } else {
        const updatedOptions = prevSelectedOptions.filter((o) => o !== 'All');
        if (updatedOptions.includes(option)) {
          return updatedOptions.filter((o) => o !== option);
        } else {
          let arr = [...updatedOptions, option];
          if (arr.length + 1 === options.length && !arr.includes('All')) {
            arr.push('All');
          }
          return arr;
        }
      }
    });
    resetPage();
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        <span className="toggle-text">
          {selectedOptions.length > 0
            ? selectedOptions.includes('All')
              ? 'All'
              : ''
            : 'All'}
        </span>
        {selectedOptions.length > 0 && !selectedOptions.includes('All') && (
          <span className="selected-count">{selectedOptions.length}</span>
        )}
        <DropIcon />
      </div>
      {isOpen && (
        <div className=" scrollbar dropdown-menu ">
          {options.map((option) => (
            <div key={option.value} className="dropdown-item">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionChange(option.value, option.key)}
              />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownWithCheckboxes;
