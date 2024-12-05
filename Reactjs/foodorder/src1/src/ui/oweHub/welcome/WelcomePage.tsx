/**
 * Created by Ankit Chuahan on 13/01/24
 * File Name: WelcomePage
 * Product Name: WebStorm
 * Project Name: owe_web_app
 * Path: src/ui/pages/welcome
 */

import React, { useState } from 'react';
import './WelcomePage.css';
// import LogoImage from "../../../resources/assets/logo.png";
import LaptopImage from '../../../resources/assets/laptop.svg';
import { ReactComponent as CallIcon } from '../../../resources/assets/phone-fill.svg';
import CustomBox from '../../components/box/CustomBox';
import CommissionIcon from '../../../resources/assets/commission.svg';
import OweIcon from '../../../resources/assets/OWE.svg';
import ContractorIcon from '../../../resources/assets/contractor.svg';
import logo from '../../../resources/assets/logo.svg';
import pandoIcon from '../../../resources/assets/pando.svg';
import AboutUsBig from '../../../resources/assets/aboutUsBig.png';
import AboutUsSmall from '../../../resources/assets/aboutUsSmall.png';
import { useNavigate } from 'react-router-dom';
import ImageLayout from '../../components/imageLayout/ImageLayout';
import Grid_1 from '../../../resources/assets/grid_1.png';
import Grid_2 from '../../../resources/assets/grid_2.png';
import Grid_3 from '../../../resources/assets/grid_3.png';
import Grid_4 from '../../../resources/assets/grid_4.png';
import Grid_5 from '../../../resources/assets/grid_5.png';
import TabBar from '../../components/tabBar/TabBar';
import WhiteLogo from '../../../resources/assets/white-image-logo.svg';
import { ReactComponent as Facebook } from '../../../resources/assets/facebook.svg';
import { ReactComponent as Linkedin } from '../../../resources/assets/linkedin.svg';
import { ReactComponent as Twitter } from '../../../resources/assets/twitter.svg';
import { ReactComponent as YouTube } from '../../../resources/assets/youTube.svg';
import { ReactComponent as Instagram } from '../../../resources/assets/Instagram.svg';
import BusinessLogo from '../../../resources/assets/business_logo.svg';

import Typewriter from '../../components/animation/Typewriter';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const data = [
    {
      id: 1,
      title: 'Site Survey',
      step: 'Step 1',
      time: 'Timeline: 1-5 Days',
      description:
        'Our Site Technician will visit to measure, examine, and approve our previously discussed plans.',
    },
    {
      id: 2,
      title: 'Blueprints',
      step: 'Step 2',
      time: 'Timeline: 1-2 Days',
      description:
        'Our Site Technician will visit to measure, examine, and approve our previously discussed plans.',
    },
    {
      id: 3,
      title: 'Permitting',
      step: 'Step 3',
      time: 'Timeline: 2-6 Days',
      description:
        'Our Site Technician will visit to measure, examine, and approve our previously discussed plans.',
    },
  ];

  return (
    <div className="welcomeMainContainer scrollbar">
      <div className="welcomeContainer">
        <header className="welcomeBannerView">
          <div className="welcomeInnerBannerView">
            <div className="welcomeHeaderView">
              <div>
                <object
                  type="image/svg+xml"
                  data={logo}
                  aria-label="logo"
                ></object>
              </div>

              <div className="welcome-phone-view">
                <CallIcon />
                <h3 className="welcome-phone-text">Call Us (623) 850-5700</h3>
              </div>
            </div>

            <div className="welcome-main">
              <div className="welcome-left-view">
                <h1 className="welcome-text-black mx-auto">
                  Our
                  <span className="welcome-text-blue inline-block mx1">
                    World
                  </span>
                  Revolves
                  <br />
                  Around
                  <span className="welcome-text-green inline-block mx1">
                    Powering
                  </span>{' '}
                  Yours
                  <span className="welcome-sub-text block">
                    Your Trusted Solar Expert
                  </span>
                </h1>
              </div>
              <div className="welcome-right-view">
                <object
                  className="welcome-right-view"
                  type="image/svg+xml"
                  data={LaptopImage}
                  style={{ maxWidth: '100%' }}
                  aria-label="laptop"
                ></object>
              </div>
            </div>
          </div>
        </header>
        <section className="welcomeApplicationView">
          <div className="welcomeInnerApplicationView">
            <span className="welcome-our-text">Our Applications</span>
            <div className="welcomeBoxView">
              <CustomBox
                icon={CommissionIcon}
                title="OWE HUB"
                description="More than that, you can have any amount of layers attached "
                onClick={() => {
                  navigate('/login');
                }}
              />
              <CustomBox
                icon={OweIcon}
                title="OWE ChatBot"
                description="More than that, you can have any amount of layers attached "
                onClick={() => {
                  alert('Owe');
                }}
              />
              <CustomBox
                icon={ContractorIcon}
                title="Sub Contractor Hub"
                description="More than that, you can have any amount of layers attached "
                onClick={() => {
                  window.open('https://subcontractorhub.com/');
                }}
              />
              <CustomBox
                icon={pandoIcon}
                title="Battery Backup Calculator"
                description=" "
                onClick={() => {
                  navigate('/sr-image-upload');
                }}
              />
            </div>
          </div>
        </section>

        <section className="welcomeAboutUsContainer">
          <div className="welcomeAboutUsView">
            <div className="welcomeAboutUsLeftView">
              <img
                className="welcomeAboutUsBig"
                src={AboutUsBig}
                style={{ maxWidth: '100%' }}
              ></img>
              <img
                className="welcomeAboutUsSmall"
                src={AboutUsSmall}
                style={{ maxWidth: '100%' }}
              ></img>
            </div>

            <div className="welcomeAboutUsRightView">
              <span className="welcomeAboutUsText">Know About Us</span>
              <p className="welcomeAboutPara">
                <Typewriter
                  text="You can have any amount of paths for any layer properties. More
                than that, you can have any amount of layers attached to one
                path."
                  delay={10}
                />
              </p>

              <p className="welcomeAboutPara">
                <Typewriter
                  text="First, let's talk a little about what tool we will use. You can
                use presets animation, keyframes animation,
                paths animation orlink animation for layer
                properties. We will work with paths. First, let's talk a little
                about what tool we will use. You can use
                presets animation, keyframes animation,
                paths animation or link animation for layer
                properties. We will work with paths."
                  delay={10}
                />
              </p>
              <p className="welcomeAboutPara">
                <Typewriter
                  text=" You can animate objects along the path. They can rotate
                  according to the path curvature and
                  have X, Y and Rotation offsets."
                  delay={10}
                />
              </p>
            </div>
          </div>
        </section>

        <section className="welcomeWorkEaseView">
          <span className="welcomeWorkEaseTitle">We Make Your Work Easy</span>
          <br />
          <ImageLayout images={[Grid_1, Grid_3, Grid_2, Grid_4, Grid_5]} />
        </section>

        <section className="welcomeOverProcessContainer">
          <div className="welcomeOverProcess">
            <span className="welcomeOverProcessTitle">Our Process</span>
            <div className="welcomeTabView">
              <TabBar
                title={[
                  'Phase 1 – Preparation',
                  'Phase 2 – Construction',
                  'Phase 3 – Final Inspections',
                ]}
                activeTab={activeTab}
                handleTabClick={(e) => handleTabClick(e)}
              />
            </div>
            {/* <br /> */}
            <div className="landing-table">
              {/* <table>
                <tbody>
                  <tr>
                    {data.map((item) => (

                      <td key={item.id}>
                        <div className="table-box">
                          <div className="welcomeRowTitle">{item.title}</div>
                          <div>
                            <span className="welcomeRowStep">{item.step}</span>{" "}
                            <span className="welcomeRowTime">{item.time}</span>
                          </div>
                          <div className="welcomeRowDescription">
                            {item.description}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table> */}
              {data.map((item) => (
                <div key={item.id}>
                  <div className="table-box">
                    <div className="welcomeRowTitle">{item.title}</div>
                    <div>
                      <span className="welcomeRowStep">{item.step}</span>{' '}
                      <span className="welcomeRowTime">{item.time}</span>
                    </div>
                    <div className="welcomeRowDescription">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <footer className="welcomeFooterView">
        <div className="welcomeInnerView">
          <div id="welcomeFooterUpperView">
            <object
              id="welcomeWhiteLogo"
              type="image/svg+xml"
              data={WhiteLogo}
              aria-label="WhiteLogo"
            ></object>
            <div id="welcomeSocialMedia">
              <a
                href="https://www.facebook.com/ourworldenergy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook />
              </a>
              <a
                href="https://www.linkedin.com/company/our-world-energy/mycompany/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin />
              </a>
              <a
                href="https://twitter.com/OurWorldEnergy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </a>
              <a
                href="https://www.youtube.com/@ourworldenergy6794"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTube />
              </a>
              <a
                href="https://www.instagram.com/ourworldenergyaz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram />
              </a>
            </div>
            <div id="welcomeContact">
              <span className="welcomeContactText">About</span>
              <span className="welcomeContactText">Solar Resources</span>
              <span className="welcomeContactText">Our Process</span>
              <span className="welcomeContactText">Locations</span>
              <span className="welcomeContactText">Contact</span>
            </div>
          </div>
          <div id="welcomeUnderLine"></div>
          <div id="welcomeFooterLowerView">
            <div className="footer-logo">
              <object
                type="image/svg+xml"
                data={BusinessLogo}
                aria-label="BusinessLogo"
              ></object>
            </div>
            <div className="footer-text">
              © 2024 BY OUR WORLD ENERGY. ALL RIGHTS RESERVED.{' '}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
