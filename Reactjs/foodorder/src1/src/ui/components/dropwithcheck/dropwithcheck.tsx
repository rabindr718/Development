import React, { useState, useEffect, useRef, SetStateAction } from 'react';
import './DropWithCheck.css';

interface Option {
  label: string;
  value: string;
  key: string;
}

interface DropWithCheckProps {
  options: Option[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<SetStateAction<string[]>>;
}

interface DropIconProps {
  style?: React.CSSProperties;
}

const DropIcon: React.FC<DropIconProps> = ({ style }) => {
  return (
    <svg
      style={{ flexShrink: 0, ...style }} // Apply custom styles passed via props
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

const DropWithCheck: React.FC<DropWithCheckProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dropDownOptions, setDropDownOptions] = useState<Option[]>(options); // Set initial options as default
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch(''); // Reset search when closing dropdown
        setDropDownOptions(options); // Reset dropdown options when closing
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setSearch('');
        setDropDownOptions(options);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [options]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setDropDownOptions(options);
    }
  };

  useEffect(() => {
    setDropDownOptions(options);
  }, [options]);

 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''); // Prevent special characters
  
    if (inputValue.length > 50) {
      inputValue = inputValue.slice(0, 50); // Limit input to 50 characters
    }
  
    setSearch(inputValue);
  
    if (inputValue.trim()) {
      setDropDownOptions(
        options
          .filter((item) => item.value.toLowerCase().includes(inputValue.toLowerCase().trim()))
          .slice(0, 50) // Limit search results to 50 items
      );
    } else {
      setDropDownOptions(options.slice(0, 50)); // Show first 50 items if no search
    }
  };
  
  const handleOptionChange = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (option === 'All') {
        if (prevSelectedOptions.length === options.length) {
          return [];
        } else {
          return options.map((o) => o.value);
        }
      } else {
        const updatedOptions = prevSelectedOptions.filter((o) => o !== 'All');
        if (updatedOptions.includes(option)) {
          return updatedOptions.filter((o) => o !== option);
        } else {
          let newSelection = [...updatedOptions, option];
          if (newSelection.length + 1 === options.length && !newSelection.includes('All')) {
            newSelection.push('All');
          }
          return newSelection;
        }
      }
    });
  };

  return (
    <div className={`comm-dropdown-container ${isOpen ? 'active' : ''}`} ref={dropdownRef}>
      <div className={`comm-dropdown-toggle ${isOpen ? 'active' : ''}`} onClick={toggleDropdown}>
        <span className="comm-toggle-text">
          {selectedOptions.length > 0 ? (
            selectedOptions.includes('All') ? (
              'All'
            ) : (
              <>
                <span className="selected-text">Selected</span>{' '}
                <span className="selected-count">{selectedOptions.length}</span>
              </>
            )
          ) : (
            'Select Dealer'
          )}
        </span>
        <DropIcon
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 550ms ease',
          }}
        />
      </div>
      {isOpen && (
        <div className="scrollbar comm-dropdown-menu">
          <div className="searchBox team-input-wrap">
            <input
              type="text"
              className="input"
              placeholder="Search Dealers"
              style={{ width: '100%' }}
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          {dropDownOptions.map((option, ind) => (
            <div key={ind} className="comm-dropdown-item">
              <input
                type="checkbox"
                style={{ flexShrink: 0 }}
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionChange(option.value)}
              />
              <p>{option.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropWithCheck;
