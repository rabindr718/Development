import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './index.module.css';
import ThreeDotsImage from './stylesFolder/ThreeDots.svg';
import { CiFilter } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa';
import useEscapeKey from '../../../../../hooks/useEscape';
import { Tooltip } from 'react-tooltip';
interface HistoryRedirectProps {
  setArchive: (value: boolean) => void;
}

interface SelectedValueState {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

const LeadTableFilter: React.FC<SelectedValueState> = ({ selectedValue = 'ALL', setSelectedValue }) => {
  const [modenIsOpenX, setModalOpenClick] = useState(false);
  const clickableDivRef = useRef<HTMLDivElement>(null);
  const HistoryButtonCalled = () => {
    setModalOpenClick((prevState) => !prevState);
  };
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const target = event.target as Node;

    if (clickableDivRef.current && !clickableDivRef.current.contains(target)) {
      setModalOpenClick(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);



  const handleItemClick = (value: string) => {
    setSelectedValue(value);
    setModalOpenClick(false);
  };

  const handleClose = () => {
    setModalOpenClick(false);
  }

  useEscapeKey(handleClose)

  return (
    <div className="relative drop-ref-container" ref={clickableDivRef}>
      <div className={classes.filtericonLead} onClick={HistoryButtonCalled} data-tooltip-id="Filters">
        {selectedValue !== 'ALL' &&
          <span style={{
            border: '1px solid rgb(255, 255, 255)',
            borderRadius: '50%',
            backgroundColor: 'rgb(45, 199, 79)',
            width: '8px',
            height: '8px',
            top: '0px',
            right: '-2px',
            position: 'absolute'
          }}></span>
        }
        <FaFilter size={14} fontWeight={600} />

      </div>
      <Tooltip
        style={{
          zIndex: 20,
          background: '#f7f7f7',
          color: '#000',
          fontSize: 12,
          paddingBlock: 4,
          fontWeight: "400"
        }}
        offset={8}
        delayShow={800}
        id="Filters"
        place="top"
        content="Filters"
        className={classes.mobile_tooltip}
      />
      {modenIsOpenX && (
        <div id="dropdowninHistoryRedirect" className="pr-dropdown editedinParentLT_FLTR">
          <ul>


            <li
              className={`${classes.selectedFilter} ${selectedValue === 'ALL' ? classes.active : ''}`}
              onClick={() => handleItemClick('ALL')}
            >
              All{' '}
            </li>


            <li
              className={`${classes.selectedFilter} ${selectedValue === 'DEAL_WON' ? classes.active : ''}`}
              onClick={() => handleItemClick('DEAL_WON')}
            >

              Deal Won
            </li>


            <li
              className={`${classes.selectedFilter} ${selectedValue === 'APPOINTMENT_ACCEPTED' ? classes.active : ''}`}
              onClick={() => handleItemClick('APPOINTMENT_ACCEPTED')}
            >
              Appointment Accepted{' '}
            </li>
            <li className={`${classes.selectedFilter} ${selectedValue === 'APPOINTMENT_SENT' ? classes.active : ''}`}

              onClick={() => handleItemClick('APPOINTMENT_SENT')}
            >
              {' '}
              Appointment Sent
            </li>
            <li className={`${classes.selectedFilter} ${selectedValue === 'PROPOSAL_IN_PROGRESS' ? classes.active : ''}`}

              onClick={() => handleItemClick('PROPOSAL_IN_PROGRESS')}
            >
              Proposal In Progress{' '}
            </li>
            <li className={`${classes.selectedFilter} ${selectedValue === 'APPOINTMENT_NOT_REQUIRED' ? classes.active : ''}`}

              onClick={() => handleItemClick('APPOINTMENT_NOT_REQUIRED')}
            >
              {' '}
              Appointment Not Required
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeadTableFilter;