import React, { useState } from 'react';
import { ICONS } from '../../../resources/icons/Icons';
import '../../oweHub/configure/configure.css';
import { useAppSelector } from '../../../redux/hooks';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RiFilterLine } from 'react-icons/ri';
import Switch from '../../components/Switch';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiArrowBack } from 'react-icons/bi';
import { LuImport } from "react-icons/lu";
import { MdDownloading } from 'react-icons/md';

interface TableProps {
  title: string;
  onPressViewArchive: (() => void) | null;
  onPressArchive: () => void;
  onPressFilter: (() => void) | null;
  onPressImport: () => void;
  onpressExport: (() => void) | null;
  onpressAddNew: () => void;
  isAnyRowSelected: boolean;
  checked: boolean;
  viewArchive: boolean;
  archiveText?: string;
  isExportingData?: boolean;
}

const TableHeader = (props: TableProps) => {
  const {
    title,
    onPressArchive,
    viewArchive,
    onPressFilter,
    onPressImport,
    onPressViewArchive,
    onpressExport,
    onpressAddNew,
    isAnyRowSelected,
    archiveText,
    isExportingData
  } = props;
  const { isActive } = useAppSelector((state) => state.filterSlice);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="commissionSection">
      <div className='commission-back'>
        <BiArrowBack style={{
          height: '20px',
          width: '20px',
        }}
        className='back-btn' onClick={() => navigate(-1)} />
        <h3>{title}</h3>
      </div>

      <div className="iconContainer">
        {onPressViewArchive ? (
          <div className="iconsSection2 config-archive">
            <div className="flex items-center">
              <label
                htmlFor="h6 "
                style={{
                  marginRight: 13,
                  color: '#292929',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                View Archive
              </label>
              <Switch checked={viewArchive} onChange={onPressViewArchive} disabled />

            </div>
          </div>
        ) : null}

        {isAnyRowSelected === true && !viewArchive ? (
          <>
            <div className="iconsSection2">
              <button
                type="button"
                onClick={onPressArchive}
                style={{ cursor: isAnyRowSelected ? 'pointer' : 'not-allowed' }}
              >
                {archiveText === 'Delete' ? (
                  <RiDeleteBinLine
                    color="white"
                    style={{ marginBottom: 2, marginRight: 2 }}
                    size={18}
                  />
                ) : (
                  <img src={ICONS.ARCHIVE} alt="" />
                )}

                <span>{archiveText || 'Archive'}</span>
              </button>
            </div>
          </>
        ) : null}

        {/* <div className="iconsSection2">
          <button type="button" onClick={onPressImport}>
            <img src={ICONS.importIcon} alt="" /> Import
          </button>
        </div> */}
        <div className="iconsSection2-confex config-export">
          {onpressExport ? (
            <button type="button" onClick={onpressExport}>
             {isExportingData ? (
                    <MdDownloading
                      className="downloading-animation"
                      size={16}
                    />
                  ) : (
                    <LuImport size={16} />
                  )}
              Export
            </button>
          ) : null}
        </div>
        <div className="iconsSection2-conan config-add">
          <button
            type="button"
            style={{
              // background: `var(--primary-color)`,
              color: 'white',
              border: '1px solid var(--primary-color)',
              opacity: '0.7',
              cursor: 'not-allowed'

            }}
          // className="hover-btn"
          // onClick={onpressAddNew}
          >
            <img
              src={ICONS.AddIcon}
              alt=""
              style={{ width: '14px', height: '14px' }}
            />{' '}
            Add New
          </button>
        </div>
        <div className="iconsSection-filter relative">
          {onPressFilter ? (
            <button
              style={{
                // backgroundColor: 'var(--primary-color)',
                borderRadius: 8,
              }}
              type="button"
              onClick={onPressFilter}
            >
              {isActive[pathname] && (
                <span
                  className="absolute"
                  style={{
                    border: '1px solid #fff',
                    borderRadius: '50%',
                    backgroundColor: '#2DC74F',
                    width: 8,
                    height: 8,
                    top: 0,
                    right: -2,
                  }}
                ></span>
              )}
              <RiFilterLine size={24} color="#fff" />
            </button>
          ) : null}
        </div>
      </div>

      {/* {open && <CreateDealer handleClose={handleClose} />} */}
    </div>
  );
};

export default TableHeader;
