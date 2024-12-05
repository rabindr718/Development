import React from 'react';
import classes from './styles/createpropsal.module.css';
import createPropsalImg from './Modals/Modalimages/imagefor.png';
import searchIcon from './Modals/images (1).png';
import searchIcon1 from './Modals/images.png';
import searchIcon2 from './Modals/search-bar-01.png';
const CreateProposal = () => {
  return (
    <div className={classes.gridcontainer}>
      <div className={classes.toprow}>
        <strong>Next Project</strong>
      </div>
      <div className={classes.bottomgrid}>
        <div className={classes.leftdiv}>
          <form className={classes.formstylesOwn}>
            <h1>New project</h1>

            <div className={classes.formGroup}>
              <label>*Property address</label>
              <input
                className={classes.dropdownModal}
                type="search"
                name="search"
                placeholder="Select an address..."
              ></input>
            </div>

            <div className={classes.formGroup}>
              <label>Project name</label>
              <input
                className={classes.dropdownModal}
                type="search"
                placeholder="Project name"
              />
            </div>

            <div className={classes.formGroup}>
              <label>*Property type</label>
              <input
                className={classes.dropdownModal}
                type="search"
                placeholder="Select an address..."
              />
            </div>

            <div className={classes.dropdownContainerModal1Option}>
              <div className={classes.formGroup2}>
                <label>*Organisation</label>
                <select className={classes.dropdownModal1}>
                  <option value="option1">Select an organisation</option>
                  <option value="option2">Rabindra Kumar</option>
                  <option value="option3">Sharma</option>
                </select>
              </div>

              <div className={classes.formGroup1}>
                <label>*Team</label>
                <select className={classes.dropdownModal2} disabled>
                  <option value="option1">Select an organisation</option>
                  <option value="option2">Rabindra Kumar</option>
                  <option value="option3">Sharma</option>
                </select>
              </div>
            </div>

            <div className={classes.formGroup}>
              <label>*Property type</label>
              <input
                className={classes.dropdownModal}
                type="search"
                placeholder="Select an address..."
              />
            </div>
          </form>
        </div>
        <div className={classes.rightdiv}>
          <img className={classes.imageSize} src={createPropsalImg} />
        </div>
      </div>
    </div>
  );
};

export default CreateProposal;
