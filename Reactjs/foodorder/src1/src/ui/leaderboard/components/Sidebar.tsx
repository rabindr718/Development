import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ArrowForward, Growth, ServiceIcon, SuccessIcon } from './Icons';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';
import { format, subDays } from 'date-fns';
import { HiDownload } from 'react-icons/hi';
import { toCanvas } from 'html-to-image';
import { FirstAwardIcon, SecondAwardIcon, ThirdAwardIcon } from './Icons';
import SocialShare from '../../batterBackupCalculator/components/SocialShare';
import useAuth, { AuthData } from '../../../hooks/useAuth';

interface IDealer {
  dealer?: string;
  rep_name?: string;
  start_date?: string;
  end_date?: string;
  leader_type?: string;
  name: string;
  rank: number;
  sale: number;
  ntp: number;
  install: number;
}
const today = new Date();
const switchIcons = (rank: number) => {
  switch (rank) {
    case 1:
      return <FirstAwardIcon width={40} height={40} />;

    case 2:
      return <SecondAwardIcon width={40} height={40} />;
    case 3:
      return <ThirdAwardIcon width={40} height={40} />;

    default:
      return (
        <span
          style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}
          className="ml1"
        >
          {rank}
          <span
            className="block"
            style={{ fontSize: 10, color: '#434343', fontWeight: 500 }}
          >
            Rank
          </span>
        </span>
      );
  }
};

const Sidebar = ({
  isOpen,
  setIsOpen,
  dealer,
  unit,
}: {
  isOpen: number;
  setIsOpen: Dispatch<SetStateAction<number>>;
  dealer: IDealer;
  unit: string;
}) => {
  const [data, setData] = useState<any>({});
  const { authData } = useAuth();
  const [selectedRangeDate, setSelectedRangeDate] = useState({
    label: 'Weekly',
    value: `${format(subDays(today, 7), 'dd-MM-yyyy')},${format(today, 'dd-MM-yyyy')}`,
  });
  const [isGenerating, setGenerating] = useState(false);
  const [socialUrl, setSocialUrl] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const topCards = useRef<HTMLDivElement | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isPasswordChangeRequired =
      authData?.isPasswordChangeRequired?.toString();

    setAuthenticated(isPasswordChangeRequired === 'false');
  }, [authData]);

  const getLeaderDetail = async () => {
    try {
      const data = await postCaller('get_leaderboardprofiledatarequest', {
        ...dealer,
        count_kw_selection: true,
        // start_date: selectedRangeDate.value.split(',')[0],
        // end_date: selectedRangeDate.value.split(',')[1],
      });
      if (data.status > 201) {
        toast.error(data.message);
        return;
      }
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const shareImage = () => {
    if (topCards.current) {
      const element = topCards.current;
      const scrollHeight = element.scrollHeight;
      setGenerating(true);
      setTimeout(() => {
        setGenerating(false);
      }, 100);
      toCanvas(element, {
        height: scrollHeight,
      }).then((canvas) => {
        const img = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = img;
        link.download = 'Performance_Leaderboard.png';
        link.click();
        setGenerating(false);
      });
    }
  };

  useEffect(() => {
    if (Object.keys(dealer).length && isAuthenticated) {
      getLeaderDetail();
    }
  }, [dealer, selectedRangeDate.value, isAuthenticated]);

  function formatSaleValue(value: any) {
    if (value === null || value === undefined) return ''; // Handle null or undefined values
    const sale = parseFloat(value);
    if (sale === 0) return '0';
    if (sale % 1 === 0) return sale.toString(); // If the number is an integer, return it as a string without .00
    return sale.toFixed(2); // Otherwise, format it to 2 decimal places
  }

  //close the modal on press on esc
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(-1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className="user-profile-sidebar-fixed scrollbar flex items-center justify-end"
      style={{ right: isOpen > 0 ? '0' : '-100%', transition: 'all 500ms' }}
    >
      <div ref={topCards} className="user-sidebar relative">
        <span
          onClick={() => setIsOpen(-1)}
          className="absolute back-icon-sidebar back-icon block"
          style={{ display: isGenerating ? 'none' : 'block' }}
        >
          <ArrowForward />
        </span>
        <div className="user-profile">
          <div className="user-card">
            <div className="flex items-center user-name-wrapper px2">
              {switchIcons(dealer.rank)}
              <div className="ml2">
                <h3
                  className="h5 mb0"
                  style={{ lineHeight: 1.2, fontSize: 20, color: '#434343' }}
                >
                  {dealer.name}
                </h3>
                {/* <p
                  className=""
                  style={{ color: '#434343', fontSize: 10, marginTop: 6 }}
                >
                  OUR31245
                </p> */}
              </div>
            </div>
            <div className="mt2 px2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="card-label block">Team name</span>
                  <h6 className="card-value"> {data?.team_name || 'N/A'} </h6>
                </div>
                <div>
                  <span className="card-label block">Contact number</span>
                  <h6 className="card-value">
                    {' '}
                    {data?.contact_number ? `+${data.contact_number}` : 'N/A'}
                  </h6>
                </div>
              </div>
              <div className="mt1">
                <span className="card-label block">Email address</span>
                <h6 className="card-value">{data?.email || 'N/A'}</h6>
              </div>
            </div>
          </div>
          <div className="mt3">
            <div className="flex items-center justify-between">
              <h4 className="h4" style={{ fontWeight: 600 }}>
                Performance
              </h4>
            </div>
            <div className="mt2">
              <div
                className="flex items-center justify-between"
                style={{ paddingBottom: 10, borderBottom: '1px solid #EAEAEA' }}
              >
                <div>
                  <div className="icon">
                    <Growth />
                  </div>
                  <div>
                    <span className="stats-labels">Total Sales</span>
                    <span
                      style={{ fontSize: 21, fontWeight: 700 }}
                      className="block"
                    >
                      {formatSaleValue(dealer.sale)}
                      <span className="unit">
                        ({unit === 'kw' ? 'kW' : 'count'})
                      </span>
                    </span>
                  </div>
                </div>

                <div>
                  <div className="icon">
                    <SuccessIcon />
                  </div>
                  <div>
                    <span className="stats-labels">Total NTP</span>
                    <span
                      style={{ fontSize: 21, fontWeight: 700 }}
                      className="block"
                    >
                      {formatSaleValue(dealer.ntp)}
                      <span className="unit">
                        ({unit === 'kw' ? 'kW' : 'count'})
                      </span>
                    </span>
                  </div>
                </div>

                <div>
                  <div className="icon">
                    <ServiceIcon />
                  </div>
                  <div>
                    <span className="stats-labels">Total Installs</span>
                    <span
                      style={{ fontSize: 21, fontWeight: 700 }}
                      className="block"
                    >
                      {formatSaleValue(dealer.install)}
                      <span className="unit">
                        ({unit === 'kw' ? 'kW' : 'count'})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="px2">
                <div className="grey-weekly-stats justify-center flex items-center">
                  <div className="bg-white text-center leader-board-stats-wrapper py1">
                    <span className="block" style={{ fontWeight: 400 }}>
                      Weekly sales
                    </span>
                    <span className="block" style={{ fontWeight: 600 }}>
                      {formatSaleValue(data?.weekly_sale)}
                    </span>
                  </div>

                  <div className="text-center leader-board-stats-wrapper py1">
                    <span className="block" style={{ fontWeight: 400 }}>
                      Total sales
                    </span>
                    <span className="block" style={{ fontWeight: 600 }}>
                      {formatSaleValue(data?.total_sales)}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={shareImage}
                    className="leader-stats-share-btn"
                    disabled={isGenerating}
                  >
                    <HiDownload size={16} color="#fff" className="mr1" />
                    <span> Download </span>
                  </button>

                  {isShareOpen && (
                    <SocialShare
                      setIsOpen={setIsShareOpen}
                      socialUrl={socialUrl}
                      className="sidebar-social-share"
                    />
                  )}
                </div>

                <div className="mt1 text-center">
                  <span className="text-center block" style={{ fontSize: 12 }}>
                    Powered by
                  </span>
                  <small
                    className="block text-center"
                    style={{ fontWeight: 600, fontSize: 12, color: '#9CCB3B' }}
                  >
                    <span style={{ color: '#0094CD', marginRight: 3 }}>
                      OUR
                    </span>
                    WORLD ENERGY
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
