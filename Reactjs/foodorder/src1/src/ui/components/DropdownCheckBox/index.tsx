import React, { useState, useEffect, useRef, memo } from 'react';
import '../../leaderboard/components/Banner.css';
import '../text_input/Input.css';
import './styles/index.css';
import { BiChevronDown } from 'react-icons/bi';
import SelectOption from '../selectOption/SelectOption';
import '../../oweHub/reppay/reppaydashboard/DropdownWithCheckboxes.css';

interface Option {
  label: string;
  value: string;
}

interface DropdownCheckboxProps {
  options: Option[];
  selectedOptions: Option[];
  onChange: (selectedOptions: Option[]) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

const DropdownCheckbox: React.FC<DropdownCheckboxProps> = ({
  options,
  selectedOptions,
  onChange,
  placeholder = 'Search...',
  label,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionContainer = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setFilteredOptions([...options]);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent|TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement)!.closest('.react-select')
      ) {
        setIsOpen(false);
        setSearch('');
        setFilteredOptions(options);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {document.removeEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside);
    };
  }, [options]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase().trimStart();
    const regex = /^[a-zA-Z0-9\s]*$/; // Alphanumeric and space only
    if (!regex.test(searchTerm)) {
      return; // Ignore input if it contains special characters
    }

    setSearch(searchTerm);

    if (searchTerm) {
      const filtered = options.filter((item) =>
        item.label.toLowerCase().includes(searchTerm)
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([...options]);
    }
  };
  const handleOptionChange = (option: Option) => {
    let updatedSelection: Option[];

    if (option.value === 'ALL') {
      updatedSelection =
        selectedOptions.length === options.length ? [] : options;
    } else {
      if (selectedOptions.some((item) => item.value === option.value)) {
        updatedSelection = selectedOptions.filter(
          (item) => item.value !== option.value
        );
      } else {
        updatedSelection = [...selectedOptions, option];
        optionContainer.current?.scroll({ top: 0, behavior: 'smooth' });
      }
      if (
        updatedSelection.length === options.length - 1 &&
        options.some((opt) => opt.value === 'ALL')
      ) {
        updatedSelection = [...options];
      }
    }
    onChange(updatedSelection);
  };

  // Handle closing dropdown on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelectAll = () => {
    onChange(selectedOptions.length === options.length ? [] : options);
  };

  const isAllSelected =
    selectedOptions.length === options.length ||
    selectedOptions.some((item) => item.value === 'ALL');
  const sortedOptions = filteredOptions.sort((a, b) => {
    const aIsSelected = selectedOptions.some((item) => item.value === a.value);
    const bIsSelected = selectedOptions.some((item) => item.value === b.value);
    if (aIsSelected === bIsSelected) {
      return 0;
    }
    if (aIsSelected) {
      return -1;
    }
    return 1;
  });
  return (
    <div className="dropdown-checkbox relative bg-white" ref={dropdownRef}>
      <div
        className={`dropdown-toggle flex items-center ${disabled ? 'disabled-dropdown' : ''} ${isOpen ? 'active' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{
          padding: '7px 1rem', // Apply padding directly or from your CSS
          border: `1px solid ${isOpen ? 'var(--primary-color)' : 'var(--input-border-color)'}`,
          transition: 'all 0.3s ease',
        }}
      >
        <span>{`${selectedOptions.length} ${label}`}</span>
        <BiChevronDown
          className="ml1"
          size={22}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 550ms ease',
          }}
        />
      </div>
      {isOpen && (
        <div
          ref={optionContainer}
          className="dropdown-menu scrollbar"
          style={{ overflowX: 'clip' }}
        >
          <input
            type="text"
            className={`input input-drop-check ${search ? 'active' : ''}`}
            style={{ paddingInline: 0, paddingLeft: 6 }}
            placeholder={placeholder}
            value={search}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={50}
          />
          {!!(!search && options.length) && (
            <div className="dropdown-item">
              <input
                type="checkbox"
                className={disabled ? 'disabled-checkbox' : ''}
                checked={isAllSelected}
                onChange={() => !disabled && handleSelectAll()}
              />
              <span className={disabled ? 'disbaled-label' : ''}>All</span>
            </div>
          )}
          {sortedOptions.length > 0 ? (
            sortedOptions.map((option, index) => (
              <div key={index} className="dropdown-item">
                <input
                  type="checkbox"
                  style={{ flexShrink: 0 }}
                  className={disabled ? 'disabled-checkbox' : ''}
                  checked={selectedOptions.some(
                    (item) => item.value === option.value
                  )}
                  onChange={() => !disabled && handleOptionChange(option)}
                />
                <span className={disabled ? 'disbaled-label' : ''}>
                  {option.label}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center h5 mt4 text-dark">No data found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(DropdownCheckbox);
