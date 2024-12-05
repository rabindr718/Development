import React, { useEffect, useRef, useState, useCallback } from 'react';
import classes from './styles/sortby.module.css';
import { FaChevronDown } from 'react-icons/fa6';

interface SortByLibraryProps {
  onSort: (option:'name' | 'date' | 'size') => void;
  isPalceholder?: boolean;
}

const SortByLibrary: React.FC<SortByLibraryProps> = ({ onSort,isPalceholder=true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    'name' | 'date' | 'size'
  >('date');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSortChange = (option:'name' | 'date' | 'size') => {
    setSelectedOption(option);
    onSort(option);
    setIsVisible(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={classes.sortby_container} ref={dropdownRef}>
      <button
        onClick={handleClick}
        className={`${classes.logo_sortby_botton} ${isVisible ? classes.active : ''}`}
      >
        {isPalceholder?"Sort by":""} {selectedOption.replace(selectedOption[0], selectedOption[0].toUpperCase())}
        <FaChevronDown
          className={`${classes.icon} ${isVisible ? classes.icon_active : ''}`}
        />
      </button>

      {isVisible && (
        <ul className={classes.dropdownMenu}>
          {['name', 'date'].map((option) => (
            <li
              key={option}
              onClick={() =>
                handleSortChange(option as 'name' | 'date' | 'size')
              }
              className={`${classes.dropdownItem} ${selectedOption === option ? classes.selected : ''}`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortByLibrary;
