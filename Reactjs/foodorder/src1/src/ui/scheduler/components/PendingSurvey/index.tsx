import React, { useState } from 'react';
import styles from './index.module.css';
import sharedStyles from '../Customer/customer.module.css';
import { TbChevronDown } from 'react-icons/tb';
import { BiPhone } from 'react-icons/bi';
import { CiMail } from 'react-icons/ci';
import { IoLocationOutline } from 'react-icons/io5';
import { LuClock } from 'react-icons/lu';
import roofIcon from '../../../../resources/assets/roof_top.svg';
import { ICONS } from '../../../../resources/icons/Icons';
const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.survey_wrapper}>
      <div
        className={` ${styles.survey_detail}`}
        style={{ paddingBottom: isOpen ? undefined : 11 }}
      >
        <div
          className={`flex ${isOpen ? 'items-center' : 'items-start'} justify-between`}
        >
          <div className="flex items-center">
            <div
              className={` flex items-center justify-center ${sharedStyles.bg_name} ${sharedStyles.avatar_circle}`}
            >
              JM
            </div>

            <h3 className={` ml1 ${sharedStyles.customer_name}`}>
              Jacob Martin
            </h3>
          </div>
          <button
            className={sharedStyles.accordian_btn}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <TbChevronDown
              size={22}
              style={{
                transform: isOpen ? 'rotate(180deg)' : undefined,
                transition: 'all 500ms',
              }}
            />
          </button>
        </div>

        {isOpen && (
          <div className={`mt1 ${styles.customer_grid_info_wrapper}`}>
            <div className="flex items-center">
              <div
                className={` flex items-center justify-center ${sharedStyles.bg_phone} ${sharedStyles.avatar_circle}`}
              >
                <BiPhone size={14} />
              </div>

              <div className="ml1">
                <p style={{ fontSize: 12, color: '#525252' }}>+01 9834432456</p>
              </div>
            </div>
            <div className="flex items-center">
              <div
                className={` flex items-center justify-center ${sharedStyles.bg_green} ${sharedStyles.avatar_circle}`}
              >
                <CiMail size={14} />
              </div>
              <div className="ml1">
                <p style={{ fontSize: 12, color: '#525252' }}>
                  jacobmartin123@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center" style={{ gridColumn: '1/3' }}>
              <div
                className={` flex items-center justify-center ${styles.bg_orange} ${sharedStyles.avatar_circle}`}
              >
                <IoLocationOutline size={14} />
              </div>
              <div className="ml1">
                <p style={{ fontSize: 12, color: '#525252' }}>
                  103 backstreet, Churchline, Backstreet zone, Arizona, 12544
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div
                className={` flex items-center justify-center ${sharedStyles.bg_green} ${sharedStyles.avatar_circle}`}
              >
                <img src={roofIcon} alt="" />
              </div>
              <div className="ml1">
                <p style={{ fontSize: 12, color: '#525252' }}>Roof Type 1</p>
              </div>
            </div>

            <div className="flex items-center">
              <div
                className={` flex items-center justify-center ${sharedStyles.bg_phone} ${sharedStyles.avatar_circle}`}
              >
                <img src={ICONS.SystemSize} alt="" />
              </div>
              <div className="ml1">
                <p style={{ fontSize: 12, color: '#525252' }}>200</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={` flex items-center justify-between ${styles.survey_form_footer}`}
      >
        <div className="flex items-center">
          <div
            className={` flex items-center justify-center ${sharedStyles.bg_name} ${sharedStyles.avatar_circle}`}
          >
            <img src={ICONS.Techie} alt="" />
          </div>

          <div className="ml1">
            <h5 style={{ fontWeight: 600 }}>Jacob Martin</h5>
            <p style={{ fontSize: 12, marginTop: -4 }}>Surveyor</p>
          </div>
        </div>
        <div className="flex items-center">
          <button className={`${styles.primary_btn}  ${styles.submit_btn}`}>
            Approve
          </button>
          <button className={`${styles.secondary_btn}  ${styles.submit_btn}`}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
