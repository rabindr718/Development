import React, { useState, useRef, useEffect } from 'react';
import classes from './index.module.css';
import { CiFilter } from 'react-icons/ci';
import useEscapeKey from '../../../../../hooks/useEscape';

interface DropDownLibraryProps {
    selectedType: string;
    onSelectType: (type: string) => void;
    cb?: () => void
}

const FilterDropDown: React.FC<DropDownLibraryProps> = ({
    selectedType,
    onSelectType,
    cb
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const dropdownRef = useRef<HTMLUListElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        setIsVisible(!isVisible);
        setIsClicked(!isClicked);
        cb?.()
    };

    const handleSelect = (type: string) => {
        onSelectType(type);
        setIsVisible(false);
        setIsClicked(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                dropdownRef.current &&
                buttonRef.current &&
                !dropdownRef.current.contains(target) &&
                !buttonRef.current.contains(target)
            ) {
                setIsVisible(false);
                setIsClicked(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
      }
    
      useEscapeKey(handleClose)

    return (
        <div className={classes.dropdown_container}>
            <div
                ref={buttonRef}
                onMouseEnter={() => setIsHovered(true)}
                onClick={toggleDropdown}
                onMouseLeave={() => setIsHovered(false)}
                className={classes.verticalDots2}
            >
                <CiFilter />
            </div>

            {isVisible && (
                <ul ref={dropdownRef} className={classes.dropdownMenu}>
                    <li
                        onClick={() => handleSelect('All')}
                        className={`${classes.dropdownItemAll} ${selectedType === 'All' ? classes.selected : ''}`}
                    >
                        All
                    </li>
                    <li
                        onClick={() => handleSelect('All')}
                        className={`${classes.dropdownItemAll} ${selectedType === 'All' ? classes.selected : ''}`}
                    >
                        Deal Won
                    </li>
                    <li
                        onClick={() => handleSelect('Excel')}
                        className={`${classes.dropdownItem} ${selectedType === 'Excel' ? classes.selected : ''}`}
                    >
                        Appointment Accepted
                    </li>
                    <li
                        onClick={() => handleSelect('Excel')}
                        className={`${classes.dropdownItem} ${selectedType === 'Excel' ? classes.selected : ''}`}
                    >
                        Appointment Sent
                    </li>
                    <li
                        onClick={() => handleSelect('Excel')}
                        className={`${classes.dropdownItem} ${selectedType === 'Excel' ? classes.selected : ''}`}
                    >
                        Proposal In Progress
                    </li>
                    <li
                        onClick={() => handleSelect('PDF Format')}
                        className={`${classes.dropdownItem} ${selectedType === 'PDF Format' ? classes.selected : ''}`}
                    >
                        Appointment Not Required
                    </li>
                </ul>
            )}
        </div>
    );
};

export default FilterDropDown;
