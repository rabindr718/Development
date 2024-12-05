/**
 * Created by Ankit Chuahan on 17/01/24
 * File Name: ActionButton
 * Product Name: WebStorm
 * Project Name: commission_app
 * Path: src/ui/components/button
 */

import React from 'react';
import './ActionButton.css';

interface ActionButtonProps {
  title: string;
  type: 'submit' | 'button' | 'reset';
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const ActionButton = (props: ActionButtonProps) => {
  const { title, type, disabled, onClick, style } = props;
  return (
    <button
      style={style}
      className={
        title?.toLowerCase() === 'cancel' || title?.toLowerCase() === 'reset'
          ? 'cancel'
          : 'loginButton'
      }
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
