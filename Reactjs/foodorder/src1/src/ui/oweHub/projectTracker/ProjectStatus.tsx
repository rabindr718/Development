import React, { useEffect, useRef, useState, useCallback } from 'react';
import './projectTracker.css';
import { projectStatusHeadData } from './projectData';
import SelectOption from '../../components/selectOption/SelectOption';
import { FaCheck } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  getProjectDetail,
  getProjects,
} from '../../../redux/apiSlice/projectManagement';
import { format } from 'date-fns';
import MicroLoader from '../../components/loader/MicroLoader';
import DataNotFound from '../../components/loader/DataNotFound';
import useMatchMedia from '../../../hooks/useMatchMedia';
import { toast } from 'react-toastify';
import Proj_pie_chart from './lib/proj_pie_chart';
import { ICONS } from '../../../resources/icons/Icons';
import QCModal from './PopUp';
import NtpModal from './NtpPopUp';
import Input from '../../components/text_input/Input';
import { debounce } from '../../../utiles/debounce';

interface ActivePopups {
  [key: number]: number | null;
}
interface Option {
  value: string;
  label: string;
}
const data = [
  {
    name: 'Page A',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    pv: 3908,
    amt: 2000,
  },
];

const ProjectStatus = () => {
  const { projects, projectDetail, isLoading, otherlinks } = useAppSelector(
    (state) => state.projectManagement
  );
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get('project_id');
  const projectName = new URLSearchParams(location.search).get('customer-name');

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })    
  },[location.pathname])
  const getStatus = (arr: string[]) => {
    return arr.every(
      (item) => projectDetail[item as keyof typeof projectDetail]
    );
  };
  const [search, setSearch] = useState('OUR22645');
  const [searchValue, setSearchValue] = useState('OUR22645');
  const [active, setActive] = useState(false);


  
  const filtered = [
    // {
    //   name: 'Sales',
    //   number: <FaCheck />,
    //   color: 'white',
    //   numColor: '#0493CE',
    //   bgColor: '#4191C9',
    //   childStatusData: [
    //     {
    //       name: '10 Apr',
    //       process: 'Completed',
    //       bgColor: projectDetail.sales_completed ? '#63ACA3' : '#EBEBEB',
    //       color: projectDetail.sales_completed ? 'white' : '#858585',
    //       borderColor: projectDetail.sales_completed ? 'white' : '#A5AAB2',
    //       key: 'sales_completed',
    //     },
    //   ],
    // },

    {
      name: 'NTP',
      number: '1',
      color: 'white',
      numColor: '#0493CE',
      bgColor: '#4191C9',
      childStatusData: [
        {
          name: '10 Apr',
          process: 'Sale Date',
          data: projectDetail.sales_completed ? '' : 'Data not available',
          borderColor: projectDetail.sales_completed ? 'white' : '#A5AAB2',
          key: 'sales_completed',
          bgColor: projectDetail.sales_completed ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.sales_completed ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Completed',
          data: projectDetail.ntp_completed ? '' : 'Data not available',
          borderColor: projectDetail.ntp_completed ? 'white' : '#A5AAB2',
          key: 'ntp_completed',
          bgColor: projectDetail.ntp_completed ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.ntp_completed ? 'white' : '#858585',
        },
      ],
    },
    {
      name: 'Site Survey',
      number: '2',
      bgColor: '#4191C9',
      color: 'white',
      numColor: '#0493CE',
      childStatusData: [
        {
          name: '10 Apr',
          process: 'Scheduled',

          data: projectDetail.site_survey_scheduled ? '' : 'Data not available',
          borderColor: projectDetail.site_survey_scheduled
            ? 'white'
            : '#A5AAB2',
          key: 'site_survey_scheduled',
          bgColor: projectDetail.site_survey_scheduled ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.site_survey_scheduled ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Re-Scheduled',
          data: projectDetail.site_survey_rescheduled
            ? ''
            : 'Data not available',
          borderColor: projectDetail.site_survey_rescheduled
            ? 'white'
            : '#A5AAB2',
          key: 'site_survey_rescheduled',
          bgColor: projectDetail.site_survey_rescheduled
            ? '#63ACA3'
            : '#EBEBEB',
          color: projectDetail.site_survey_rescheduled ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Completed',
          data: projectDetail.site_survey_completed ? '' : 'Data not available',
          borderColor: projectDetail.site_survey_completed
            ? 'white'
            : '#A5AAB2',
          key: 'site_survey_completed',
          bgColor: projectDetail.site_survey_completed ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.site_survey_completed ? 'white' : '#858585',
        },
      ],
    },
    {
      name: 'Roofing',
      number: '3',
      color: 'white',
      numColor: '#0493CE',
      bgColor: '#4191C9',
      childStatusData: [
        {
          name: '10 Apr',
          process: 'Pending',
          data: projectDetail.roofing_pending ? '' : 'Data not available',
          borderColor: projectDetail.roofing_pending ? 'white' : '#A5AAB2',
          key: 'roofing_pending',
          bgColor: projectDetail.roofing_pending ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.roofing_pending ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Scheduled',
          data: projectDetail.roofing_scheduled ? '' : 'Data not available',
          borderColor: projectDetail.roofing_scheduled ? 'white' : '#A5AAB2',
          key: 'roofing_scheduled',
          bgColor: projectDetail.roofing_scheduled ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.roofing_scheduled ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Completed',
          data: projectDetail.roofing_completed ? '' : 'Data not available',
          borderColor: projectDetail.roofing_completed ? 'white' : '#A5AAB2',
          key: 'roofing_scheduled',
          bgColor: projectDetail.roofing_completed ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.roofing_completed ? 'white' : '#858585',
        },
      ],
    },
    {
      name: 'Electrical',
      number: '4',
      color: 'white',
      numColor: '#0493CE',
      bgColor: '#4191C9',
      childStatusData: [
        {
          name: '10 Apr',
          process: 'Pending',
          data: projectDetail.electrical_pending ? '' : 'Data not available',
          borderColor: projectDetail.electrical_pending ? 'white' : '#A5AAB2',
          key: 'electrical_pending',
          bgColor: projectDetail.electrical_pending ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.electrical_pending ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Scheduled',
          data: projectDetail.electrical_scheduled ? '' : 'Data not available',
          borderColor: projectDetail.electrical_scheduled ? 'white' : '#A5AAB2',
          key: 'electrical_scheduled',
          bgColor: projectDetail.electrical_scheduled ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.electrical_scheduled ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Completed',
          data: projectDetail.electrical_completed ? '' : 'Data not available',
          borderColor: projectDetail.electrical_completed ? 'white' : '#A5AAB2',
          key: 'electrical_completed',
          bgColor: projectDetail.electrical_completed ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.electrical_completed ? 'white' : '#858585',
        },
      ],
    },
    {
      name: 'PV Permit ',
      number: '5',
      bgColor: '#4191C9',
      color: 'white',
      numColor: '#0493CE',
      childStatusData: [
        {
          name: '10 Apr',
          process: 'Pending',
          data: projectDetail.pv_permit_pending ? '' : 'Data not available',
          borderColor: projectDetail.pv_permit_pending ? 'white' : '#A5AAB2',
          key: 'pv_permit_pending',
          bgColor: projectDetail.pv_permit_pending ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.pv_permit_pending ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Submitted',
          data: projectDetail.pv_permit_scehduled ? '' : 'Data not available',
          borderColor: projectDetail.pv_permit_scehduled ? 'white' : '#A5AAB2',
          key: 'pv_permit_scehduled',
          bgColor: projectDetail.pv_permit_scehduled ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.pv_permit_scehduled ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Approved',
          data: projectDetail.pv_permit_completed ? '' : 'Data not available',
          borderColor: projectDetail.pv_permit_completed ? 'white' : '#A5AAB2',
          key: 'pv_permit_completed',
          bgColor: projectDetail.pv_permit_completed ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.pv_permit_completed ? 'white' : '#858585',
        },
      ],
    },
    {
      name: 'IC Permit Submitted',
      number: '6',
      color: 'white',
      numColor: '#0493CE',
      bgColor: '#4191C9',
      childStatusData: [
        {
          name: '10 Apr',
          process: 'Pending',
          data: projectDetail.ic_permit_pending ? '' : 'Data not available',
          borderColor: projectDetail.ic_permit_pending ? 'white' : '#A5AAB2',
          key: 'ic_permit_pending',
          bgColor: projectDetail.ic_permit_pending ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.ic_permit_pending ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Submitted',
          data: projectDetail.ic_permit_scheduled ? '' : 'Data not available',
          borderColor: projectDetail.ic_permit_scheduled ? 'white' : '#A5AAB2',
          key: 'ic_permit_scheduled',
          bgColor: projectDetail.ic_permit_scheduled ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.ic_permit_scheduled ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Approved',
          data: projectDetail.ic_permit_completed ? '' : 'Data not available',
          borderColor: projectDetail.ic_permit_completed ? 'white' : '#A5AAB2',
          key: 'ic_permit_completed',
          bgColor: projectDetail.ic_permit_completed ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.ic_permit_completed ? 'white' : '#858585',
        },
      ],
    },
    {
      name: 'Install',
      bgColor: '#4191C9',
      number: '7',
      color: 'white',
      numColor: '#0493CE',
      childStatusData: [
        {
          name: '10 Apr',
          process: 'Pending',
          data: projectDetail.install_pending ? '' : 'Data not available',
          borderColor: projectDetail.install_pending ? 'white' : '#A5AAB2',
          key: 'install_pending',
          bgColor: projectDetail.install_pending ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.install_pending ? 'white' : '#858585',
        },

        {
          name: '10 Apr',
          process: 'Ready',
          data: projectDetail.install_ready ? '' : 'Data not available',
          borderColor: projectDetail.install_ready ? 'white' : '#A5AAB2',
          key: 'install_ready',
          bgColor: projectDetail.install_ready ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.install_ready ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Scheduled',
          data: projectDetail.install_scheduled ? '' : 'Data not available',
          borderColor: projectDetail.install_scheduled ? 'white' : '#A5AAB2',
          key: 'install_scheduled',
          bgColor: projectDetail.install_scheduled ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.install_scheduled ? 'white' : '#858585',
        },

        {
          name: '10 Apr',
          process: 'Completed',
          data: projectDetail.install_completed ? '' : 'Data not available',
          borderColor: projectDetail.install_completed ? 'white' : '#A5AAB2',
          key: 'install_completed',
          bgColor: projectDetail.install_completed ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.install_completed ? 'white' : '#858585',
        },
      ],
    },
    {
      name: 'Final Inspection',
      number: '8',
      color: 'white',
      numColor: '#0493CE',
      bgColor: '#4191C9',
      childStatusData: [
        {
          name: '10 Apr',
          process: 'Scheduled',
          data: projectDetail.final_inspection_submitted
            ? ''
            : 'Data not available',
          borderColor: projectDetail.final_inspection_submitted
            ? 'white'
            : '#A5AAB2',
          key: 'final_inspection_submitted',
          bgColor: projectDetail.final_inspection_submitted
            ? '#63ACA3'
            : '#EBEBEB',
          color: projectDetail.final_inspection_submitted ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Approved',
          data: projectDetail.final_inspection_approved
            ? ''
            : 'Data not available',
          borderColor: '#A5AAB2',
          key: 'final_inspection_approved',
          bgColor: projectDetail.final_inspection_approved
            ? '#63ACA3'
            : '#EBEBEB',
          color: projectDetail.final_inspection_approved ? 'white' : '#858585',
        },
      ],
    },
    {
      name: 'PTO',
      number: '9',
      color: 'white',
      numColor: '#0493CE',
      bgColor: '#4191C9',
      childStatusData: [
        {
          name: '10 Apr',
          process: 'In Process',
          data: projectDetail.pto_in_process ? '' : 'Data not available',
          borderColor: projectDetail.pto_in_process ? 'white' : '#A5AAB2',
          key: 'pto_in_process',
          bgColor: projectDetail.pto_in_process ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.pto_in_process ? 'white' : '#858585',
        },
        {
          name: '10 Apr',
          process: 'Submitted',
          data: projectDetail.pto_submitted ? '' : 'Data not available',
          borderColor: projectDetail.pto_submitted ? 'white' : '#A5AAB2',
          key: 'pto_submitted',
          bgColor: projectDetail.pto_submitted ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.pto_submitted ? 'white' : '#858585',
        },

        {
          name: '10 Apr',
          process: 'Approved',
          data: projectDetail.pto_completed ? '' : 'Data not available',
          borderColor: projectDetail.pto_completed ? 'white' : '#A5AAB2',
          key: 'pto_completed',
          bgColor: projectDetail.pto_completed ? '#63ACA3' : '#EBEBEB',
          color: projectDetail.pto_completed ? 'white' : '#858585',
        },
      ],
    },
  ];

  const filteredStatusData = filtered.filter((status) => {
    if (status.name === 'Roofing') {
      return (
        projectDetail.roofing_pending ||
        projectDetail.roofing_scheduled ||
        projectDetail.roofing_completed
      );
    }
    if (status.name === 'Electrical') {
      return (
        projectDetail.electrical_pending ||
        projectDetail.electrical_scheduled ||
        projectDetail.electrical_completed
      );
    }
    return true; // Keep all other status objects
  });

  const [activePopups, setActivePopups] = useState<boolean>(false);
  const refBtn = useRef<null | HTMLDivElement>(null);
  const isTablet = useMatchMedia('(max-width:1024px)');
  const [selectedProject, setSelectedProject] = useState<{
    label: string;
    value: string;
  }>({} as Option);
  const dispatch = useAppDispatch();

  const handleClickOutside = (e: MouseEvent) => {
    const elm = e.target as HTMLElement;
    if (
      refBtn?.current &&
      (elm === refBtn?.current || refBtn?.current?.contains(elm))
    ) {
      return;
    }
    if (!elm.closest('.popup')) {
      setActivePopups(false);
    }
  };

  const handleSearchChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    }, 800),
    []
  );

  useEffect(() => {
    if (activePopups) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activePopups]);

  useEffect(() => {
    dispatch(getProjects());

    return () => toast.dismiss();
  }, []);
  const projectOption: Option[] = projects?.map?.(
    (item: (typeof projects)[0]) => ({
      label: `${item.unqiue_id}-${item.customer}`,
      value: item.unqiue_id,
    })
  );

  useEffect(() => {
    if (activePopups) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activePopups]);

  useEffect(() => {
    if (projectId) {
      const anotheropt = projectOption.filter((item) => item.value === projectId)
      const opt = { label: projectId, value: projectId };
      console.log(anotheropt, "kjgfh")
      setSelectedProject(anotheropt[0])

    } else if (projectOption.length) {
      const val = {
        label: projectOption[0].label || '',
        value: projectOption[0].value || '',
      };
      console.log('val', val);
      setSelectedProject(val);
    }
  }, [projectOption.length, projectId, dispatch]);

  useEffect(() => {
    if (selectedProject?.value) {
      dispatch(getProjectDetail(selectedProject?.value));
    } else if (projectOption.length) {
      dispatch(getProjectDetail(projectOption[0]?.value));
    }
  }, [selectedProject?.value]);

  useEffect(() => {
    if (projectId) {
      setSearch(projectId);
      setSearchValue(projectId);
    }
  }, [projectId]);

  const options = [
    { id: 1, content: 'Podio' },
    { id: 2, content: 'Active CAD' },
    { id: 3, content: 'DAT' },
  ];

  const handleButton1Click = (optionId: number) => {
    console.log('Button 1 clicked for option:', optionId);
  };

  const handleButton2Click = (optionId: number) => {
    console.log('Button 2 clicked for option:', optionId);
  };
  const [filterOPen, setFilterOpen] = React.useState<boolean>(false);

  const filterClose = () => setFilterOpen(false);

  const filter = () => {
    setFilterOpen(true);
  };

  const [ntpOPen, setNtpOPen] = React.useState<boolean>(false);

  const ntpClose = () => setNtpOPen(false);

  const ntpAction = () => {
    setNtpOPen(true);
  };
  const popupRef = useRef(null);

  const [showComplete, setShowComplete] = useState(false);

  const handleOrderStatusClick = () => {
    setActive(!active);
    setShowComplete(!showComplete);
  };

  // Function to handle Escape key press
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      filterClose();
      ntpClose();
    }
  };

  useEffect(() => {
    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isMobile = useMatchMedia('(max-width: 767px)');

  const [isHovered, setIsHovered] = useState(-1);

 
  return (
    <>
      <QCModal
        projectDetail={otherlinks}
        isOpen={filterOPen}
        handleClose={filterClose}
      />

      <NtpModal
        projectDetail={otherlinks}
        isOpen={ntpOPen}
        handleClose={ntpClose}
      />

      <div className="">
        <div style={{ padding: '0px' }}>
          <div className="flex top-project-cards">
            <div
              className="px1 project-card-wrapper  bg-white rounded-16"
              style={{ paddingInline: 16, paddingBottom: 16 }}
            >
              <div className="project-heading project-status-heading">
                <h3 style={{ marginTop: '1.3rem', lineHeight: 'none' }}>
                  Project Status
                </h3>
                <div className="pro-status-dropdown">
                  <div className="status-cust-name">
                    <span className="cust-name">
                      Customer name:<pre> { projectDetail.home_owner}</pre>
                    </span>
                    <SelectOption
                      options={projectOption}
                      value={selectedProject}
                      disabled={isLoading}
                      lazyRender
                      onChange={(val) => {
                        if (val) {
                          setSelectedProject(val);
                        }
                      }}
                      width="190px"
                    />
                  </div>
                </div>
              </div>
              <div className="flex status-card-parent items-center flex-wrap mxn1">
                {projectStatusHeadData.map((el, i) => (
                  <div
                    key={i}
                    className={`status-card ${isTablet ? 'col-6' : ' lg-col-3'} px1`}
                    style={{ marginBottom: 10 }}
                  >
                    <div
                      className="rounded-8"
                      style={{
                        padding: 3,
                        border:
                          isHovered === i ? 'none' : `1px dashed ${el.bgColor}`,
                        zIndex: i === 1 ? 50 : undefined,
                      }}
                    >
                      <div
                        className=" flex items-center rounded-8 justify-center relative status-card-wrp"
                        style={{
                          background:
                            isHovered === i ? el.hoverColor : el.bgColor,
                          height: 83,
                          zIndex: i === 1 ? 50 : undefined,
                        }}
                        onMouseEnter={() => setIsHovered(i)}
                        onMouseLeave={() => setIsHovered(-1)}
                      >
                        <div
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            color: isHovered === i ? '#fff' : '#263747',
                          }}
                        >
                          <p className="para-head text-white-color">
                            {el.name}
                          </p>
                          <span className="span-para">
                            {el.key === 'adders_total' ||
                              el.key === 'contract_amount'
                              ? '$'
                              : ''}

                            <>
                              {projectDetail[
                                el.key as keyof typeof projectDetail
                              ] || 'N/A'}{' '}
                            </>

                            {el.key === 'system_size' ? '(kW)' : ''}
                          </span>
                        </div>
                        {el.viewButton ? (
                          <div
                            className="view-flex"
                            ref={refBtn}
                            onClick={() => setActivePopups((prev) => !prev)}
                          >
                            <p>View</p>
                            <img src={ICONS.arrowDown} alt="" />
                          </div>
                        ) : null}
                        {activePopups && i === 1 && (
                          <div
                            className="popup"
                            ref={popupRef}
                            onMouseLeave={() => setActivePopups(false)}
                          >
                            <p className="pop-head">Adder Details</p>
                            <ol className="order-list">
                              {
                                // @ts-ignore
                                projectDetail.adder_breakdown_and_total &&
                                Object.keys(
                                  // @ts-ignore
                                  projectDetail.adder_breakdown_and_total
                                ).map((item, ind) => {
                                  // @ts-ignore
                                  return (
                                    <li key={ind} className="order-list-name">
                                      {' '}
                                      {item} :{' '}
                                      {(projectDetail as any).adder_breakdown_and_total[item]
                                      }{' '}
                                    </li>
                                  );
                                })
                              }
                            </ol>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-auto second-project-card" style={{paddingLeft: "1.2rem"}}>
              <div
                className="bg-white rounded-16 flex relative"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  // alignItems: 'center',
                }}
              >
                <Proj_pie_chart projectDetail={otherlinks} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-16 project-table-wrapper">
            <div
              className="project-heading project-status-heading"
              style={{ padding: '22px', marginTop: "1.2rem" }}
            >
              <p className="mob-projhead">Project Stages</p>

              <div className="proj-status-tab-head flex">
                <div className="progress-box-container status-boxes">
                  <div className="progress-box-body mt0">
                    <div
                      className="progress-box"
                      style={{
                        background: '#4191C9',
                        borderRadius: 2,
                        width: 12,
                        height: 12,
                      }}
                    ></div>
                    <p>Stages</p>
                  </div>
                  <div className="progress-box-body mt0">
                    <div
                      className="progress-box"
                      style={{
                        background: '#63ACA3',
                        borderRadius: 2,
                        width: 12,
                        height: 12,
                      }}
                    ></div>
                    <p>Completed</p>
                  </div>
                  <div className="progress-box-body mt0">
                    <div
                      className="progress-box"
                      style={{
                        background: '#E9E9E9',
                        borderRadius: 2,
                        width: 12,
                        height: 12,
                      }}
                    ></div>
                    <p>Not Started yet</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center project-status-table-title1">
                <div className="progress-box-container status-btn ml3">
                  <div className="progress-qc mt0" onClick={filter}>
                    <button>QC</button>
                  </div>
                  {otherlinks?.qc?.qc_action_required_count > 0 ? (
                    <div className="progress-ntp-acre">
                      <span>{otherlinks?.qc?.qc_action_required_count}</span>
                    </div>
                  ) : null}
                  <div className="progress-qc mt0" onClick={ntpAction}>
                    <button>NTP</button>
                  </div>
                </div>
                {otherlinks?.ntp?.action_required_count > 0 ? (
                  <div className="progress-qc-acre">
                    <span>{otherlinks?.ntp?.action_required_count}</span>
                  </div>
                ) : null}
                {/* {otherlinks.co_status !== 'CO Complete' && otherlinks.co_status &&
                      <div className="co-status mt0">
                        <p>C/O Status</p>
                        <p style={{ color: "#2EAF71" }}>{otherlinks.co_status !== 'CO Complete' && otherlinks.co_status && <span className='pending-coo'>{otherlinks.co_status} <img src={ICONS.QCLine} width={16} alt="img" className='pending-co' /> </span>}</p>
                      </div>
                    } */}
                {otherlinks.co_status !== 'CO Complete' &&
                  otherlinks.co_status && (
                    <div className="progress-co mt0">
                      <button className="co-button">
                        <p className="co-desktop">C/O Status</p>
                        <p className="co-mobile">C/O</p>
                        <span className="hover-text">
                          {otherlinks.co_status}
                        </span>
                      </button>
                    </div>
                  )}
              </div>
            </div>
            <div className="project-management-table ">
              <table>
                <tbody>
                  <tr style={{ borderBottom: 'none' }}>
                    <td style={{ padding: '0px' }}>
                      <div className="project-staus-progress-container">
                        {isLoading ? (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <MicroLoader />
                          </div>
                        ) : !isLoading &&
                          Object.keys(projectDetail).length < 1 ? (
                          <td colSpan={7} style={{ textAlign: 'center' }}>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <DataNotFound />
                            </div>
                          </td>
                        ) : (
                          filteredStatusData.map((item: any, i: any) => (
                            <>
                              <div key={item.id || i} className="project-status-table">
                                <div
                                  className="project-status-card"
                                  style={{
                                    marginTop: '0',
                                    background: item.bgColor,
                                  }}
                                >
                                  <div
                                    className="status-number"
                                    style={{
                                      background: '#FFFFF',
                                      color: item.numColor,
                                    }}
                                  >
                                    {getStatus(
                                      item.childStatusData.map(
                                        (item: any) => item.key
                                      )
                                    ) ? (
                                      <FaCheck />
                                    ) : (
                                      i + 1
                                    )}
                                  </div>
                                  <p
                                    className="stage-1-para"
                                    style={{ color: item.color }}
                                  >
                                    {item.name}
                                  </p>
                                </div>
                                {item.childStatusData.map(
                                  (el: any, index: any) => (
                                    <div
                                      key={el.key || i}
                                      className="notch-corner"
                                      style={{
                                        background: el.bgColor,
                                        color: '#858585',
                                      }}
                                    >
                                      <div className="child-corner"></div>
                                      <div
                                        className=""
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'center',
                                          width: '35px',
                                        }}
                                      >
                                        {!(
                                          el.key &&
                                          projectDetail[
                                          el.key as keyof typeof projectDetail
                                          ]
                                        ) && (
                                            <span
                                              className="date-para"
                                              style={{
                                                color: el.color,
                                                fontSize: '9px',
                                              }}
                                            >
                                              ETA
                                            </span>
                                          )}
                                        <p
                                          style={{
                                            color: el.color,
                                            fontSize: '9px',
                                          }}
                                        >
                                          {el.key &&
                                            projectDetail[
                                            el.key as keyof typeof projectDetail
                                            ]
                                            ? format(
                                              new Date(
                                                projectDetail[
                                                el.key as keyof typeof projectDetail
                                                ]
                                              ),
                                              'dd MMMM'
                                            ).slice(0, 6)
                                            : 'N/A'}
                                        </p>
                                        {el.key &&
                                          projectDetail[
                                          el.key as keyof typeof projectDetail
                                          ] && (
                                            <p
                                              className="stage-1-para"
                                              style={{
                                                color: el.color,
                                                fontSize: '10px',
                                              }}
                                            >
                                              {' '}
                                              {format(
                                                new Date(
                                                  projectDetail[
                                                  el.key as keyof typeof projectDetail
                                                  ]
                                                ),
                                                'yyyy'
                                              )}
                                            </p>
                                          )}
                                      </div>
                                      <div
                                        className="border-notch"
                                        style={{
                                          border: '0.5px solid ',
                                          borderColor: el.borderColor,
                                        }}
                                      ></div>
                                      <div
                                        className=""
                                        style={{ width: '115px' }}
                                      >
                                        <p
                                          className="stage-1-para"
                                          style={{
                                            color: el.color,
                                            fontSize: '12px',
                                          }}
                                        >
                                          {el.process}
                                        </p>
                                        <p
                                          className=""
                                          style={{
                                            color: el.color,
                                            fontSize: '11px',
                                          }}
                                        >
                                          {el.data}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                              {i === filteredStatusData.length - 1 ? null : (
                                <div className="dotted-border"></div>
                              )}
                            </>
                          ))
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectStatus;
