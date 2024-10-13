import React from "react";
import classes from "./Styles/services.module.css";
import { ICONS } from "../resources/ICONS";

const Services = () => {
  return (
    <div className={classes.containerServices}>
      <div className={classes.containerServicesInner}>
        <div className={classes.BtnS}>
          <div className={classes.ImageSize}>
            <div className={classes.imagecontainer}>
              <img src={ICONS.AISpark} alt="Chip Sparks" />
              <div className={classes.overlay}>
                <div className={classes.text}>
                  <div className={classes.AIProjectText}>
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
                  <div className={classes.SoftwareText}>
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
                  <div className={classes.AlgorithmsText}>Algorithms</div>
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
                    <div className={classes.GalleryText}>
                      Gallery
                      <span className={classes.tooltip}>Click for view</span>
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

{
  /* <div className={classes.details}>
              <img
                className={classes.detailsLogo}
                src="image/Logo.png"
                alt="not need"
              />
              <br />
              <span className={classes.fontColorTitle}>WEB DEVELOPMENT</span>
              <p className={classes.fontColor}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos id praesentium iusto fugit quam neque sed.
              </p>
              <button className={classes.btnReadmore}>
                <a href="https://github.com/rabindr718" target="_blank">
                  READ MORE ➡
                </a>
              </button>
            </div> */
}
