import React, { useState } from 'react';
import { BiCopy, BiCopyAlt } from 'react-icons/bi';
import { successSwal } from '../../../components/alert/ShowAlert';

// Define the interface for props
interface SecurityTokenProps {
  token: string;
}

const SecurityToken: React.FC<SecurityTokenProps> = ({ token }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    successSwal('Copied', 'Token Copied successfully!');
  };
  return (
    <div className="copy_container">
      <p>••••••••••••••</p>
      <BiCopyAlt size={22} onClick={copyToClipboard} />
    </div>
  );
};

export default SecurityToken;
