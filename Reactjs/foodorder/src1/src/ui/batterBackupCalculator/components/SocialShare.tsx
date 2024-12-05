import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';
const SocialShare = ({
  socialUrl,
  setIsOpen,
  direction = 'column',
  className = '',
}: {
  socialUrl: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  direction?: 'column' | 'row';
  className?: string;
}) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const elm = event.target as HTMLElement;
      if (!elm.closest('.social-share-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  return (
    <div
      style={{ flexDirection: direction }}
      className={`absolute social-share-container bg-white flex flex-column items-center ${className}`}
    >
      <WhatsappShareButton url={socialUrl}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <FacebookShareButton url={socialUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TelegramShareButton url={socialUrl}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </div>
  );
};

export default SocialShare;
