import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import { RiArrowRightLine } from 'react-icons/ri';
import './ConfigurePage.css';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

interface AccordionSection {
  title: string;
  data: { title: string; route: string }[];
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined;
}

const ConfigurePage: React.FC = () => {
  const cardColors = ['#FAD9CA', '#CDE8FB', '#EDD4EE', '#D0E6E3', '#DDD9F6'];
  const arrowColors = ['#EE824D', '#57B3F1', '#C470C7', '#63ACA3', '#8E81E0'];

  const hoverSwithClass = (color: string) => {
    switch (color) {
      case '#FAD9CA':
        return 'bg-salmon';
      case '#CDE8FB':
        return 'bg-light-blue';
      case '#EDD4EE':
        return 'bg-purple';

      case '#D0E6E3':
        return 'bg-light-green';

      case '#DDD9F6':
        return 'bg-dark-blue';

      default:
        return '';
    }
  };

  const accordionSections: AccordionSection[] = [
    {
      title: 'Dealer Pay',
      data: [
        { title: 'Dealer OverRides', route: ROUTES.CONFIG_DEALER_OVER },
        { title: 'Dealer Credit', route: ROUTES.CONFIG_DEALER_CREDIT },
        { title: 'Dealer Payments', route: ROUTES.CONFIG_DEALERPAYMENTS },
        { title: 'Finance Schedule', route: ROUTES.CONFIG_FINANCE_SCHEDULE },
        { title: 'Sales Partner Pay Schedule', route: ROUTES.CONFIG_SALES_PARTNER_PAY },
        { title: 'Finance Types', route: ROUTES.CONFIG_FINANCE_TYPES },
       
      ],
      state: useState<boolean>(true),
    },
    {
      title: 'Common',
      data: [{ title: 'Slack Config', route: ROUTES.CONFIG_SLACK },
        { title: 'Site Survey Onboarding', route: ROUTES.SS_ONBOARDING },

      ],
      state: useState<boolean>(true),
    },
  ];

  const toggleAccordion =
    (setState: React.Dispatch<React.SetStateAction<boolean>>) => () => {
      setState((prevState: boolean) => !prevState);
    };

  return (
    <>
      <div className="configure-container">
        {/* <div className="configure-header">
          <Breadcrumb
            head=""
            linkPara="Configure"
            route={''}
            linkparaSecond=""
            marginLeftMobile="12px"
          />
        </div> */}
        <div className="configure-main">
          <div className="configure-main-section">
            {accordionSections.map(({ title, data, state }, index) => {
              if (!state) return null;
              const [isOpen, setIsOpen] = state;
              return (
                <div
                  key={index}
                  className={`${title.toLowerCase()} ${isOpen ? 'open' : ''}`}
                >
                  <div
                    className="configure-card-title"
                    onClick={toggleAccordion(setIsOpen)}
                  >
                    <p className="payer-type">{title}</p>
                    <div className="accordion-icon-container">
                      {isOpen ? (
                        <FaMinus className="accordion-icon" />
                      ) : (
                        <FaPlus className="accordion-icon" />
                      )}
                    </div>
                  </div>

                  <div className={`configure-cards ${isOpen ? 'open' : ''}`}>
                    {data.map((item, index) => {
                      const colorIndex =
                        index % Math.min(cardColors.length, arrowColors.length);
                      const randomCardColor = cardColors[colorIndex];
                      const randomArrowColor = arrowColors[colorIndex];
                      return (
                        <div key={index} className='pay-card-wrapper'>
                          <Link
                            to={item.route}
                            className={`pay-card ${hoverSwithClass(randomCardColor)}`}
                            style={{
                              backgroundColor: randomCardColor,
                              outline: `1px dotted ${randomArrowColor}`,
                              outlineOffset: '3px',
                            }}
                          >
                            <div className="con-fle">
                              <h1 className="card-heading">{item.title}</h1>
                              <div
                                className="arrow-wrapper"
                                style={{ color: randomArrowColor }}
                              >
                                <span className="view-text">View</span>
                                <RiArrowRightLine className="arrow-right" />
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfigurePage;
