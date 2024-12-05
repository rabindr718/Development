import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowRightLine } from 'react-icons/ri';
import './dashboard.css';
import { ICONS } from '../../../resources/icons/Icons';
import NewTeam from './NewMember/NewTeam';
import { getTeams } from '../../../redux/apiActions/teamManagement/teamManagement';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../infrastructure/web_api/api_client/EndPoints';
import DropWithCheck from '../../components/dropwithcheck/dropwithcheck';
import { toast } from 'react-toastify';
import { TYPE_OF_USER } from '../../../resources/static_data/Constant';
import MicroLoader from '../../components/loader/MicroLoader';
import DataNotFound from '../../components/loader/DataNotFound';
import { showAlert } from '../../components/alert/ShowAlert';
import { resetTeams } from '../../../redux/apiSlice/teamManagementSlice.tsx/teamManagmentSlice';
import useMatchMedia from '../../../hooks/useMatchMedia';
import useAuth from '../../../hooks/useAuth';

interface AccordionSection {
  data: any;
  state: any;
}
interface Option {
  value: string;
  label: string;
}

const TeamManagement: React.FC = () => {
  const cardColors = ['#E0728C', '#57B3F1', '#C470C7', '#63ACA3', '#8E81E0'];
  const arrowColors = ['#E0728C', '#57B3F1', '#C470C7', '#63ACA3', '#8E81E0'];
  const [refetch, setRefetch] = useState(1);
  const [newFormData, setNewFormData] = useState<any>([]);
  const [, setSelectedDealer] = useState(null);
  const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState<number[]>(
    []
  );
  const [isFetched, setIsFetched] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isPending, setIspending] = useState(false);
  const { authData } = useAuth();
  const roleAdmin = authData?.role;
  const isMobile = useMatchMedia('(max-width: 767px)');

  const getnewformData = async () => {
    const tableData = {
      tableNames: ['dealer_name'],
    };
    const res = await postCaller(EndPoints.get_newFormData, tableData);
    setSelectedOptions(
      (res?.data?.dealer_name
        ? ['All', ...res?.data?.dealer_name]
        : []) as string[]
    );
    setNewFormData(res?.data as string[]);
    setIsFetched(true);
  };
  useEffect(() => {
    const roleAdmin = localStorage.getItem('role');
    if (
      roleAdmin === TYPE_OF_USER.ADMIN ||
      roleAdmin === TYPE_OF_USER.FINANCE_ADMIN
    ) {
      getnewformData();
    } else {
      setIsFetched(true);
    }
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFetched) {
      dispatch(getTeams(selectedOptions));
    }
    return () => {
      dispatch(resetTeams());
    };
  }, [refetch, selectedOptions, isFetched]);

  const { teams, isLoading } = useAppSelector(
    (state) => state.teamManagmentSlice
  );

  const accordionSections: AccordionSection[] = [
    {
      data: teams,
      state: useState<boolean>(true),
    },
  ];

  const [open2, setOpen2] = useState<boolean>(false);
  console.log(selectedOptions, 'jnefjghjfng');
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
  };

  const dealerOption = useMemo(() => {
    const arr = [{ label: 'All', value: 'All', key: 'all' }];
    if (newFormData?.dealer_name) {
      arr.push(
        ...newFormData?.dealer_name?.map?.((item: string) => ({
          label: item,
          value: item,
          key: item,
        }))
      );
    }

    return arr;
  }, [newFormData]);

  let prevColorIndex = -1;

  const handleCheckboxChange = (id: number) => {
    setIsAnyCheckboxChecked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleDelete = async () => {
    try {
      setIspending(true);
      const confirmed = await showAlert(
        'Are Your Sure',
        `This action will remove your selected ${isAnyCheckboxChecked.length > 1 ? 'teams' : 'team'}`,
        'Yes',
        'No'
      );
      if (confirmed) {
        const data = await postCaller('delete_teams', {
          team_ids: isAnyCheckboxChecked,
        });
        if (data.status > 201) {
          toast.error(data.message);
          return;
        }
        setRefetch((prev) => prev + 1);
        setIsAnyCheckboxChecked([]);
        setIspending(false);
        toast.success('Teams deleted successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {open2 && (
        <NewTeam
          handleClose2={handleClose2}
          setRefetch={setRefetch}
          // onSubmitCreateUser={onSubmitCreateTeam}
        />
      )}

      <div className="team-container">
        <div className="team-main">
          <div className="team-main-section">
            {accordionSections.map(({ data, state }, index) => {
              if (!state) return null;
              const [isOpen, setIsOpen] = state;
              return (
                <div
                  key={index}
                  // className={`${title.toLowerCase()} ${isOpen ? 'open' : ''}`}
                >
                  <div className="teamdash-header">
                    <h1 style={{fontSize: "18px"}}>Total Teams: {teams?.length}</h1>
                    <div className="dash-newteam">
                      <div className="remove-section-oncheck">
                        {/* <button className='delete' onClick={handleOpen2}>Remove Team</button> */}
                        {!!isAnyCheckboxChecked.length && (
                          <button
                            disabled={isPending}
                            className="delete"
                            onClick={handleDelete}
                          >
                            Remove Team
                          </button>
                        )}
                        {!!isAnyCheckboxChecked.length && (
                          <h4
                            className="team-cancel"
                            onClick={() => {
                              setIsAnyCheckboxChecked([]);
                            }}
                          >
                            Cancel
                          </h4>
                        )}
                      </div>
                      <div
                        className={`creat-drop ${isAnyCheckboxChecked.length ? 'sm-hide' : ''}`}
                      >
                        {roleAdmin !== TYPE_OF_USER.SALES_REPRESENTATIVE ? (
                          <button className="create" onClick={handleOpen2}>
                            <span className="create-add-btn">+</span>{' '}
                            <span className="btxt-none">Create New Team</span>
                          </button>
                        ) : null}
                        {(roleAdmin === TYPE_OF_USER.ADMIN ||
                          roleAdmin === TYPE_OF_USER.FINANCE_ADMIN) && (
                          <DropWithCheck
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                            options={dealerOption}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`team-cards ${isOpen ? 'open' : ''}`}>
                    {isLoading ? (
                      <div
                        style={{ width: '100%' }}
                        className="flex justify-center items-center"
                      >
                        <MicroLoader />
                      </div>
                    ) : !data.length ? (
                      <div
                        style={{ width: '100%' }}
                        className="flex justify-center items-center"
                      >
                        <DataNotFound />
                      </div>
                    ) : (
                      data.map((item: any, index: any) => {
                        let randomColorIndex;
                        let randomCardColor;
                        let randomArrowColor;

                        do {
                          randomColorIndex = Math.floor(
                            Math.random() * cardColors.length
                          );
                          randomCardColor = cardColors[randomColorIndex];
                          randomArrowColor = arrowColors[randomColorIndex];
                        } while (
                          index > 0 &&
                          randomColorIndex === prevColorIndex
                        );

                        // Update the previous color index
                        prevColorIndex = randomColorIndex;

                        return (
                          <div key={index} className="pay-card-wrapper-sm">
                            <div
                              className="team-pay-card-wrapper"
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <Link
                                to={item.route}
                                className="team-pay-card"
                                style={{
                                  backgroundColor: randomCardColor,
                                  flexGrow: 1,
                                }}
                              >
                                <div className="team-checkbox-wrapper">
                                  <div className="team-name-tooltip">
                                    <h1 className="team-card-heading pr1  one-line-text">
                                      <h1 className="team-card-heading pr1 one-line-text">
                                        {isMobile && item.team_name.length > 10
                                          ? `${item.team_name.slice(0, 11)}...`
                                          : item.team_name}
                                      </h1>
                                    </h1>
                                  </div>
                                  {roleAdmin === TYPE_OF_USER.ADMIN ||
                                  roleAdmin === TYPE_OF_USER.DEALER_OWNER ||
                                  roleAdmin === TYPE_OF_USER.FINANCE_ADMIN ||
                                  data?.role_in_team === 'manager' ||
                                  roleAdmin ===
                                    TYPE_OF_USER.SUB_DEALER_OWNER ? (
                                    <input
                                      type="checkbox"
                                      style={{ flexShrink: 0 }}
                                      className="team-checkbox"
                                      checked={isAnyCheckboxChecked.includes(
                                        item.team_id
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(item.team_id)
                                      }
                                      onClick={(
                                        e: React.MouseEvent<HTMLInputElement>
                                      ) => e.stopPropagation()}
                                    />
                                  ) : null}
                                </div>
                                <div className="team-con-fle">
                                  <div className="teamp-group">
                                    <img
                                      src={ICONS.teamgroup}
                                      alt="team-group"
                                      style={{ maxWidth: 77 }}
                                    />
                                    <h4>{item.team_strength} members</h4>
                                  </div>
                                  <Link
                                    to={`/teammanagement/dashboard/${item.team_id}?team-manager=${item.manager_id}&team-name=${item.team_name}`}
                                    onClick={(e) => e.stopPropagation()} // Prevent triggering outer Link when clicking inner Link
                                  >
                                    <div
                                      className="team-arrow-wrapper"
                                      style={{ color: randomArrowColor }}
                                    >
                                      <span className="view-text">View</span>
                                      <RiArrowRightLine className="team-arrow-right" />
                                    </div>
                                  </Link>
                                </div>
                              </Link>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamManagement;
