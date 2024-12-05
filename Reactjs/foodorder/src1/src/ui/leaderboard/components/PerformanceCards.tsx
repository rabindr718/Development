import './PerformanceCards.css';
import { ICONS } from '../../../resources/icons/Icons';
import { MdDownload, MdOutlineIosShare } from 'react-icons/md';
import { IoChevronDownOutline } from 'react-icons/io5';
import React, { Dispatch, SetStateAction, useState } from 'react';
import artboard from '../../../resources/assets/artboard.svg';
import SocialShare from '../../batterBackupCalculator/components/SocialShare';
import MicroLoader from '../../components/loader/MicroLoader';

interface performance {
  details: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  socialUrl: string;
  shareImage: () => void;
  isGenerating: boolean;
  activeHead: string;
  isLoading: boolean;
}

const PerformanceCards: React.FC<performance> = ({
  details,
  setIsOpen,
  isOpen,
  socialUrl,
  shareImage,
  isGenerating,
  activeHead,
  isLoading,
}) => {
  console.log(isGenerating, 'isGenerating');
  const rank1 = details?.find?.((item: any) => item?.rank === 1);
  const rank2 = details?.find?.((item: any) => item?.rank === 2);
  const rank3 = details?.find?.((item: any) => item?.rank === 3);
  const [isAccoOpen, setIsAccoOpen] = useState(false);

  const getCardHeadingStyle = (item: (typeof details)[number]) => {
    if (!item) return { fontSize: '1.2rem' };

    const fontSizeRaw = (18 - item?.rep_name.length) * 0.15;
    const fontSizeClamped = Math.min(Math.max(fontSizeRaw, 0.75), 2); // clamp b/w 0.75 and 2rem
    return { fontSize: `${fontSizeClamped}rem` };
  };
  function formatSaleValue(value: any) {
    if (value === null || value === undefined) return ''; // Handle null or undefined values
    const sale = parseFloat(value);
    if (sale === 0) return '0';
    if (sale % 1 === 0) return sale.toString(); // If the number is an integer, return it as a string without .00
    return sale.toFixed(2); // Otherwise, format it to 2 decimal places
  }

  return (
    <div>
      <div
        className="performance-cards relative"
        style={{
          height: isAccoOpen ? 70 : 'auto',
          transition: 'all 500ms',
          overflow: 'hidden',
          marginTop: "1.2rem",
          borderRadius: "16px"
        }}
      >
        <div className="right-button">
          {!isGenerating ? (
            <div
              style={{
                transition: 'all 500ms',
              }}
              className={`relative flex items-center ${isAccoOpen ? 'justify-end' : 'justify-between'}`}
            >
              <span
                className="collapse-btn"
                role="btn"
                style={{
                  rotate: !isAccoOpen ? '180deg' : '',
                  transition: 'all 500ms',
                  marginTop: isAccoOpen ? 10 : undefined,
                }}
                onClick={() => setIsAccoOpen(!isAccoOpen)}
              >
                <IoChevronDownOutline />
              </span>
              {!isAccoOpen && (
                <button
                  className="share-button"
                  onClick={shareImage}
                  disabled={isGenerating}
                >
                  <MdDownload
                    className={`share-svg ${isGenerating ? 'downloading-animation' : ''} `}
                  />
                  <p> Download </p>
                </button>
              )}
              {isOpen && (
                <SocialShare setIsOpen={setIsOpen} socialUrl={socialUrl} />
              )}
            </div>
          ) : null}
        </div>
        <div className="banner-heading">
          <img
            src={ICONS.Performars}
            className={isAccoOpen ? 'absolute-img' : ''}
            aria-label="login-icon"
          ></img>
          <p className={isAccoOpen ? 'sm-hide' : ''}>
            Adjust criteria below to see who leads in different categories..
          </p>
        </div>
        {isLoading && (
          <div className="flex mt3 items-center justify-center">
            <MicroLoader />
          </div>
        )}
        {!isLoading && details?.length ? (
          <div className="cards flex justify-between">
            {rank2 && !isLoading ? (
              <div className="card-one">
                <div className="upper-section">
                  <img src={ICONS.GreyTwo} aria-label="grey-icon"></img>
                  <div className="flex flex-column card-title">
                    <h2 style={getCardHeadingStyle(rank2)}>
                      {rank2?.rep_name || 'N/A'}
                    </h2>
                    {/* <p>
                    OUR31245
                    <span>
                      <MdContentCopy />
                    </span>
                  </p> */}
                  </div>
                </div>
                <div className="dashed-border"></div>
                <div className="below-section">
                  <div className="below-des">
                    <p style={{ textAlign: 'center' }}>
                      {formatSaleValue(rank2?.sale) ?? 0}
                    </p>
                    <p>Sales ({activeHead == 'kw' ? 'kW' : 'count'})</p>
                  </div>
                  <div className="below-des">
                    <p style={{ textAlign: 'center' }}>
                      {formatSaleValue(rank2?.ntp) ?? 0}
                    </p>
                    <p>NTP ({activeHead == 'kw' ? 'kW' : 'count'})</p>
                  </div>
                  <div
                    className="below-des mx-auto"
                    style={{ gridColumn: '1/3' }}
                  >
                    <p className="text-center">
                      {' '}
                      {formatSaleValue(rank2?.install)}
                    </p>
                    <p>Installs ({activeHead == 'kw' ? 'kW' : 'count'})</p>
                  </div>
                </div>
              </div>
            ) : null}
            {rank1 && !isLoading ? (
              <div className="card-two">
                <div className="upper-section">
                  <img src={ICONS.GoldOne} aria-label="grey-icon"></img>
                  <div className="flex flex-column card-title">
                    <h2 style={getCardHeadingStyle(rank1)}>
                      {rank1?.rep_name || 'N/A'}
                    </h2>
                    {/* <p>
                    OUR31245
                    <span>
                      <MdContentCopy />
                    </span>
                  </p> */}
                  </div>
                </div>
                <div className="dashed-border"></div>
                <div className="below-section">
                  <div className="below-des">
                    <p style={{ textAlign: 'center' }}>
                      {formatSaleValue(rank1?.sale) ?? 0}{' '}
                    </p>
                    <p>Sales ({activeHead == 'kw' ? 'kW' : 'count'})</p>
                  </div>
                  <div className="below-des">
                    <p style={{ textAlign: 'center' }}>
                      {formatSaleValue(rank1?.ntp)}
                    </p>
                    <p>NTP ({activeHead == 'kw' ? 'kW' : 'count'})</p>
                  </div>
                  <div
                    className="below-des mx-auto"
                    style={{ gridColumn: '1/3' }}
                  >
                    <p className="text-center">
                      {formatSaleValue(rank1?.install)}
                    </p>

                    <p>Installs ({activeHead == 'kw' ? 'kW' : 'count'})</p>
                  </div>
                </div>
              </div>
            ) : null}
            {rank3 && !isLoading ? (
              <div className="card-three">
                <div className="upper-section">
                  <img src={ICONS.BrownThree} aria-label="grey-icon"></img>
                  <div className="flex flex-column card-title">
                    <h2 style={getCardHeadingStyle(rank3)}>
                      {rank3?.rep_name || 'N/A'}
                    </h2>
                    {/* <p>
                    OUR31245
                    <span>
                      <MdContentCopy />
                    </span>
                  </p> */}
                  </div>
                </div>
                <div className="dashed-border"></div>
                <div className="below-section">
                  <div className="below-des">
                    <p style={{ textAlign: 'center' }}>
                      {formatSaleValue(rank3?.sale) ?? 0}{' '}
                    </p>
                    <p>Sales ({activeHead == 'kw' ? 'kW' : 'count'})</p>
                  </div>
                  <div className="below-des">
                    <p style={{ textAlign: 'center' }}>
                      {formatSaleValue(rank3?.ntp) ?? 0}{' '}
                    </p>
                    <p>NTP ({activeHead == 'kw' ? 'kW' : 'count'})</p>
                  </div>
                  <div
                    className="below-des mx-auto"
                    style={{ gridColumn: '1/3' }}
                  >
                    <p className="text-center">
                      {formatSaleValue(rank3?.install)}
                    </p>

                    <p>Installs ({activeHead == 'kw' ? 'kW' : 'count'})</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          ''
        )}

        {!Boolean(details.length) && !isLoading && (
          <div
            style={{ textAlign: 'center' }}
            className={`text-center mx-auto flex items-center justify-center ${isAccoOpen ? 'sm-hide' : ''}`}
          >
            <img src={artboard} style={{ maxWidth: 350 }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceCards;
