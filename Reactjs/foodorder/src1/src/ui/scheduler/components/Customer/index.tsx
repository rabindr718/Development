import React, { CSSProperties, memo, useState } from 'react';
import styles from './customer.module.css';
import { CiMail } from 'react-icons/ci';
import { BiPhone } from 'react-icons/bi';
import { TbChevronDown } from 'react-icons/tb';
import { LuClock } from 'react-icons/lu';
import GoogleMapReact from 'google-map-react';
import { IoLocationOutline } from 'react-icons/io5';
import roofIcon from '../../../../resources/assets/roof_top.svg';
import { ICONS } from '../../../../resources/icons/Icons';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../routes/routes';
import { MdLocationOn } from 'react-icons/md';
import useMatchMedia from '../../../../hooks/useMatchMedia';

const Marker = ({
  text,
  lat,
  lng,
}: {
  text: string;
  lat: number;
  lng: number;
}) => <MdLocationOn color="red" size={36} />;
interface propTypes {
  withSecondaryBtn?: boolean;
  mapStyles?: CSSProperties;
  name: string;
  email: string;
  mobile: string;
  sysSize: number;
  roofType: string;
  address: string;
}
const Index = ({
  withSecondaryBtn = false,
  mapStyles = {},
  name,
  email,
  mobile,
  sysSize,
  roofType,
  address,
}: propTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultProps = {
    center: {
      lat: 28.5355,
      lng: 77.391,
    },
    zoom: 11,
  };
  const key = process.env.REACT_APP_GOOGLE_KEY;
  const isMobile = useMatchMedia('(max-width:450px)');

  return (
    <div
      className={styles.customer_wrapper}
      style={{ maxHeight: isOpen ? 700 : 62 }}
    >
      <div className={`${styles.customer_grid}`}>
        <div className={`flex items-center`}>
          <div
            className={` flex items-center justify-center ${styles.bg_name} ${styles.avatar_circle}`}
          >
            {name.slice(0, 2) || 'N/A'}
          </div>

          <h3 className={`${styles.name_customer}  ml1 ${styles.customer_name}`}> {name || 'N/A'} </h3>
        </div>

        {!isMobile ? (
          <div className="flex items-start">
            <div
              className={` flex items-center justify-center ${styles.bg_green} ${styles.avatar_circle}`}
            >
              <CiMail size={14} />
            </div>
            <div className="ml1">
              <h3 className={styles.customer_name}>Email</h3>
              <p className={styles.sm_text}> {email || 'N/A'} </p>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className="flex items-start">
          <div
            className={` flex items-center justify-center ${styles.bg_phone} ${styles.avatar_circle}`}
          >
            <BiPhone size={14} />
          </div>

          <div className="ml1">
            <h3 className={styles.customer_name}>Phone Number</h3>
            <p className={styles.sm_text}> {mobile || 'N/A'} </p>
          </div>
        </div>



        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={styles.accordian_btn}
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
      <div className="mt2">
        <div className={styles.other_info_grid}>
          {isMobile ? (
            <div style={{
              display: 'flex',
              flexDirection: 'row',
          marginBottom: '22px'
            }}  className={`${styles.mail_mobile}flex items-start`}>
              <div
                className={` flex items-center justify-center ${styles.bg_green} ${styles.avatar_circle}`}
              >
                <CiMail size={14} />
              </div>
              <div className="ml1">
                <h3 className={styles.customer_name}>Email</h3>
                <p className={styles.sm_text}> {email || 'N/A'} </p>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={styles.other_info_grid}>
          <div className="flex items-start">
            <div
              className={` flex items-center justify-center ${styles.bg_phone} ${styles.avatar_circle}`}
            >
              <img src={ICONS.SystemSize} alt="" />
            </div>
            <div style={{ marginLeft: 6 }}>
              <h4
style={{
  fontSize: isMobile ? '12px' : '14px',
  fontWeight: 600,
  lineHeight: 'normal',
}}              >
                System Size
              </h4>
              <p className={styles.sm_text} style={{
  fontSize: isMobile ? '12px' : '14px', }}>
                {sysSize}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div
              className={` flex items-center justify-center ${styles.bg_green} ${styles.avatar_circle}`}
            >
              <img src={roofIcon} alt="" />
            </div>
            <div className="ml1">
              <h3 className={styles.customer_name}>Roof Type</h3>
              <p className={styles.sm_text} style={{
  fontSize: isMobile ? '12px' : '14px' }}> {roofType} </p>
            </div>
          </div>
        </div>

        <div
  className={`flex justify-between ${withSecondaryBtn ? 'items-end' : 'mt1'}`}
  style={{
    display: isMobile ? 'flex' : undefined,
    flexDirection: isMobile ? 'column-reverse' : undefined,
    marginTop: isMobile ? '24px' : ''
  }}
>
          <div
            style={{ flexBasis: isMobile ? '0px' : '250px', }}
            className=" flex justify-between flex-column"
          >
            {!withSecondaryBtn && (
              <div className="mt3">
                <h4
                  style={{
                    color: '#AFAFAF',
                    fontSize: isMobile ? '12px' : '14px',
                    fontWeight: 600,
                    marginBottom: 11,
                  }}
                >
                  Previous Appointment
                </h4>
                <h5 className={styles.appointment_status}>30 july 2024</h5>
                <span
                  className="block"
                  style={{ color: '#E54040', fontSize: 12 }}
                >
                  Cancelled
                </span>{' '}
              </div>
            )}
            <div className="flex items-center ">
              <Link
                to={'/schedule-detail/1'}
                className={`${styles.primary_btn}  ${styles.schedule_btn}`}
              >
                Schedule
              </Link>
              {withSecondaryBtn && (
                <button
                  style={{ marginLeft: 16 }}
                  className={`${styles.secondary_btn}  ${styles.schedule_btn}`}
                >
                  Escalate
                </button>
              )}
            </div>
          </div>

          <div
  style={{
    ...mapStyles, // Spread the existing mapStyles
    flexBasis: isMobile ? '0px' : '265px', // Conditionally set flex-basis
  }}
>
            <div
              className={styles.map_wrapper}
              style={{ height: withSecondaryBtn ? 101 : 170, }}
            >
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyDestipqgaIX-VsZUuhDSGbNk_bKAV9dX0',
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
              >
                <Marker lat={28.5355} lng={77.391} text="Noida, India" />
              </GoogleMapReact>
            </div>
            <div className="flex items-center mt1">
              <IoLocationOutline className="mr1" />
              <p className={styles.map_location}>{address || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Index);
