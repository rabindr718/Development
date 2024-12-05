import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './styles/HistoryRedirect.module.css';
import ThreeDotsImage from './Modals/Modalimages/ThreeDots.svg';
import useEscapeKey from '../../hooks/useEscape';
import { Tooltip } from 'react-tooltip';

interface HistoryRedirectProps {
  setArchive: (value: boolean) => void;
}

// { setArchive }: HistoryRedirectProps

const HistoryRedirect = () => {
  const [modenIsOpenX, setModalOpenClick] = useState(false);
  const navigate = useNavigate();
  const clickableDivRef = useRef<HTMLDivElement>(null);

  const handleHistory = () => {
    navigate('/leadmng-dashboard/leadmng-records');
  };

  const ArchivesTable = () => {
    // setArchive(true);
    navigate('/leadmng-dashboard/lead-dashboard-archives');
  };

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

  const handleClose = () => {
    setModalOpenClick(false);
  }

  useEscapeKey(handleClose)


  // ***NOT WRITE INSIDE BUTTONS DUE TO INCREASE BUTTONS INSIDE ITEMS***

  return (
    <div className="relative drop-ref-container" ref={clickableDivRef}>
      <div className={classes.filtericonHistory} onClick={HistoryButtonCalled} data-tooltip-id="More Pages">
        <img
          className={classes.ICONSTYLETHREEDOT}
          src={ThreeDotsImage}
          alt=""
          width="100"
          height="100"
        />
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
        className={classes.mobile_tooltip}
        offset={8}
        delayShow={800}
        id="More Pages"
        place="top"
        content="More Pages"
      />
      {modenIsOpenX && (
        <div
          id="dropdowninHistoryRedirectXR"
          className="pr-dropdown editedinParentXR"
        // className={`${classes.prdropdownX} editedinParent`}
        >
          <ul>
            <li style={{ color: '#000 !important' }} onClick={handleHistory}>
              Records{' '}
            </li>
            <li style={{ color: '#000 !important' }} onClick={ArchivesTable}>
              {' '}
              Archives
            </li>
          </ul>
        </div>
      )}
      {/* )} */}
    </div>
  );
};

export default HistoryRedirect;
