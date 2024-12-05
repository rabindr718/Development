import React, { memo } from 'react';
import '../styles/pendrev.css';
import { ICONS } from '../../../resources/icons/Icons';
import SortingDropDown from './SortingDropdown/SortingDropDown';
import PendingSurvey from './PendingSurvey';
import useMatchMedia from '../../../hooks/useMatchMedia';

const PendingReview: React.FC<{ isClicked: boolean; onToggleClick: () => void }> = ({ isClicked, onToggleClick }) => {
  const isMobile = useMatchMedia('(max-width:450px)');

  return (
    <div style={{ backgroundColor: isClicked ? '#fff' : '' , margin: isClicked? '0px 20px':''}} className="pen-rev">
<div style={{ padding: isClicked ? '15px 17px' : ''}} className="pen-rev-top" >
{/* style={{ background: isClicked && isMobile ? '#fff' : '#f5f5f5' }} */}
<div style={{paddingTop: isMobile && !isClicked ? '5px' : ''}} onClick={isMobile ? onToggleClick : undefined} className="pr-namesec">
          <img src={ICONS.BellPr} alt="" />
          <div className="notific">
            <p>12</p>
          </div>
          <div className="pr-nameadd">
            <h1>Pending Review</h1>
            <p>New jobs need to review</p>
          </div>
        </div>
        <div style={{ display: !isClicked && isMobile ? 'none' : 'block' }}>
          <SortingDropDown />
        </div>
      </div>
      {isClicked ? <hr className="figma-line" /> : ''}

      <div style={{ display: !isClicked && isMobile ? 'none' : 'block' }} className="pen-rev-bot">
        <PendingSurvey />
        <PendingSurvey />
        <PendingSurvey />
        <PendingSurvey />
        <PendingSurvey />
      </div>
    </div>
  );
};

export default memo(PendingReview);
