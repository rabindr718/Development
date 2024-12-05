import React, { useEffect, useMemo, useState, useRef } from 'react';
import on from '../lib/on_switch.png';
import off from '../lib/off_switch.png';
import screw from '../lib/construction.svg';
import { GoCheckCircleFill } from 'react-icons/go';
import { PiWarningCircleLight } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import {
  AirConditioner,
  Dishwasher,
  ElectricOven,
  EvCharger,
  PoolPump,
  VaccumCleaner,
  WashingMachine,
  WellPump,
} from '../icons';
import WarningPopup from './WarningPopup';
import Input from '../../components/text_input/Input';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { toCanvas } from 'html-to-image';
import { IoMdCloseCircleOutline } from 'react-icons/io';
export interface Ibattery {
  amp: number;
  note: string;
  isOn: boolean;
  category_ampere: number;
  category_name: string;
}

const BatteryAmp = () => {
  const [otherDeatil, setOtherDeatil] = useState<{
    continous_current?: number;
    lra?: number;
    prospect_name?: string;
    SysSize?: number;
    missing_labels?: string;
  }>({});
  const [requiredBattery, setRequiredBattery] = useState(0);
  const [initial, setInitial] = useState(0);

  const { id } = useParams();
  const [batteryPower, setBatteryPower] = useState<Ibattery[]>([]);
  const [initialBattery, setInitialBattery] = useState<Ibattery[]>([]);
  const [mainOn, setMainOn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [mainDisabled, setMainDisabled] = useState(true);
  const [mssg, setMssg] = useState('');
  const [totalAmp, setTotalAmp] = useState(0);
  const [fullhomeBackup, setFullhomeBackup] = useState(true);
  const [lightHouseAmpSize, setLightHouseAmpSize] = useState<string | number>(
    0
  );
  const [btnText, setBtnText] = useState({
    primaryText: '',
    secondaryText: '',
  });
  const form = useRef<HTMLDivElement | null>(null);
  function formatSaleValue(value: any) {
    if (value === null || value === undefined) return ''; // Handle null or undefined values
    const sale = parseFloat(value);
    if (sale === 0) return '0';
    if (sale % 1 === 0) return sale.toString(); // If the number is an integer, return it as a string without .00
    return sale.toFixed(2); // Otherwise, format it to 2 decimal places
  }

  const exportPdf = () => {
    if (form.current) {
      const element = form.current;
      const scrollHeight = element.scrollHeight;
      const filter = (node: HTMLElement) => {
        const exclusionClasses = ['calc-btn-wrapper'];
        return !exclusionClasses.some((classname) =>
          node.classList?.contains(classname)
        );
      };
      toCanvas(element, {
        height: scrollHeight,
        filter,
      }).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('download.pdf');
      });
    }
  };

  const switchPratialBackup = () => {
    Swal.fire({
      title: `<p style="font-size:14px;padding-top:20px;padding-bottom:16px;">The batteries are capable of powering the full load. Would you like to switch to full home backup?<p>`,
      showDenyButton: true,
      confirmButtonText: 'Yes, switch to full home backup',
      denyButtonText: `No, stay on partial home backup.`,
      focusDeny: true,
      confirmButtonColor: '#0BAF11',
      customClass: {
        denyButton: 'mt-13',
      },
    }).then((result) => {
      if (result.isDenied) {
        setFullhomeBackup(false);
      } else {
        setFullhomeBackup(true);
      }
      setRequiredBattery((prev) => prev + 1);
    });
  };

  const toggle = (index: number) => {
    const batteries = [...batteryPower];
    const ampValue = batteries[index].category_ampere * 0.6;
    const remain = avavilableAmpPercentage.remainingAmps - ampValue;
    const battery = batteries[index];

    if ((battery.amp < 70 ? remain >= 0 : true) && !batteries[index].isOn) {
      if (battery.amp >= 70) {
        Swal.fire({
          title: `<p style="font-size:14px;padding-top:20px;padding-bottom:16px;">This breaker exceeds the limits of a single Powerwall 3 if you would like to back up this load an additional battery is required.<p>`,
          showDenyButton: true,
          confirmButtonText: 'Add a battery and back-up this breaker',
          denyButtonText: `I do not want to back-up this breaker`,
          focusDeny: true,
          confirmButtonColor: '#0BAF11',
          customClass: {
            denyButton: 'mt-13',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            battery.isOn = true;
            const totalBattery = requiredBattery + 1;
            if (required <= totalBattery) {
              switchPratialBackup();
            }
          } else if (result.isDenied) {
            return;
          }
        });
      } else {
        batteries[index].isOn = true;
      }
    } else if (batteries[index].isOn) {
      if (battery.amp >= 70) {
        setRequiredBattery((prev) => prev - 1);
      }
      batteries[index].isOn = false;
    } else {
      toast.error(
        `Cannot turn on this breaker needs ${formatSaleValue(ampValue)} amp.`
      );
    }
    setBatteryPower([...batteries]);
  };

  const minRequired = (
    arr: Ibattery[],
    totalCategoryAmp: number,
    lra: number
  ) => {
    let count = 0;
    const base = { amp: 48, lra: 185 };
    count += Math.ceil(totalCategoryAmp / base.amp);
    const requiredPowerwallsByLRA = Math.ceil(lra / base.lra);
    let externalBattery = 0;
    arr.forEach((item) => {
      if (item.amp >= 60) {
        externalBattery = 2;
      }
    });
    return Math.max(count, requiredPowerwallsByLRA, externalBattery);
  };

  const roundToTenthsPlace = (number: number) => {
    return Math.round(number * 10) / 10;
  };

  const avavilableAmpPercentage = useMemo(() => {
    const ampCapacity =
      requiredBattery * 48 -
      (typeof lightHouseAmpSize === 'string'
        ? parseFloat(lightHouseAmpSize)
        : lightHouseAmpSize);
    setTotalAmp(ampCapacity);
    let selectedAmp = 0;
    batteryPower.forEach((item) => {
      if (item.isOn) {
        selectedAmp += item.category_ampere * 0.6;
      }
    });

    const remainingAmps = ampCapacity - selectedAmp;
    const percentage = (remainingAmps / ampCapacity) * 100;
    return { percentage, remainingAmps };
  }, [requiredBattery, batteryPower, lightHouseAmpSize]);

  const required = useMemo(() => {
    return initial;
  }, [initial]);

  useEffect(() => {
    const getProspectDetail = async () => {
      try {
        const data = await postCaller('get_prospect_load', {
          prospect_id: parseInt(id!) || 3,
        });
        if (data.status > 201) {
          toast.error((data as Error).message);
        } else {
          const batt = data.data.breakers.map((item: any) => ({
            ...item,
            amp: item.ampere === 0 ? 'Single Pull Breaker' : item.ampere,
            isOn: true,
          })) as Ibattery[];
          setBatteryPower([...batt]);
          setInitialBattery([...batt]);
          const lightHouse = Math.ceil(
            ((data?.data?.house_square * 1.5) / 120) * 0.6
          );
          setLightHouseAmpSize(formatSaleValue(lightHouse));
          const addedAmp =
            data?.data?.total_catergory_amperes * 0.6 +
            ((data?.data?.house_square * 1.5) / 120) * 0.6;
          const min = Math.ceil(
            Math.max(
              minRequired([...batt], addedAmp, data?.data?.lra),
              roundToTenthsPlace(data?.data?.SysSize) / 14
            )
          );

          let max = 0;

          batt.forEach((battery) => {
            if (battery.amp >= 60) {
              max = 2;
            }
          });
          setTotalAmp(
            Math.max(addedAmp, max, data?.data?.lra / 185) -
              (typeof lightHouseAmpSize === 'string'
                ? parseFloat(lightHouseAmpSize)
                : lightHouseAmpSize)
          );

          setOtherDeatil(data?.data);
          setInitial(min);
          setRequiredBattery(min);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    if (id) {
      getProspectDetail();
    }
  }, [id]);

  useEffect(() => {
    if (requiredBattery >= required && fullhomeBackup) {
      setMainOn(true);
      setBatteryPower((prev) => prev.map((ba) => ({ ...ba, isOn: true })));
    }
  }, [required, requiredBattery, fullhomeBackup]);
  return (
    <div
      ref={form}
      className="scrollbar   relative"
      style={{ backgroundColor: '#F2F2F2', paddingBottom: 100 }}
    >
      <div
        className="wrapper-header mt0 mx0"
        style={{
          backgroundColor: '#fff',
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <h4 className="h4" style={{ fontWeight: 500 }}>
          Electrical Panel
        </h4>
        <p
          className="mt1"
          style={{ color: '#7F7F7F', fontSize: 12, fontWeight: 500 }}
        >
          {' '}
          Customise panel as per requirement
        </p>
        {otherDeatil.missing_labels && (
          <p
            style={{ color: '#d62222', fontSize: 12, fontWeight: 500 }}
            className="mt1"
          >
            The breakers in your main panel were not properly labeled, our team
            has leveraged their extensive electrical experience to estimate the
            loads assigned to each breaker. While our team's experience is
            extensive without properly labeled breakers we cannot guarantee the
            accuracy of their estimate.
          </p>
        )}
      </div>
      <div className="batter-amp-container ">
        <div className="py3  batter-amp-wrapper  ">
          <div
            className="battery-watt-wrapper sticky-wrapper bg-white"
            style={{ width: '100%' }}
          >
            <p
              className="mb2"
              style={{ color: '#7C7C7C', fontSize: 12, fontWeight: 500 }}
            >
              Total number of batteries required
            </p>
            <div className=" flex justify-between ">
              <div>
                <h3 className="battery-watt-heading">
                  {' '}
                  {requiredBattery}{' '}
                  {requiredBattery > 1 ? 'Batteries' : 'Battery'}
                </h3>
              </div>
              <div className="flex counter-btn-wrapper items-center">
                <div
                  role="button"
                  onClick={() => {
                    if (requiredBattery > 1) {
                      if (required && requiredBattery <= required) {
                        setIsOpen(true);
                      } else {
                        setRequiredBattery((prev) =>
                          prev > 1 ? prev - 1 : prev
                        );
                      }
                    }
                  }}
                  className="watt-counter-btn pointer justify-center flex items-center"
                >
                  <FaMinus color="#fff" size={24} />
                </div>
                <div
                  role="button"
                  onClick={() =>
                    setRequiredBattery((prev) => {
                      if (prev < required) {
                        let init = prev + 1;
                        return init;
                      } else {
                        return prev;
                      }
                    })
                  }
                  className={`watt-counter-btn   pointer justify-center flex items-center ${requiredBattery >= required ? 'disable' : ''}`}
                >
                  <FaPlus color="#fff" size={24} />
                </div>
              </div>
            </div>

            {!mainOn && (
              <>
                <div className="battery-progress-bar  mt2 relative">
                  <div
                    className="progress"
                    style={{
                      width: `${avavilableAmpPercentage.percentage > 0 ? avavilableAmpPercentage.percentage : 0}%`,
                    }}
                  ></div>
                </div>
              </>
            )}
          </div>

          <div
            style={{ width: '100%' }}
            className="mt3 battery-watt-wrapper  justify-between flex items-center bg-white"
          >
            <div
              className="calc-input-wrapper relative"
              style={{ width: '100%' }}
            >
              <Input
                type="text"
                name=""
                label="Prospect Name"
                placeholder={'Prospect Name'}
                value={otherDeatil.prospect_name!}
                readOnly
                disabled
                onChange={() => 0}
              />
            </div>
          </div>

          <div
            className="bg-white mt3 panel-container p3 flex-grow-1 relative"
            style={{ borderRadius: 20 }}
          >
            <div className="absolute screw-top">
              <img src={screw} alt="" />
            </div>

            <div className="absolute screw-top-right">
              <img src={screw} alt="" />
            </div>

            <div className="absolute screw-bottom-right">
              <img src={screw} alt="" />
            </div>

            <div className="absolute screw-bottom-left">
              <img src={screw} alt="" />
            </div>
            <div className="battery-amp-wrapper mx-auto">
              <div className="bg-navy-dark mx-auto">
                <div className="home-battery relative flex items-center mx-auto">
                  <div className="battery flex items-center flex-grow-1">
                    <div className="battery-chip">
                      <svg
                        width="76"
                        height="91"
                        viewBox="0 0 76 91"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_d_917_2)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M32.8936 20.6523H24.4688V62.7763H32.8936V57.5106H51.8479V25.9176H32.8936V20.6523Z"
                            fill="#E5A21E"
                          />
                        </g>
                        <circle
                          cx="37.6984"
                          cy="33.8805"
                          r="2.64564"
                          fill="#956915"
                        />
                        <circle
                          cx="37.6984"
                          cy="49.7545"
                          r="2.64564"
                          fill="#956915"
                        />
                        <defs>
                          <filter
                            id="filter0_d_917_2"
                            x="0.483856"
                            y="0.664932"
                            width="75.3487"
                            height="90.0938"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feMorphology
                              radius="11.9924"
                              operator="dilate"
                              in="SourceAlpha"
                              result="effect1_dropShadow_917_2"
                            />
                            <feOffset dy="3.99748" />
                            <feGaussianBlur stdDeviation="5.99622" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_917_2"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_917_2"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div className="battery-amp flex-grow-1 flex items-center">
                      {mainOn ? (
                        <GoCheckCircleFill
                          className="mr1"
                          color="#129537"
                          size={21}
                        />
                      ) : (
                        <IoMdCloseCircleOutline
                          className="mr1"
                          color="#F44336"
                          size={21}
                        />
                      )}
                      <span>{mainOn ? 'Full' : 'Partial'} Home Backup</span>
                    </div>
                  </div>
                  <div className="batter-amp-switch pointer flex items-center justify-center">
                    <img
                      onClick={() => {
                        if (!mainOn) {
                          setRequiredBattery(required);
                        } else {
                          setIsOpen(true);
                        }
                      }}
                      src={mainOn ? on : off}
                      alt=""
                      className="pointer"
                    />
                  </div>
                </div>
                {!mainOn && (
                  <div className="flex items-center justify-center mt2">
                    <PiWarningCircleLight color="#F44336" />
                    <span
                      className="error ml1 mt0"
                      style={{ color: '#F44336' }}
                    >
                      {' '}
                      {
                        'This home does not qualify for a full home back-up'
                      }{' '}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt4 grid-amp-container">
                {batteryPower.map((item, index: number) => {
                  return (
                    <div
                      key={index}
                      style={{ border: '1px solid #D1D1D1' }}
                      className={` flex items-center relative `}
                    >
                      <div className="battery flex items-center flex-grow-1">
                        <div className=" flex-grow-1  ">
                          <span
                            className={`block text-center py1`}
                            style={{
                              backgroundColor: item.isOn
                                ? '#129537'
                                : '#F44336',
                              fontSize: 10,
                              color: '#fff',
                              fontWeight: 700,
                            }}
                          >
                            {' '}
                            {`${item.amp}${item.amp === 70 ? '+' : ''}`}{' '}
                          </span>
                          <div
                            className="breaker-category text-center flex items-center justify-center py-1"
                            style={{ backgroundColor: '#EEEEEE', height: 32 }}
                          >
                            <span
                              className="block"
                              style={{ fontSize: 10, lineHeight: 1.2 }}
                            >
                              {item.category_name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="batter-amp-switch sm-switch flex items-center justify-center">
                        {item.isOn ? (
                          <img
                            src={on}
                            onClick={() => !mainOn && toggle(index)}
                            width={26}
                            height={31}
                            alt=""
                            className="pointer"
                          />
                        ) : (
                          <img
                            src={off}
                            onClick={() => !mainOn && toggle(index)}
                            width={26}
                            height={31}
                            alt=""
                            className="pointer"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}

                <div
                  style={{ border: '1px solid #D1D1D1' }}
                  className={` flex items-center relative `}
                >
                  <div className="battery flex items-center flex-grow-1">
                    <div className=" flex-grow-1  ">
                      <span
                        className={`block text-center py1`}
                        style={{
                          backgroundColor: '#129537',
                          fontSize: 10,
                          color: '#fff',
                          fontWeight: 700,
                        }}
                      >
                        {lightHouseAmpSize}
                      </span>
                      <div
                        className="breaker-category text-center flex items-center justify-center py-1"
                        style={{ backgroundColor: '#EEEEEE', height: 32 }}
                      >
                        <span
                          className="block"
                          style={{ fontSize: 10, lineHeight: 1.2 }}
                        >
                          Lights and Outlet
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="batter-amp-switch sm-switch flex items-center justify-center">
                    <img
                      src={on}
                      width={26}
                      height={31}
                      alt=""
                      className="pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="calc-btn-wrapper">
            <button
              onClick={exportPdf}
              className="calc-btn text-white pointer calc-green-btn"
              style={{ maxWidth: '100%' }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <WarningPopup
          setMainOn={setMainOn}
          btnText={btnText}
          popUpMsg={mssg}
          isOpen={isOpen}
          required={required}
          setBatteryPower={setBatteryPower}
          setRequiredBattery={setRequiredBattery}
          setMainDisabled={setMainDisabled}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default BatteryAmp;
