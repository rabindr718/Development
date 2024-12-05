import React, { useState, ChangeEvent, useEffect } from 'react';
import './srImageUpload.css';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { PiCircle } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { EvCharger, PoolPump, Spa, WellPump } from '../icons';
import { GoPlus } from 'react-icons/go';
import { errorSwal } from '../../components/alert/ShowAlert';
import { RiCloseLine } from 'react-icons/ri';
import { sendMail } from '../../../utiles';
import s3Upload from '../../../utiles/s3Upload';
import { FaXmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
const primaryApplicances = [
  { name: 'Water heater', id: 1 },
  { name: 'Cooking appliances', id: 2 },
  { name: 'Furnace', id: 3 },
  { name: 'Clothes dryer', id: 4 },
];
const secondaryApplicances = [
  { name: 'Pool pump', id: 5, icon: <PoolPump color="#000" /> },
  { name: 'Well pump', id: 6, icon: <WellPump color="#000" /> },
  { name: 'EV charger', id: 7, icon: <EvCharger color="#000" /> },
  { name: 'Spa', id: 8, icon: <Spa /> },
];
const FormComponent: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [primaryApplicance, setPrimaryApplicance] = useState(() =>
    primaryApplicances.map((item) => ({ ...item, isSelected: '' }))
  );
  const [secondaryApplicance, setSecondaryApplicance] = useState(() =>
    secondaryApplicances.map((item) => ({ ...item, isSelected: false }))
  );
  const [address, setAddress] = useState<string>('');
  const [prospectName, setProspectName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [squareFeet, setSquareFeet] = useState('');
  const [systemSize, setSystemSize] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const [error, setError] = useState<{
    email?: string;
    prospectName?: string;
    primaryAppliance?: string;
    secondaryAppliance?: string;
    squareFeet?: string;
    address?: string;
    systemSize?: string;
  }>({});
  const [note, setNote] = useState('');
  const [randomKey, setRandomKey] = useState(Date.now());
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files?.length
      ? Array.from(event.target.files)
      : [];
    if (files.length > 5) {
      await errorSwal('error', 'Please select up to 5 files.');
      return;
    }
    console.log(files, 'filess selected');
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...fileURLs]);
    setRandomKey(Date.now());
  };

  const handleDeleteImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  console.log(uploadedImages, 'fff image');
  const handleValidation = () => {
    const tempError = {} as typeof error;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      tempError['email'] = 'Email is required';
    }
    if (!prospectName.trim()) {
      tempError['prospectName'] = 'Prospect Name is required';
    }

    if (!address.trim()) {
      tempError['address'] = 'Address is required';
    }

    if (!squareFeet.trim()) {
      tempError['squareFeet'] = "House's Square Feet is required";
    }
    if (!systemSize.trim()) {
      tempError['systemSize'] = 'System Size is required';
    }
    setError({ ...tempError });
    return !Boolean(Object.keys(tempError).length);
  };

  const handleFormSubmit = async () => {
    if (handleValidation()) {
      setIsUploading(true);
      try {
        const uploadedUrls = await uploadImages(uploadedImages);
        const obj1: { [key: string]: string } = {};
        const obj2: { [key: string]: boolean } = {};
        primaryApplicance.forEach((app) => {
          if (app.isSelected) {
            obj1[app.name.toLocaleLowerCase().replaceAll(' ', '_')] =
              app.isSelected;
          }
        });
        secondaryApplicance.forEach((app) => {
          obj2[app.name.toLocaleLowerCase().replaceAll(' ', '_')] =
            app.isSelected;
        });

        const response = await postCaller('set_prospect_info', {
          prospect_name: prospectName,
          sr_email_id: email,
          panel_images_url: uploadedUrls,
          ...obj1,
          ...obj2,
          house_square: parseFloat(squareFeet),
          address,
          system_size: parseFloat(systemSize),
          added_notes: note,
        });

        if (response.status > 201) {
          toast.error((response as Error).message);
          setIsUploading(false);
        } else {
          sendMail({
            toMail: 'batterycalc@ourworldenergy.com',
            message: ``,
            subject: 'Battery Calc Notification',
            html_content: `
<p>
Hi Electrical Team,
 <br>

You have recieved a request from Sales Rep Team to fill the information in battery calculation form.
 <br>

Please visit the below URL to complete the form
</p>

<a clicktracking="off"  href="${`${window.location.protocol}//${window.location.host}/battery-backup-calulator/${response.data.prospect_id}`}" >${`${window.location.protocol}//${window.location.host}/battery-backup-calulator/${response.data.prospect_id}`}</a>

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
              toast.success('Email sent successfully');
              setPrimaryApplicance(
                primaryApplicances.map((item) => ({
                  ...item,
                  isSelected: '',
                }))
              );
              setSecondaryApplicance(
                secondaryApplicances.map((item) => ({
                  ...item,
                  isSelected: false,
                }))
              );
              setProspectName('');
              setEmail('');
              setUploadedImages([]);
              setIsUploading(false);
              setAddress('');
              setSystemSize('');
              setSquareFeet('');
              setNote('');
            },
            (error) => {
              toast.error(error.text as string);
              setIsUploading(false);
              console.error('Failed to send email:', error);
            }
          );
        }
      } catch (error) {
        console.error('Error uploading images to Cloudinary:', error);
      } finally {
      }
    }
  };

  async function fetchImage(url: string) {
    const response = await fetch(url);
    const blob = await response.blob();
    const contentDisposition = response.headers.get('content-disposition');
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1].replace(/"/g, '')
      : 'default.jpg'; // Fallback if filename is not provided

    return { blob, filename };
  }
  const uploadImages = async (imageArray: string[]): Promise<string[]> => {
    if (!imageArray || imageArray.length === 0) return [];

    try {
      const uploadResponses = Promise.all(
        imageArray.map(async (imageSrc) => {
          const file = await fetchImage(imageSrc);
          const converted = new File([file.blob], file.filename, {
            type: file.blob.type,
          });
          const uploaded = await s3Upload('/sr-images').uploadFile(
            converted,
            Date.now().toString()
          );
          return uploaded.location;
        })
      );

      return uploadResponses;
    } catch (error) {
      console.error('Error uploading images to Cloudinary:', error);
      throw error;
    }
  };

  const checkFormValidity = () => {
    if (email && uploadedImages.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    checkFormValidity();
  }, [prospectName, email, uploadedImages]);

  const lightHouseAmpSize = Math.ceil(
    ((parseFloat(squareFeet) * 1.5) / 120) * 0.6
  );

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="for_scroll sr-image-container">
        <div className=" sr-form-header" style={{ backgroundColor: '#313752' }}>
          <h3 style={{ color: '#fff' }}>Prospect panel form</h3>
          <p style={{ fontSize: 12, color: '#fff' }}>
            Fill all required prospect panel details
          </p>
        </div>

        <div className="form-container">
          <div
            onClick={handleBack}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingTop: '13px',
              cursor: 'pointer',
            }}
          >
            <FaXmark
              style={{
                height: '20px',
                width: '20px',
                color: '#000000',
                fontWeight: '600',
              }}
            />
          </div>
          <div className="prospect-input-field mt2">
            <input
              type="text"
              placeholder="Enter Prospect name"
              value={prospectName}
              onChange={(e) => setProspectName(e.target.value)}
            />
            {error.prospectName && (
              <div className="error">{error.prospectName}</div>
            )}
          </div>

          <div className="prospect-input-field mt2">
            <input
              type="email"
              id="email"
              placeholder="Enter Sales Rep Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error.email && <div className="error">{error.email}</div>}
          </div>

          <div className="prospect-input-field mt2">
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {error.address && <div className="error">{error.address}</div>}
          </div>

          <div className="prospect-input-field mt2">
            <input
              type="text"
              placeholder="Enter System Size"
              value={systemSize}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                setSystemSize((prev) =>
                  parseFloat(e.target.value) <= 100 || e.target.value === ''
                    ? e.target.value
                    : prev
                );
              }}
              required
            />
            {error.systemSize && (
              <div className="error">{error.systemSize}</div>
            )}
          </div>

          <div className="prospect-input-field mt2 relative">
            <input
              type="text"
              placeholder="Enter House's Square Foot"
              value={squareFeet}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                setSquareFeet(e.target.value);
              }}
              required
            />
            {!!lightHouseAmpSize && (
              <span
                style={{ position: 'absolute', top: '30%', right: 20 }}
                className="block text-dark"
              >
                {lightHouseAmpSize} Amps
              </span>
            )}
            {error.squareFeet && (
              <div className="error">{error.squareFeet}</div>
            )}
          </div>

          <div className="sr-appliance-wrapper">
            <div className="sr-appliance-header flex items-center">
              <div className="text-sm" style={{ flexBasis: '60%' }}>
                <h4 className="text-dark-navy">Primary appliances</h4>
              </div>

              <div
                className="text-sm text-center"
                style={{ flexBasis: '20%', flexShrink: 0 }}
              >
                <h4 className="text-dark-navy">Electric</h4>
              </div>

              <div
                className="text-sm end"
                style={{ flexBasis: '20%', flexShrink: 0 }}
              >
                <h4 className="text-dark-navy right-align">Gas</h4>
              </div>
            </div>
            <div className="sr-appliance-body">
              {primaryApplicance.map((appliance, ind) => {
                return (
                  <div key={appliance.id} className="flex mb2 items-center">
                    <div style={{ flexBasis: '60%' }}>
                      <h5
                        className="text-dark-navy"
                        style={{ fontWeight: 500 }}
                      >
                        {appliance.name}
                      </h5>
                    </div>

                    <div style={{ flexBasis: '20%', flexShrink: 0 }}>
                      {appliance.isSelected === 'electric' ? (
                        <IoCheckmarkCircle
                          color="#129537"
                          size={20}
                          onClick={() => {
                            const prev = [...primaryApplicance];
                            prev[ind].isSelected = '';
                            setPrimaryApplicance([...prev]);
                          }}
                          className="block mx-auto pointer"
                        />
                      ) : (
                        <PiCircle
                          color="#A2A2A2"
                          size={20}
                          onClick={() => {
                            const prev = [...primaryApplicance];
                            prev[ind].isSelected = 'electric';
                            setPrimaryApplicance([...prev]);
                          }}
                          className="block mx-auto pointer "
                        />
                      )}
                    </div>

                    <div
                      className="text-sm end"
                      style={{ flexBasis: '20%', flexShrink: 0 }}
                    >
                      {appliance.isSelected === 'gas' ? (
                        <IoCheckmarkCircle
                          onClick={() => {
                            const prev = [...primaryApplicance];
                            prev[ind].isSelected = '';
                            setPrimaryApplicance([...prev]);
                          }}
                          color="#129537"
                          size={20}
                          className="block ml-auto pointer"
                        />
                      ) : (
                        <PiCircle
                          color="#A2A2A2"
                          size={20}
                          onClick={() => {
                            const prev = [...primaryApplicance];
                            prev[ind].isSelected = 'gas';
                            setPrimaryApplicance([...prev]);
                          }}
                          className="block ml-auto pointer "
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sr-appliance-wrapper mt2">
            <div className="sr-appliance-header">
              <div className="text-sm">
                <h4 className="text-dark-navy">Secondary appliances</h4>
              </div>
              <p style={{ color: '#7F7F7F', fontSize: 12 }}>
                select appliances installed in house
              </p>
            </div>
            <div className="sr-appliance-body">
              {secondaryApplicance.map((appliance, ind) => {
                return (
                  <div key={appliance.id} className="flex mb2 items-center">
                    <div style={{ flexBasis: '15%' }}>{appliance.icon}</div>
                    <div style={{ flexBasis: '65%' }}>
                      <h5
                        className="text-dark-navy"
                        style={{ fontWeight: 500 }}
                      >
                        {appliance.name}
                      </h5>
                    </div>

                    <div
                      className="text-sm end"
                      style={{ flexBasis: '20%', flexShrink: 0 }}
                    >
                      {appliance.isSelected ? (
                        <IoCheckmarkCircle
                          onClick={() => {
                            const prev = [...secondaryApplicance];
                            prev[ind].isSelected = false;
                            setSecondaryApplicance([...prev]);
                          }}
                          color="#129537"
                          size={20}
                          className="block ml-auto pointer"
                        />
                      ) : (
                        <PiCircle
                          color="#A2A2A2"
                          size={20}
                          onClick={() => {
                            const prev = [...secondaryApplicance];
                            prev[ind].isSelected = true;
                            setSecondaryApplicance([...prev]);
                          }}
                          className="block ml-auto pointer "
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="prospect-input-field relative mt2">
            <textarea
              rows={4}
              placeholder="If breakers are not properly labeled within the main panel please add any details you may have about which loads the breakers support"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div
            style={{ gap: 12 }}
            className="upload-btn-wrapper mt3 pl3 flex items-center"
          >
            {uploadedImages.length > 0 && (
              <div className="uploaded-images ">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="thumbnail-container">
                    <img
                      src={image}
                      alt={`Uploaded ${index + 1}`}
                      className="uploaded-image"
                    />
                    <button
                      className="img-remove"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <RiCloseLine size={14} color="#000" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              style={{
                flexBasis: '52px',
                height: 52,
                border: '2px dashed #D9D9D9',
                background: 'transparent',
                borderRadius: 4,
              }}
              className="flex relative items-center justify-center"
            >
              <input
                type="file"
                multiple
                key={randomKey}
                maxLength={5}
                accept=".jpg, .jpeg, .png, .gif, .bmp, .svg"
                onChange={handleImageUpload}
                style={{ opacity: '0', position: 'absolute', inset: 0 }}
                id="upload-images"
              />
              <GoPlus color="#000" size={28} />
            </button>
            {uploadedImages.length <= 0 && (
              <div>
                <span
                  style={{ fontSize: 14, fontWeight: 600, color: '#272727' }}
                >
                  Upload image
                </span>
                <p style={{ color: '#7F7F7F', fontSize: 12 }}>
                  you can select upto 5 files
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleFormSubmit}
            disabled={!email.trim() || !prospectName.trim() || isUploading}
            className={`send-button `}
          >
            {isUploading ? 'Uploading...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
