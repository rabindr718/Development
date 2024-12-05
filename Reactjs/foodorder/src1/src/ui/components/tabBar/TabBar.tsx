import React, { useState } from 'react';
import './TabBar.css';

interface TabBarProps {
  activeTab: string;
  handleTabClick: (tab: string) => void;
  title: string[];
}

const TabBar: React.FC<TabBarProps> = ({
  title,
  activeTab,
  handleTabClick,
}) => {
  return (
    <div className="tab-view">
      <div className="tab-buttons">
        <button
          className={activeTab === 'tab1' ? 'active' : 'inactive'}
          onClick={() => handleTabClick('tab1')}
        >
          {title[0]}
        </button>
        <button
          className={activeTab === 'tab2' ? 'active' : 'inactive'}
          onClick={() => handleTabClick('tab2')}
        >
          {title[1]}
        </button>
        <button
          className={activeTab === 'tab3' ? 'active' : 'inactive'}
          onClick={() => handleTabClick('tab3')}
        >
          {title[2]}
        </button>
      </div>
    </div>
  );
};

export default TabBar;
