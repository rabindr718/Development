import React, { useState, useRef, useEffect } from 'react';
import classes from './index.module.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { usePopper } from 'react-popper';
import useEscapeKey from '../../../../../hooks/useEscape';
import { Tooltip } from 'react-tooltip';


interface DropDownLibraryProps {
  selectedType: string;
  onSelectType: (type: string) => void;
  cb?: () => void;
  disabledOptions?: string[];
}

const ChangeStatus: React.FC<DropDownLibraryProps> = ({
  selectedType,
  onSelectType,
  cb,
  disabledOptions = [],
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  }

  useEscapeKey(handleClose)

  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLUListElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'bottom'],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: 'clippingParents',
        },
      },
    ],
  });


  const toggleDropdown = () => {
    setIsVisible(!isVisible);
    setIsClicked(!isClicked);
    cb?.();
  };

  const handleSelect = (type: string) => {
    if (!disabledOptions.includes(type)) {
      onSelectType(type);
      setIsVisible(false);
      setIsClicked(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperElement &&
        referenceElement &&
        !popperElement.contains(event.target as Node) &&
        !referenceElement.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popperElement, referenceElement]);

  return (
    <div className={classes.dropdown_container}>
      <div
        ref={setReferenceElement}
        onMouseEnter={() => setIsHovered(true)}
        onClick={toggleDropdown}
        onMouseLeave={() => setIsHovered(false)}
        className={classes.verticalDots2}
        data-tooltip-id="infoSt"
      >
        <BsThreeDotsVertical />
      </div>
      <Tooltip
        style={{
          zIndex: 20,
          background: '#f7f7f7',
          color: '#000',
          fontSize: 12,
          paddingBlock: 4,
        }}
        offset={8}
        delayShow={800}
        id="infoSt"
        place="top"
        content="Status Updates"
        className={classes.mobile_tooltip}
      />

      {isVisible && (
        <ul ref={setPopperElement}
          style={{
            ...styles.popper,
            marginRight: '-10px',
            marginTop: '10px',
          }}
          {...attributes.popper} className={classes.dropdownMenu}>
          <li
            onClick={() => handleSelect('Deal Won')}
            className={`${classes.dropdownItem} ${selectedType === 'Deal Won' ? classes.selected : ''
              } ${disabledOptions.includes('Deal Won') ? classes.disabled : ''}`}
          >
            Deal Won
          </li>
          <li
            onClick={() => handleSelect('Deal Loss')}
            className={`${classes.dropdownItem} ${selectedType === 'Deal Loss' ? classes.selected : ''
              } ${disabledOptions.includes('Deal Loss') ? classes.disabled : ''}`}
          >
            Deal Loss
          </li>
          <li
            onClick={() => handleSelect('Appointment Not Required')}
            className={`${classes.dropdownItem} ${selectedType === 'Appointment Not Required' ? classes.selected : ''
              } ${disabledOptions.includes('Appointment Not Required')
                ? classes.disabled
                : ''
              }`}
          >
            Appointment Not Required
          </li>



          <li
            onClick={() => handleSelect('Complete as Won')}
            className={`${classes.dropdownItem} ${selectedType === 'Complete as Won' ? classes.selected : ''
              } ${disabledOptions.includes('Complete as Won')
                ? classes.disabled
                : ''
              }`}
          >
            Complete as Won
          </li>


          <li
            onClick={() => handleSelect('Mark QC Complete')}
            className={`${classes.dropdownItem} ${selectedType === 'Mark QC Complete' ? classes.selected : ''
              } ${disabledOptions.includes('Mark QC Complete')
                ? classes.disabled
                : ''
              }`}
          >
            Mark QC Complete
          </li>
        </ul>
      )}
    </div>
  );
};

export default ChangeStatus;