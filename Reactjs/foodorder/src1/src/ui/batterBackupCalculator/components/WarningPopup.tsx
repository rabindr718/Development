import React, { SetStateAction } from 'react';
import { WarningIcon } from '../icons';
import { Ibattery } from './BatteryAmp';
import { CgClose } from 'react-icons/cg';
import Swal from 'sweetalert2';
interface IPopPupProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<SetStateAction<boolean>>;
  setMainOn: React.Dispatch<SetStateAction<boolean>>;
  setRequiredBattery: React.Dispatch<SetStateAction<number>>;
  setMainDisabled: React.Dispatch<SetStateAction<boolean>>;
  required: number;
  setBatteryPower: React.Dispatch<SetStateAction<Ibattery[]>>;
  popUpMsg: string;
  btnText: {
    primaryText: string;
    secondaryText: string;
  };
}

const WarningPopup = ({
  isOpen,
  setIsOpen,
  setMainOn,
  setMainDisabled,
  setRequiredBattery,
  required,
  setBatteryPower,
  popUpMsg,
  btnText,
}: IPopPupProps) => {
  const handleClose = () => {
    setIsOpen?.((prev) => !prev);
  };
  const showAlert = async () => {
    Swal.fire({
      title: `<p style="font-size:14px;padding-top:20px;margin-bottom:16px; ">By selecting Agree below I am acknowledging that the battery configuration I am selecting is under the configuration recommended by Our World Energy. I understand that by selecting this configuration the performance and duration of my battery will be highly dependent on my habits and that Our World Energy does not guarantee any performance metrics for this configuration.<p>`,
      showDenyButton: true,
      confirmButtonText: 'Approve',
      denyButtonText: `I do not Approve`,
      focusDeny: true,
      confirmButtonColor: '#0BAF11',
      width: '35em',
    }).then((result) => {
      if (result.isConfirmed) {
        handleClose();
        setRequiredBattery((prev) => (prev ? prev - 1 : prev));
      } else if (result.isDenied) {
        return;
      }
    });
  };
  return (
    <div className="transparent-model px2 scrollbar">
      <div
        style={{ border: '2px solid #D3D3D3' }}
        className="scrollbar modal py3 px2 relative "
      >
        <div
          className="absolute pointer"
          onClick={handleClose}
          style={{ right: 20, top: 17 }}
        >
          <CgClose size={16} color="#0000004d" />
        </div>
        <div className="mx-auto flex justify-center">
          <WarningIcon />
        </div>

        <div className="text-center mt2">
          <h3 className="text-center text-dark" style={{ fontWeight: 700 }}>
            Important Information
          </h3>
          <p
            className="text-dark mt1"
            style={{ fontWeight: 500, fontSize: 14 }}
          >
            You are attempting to reduce the total number of batteries below our
            recommended minimum
            <br /> for a Full Home Back-Up.
            <br />
            <span className="mt2 block">
              We cannot guarantee the effectiveness of this battery
              configuration in supporting your home.
              <br />
              <span className="block mt2">Would you like to:</span>
            </span>
          </p>
        </div>
        <div className="mt3">
          <button
            onClick={() => {
              setMainOn(false);
              setMainDisabled(false);
              setRequiredBattery((prev) => (prev ? prev - 1 : prev));
              handleClose();
              setBatteryPower((prev) =>
                prev.map((battery) => ({ ...battery, isOn: false }))
              );
            }}
            className="calc-grey-btn warning-popup-btn pointer"
          >
            Reduce the number of batteries in this system and switch to a
            Partial Home Backup
          </button>
          <button
            onClick={() => {
              setMainDisabled(true);
              handleClose();
              setMainOn(true);
              setBatteryPower((prev) =>
                prev.map((battery) => ({ ...battery, isOn: true }))
              );
              setRequiredBattery(required);
            }}
            className="calc-green-btn pointer warning-popup-btn"
          >
            Remain at the recommended battery quantity for a Full Home Backup
          </button>
          <button onClick={showAlert} className="teritary-popup-btn">
            {' '}
            Reduce the number of batteries in this system while remaining on
            Full Home Backup
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningPopup;
