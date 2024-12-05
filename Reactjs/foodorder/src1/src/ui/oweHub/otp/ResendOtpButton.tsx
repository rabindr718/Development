import { useCallback, useEffect, useRef, useState } from 'react';

const LOCALSTORAGE_COUNTDOWN_KEY = 'otp_sent_at';
const COUNTDOWN_DURATION_SEC = 300;

localStorage.removeItem(LOCALSTORAGE_COUNTDOWN_KEY);

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const ResendOtpButton = (props: {
  isLoading: boolean;
  onClick: () => Promise<void>;
}) => {
  const [remainingSec, setRemainingSec] = useState<number | null>(null);

  const setupCountdown = useCallback((otpSentAtTimestamp?: number) => {
    const otpSentAt = otpSentAtTimestamp || Date.now();
    localStorage.setItem(LOCALSTORAGE_COUNTDOWN_KEY, otpSentAt.toString());

    const remainingSec =
      COUNTDOWN_DURATION_SEC - Math.floor((Date.now() - otpSentAt) / 1000);

    if (remainingSec < 0) {
      setRemainingSec(0);
      return;
    }

    setRemainingSec(remainingSec);

    countdownIntervalId.current = setInterval(() => {
      setRemainingSec((oldVal) => {
        if (oldVal === null) return null;
        if (oldVal <= 1) {
          clearInterval(countdownIntervalId.current);
          return 0;
        }
        return (
          COUNTDOWN_DURATION_SEC - Math.floor((Date.now() - otpSentAt) / 1000)
        );
      });
    }, 1000);
  }, []);

  const countdownIntervalId = useRef<NodeJS.Timer>();

  useEffect(() => {
    setupCountdown();
    return () => clearInterval(countdownIntervalId.current);
  }, [setupCountdown]);

  const onClick = () => props.onClick().then(() => setupCountdown());

  if (remainingSec === null) return <></>;

  if (remainingSec === 0)
    return (
      <button
        className={'loginResendOtp'}
        disabled={props.isLoading}
        type="button"
        onClick={onClick}
      >
        Resend OTP
      </button>
    );

  return <p className="loginResendOtp">Resend in {formatTime(remainingSec)}</p>;
};

export default ResendOtpButton;
