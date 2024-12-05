import React, { useState } from 'react';
import { MarketingFeeModel } from '../../../core/models/configuration/create/MarketingFeeModel';

interface marketingProps {
  handleClose: () => void;
  editMode: boolean;
  marketingData: MarketingFeeModel | null;
}

const TableAccordian = ({}) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <img alt="" src=""></img>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="accordion-content">{}</div>}
    </div>
  );
};

export default TableAccordian;
