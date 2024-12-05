import './Banner.css';
import { ICONS } from '../../../resources/icons/Icons';
import { LiaEdit } from 'react-icons/lia';
import EditModal from './EditModal';
import { useState, useEffect, useRef, SetStateAction } from 'react';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';
import { EndPoints } from '../../../infrastructure/web_api/api_client/EndPoints';
import { FaChevronDown } from 'react-icons/fa';
import { TYPE_OF_USER } from '../../../resources/static_data/Constant';
import useAuth from '../../../hooks/useAuth';

interface BannerProps {
  selectDealer: { label: string; value: string }[];
  setSelectDealer: React.Dispatch<
    React.SetStateAction<{ label: string; value: string }[]>
  >;
  bannerDetails: any;
  groupBy: string;
  isShowDropdown: boolean;
  isGenerating: boolean;
  setIsFetched: React.Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

const Banner: React.FC<BannerProps> = ({
  selectDealer,
  setSelectDealer,
  isShowDropdown,
  setIsFetched,
  isGenerating,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState<any>('');
  const [dealerId, setDealerId] = useState('');
  const [newFormData, setNewFormData] = useState<any>([]);
  const [vdealer, setVdealer] = useState('');
  const [refetch, setRefetch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [opts, setOpts] = useState<{ label: string; value: string }[]>([]);
  const { authData, getUpdatedAuthData } = useAuth();

  const [isAuthenticated, setAuthenticated] = useState(false);
  const tableData = {
    tableNames: ['dealer_name'],
  };
  const role = authData?.role;

  useEffect(() => {
    const isPasswordChangeRequired =
      authData?.isPasswordChangeRequired?.toString();

    setAuthenticated(isPasswordChangeRequired === 'false');
  }, [authData]);

  const leaderDealer = (newFormData: any): { value: string; label: string }[] =>
    newFormData?.dealer_name?.map((value: string) => ({
      value,
      label: value,
    }));
  const getNewFormData = async () => {
    const res = await postCaller(EndPoints.get_newFormData, tableData);
    if (res.status > 200) {
      return;
    }
    setNewFormData(res.data);
    setSelectDealer(leaderDealer(res.data));
    setOpts(leaderDealer(res.data));
    setIsFetched(true);
  };

  useEffect(() => {
    if (
      role === 'Admin' ||
      role === TYPE_OF_USER.FINANCE_ADMIN ||
      role === TYPE_OF_USER.ACCOUNT_EXCUTIVE ||
      role === TYPE_OF_USER.ACCOUNT_MANAGER ||
      isShowDropdown
    ) {
      getNewFormData();
    }
  }, [role]);

  useEffect(() => {
    if (
      role !== 'Admin' &&
      role !== TYPE_OF_USER.FINANCE_ADMIN &&
      role !== TYPE_OF_USER.ACCOUNT_EXCUTIVE &&
      role !== TYPE_OF_USER.ACCOUNT_MANAGER &&
      
      isAuthenticated
    ) {
      (async () => {
        try {
          const data = await postCaller('get_leaderboarddatarequest', {});

          if (data.status > 201) {
            // setIsLoading(false);
            toast.error(data?.message);
            return;
          }
          // setLeaderTable(data.data?.ap_ded_list as ILeaderBordUser[]);
          // setTotalCount(data?.dbRecCount);
          setDetails(data?.data);
          setDealerId(data?.data?.dealer_id);
        } catch (error) {
          console.error(error);
        } finally {
          // setIsLoading(false);
        }
      })();
    }
  }, [ role, refetch, isAuthenticated]);

  useEffect(() => {
    if (
      role === TYPE_OF_USER.ADMIN ||
      role === TYPE_OF_USER.FINANCE_ADMIN ||
      role === TYPE_OF_USER.ACCOUNT_EXCUTIVE ||
      role === TYPE_OF_USER.ACCOUNT_MANAGER
    ) {
      const updatedAuthData = getUpdatedAuthData();
      if (updatedAuthData && updatedAuthData.adminTheme) {
        setDetails((prev: any) => ({ ...prev, ...updatedAuthData.adminTheme }));
      }
    }
  }, [refetch, role]);

  useEffect(() => {
    if (details?.dealer_id) {
      (async () => {
        try {
          const data = await postCaller('get_vdealer', {
            page_number: 1,
            page_size: 1,
            filters: [
              {
                Column: 'id',
                Operation: '=',
                Data: details?.dealer_id,
              },
            ],
          });

          if (data.status > 201) {
            // setIsLoading(false);

            toast.error(data.message);
            return;
          }
          // setLeaderTable(data.data?.ap_ded_list as ILeaderBordUser[]);
          // setTotalCount(data?.dbRecCount);
          setVdealer(data?.data?.vdealers_list[0]);
        } catch (error) {
          console.error(error);
        } finally {
          // setIsLoading(false);
        }
      })();
    }
  }, [details]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleChange = (opt: { label: string; value: string }) => {
    const isExist = selectDealer.some((item) => item.value === opt.value);
    if (isExist) {
      setSelectDealer((prev) =>
        prev.filter((item) => item.value !== opt.value)
      );
    } else {
      setSelectDealer((prev) => [...prev, opt]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setOpts(leaderDealer(newFormData));
        setSearch('');
      }
    };
  
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [newFormData, search]);
  

  console.log('details', details);
  return (
    <div className="relative">
      <div
        className={`${role !== 'Admin' && role !== TYPE_OF_USER.FINANCE_ADMIN && role !== TYPE_OF_USER.ACCOUNT_EXCUTIVE && role !== TYPE_OF_USER.ACCOUNT_MANAGER ? 'bg-blue ' : 'bg-green-radiant'}  banner-main flex items-center`}
        style={{ background: details.bg_color || undefined }}
      >
        <div
          className={
            role !== 'Admin' &&
            role !== TYPE_OF_USER.FINANCE_ADMIN &&
            role !== TYPE_OF_USER.ACCOUNT_EXCUTIVE &&
            role !== TYPE_OF_USER.ACCOUNT_MANAGER
              ? 'radiant-anime'
              : 'radiant-anime-2'
          }
        ></div>
        <div className="banner-wrap">
          {/* left side  */}
          {!isGenerating ? (
            <button
              className={`edit-button ${isLoading ? 'edit-button-load' : ''}`}
              onClick={() => !isLoading && setShowModal(true)}
            >
              <LiaEdit className="edit-svg" />
              <p>Edit</p>
            </button>
          ) : null}

          <div className="flex items-center pl4 banner-left">
            {role !== TYPE_OF_USER.FINANCE_ADMIN &&
              role !== TYPE_OF_USER.ADMIN &&
              role !== TYPE_OF_USER.ACCOUNT_EXCUTIVE &&
              role !== TYPE_OF_USER.ACCOUNT_MANAGER &&
              details?.dealer_logo && (
                <img
                  src={
                    role === 'Admin' ||
                    role === TYPE_OF_USER.FINANCE_ADMIN ||
                    role === TYPE_OF_USER.ACCOUNT_EXCUTIVE ||
                    role === TYPE_OF_USER.ACCOUNT_MANAGER
                      ? details?.dealer_logo || ICONS.OWEBanner
                      : details?.dealer_logo || ICONS.BannerLogo
                  }
                  style={{ maxWidth: 132, maxHeight: 180 }}
                  alt="solar-name-icon"
                />
              )}
            {(role === TYPE_OF_USER.FINANCE_ADMIN ||
              role === TYPE_OF_USER.ADMIN ||
              role === TYPE_OF_USER.ACCOUNT_EXCUTIVE ||
              role === TYPE_OF_USER.ACCOUNT_MANAGER) && (
              <img
                src={
                  role === 'Admin' ||
                  role === TYPE_OF_USER.FINANCE_ADMIN ||
                  role === TYPE_OF_USER.ACCOUNT_EXCUTIVE ||
                  role === TYPE_OF_USER.ACCOUNT_MANAGER
                    ? details?.dealer_logo || ICONS.OWEBanner
                    : details?.dealer_logo || ICONS.BannerLogo
                }
                style={{ maxWidth: 132, maxHeight: 180 }}
                alt="solar-name-icon"
              />
            )}
            <div className="">
              {role !== 'Admin' &&
              role !== TYPE_OF_USER.FINANCE_ADMIN &&
              role !== TYPE_OF_USER.ACCOUNT_EXCUTIVE &&
              role !== TYPE_OF_USER.ACCOUNT_MANAGER ? (
                <h1 className="solar-heading">
                  {details?.daeler_name || 'N/A'}
                </h1>
              ) : (
                <h1 className="solar-heading green-banner-heading">
                  OUR WORLD ENERGY
                </h1>
              )}
              {role !== 'Admin' &&
              role !== TYPE_OF_USER.FINANCE_ADMIN &&
              role !== TYPE_OF_USER.ACCOUNT_EXCUTIVE &&
              role !== TYPE_OF_USER.ACCOUNT_MANAGER ? (
                <div className="flex items-center ">
                  <img src={ICONS.OWEBannerLogo} alt="" />
                  <p className="left-ban-des">
                    Powered by <br /> <span>Our World Energy</span>
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          {role !== 'Admin' &&
          role !== TYPE_OF_USER.FINANCE_ADMIN &&
          role !== TYPE_OF_USER.ACCOUNT_EXCUTIVE &&
          role !== TYPE_OF_USER.ACCOUNT_MANAGER ? (
            <div className="straight-line"></div>
          ) : null}
          {/* right side  */}
          <div className="flex items-center banner-right">
            {role !== 'Admin' &&
            role !== TYPE_OF_USER.FINANCE_ADMIN &&
            role !== TYPE_OF_USER.ACCOUNT_EXCUTIVE &&
            role !== TYPE_OF_USER.ACCOUNT_MANAGER ? (
              <div className="banner-names flex flex-column">
                <div>
                  <p className="owner-heading">Owner Name</p>
                  <p className="owner-names">{details?.owner_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="owner-heading">Total Teams</p>
                  <p className="owner-names">{details?.total_teams}</p>
                </div>
                <div>
                  <p className="owner-heading">Team Strength</p>
                  <p className="owner-names">{details?.total_strength}</p>
                </div>
              </div>
            ) : null}
            <div
              className={
                role !== 'Admin' &&
                role !== TYPE_OF_USER.FINANCE_ADMIN &&
                role !== TYPE_OF_USER.ACCOUNT_EXCUTIVE &&
                role !== TYPE_OF_USER.ACCOUNT_MANAGER
                  ? 'banner-trophy'
                  : 'user-trophy'
              }
            >
              <img
                src={ICONS.BannerTrophy}
                style={{ maxWidth: 241 }}
                alt="banner-trophy-image"
              />
            </div>
            <div className="banner-stars">
              <img
                src={ICONS.BannerStar}
                width={30}
                alt=""
                className="banner-star-1"
              />
              <img
                src={ICONS.BannerStar}
                width={30}
                className="banner-star-2"
                alt=""
              />
              <img
                src={ICONS.BannerStar}
                width={20}
                className="banner-star-3"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {(role === 'Admin' ||
        role === TYPE_OF_USER.FINANCE_ADMIN ||
        role === TYPE_OF_USER.ACCOUNT_EXCUTIVE ||
        role === TYPE_OF_USER.ACCOUNT_MANAGER) && (
        <div
          className="dealer-dropdown-filter"
          style={{ zIndex: 100 }}
          ref={dropdownRef}
        >
          {!isGenerating ? (
            <div
              onClick={() => !isLoading && setIsOpen(!isOpen)}
              className={`dealer-toggler pointer flex items-center ${
                isOpen ? 'open' : ''
              } ${isLoading ? 'dealer-toggler-load' : ''}`}
            >
              <span>
                {selectDealer?.length ?? '0'}{' '}
                <span>{selectDealer?.length > 1 ? 'Partners' : 'Partner'}</span>
              </span>
              <FaChevronDown className="ml1 fa-chevron-down" />
            </div>
          ) : null}

          {isOpen && (
            <div
              className=" scrollbar dealer-dropdown dropdown-menu "
              style={{ overflowX: 'clip' }}
            >
              <div className="searchBox">
                <input
                  type="text"
                  className="input leaderboard-input"
                  placeholder="Search Partners"
                  style={{ width: '100%'}}
                  value={search}
                  disabled={isLoading}
                  onChange={(e) => {
                    // Remove any non-alphanumeric characters
                    const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
                    setSearch(sanitizedValue);
                    
                    if (sanitizedValue.trim()) {
                      const filtered = leaderDealer(newFormData)?.filter((item) =>
                        item?.value.toLowerCase().includes(sanitizedValue.toLowerCase().trim())
                      );
                      setOpts([...filtered]);
                    } else {
                      setOpts(leaderDealer(newFormData));
                    }
                  }}
                />
              </div>
              {!search.trim() && (
                <div className="dropdown-item">
                  <input
                    type="checkbox"
                    style={{ flexShrink: 0 }}
                    checked={
                      leaderDealer(newFormData)?.length === selectDealer?.length
                    }
                    onChange={() => {
                      if (opts.length === selectDealer?.length) {
                        setSelectDealer([]);
                      } else {
                        setSelectDealer([...opts]);
                      }
                    }}
                  />
                  All
                </div>
              )}
              {opts?.length?opts?.map?.((option, ind) => (
                <div key={ind} className="dropdown-item">
                  <input
                    type="checkbox"
                    style={{ flexShrink: 0 }}
                    disabled={isLoading}
                    checked={selectDealer?.some(
                      (item) => item.value === option.value
                    )}
                    onChange={() => handleChange(option)}
                  />
                  <span className='dropdown-text'>{option.label}</span>
                </div>
              )):<div className='text-center' style={{fontSize:14,color:"#000"}}>No Data Found</div>}
            </div>
          )}

          {/* <Select
          isMulti
            styles={{
              menuList: (base) => ({
                ...base,
                height: '230px',
                '&::-webkit-scrollbar': {
                  scrollbarWidth: 'thin',
                  display: 'block',
                  scrollbarColor: 'rgb(173, 173, 173) #fff',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgb(173, 173, 173)',
                  borderRadius: '30px',
                },
              }),
              option: (base) => ({
                ...base,
                fontSize: '12px',
              }),
              indicatorSeparator: (base) => ({
                ...base,
                display: 'none',
              }),
              control: (base) => ({
                ...base,
                borderRadius: '24px',
                // width: 'fit-content',
                zIndex: 999,
                fontSize: 14,
              }),
              dropdownIndicator: (base) => ({
                ...base,
                svg: {
                  fill: '#3B3B3B',
                },
              }),
            }}
            options={leaderDealer(newFormData)}
            onChange={(newValue) => setSelectDealer([...newValue])}
            value={selectDealer}
          /> */}
        </div>
      )}
      {showModal && (
        <EditModal
          onClose={() => setShowModal(false)}
          vdealer={vdealer}
          dealerLogo={details?.dealer_logo}
          setRefetch={setRefetch}
        />
      )}
    </div>
  );
};

export default Banner;
