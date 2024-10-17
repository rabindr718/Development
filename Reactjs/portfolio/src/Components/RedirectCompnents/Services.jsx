import React from "react";
import { useState } from "react";
import classes from "./Styles/services.module.css";
import { ICONS } from "../resources/ICONS";
import Login from "../Modals/Login";



const Services = () => {
  const [openLoginModal, setLoginModal] = useState(false);


  const SeeImages = () => { setLoginModal(true) }



  const ArtificialIntelligence = () => {


  };
  const SOftwareEngineering = () => {

  };

  const Algorithms = () => {

  };

  return (
    <div className={classes.containerServices}>
      {openLoginModal && <Login setLoginModal={setLoginModal} />
      }
      <div className={classes.containerServicesInner}>
        <div className={classes.BtnS}>
          <div className={classes.ImageSize}>
            <div className={classes.imagecontainer}>
              <img src={ICONS.AISpark} alt="Chip Sparks" />
              <div className={classes.overlay}>
                <div className={classes.text}>
                  <div className={classes.AIProjectText} onClick={ArtificialIntelligence}>
                    Artificial Intelligence
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.ImageSize}>
            <div className={classes.imagecontainer}>
              <img src={ICONS.CodeJavascript} alt="Chip Sparks" />
              <div className={classes.overlay}>
                <div className={classes.text}>
                  <div className={classes.SoftwareText} onClick={SOftwareEngineering}>
                    Software Engineering
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.BtnS}>
          <div className={classes.ImageSize}>
            <div className={classes.imagecontainer}>
              <img src={ICONS.BigComputer} alt="Chip Sparks" />
              <div className={classes.overlay}>
                <div className={classes.text}>
                  <div className={classes.AlgorithmsText} onClick={Algorithms}>Algorithms</div>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.ImageSize}>
            <div className={classes.imagecontainer}>
              <img src={ICONS.GalleryI} alt="Chip Sparks" />
              <div className={classes.overlay}>
                <div className={classes.text}>
                  <div>

                    <div className={classes.GalleryText} onClick={SeeImages}>
                      Gallery
                      {/* <span className={classes.tooltip}>Click for view</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

