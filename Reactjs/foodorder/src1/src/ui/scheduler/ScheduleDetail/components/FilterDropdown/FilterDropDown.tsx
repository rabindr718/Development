import React, { useState, useEffect, useRef } from 'react';
import { RiFilterLine } from 'react-icons/ri';
import styles from './styles/index.module.css';

const FilterDropDown = ({
  onChange,
}: {
  onChange?: (str: string[]) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(['all', 'available', 'distance']);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let arr: string[] = [];
    if (e.target.name === 'all' && selected.includes('all')) {
      arr = [];
    } else if (e.target.name === 'all' && !selected.includes('all')) {
      arr = ['all', 'available', 'distance'];
    } else {
      arr = selected.includes(e.target.name)
        ? selected.filter((item) => item !== e.target.name && item !== 'all')
        : [...selected, e.target.name];
    }
    setSelected([...arr]);
    onChange?.(arr);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex ml2 items-center justify-center ${styles.filter_btn}`}
      >
        <RiFilterLine color="#377CF6" size={16} />{' '}
      </button>
      {isOpen && (
        <div className={styles.dropdown_container}>
          <div className="flex items-center">
            <input
              checked={
                (selected.includes('available') &&
                  selected.includes('distance')) ||
                selected.includes('all')
              }
              onChange={(e) => handleChange(e)}
              className={styles.input_check}
              type="checkbox"
              name="all"
              id="all"
            />
            <label htmlFor="all" className={`ml1 ${styles.check_label}`}>
              All
            </label>
          </div>

          <div className="flex items-center">
            <input
              className={styles.input_check}
              checked={
                selected.includes('available') || selected.includes('all')
              }
              onChange={(e) => handleChange(e)}
              type="checkbox"
              name="available"
              id="available"
            />
            <label htmlFor="available" className={`ml1 ${styles.check_label}`}>
              Available
            </label>
          </div>

          <div className="flex items-center">
            <input
              className={styles.input_check}
              onChange={(e) => handleChange(e)}
              checked={
                selected.includes('distance') || selected.includes('all')
              }
              type="checkbox"
              name="distance"
              id="distance"
            />
            <label htmlFor="distance" className={`ml1 ${styles.check_label}`}>
              Distance
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
