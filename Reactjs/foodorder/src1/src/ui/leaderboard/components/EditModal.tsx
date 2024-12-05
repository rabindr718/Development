import './Modal.css';
import { ICONS } from '../../../resources/icons/Icons';
import { GoUpload } from 'react-icons/go';
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  ChangeEventHandler,
} from 'react';
import { ColorpickerIcon } from './Icons';
import { MdCheck } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { TYPE_OF_USER } from '../../../resources/static_data/Constant';
import PLaceholderImg from '../../../resources/assets/placeholder_img.svg';
import useAuth from '../../../hooks/useAuth';

interface EditModalProps {
  onClose: () => void;
  vdealer: any;
  setRefetch: Dispatch<SetStateAction<boolean>>;
  dealerLogo: undefined | string;
}

const ColorPicker = ({
  color,
  setColor,
}: {
  color: string;
  setColor: (newVal: string) => void;
}) => {
  const presetColors = [
    '#40A2EC',
    '#B474F5',
    '#8CC152',
    '#4A89DC',
    '#DA4453',
    '#3ACBC2',
    '#FC6E51',
  ];

  const setPresetColor = (presetColor: string) => () => {
    if (colorInputRef.current) {
      colorInputRef.current.value = presetColor;
      setColor(presetColor);
    }
  };

  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const onColorInputChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setColor(ev.currentTarget.value);
  };

  return (
    <div className="leader-modal-colorpicker">
      <p>Change background color</p>
      {presetColors.map((presetItem) => (
        <button
          key={presetItem}
          style={{
            backgroundColor: presetItem,
            outlineColor: presetItem === color ? color : 'transparent',
          }}
          onClick={setPresetColor(presetItem)}
        >
          {color === presetItem && <MdCheck size={16} fill="#fff" />}
        </button>
      ))}
      <input type="color" ref={colorInputRef} onChange={onColorInputChange} />
      <button
        onClick={() => colorInputRef.current?.click()}
        style={{
          outlineColor: presetColors.includes(color) ? 'transparent' : color,
        }}
      >
        <ColorpickerIcon />
      </button>
    </div>
  );
};

const LogoPicker = ({
  setLogo,
  dealerLogo,
}: {
  setLogo: (newVal: File | null) => void;
  dealerLogo: undefined | string;
}) => {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { authData } = useAuth();

  const role = authData?.role;
  const adminTheme = authData?.adminTheme;

  const handleFileInputChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    // Validate file type (only allow image types)
    const validImageTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ];
    if (!validImageTypes.includes(file.type)) {
      toast.error(
        'Please upload a valid image file (PNG, JPEG, JPG, WEBP)'
      );
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewSrc(reader.result);
        setLogo(file);
      }
    };
  };

  const switchImg = () => {
    if (role === TYPE_OF_USER.ADMIN || role === TYPE_OF_USER.FINANCE_ADMIN) {
      if (adminTheme) {
        return adminTheme.dealerLogo || ICONS.OWEBanner;
      } else {
        return ICONS.OWEBanner;
      }
    } else {
      return dealerLogo || PLaceholderImg;
    }
  };

  return (
    <>
      {previewSrc ? (
        <img alt="Preview" src={previewSrc} />
      ) : (
        <img src={switchImg()} width={150} alt="banner-logo" />
      )}

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileInputChange}
      />
      <button
        className="leader-modal-upload"
        onClick={() => fileInputRef.current?.click()}
      >
        <GoUpload size={16} />
        <span>Upload</span>
      </button>
      <small className="upload-notice">Upload Only PNG, JPEG, JPG, WEBP Files</small>

    </>
  );
};

const EditModal = ({
  onClose,
  vdealer,
  setRefetch,
  dealerLogo,
}: EditModalProps) => {
  const [color, setColor] = useState('#40A2EC');
  const [logo, setLogo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { authData, appendAuthData } = useAuth();

  const role = authData?.role;
  const handleUpdate = async () => {
    let imageUrl;
    setIsLoading(true);
    try {
      if (logo) {
        imageUrl = await uploadImage(logo);
      }
      if (role === 'Admin' || role === TYPE_OF_USER.FINANCE_ADMIN) {
        const adminTheme = {
          bg_color: color,
          dealer_logo: imageUrl,
        };
        appendAuthData('adminTheme', adminTheme);
        setTimeout(() => {
          setRefetch((prev) => !prev);
        }, 100);
        onClose();
      }

      if (vdealer) {
        const response = await postCaller('update_vdealer', {
          record_id: vdealer?.record_id,
          dealer_code: vdealer?.dealer_code,
          dealer_name: vdealer?.dealer_name,
          Description: vdealer?.Description,
          dealer_logo: imageUrl || vdealer.dealer_logo,
          bg_colour: color,
        });
        if (response.status > 201) {
          toast.error(response.message);
          setIsLoading(false);
          return;
        } else {
          toast.success('Logo Update Successfully');

          setRefetch((prev) => !prev);
          onClose();
        }
      } else {
        if (role !== 'Admin' && role !== TYPE_OF_USER.FINANCE_ADMIN) {
          toast.error('Something is Wrong');
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (image: File): Promise<string> => {
    if (!image) throw new Error('No image provided');

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'xdfcmcf4');
      formData.append('cloud_name', 'duscqq0ii');

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/duscqq0ii/image/upload`,
        formData
      );
      const imageUrl = response.data.secure_url;
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };

  return (
    <div className="edit-modal">
      <div className="leader-modal">
        <h2>Change Picture</h2>
        <div className="modal-center">
          <LogoPicker setLogo={setLogo} dealerLogo={dealerLogo} />
          <ColorPicker color={color} setColor={setColor} />
        </div>
        <div className="leader-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="update-button"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="blinking">Uploading...</span>
            ) : (
              'Update'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
