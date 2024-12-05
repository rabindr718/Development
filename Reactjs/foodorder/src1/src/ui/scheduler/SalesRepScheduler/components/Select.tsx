import React, { useState, useEffect, useRef, memo } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import styles from './Select.module.css';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  selectedOptions: SelectOption[];
  onChange: (selectedOptions: SelectOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  selectBoxStyle?: React.CSSProperties; // Custom style for select box
  dropdownStyle?: React.CSSProperties; // Custom style for dropdown
  optionStyle?: React.CSSProperties; // Custom style for each option
  selectedOptionStyle?: React.CSSProperties; // Custom style for selected option
}

const Select: React.FC<SelectProps> = ({
  options,
  selectedOptions,
  onChange,
  placeholder = 'Select...',
  disabled,
  className,
  style,
  selectBoxStyle, // Destructure selectBoxStyle
  dropdownStyle, // Destructure dropdownStyle
  optionStyle, // Destructure optionStyle
  selectedOptionStyle, // Destructure selectedOptionStyle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionChange = (option: SelectOption) => {
    const updatedSelectedOptions = selectedOptions[0]?.value === option.value ? [] : [option];
    onChange(updatedSelectedOptions);
    setIsOpen(false);
  };

  const isAllSelected = selectedOptions.length === options.length;

  return (
    <div ref={dropdownRef} className={`${styles.selectContainer} ${className}`} style={style}>
      <div
        className={`${styles.selectBox} ${isOpen ? styles.active : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={selectBoxStyle} // Apply custom style to select box
      >
        <span>
          {isAllSelected ? 'All Selected' : (selectedOptions.length > 0 ? selectedOptions.map(opt => opt.label).join(', ') : placeholder)}
        </span>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <BiChevronDown
          size={22}
          style={{
            transition: 'transform 0.3s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
        </div>
      </div>
      {isOpen && (
        <div className={styles.selectDropdown} style={dropdownStyle}>
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={index}
                className={`${styles.selectOption} ${selectedOptions.some(selected => selected.value === option.value) ? styles.selected : ''}`}
                onClick={() => handleOptionChange(option)}
                style={selectedOptions.some(selected => selected.value === option.value) ? selectedOptionStyle : optionStyle} // Apply styles based on selection
              >
                {option.label}
              </div>
            ))
          ) : (
            <div style={{ padding: '10px', textAlign: 'center' }}>
              No data found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Select);
