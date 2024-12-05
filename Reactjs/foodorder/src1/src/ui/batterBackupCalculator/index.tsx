import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import dummy from './lib/dummy_img.png';
import Input from '../components/text_input/Input';
import jsPDF from 'jspdf';
import { TbMinus, TbPlus } from 'react-icons/tb';
import { TfiTrash } from 'react-icons/tfi';
import { useHref, useLocation, useNavigate, useParams } from 'react-router-dom';
import { postCaller } from '../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';
import Carousel from 'react-multi-carousel';
import type { ButtonGroupProps } from 'react-multi-carousel';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import CategoryPopup from './components/CategoryPopup';
import { LuChevronRight } from 'react-icons/lu';
import AppliancePopup from './components/AppliancePopup';
import { sendMail } from '../../utiles';
import ImagePopup from './components/ImagePopup';
import Switch from '../components/Switch';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export interface IPrimary {
  water_heater: string;
  cooking_appliances: string;
  furnace: string;
  clothes_dryer: string;
}
export interface ISecondary {
  pool_pump: boolean;
  well_pump: boolean;
  ev_charger: boolean;
  spa: boolean;
}
export interface IDetail {
  panel_images_url: string[];
  prospect_name: string;
  sr_email_id: string;
  primary_data: IPrimary;
  secondary_data: ISecondary;
  house_square: number;
  address: string;
  system_size: number;
  add_notes: string;
}
const apms = [
  '15 AMP',
  '20 AMP',
  '25 AMP',
  '30 AMP',
  '35 AMP',
  '40 AMP',
  '45 AMP',
  '50 AMP',
  '60 AMP',
  '70+ AMP',
];
const Index = () => {
  const { id } = useParams();
  const [inputDetails, setInputDetails] = useState<{
    prospectName: string;
    lra: string;
  }>({
    prospectName: '',
    lra: '',
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParamValue = searchParams.get('img');
  type TBReakerError = {
    breaker: string;
  };
  type TError = typeof inputDetails & TBReakerError;
  const [errors, setErrors] = useState<TError>({} as TError);
  const [isOpen, setIsOpen] = useState(false);
  const [applianceOpen, setApplianceOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [detail, setDetail] = useState({} as IDetail);
  const [activeImg, setActiveImg] = useState(-1);
  const [imgPopup, setImgPopup] = useState(false);
  const [missingLabel, setMissingLabel] = useState(false);
  const [batter, setBattery] = useState<
    {
      category: { name: string; ampere: number };
      amp: string;
      note: string;
    }[]
  >([]);
  const [isSelected, setIsSelected] = useState(-1);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const elm = e.target as HTMLElement;
      if (!elm.closest('.unit-wrapper') && !isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);

  const handleValidation = () => {
    const error: TError = {} as TError;
    for (const key in inputDetails) {
      if (!inputDetails[key as keyof typeof inputDetails]) {
        error[key as keyof typeof inputDetails] = `${key} is required`;
      }
    }

    if (!batter.length) {
      error.breaker = 'Breaker is  required';
    }
    setErrors({ ...error });
    return Object.keys(error).length ? false : true;
  };
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === 'continuousCurrent' || name === 'lra') {
      value = value.replace(/[^0-9.]/g, '');
    }

    setInputDetails((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const getPropspectDetail = async () => {
      try {
        const data = await postCaller('get_prospect_info', {
          prospect_id: parseInt(id!),
        });
        setDetail(data?.data as IDetail);
        setInputDetails((prev) => ({
          ...prev,
          prospectName: data?.data?.prospect_name || '',
        }));
      } catch (error) {
        console.error(error);
      }
    };
    getPropspectDetail();
  }, []);

  const shareImage = () => {
    return sendMail({
      toMail: detail.sr_email_id,
      message: `
    
      `,
      subject: 'Battery Calc Notification',
      html_content: `
<p>
      Hi Sales Rep Team,
 <br>
You have recieved a request from Electrical Team to fill the information in battery calculation form.
 <br>

Please visit the below URL to complete the form.</p>
      <a  clicktracking="off" href="${`${window.location.protocol}//${window.location.host}/battery-ui-generator/${id}`}" >${`${window.location.protocol}//${window.location.host}/battery-ui-generator/${id}`}</a>
<strong style="display:block;">
Thank you
</strong>
<strong style="display:block;">
OWE Battery Calc
</strong>
      
      
      `,
    }).then(
      (response) => {
        console.log('Email sent successfully:', response);
        toast.success('Email sent successfully:');
        setInputDetails({
          prospectName: '',
          lra: '',
        });
        setIsPending(false);
        setBattery([]);
      },
      (error) => {
        toast.error(error.text as string);
        console.error('Failed to send email:', error);
      }
    );
  };

  const handleSubmit = async () => {
    try {
      setIsPending(true);
      const data = await postCaller('set_prospect_load', {
        prospect_id: parseInt(id!),
        prospect_name: inputDetails.prospectName,
        lra: parseFloat(inputDetails.lra),
        missing_labels: missingLabel,
        breakers: batter.map((battery) => ({
          ...battery,
          ampere: battery.amp.includes('70')
            ? parseFloat(battery.amp.split('+')[0])
            : parseFloat(battery.amp.split(' ')[0]),
        })),
      });
      await shareImage();
    } catch (error) {
      setIsPending(false);
      toast.error((error as Error).message!);
    }
  };

  const lightHouseAmpSize = Math.ceil(
    ((detail.house_square * 1.5) / 120) * 0.6
  );

  const ButtonGroup = ({
    next,
    previous,
    goToSlide,
    ...rest
  }: ButtonGroupProps) => {
    const { carouselState } = rest;
    console.log(carouselState?.currentSlide);

    return (
      <div
        style={{ gap: 24 }}
        className="carousel-button-group items-center justify-center flex items-center"
      >
        <button
          className={`pointer crl-btn ${carouselState?.currentSlide === 0 ? 'disable' : ''}`}
          onClick={() => previous?.()}
          disabled={carouselState?.currentSlide === 0}
        >
          <FaCircleArrowLeft size={24} className="mt1" />
        </button>

        <span>
          {carouselState?.currentSlide! + 1} /{' '}
          {detail?.panel_images_url?.length}
        </span>

        <button
          disabled={
            carouselState?.currentSlide! + 1 ===
            detail?.panel_images_url?.length
          }
          className="crl-btn pointer"
          onClick={() => next?.()}
        >
          <FaCircleArrowRight size={24} className="mt1" />
        </button>
      </div>
    );
  };

  return (
    <div
      className="form-group-container "
      style={{ backgroundColor: '#F2F2F2', minHeight: '100vh' }}
    >
      <div className=" battery-wrapper p3">
        <div className="wrapper-header">
          <h4 className="h4" style={{ fontWeight: 500, color: '#fff' }}>
            Breakers Details Form
          </h4>
          <p
            className="mt1"
            style={{ color: '#fff', fontSize: 12, fontWeight: 500 }}
          >
            {' '}
            Fill all required details to generate panel
          </p>
        </div>

        <div className="mt3">
          <button
            className="block ml-auto"
            style={{
              border: 'none',
              backgroundColor: '#fff',
              padding: '8px 14px',
              borderRadius: 4,
            }}
            onClick={() => setApplianceOpen(true)}
          >
            View info
          </button>
          {applianceOpen && (
            <AppliancePopup
              note={detail?.add_notes || ''}
              systemSize={detail.system_size}
              primaryDetail={detail.primary_data}
              secondaryDetail={detail.secondary_data}
              isOpen={applianceOpen}
              address={detail.address}
              squareFoot={detail.house_square}
              setIsOpen={setApplianceOpen}
            />
          )}
        </div>

        <div className="flex  flex-wrap">
          <div className="lg-col-4 pr3 col-12 ">
            <div className="inline-block mt3" style={{ width: '100%' }}>
              {detail?.panel_images_url?.length ? (
                <Carousel
                  swipeable={false}
                  draggable={false}
                  responsive={responsive}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  customTransition="all .5s"
                  arrows={false}
                  renderButtonGroupOutside
                  customButtonGroup={<ButtonGroup />}
                  transitionDuration={500}
                  containerClass="carousel-container panel-carousel"
                >
                  {detail.panel_images_url.map((image, index) => {
                    return (
                      <div
                        className="block"
                        onClick={() => {
                          setActiveImg(index);
                          setImgPopup(true);
                        }}
                        key={index}
                      >
                        <img
                          src={image}
                          alt=""
                          className="mx-auto block"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '280px',
                          }}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              ) : (
                ''
              )}
            </div>
            <div
              style={{ marginRight: '-2rem' }}
              className="flex missing_label_wrapper mt3 mb2 items-center  justify-between"
            >
              <span>Missing Labels</span>

              <Switch
                checked={missingLabel}
                onChange={() => setMissingLabel((prev) => !prev)}
              />
            </div>
          </div>
          <div className="lg-col-4 dashed-section  pb3 col-12">
            {batter.map((battery, ind) => {
              return (
                <div className="calc-row" key={ind}>
                  <div className="calc-border  flex items-center justify-between amp-p calc-caret">
                    <span>{battery.amp}</span>
                    <span
                      role="button"
                      onClick={() =>
                        setBattery((prev) =>
                          prev.filter((_, index) => index !== ind)
                        )
                      }
                      className="pointer"
                      style={{ fontSize: 12, fontWeight: 500 }}
                    >
                      Remove
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      setIsSelected(ind);
                      setIsCategoryOpen(true);
                    }}
                    className="calc-border category-btn pointer amp-p flex items-center justify-between calc-caret"
                  >
                    <span
                      style={{ textTransform: 'capitalize' }}
                      className="calc-category-label capitalize"
                    >
                      {battery.category.name
                        ? battery.category.name
                        : 'Add Category'}
                    </span>
                    {!battery.category ? (
                      <TbPlus size={16} className="pointer" color="#919191" />
                    ) : (
                      <LuChevronRight size={16} color="#000" />
                    )}
                  </div>
                  <div className=" calc-caret flex items-center justify-center">
                    <input
                      type="text"
                      className="amp-p"
                      onChange={(e) => {
                        const battery = [...batter];
                        battery[ind].note = e.target.value;
                        setBattery([...battery]);
                      }}
                      value={battery.note}
                      placeholder="Add Note "
                    />
                  </div>
                </div>
              );
            })}
            <div className={`unit-wrapper bg-white `}>
              {!isOpen ? (
                <p className="text-center" onClick={() => setIsOpen(true)}>
                  Add more breakres +
                </p>
              ) : (
                <p>Add Breaker Size</p>
              )}
              {isOpen && (
                <div className="mt2 unit-grid">
                  {apms.map((item, index) => {
                    return (
                      <div
                        onClick={() => {
                          setBattery((prev) => [
                            ...prev,
                            {
                              note: '',
                              amp: item,
                              category: { name: '', ampere: 0 },
                            },
                          ]);
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-center"
                        key={index}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {errors.breaker && <span className="error"> {errors.breaker}</span>}
          </div>
          <div className="lg-col-4 col-12">
            <div className=" form-calc-details" style={{ marginTop: 25 }}>
              <div className="">
                <div className="mb3 calc-input">
                  <Input
                    onChange={inputHandler}
                    value={inputDetails.prospectName}
                    name="prospectName"
                    type="text"
                    placeholder=""
                    label="Prospect name"
                  />
                  {errors.prospectName && (
                    <span className="error">
                      {' '}
                      {errors.prospectName.replaceAll(
                        'prospectName',
                        'Prospect name'
                      )}{' '}
                    </span>
                  )}
                </div>

                <div className="mb3 calc-input">
                  <Input
                    onChange={inputHandler}
                    value={inputDetails.lra}
                    name="lra"
                    type="text"
                    placeholder=""
                    label="Locked Rotor Amps (LRA)"
                  />

                  {errors.lra && (
                    <span className="error">
                      {' '}
                      {errors.lra.replaceAll(
                        'lra',
                        'Locked Rotor Amps (LRA)'
                      )}{' '}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt4 justify-center calc-btn-wrapper items-center">
          <button
            onClick={() => {
              setBattery([]);
              setInputDetails({
                prospectName: '',
                lra: '',
              });
            }}
            className="calc-btn calc-grey-btn pointer"
          >
            Reset All
          </button>
          {/* <button
            className="calc-btn text-white pointer text-white calc-yellow-btn"
            onClick={exportPdf}
          >
            Export PDF
          </button> */}

          <button
            disabled={isPending}
            onClick={() => handleValidation() && handleSubmit()}
            className={`calc-btn text-white pointer ${batter.length ? 'calc-green-btn' : 'calc-grey-btn'}`}
          >
            Submit
          </button>
        </div>
      </div>
      <CategoryPopup
        battery={batter}
        setBattery={setBattery}
        isSelected={isSelected}
        isOpen={isCategoryOpen}
        setIsOpen={setIsCategoryOpen}
        lightHouseAmpSize={lightHouseAmpSize}
      />
      {imgPopup && (
        <ImagePopup
          setIsOpen={setImgPopup}
          active={activeImg}
          imgs={detail.panel_images_url}
        />
      )}
    </div>
  );
};

export default Index;
