import React, { useState } from 'react';
import classes from './styles/librarysharefile.module.css';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../../../resources/icons/Icons';
import { IoLinkOutline } from 'react-icons/io5';
import { TiTick } from 'react-icons/ti';
// import { CiLink } from "react-icons/ci";

const Librarysharefile = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible); // Toggle visibility of the <p> tag
  };

  return (
    <div>
      <div className="transparent-model">
        <div className={classes.customer_wrapper_list}>
          <>
            {' '}
            <div className={classes.success_not}>
              <div className={classes.success_header}>
                <h2 className={classes.success_heading}>UNTD SOLAR_.PGF </h2>
                <button className={classes.success_crossing_botton}>
                  <img
                    src={ICONS.cross}
                    alt=""
                    className={classes.success_crossimg}
                  />
                </button>
              </div>
              <div className={classes.success_hrline}></div>

              <div className={classes.succicon}>
                <input
                  type="text"
                  className={classes.succicon_input_box}
                  placeholder="Add a name or email"
                ></input>
              </div>
            </div>
            <div className={classes.survey_button}>
              <div className={classes.survey_link_button}>
                {isVisible && (
                  <p className={classes.survey_link_button_parr}>
                    <TiTick className={classes.succicon_tick} /> Copied Link
                  </p>
                )}
                <button className={classes.self} onClick={handleClick}>
                  <IoLinkOutline
                    style={{ width: '50px', height: '25px' }}
                    className={classes.link_img_library}
                  />
                  Copy Link
                </button>
              </div>
              <button id="otherButtonId" className={classes.other}>
                Send
              </button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Librarysharefile;
