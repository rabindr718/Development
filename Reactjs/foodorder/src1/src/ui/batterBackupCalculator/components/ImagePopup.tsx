import React, { SetStateAction, useState } from 'react';
import {
  FaCircleArrowRight,
  FaCircleArrowLeft,
  FaDownload,
} from 'react-icons/fa6';
import { CgClose } from 'react-icons/cg';
const ImagePopup = ({
  imgs = [],
  active = 0,
  setIsOpen,
}: {
  imgs: string[];
  active: number;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [activeImg, setActiveImg] = useState(active);
  function downloadFile(url: string, filename: string) {
    fetch(url)
      .then((res) => res.blob())
      .then((res) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(res);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  return (
    <div className="transparent-model scrollbar block">
      <div className="flex items-center p2 justify-center" style={{ gap: 10 }}>
        <div
          onClick={() => setIsOpen(false)}
          className="absolute pointer"
          style={{ right: 20, top: 17 }}
        >
          <CgClose size={16} color="#fff" />
        </div>
        <button
          className={`pointer crl-btn `}
          onClick={() => activeImg > 0 && setActiveImg((prev) => prev - 1)}
        >
          <FaCircleArrowLeft size={24} color="#fff" />
        </button>
        <div className="relative">
          <div
            className="absolute flex items-center justify-center"
            style={{
              width: 30,
              height: 30,
              top: '5%',
              right: 20,
              background: 'rgba(0,0,0,.5)',
              borderRadius: '50%',
            }}
            onClick={() => downloadFile(imgs[activeImg], 'my-file.png')}
          >
            <FaDownload color="#fff" />
          </div>
          <img
            src={imgs?.[activeImg]}
            alt=""
            className="mt2"
            style={{ maxWidth: '100%' }}
          />
          <div
            className="block  text-white text-center"
            style={{ color: '#fff' }}
          >
            {activeImg + 1}/{imgs?.length}
          </div>
        </div>
        <button
          className={`pointer crl-btn `}
          onClick={() =>
            imgs?.length - 1 > activeImg && setActiveImg((prev) => prev + 1)
          }
        >
          <FaCircleArrowRight size={24} color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default ImagePopup;
