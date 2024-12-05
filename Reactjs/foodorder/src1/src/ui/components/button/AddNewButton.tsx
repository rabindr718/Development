/**
 * Created by Ankit Chuahan on 17/01/24
 * File Name: ActionButton
 * Product Name: WebStorm
 * Project Name: commission_app
 * Path: src/ui/components/button
 */

import React from 'react';
import './ActionButton.css';
// import { ICONS } from '../../../resources/icons/Icons';
import { MdAdd } from 'react-icons/md';

interface ActionButtonProps {
  title: string;
  onClick: () => void;
}

export const AddNewButton = (props: ActionButtonProps) => {
  const { title, onClick } = props;
  return (
    <div className="iconsSection2 iconSection2-mobile">
      <button
        type="button"
        style={{}}
        onClick={onClick}
      >
        <MdAdd style={{ flexShrink: 0 }} size={12} />
        <span className="mobileTitle">{title}</span>
      </button>
    </div>
  );
};
