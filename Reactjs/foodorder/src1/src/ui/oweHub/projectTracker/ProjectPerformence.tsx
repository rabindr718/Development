import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './projectTracker.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getPerfomanceStatus } from '../../../redux/apiSlice/perfomanceSlice';
import { Calendar } from './ICONS';
import Select from 'react-select';
import { getProjects } from '../../../redux/apiSlice/projectManagement';
import { FaUpload } from 'react-icons/fa';
import Papa from 'papaparse';
import { MdDownloading } from 'react-icons/md';
import 'react-tooltip/dist/react-tooltip.css';
import {
  format,
  subDays,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  startOfYear,
  subMonths,
} from 'date-fns';
import { DateRange } from 'react-date-range';
import Pagination from '../../components/pagination/Pagination';
import MicroLoader from '../../components/loader/MicroLoader';
import DataNotFound from '../../components/loader/DataNotFound';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import useMatchMedia from '../../../hooks/useMatchMedia';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { debounce } from '../../../utiles/debounce';
import Input from '../../components/text_input/Input';
import { IoClose } from 'react-icons/io5';
import { ICONS } from '../../../resources/icons/Icons';
import { MdDone } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';
import { TYPE_OF_USER } from '../../../resources/static_data/Constant';
import QCModal from './PopUp';
import QCPopUp from './ProjMngPopups/QC';
import NtpPopUp from './ProjMngPopups/NTP';
import { LuImport } from 'react-icons/lu';
import DropdownCheckbox from '../../components/DropdownCheckBox';
import { EndPoints } from '../../../infrastructure/web_api/api_client/EndPoints';
import { Tooltip as ReactTooltip, Tooltip } from 'react-tooltip';
import Slider from 'rc-slider';
import useEscapeKey from '../../../hooks/useEscape';
interface Option {
  value: string;
  label: string;
}

export type DateRangeWithLabel = {
  label?: string;
  start: any;
  end: any;
};
const ProjectPerformence = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const refBtn = useRef<null | HTMLDivElement>(null);
  const [activePopups, setActivePopups] = useState<boolean>(false);
  const { projects } = useAppSelector((state) => state.projectManagement);
  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('Active Queue');
  const [loading, setLoading] = useState(true);
  const [titleData, setTileData] = useState<any>('');
  const [activeCardId, setActiveCardId] = useState(null);
  const [activeCardTitle, setActiveCardTitle] = useState<string>('');

  const [mapHovered, setMapHovered] = useState(false);

  //Ajay chaudhary code starts from here

  const [filterAplied,setFilterAplied]=useState<boolean>(false);

  const [selectedProject, setSelectedProject] = useState<{
    label: string;
    value: string;
  }>({} as Option);

  const { authData } = useAuth();
  const role = localStorage.getItem('role');

  const showDropdown =
    role === TYPE_OF_USER.ADMIN ||
    role === TYPE_OF_USER.FINANCE_ADMIN ||
    role === TYPE_OF_USER.ACCOUNT_EXCUTIVE ||
    role === TYPE_OF_USER.ACCOUNT_MANAGER;

  const today = new Date();
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // assuming week starts on Monday, change to 0 if it starts on Sunday
  const startOfThisMonth = startOfMonth(today);
  const [selectedDealer, setSelectedDealer] = useState<Option[]>([]);
  const startOfThisYear = startOfYear(today);
  const startOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  // Calculate the start and end of last week
  const startOfLastWeek = startOfWeek(subDays(startOfThisWeek, 1), {
    weekStartsOn: 1,
  });
  const endOfLastWeek = endOfWeek(subDays(startOfThisWeek, 1), {
    weekStartsOn: 1,
  });

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


  //Ajay Chaudhary

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const handleInput = (e: any) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  const handleSliderChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      set_minValue(values[0]);
      set_maxValue(values[1]);
    } else {
      set_minValue(values);
    }
  };

  const handleMinChange = (e: any) => {
    const value = e.target.value;

    if (value.length > 3) {
      return;
    }

    const newMinValue = isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10);
    if(newMinValue>180)
    {
      set_minValue(180);

      return;
    }
    set_minValue(newMinValue);
  };

  const handleMaxChange = (e: any) => {
    const value = e.target.value;


    if (value.length > 3 || value>180) {
      return;
    }
    const newMaxValue = isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10);
    set_maxValue(newMaxValue);
  };

useEffect(()=>{
  const maxi=maxValue;
  if(minValue===180)
  {
    set_maxValue(360)
  }
  else{
    set_maxValue(maxi);
  }
},[minValue])
  const HandleFilterClick = () => {
    setOpenFilter(prev => !prev);
  }
  const [filtered, setFiltered] = useState<boolean>(false);
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);
  const handleClickOutsidee = (event: MouseEvent) => {


    if (filterRef.current && !filterRef.current.contains(event.target as Node) && !(event.target as HTMLElement).closest('.pipelineFilterLine')) {
      setOpenFilter(false);
    }
  };


  const [fieldData, setFieldData] = useState<string[]>([]);

  useEffect(() => {
    const newFieldData: string[] = [];

    if (checkedOptions.length === 0) {
      // If no options are checked, clear the fieldData
      setFieldData([]);
    }
    else {
      checkedOptions.forEach((val) => {
        switch (val) {
          case 'Project Age':
            newFieldData.push('project_age');
            break;
          case 'NTP':
            newFieldData.push('days_pending_ntp');
            break;
          case 'Permitting':
            newFieldData.push('days_pending_permits');
            break;
          case 'Install':
            newFieldData.push('days_pending_install');
            break;
          case 'PTO':
            newFieldData.push('days_pending_pto');
            break;
          default:
            break;
        }
      });
    }

    setFieldData(newFieldData); // Update the state with the final array
  }, [checkedOptions]);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsidee);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsidee);
    };
  }, [openFilter]);


  const [checkedStates, setCheckedStates] = useState(
    Array(5).fill(false) // Initialize an array of 5 false values
  );


  const handleCheckboxChange = (index: number) => {
    setCheckedStates((prevState) => {
      const updatedStates = [...prevState]; // Create a copy of the array
      updatedStates[index] = !updatedStates[index]; // Toggle the state at the given index
      return updatedStates;
    });
  };


  const [selectionRange, setSelectionRange] = useState({
    startDate: subMonths(new Date(), 3),
    endDate: subDays(new Date(), 1),
    key: 'selection',
  });

  const [exportShow, setExportShow] = useState<boolean>(false);
  const [dealerOption, setDealerOption] = useState<Option[]>([]);
  const [isExportingData, setIsExporting] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const toggleExportShow = () => {
    setExportShow((prev) => !prev);
  };

  const [selectedRangeDate, setSelectedRangeDate] = useState<any>({
    label: 'Three Months',
    start: role == TYPE_OF_USER.ADMIN ? subMonths(new Date(), 3) : '',
    end: role == TYPE_OF_USER.ADMIN ? subMonths(new Date(), 1) : '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges.selection);
  };

  const perPage = 10;
  const getColorStyle = (color: any | null) => {
    let backgroundColor;
    let textColor;
    let boxShadowColor;

    backgroundColor = color;
    textColor = 'white';
    boxShadowColor = 'rgba(0, 141, 218, 0.2)';

    return {
      backgroundColor,
      color: textColor,
      boxShadow: `0px 4px 12px ${boxShadowColor}`,
    };
  };

  const projectOption: Option[] = projects?.map?.(
    (item: (typeof projects)[0]) => ({
      label: `${item.unqiue_id}-${item.customer}`,
      value: item.unqiue_id,
    })
  );

  const { projectStatus, projectsCount, datacount, isLoading } = useAppSelector(
    (state) => state.perfomanceSlice
  );
  const { sessionTimeout } = useAppSelector((state) => state.auth);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const ExportCsv = async () => {
    setIsExporting(true);
    const headers = [
      'UniqueId',
      'Homeowner Name',
      'Homeowner Contact Info',
      'Address',
      'State',
      'Contract $',
      'Sys Size',
      'Sale Date',
      'Site Survey Schedule Date',
      'Site Survey Completed Date',
      'Cad Ready Date',
      'Cad Completed Date',
      'Permit Submitted Date',
      'Ic Submitted Date',
      'Permit Approved Date',
      'Ic Approved Date',
      'Roofing Created Date',
      'Roofing Complete Date',
      'Pv Install Created Date',
      'Battery Scheduled Date',
      'Battery Completed Date',
      'Pv Install Completed Date',
      'Mpu Created Date',
      'Mpu complete Date',
      'Derate Create Date',
      'Derate Complete Date',
      'Trenching WSOpen Date',
      'Trenching Complete Date',
      'FinCreate Date',
      'FinPass Date',
      'Pto Submitted Date',
      'Pto Date',
    ];

    const getAllData = await postCaller('get_peroformancecsvdownload', {
      start_date: '',
      end_date: '',
      page_number: 1,
      page_size: projectsCount,
      selected_milestone: selectedMilestone,
      dealer_names: selectedDealer.map((item) => item.value),
      project_status:
        activeTab === 'Active Queue' ? ['ACTIVE'] : ['JEOPARDY', 'HOLD'],
    });
    if (getAllData.status > 201) {
      toast.error(getAllData.message);
      return;
    }
    const csvData = getAllData?.data?.performance_csv?.map?.((item: any) => [
      item.UniqueId,
      item.HomeOwner,
      item.PhoneNumber,
      item.Address,
      item.State,
      item.ContractAmount,
      item.SystemSize,
      item.ContractDate,
      item.SiteSurevyScheduleDate,
      item.SiteSurveyCompletedDate,
      item.CadReadyDate,
      item.CadCompletedDate,
      item.PermitSubmittedDate,
      item.IcSubmittedDate,
      item.PermitApprovedDate,
      item.IcApprovedDate,
      item.RoofingCreatedDate,
      item.RoofingCompleteDate,
      item.PvInstallCreatedDate,
      item.MpuCreatedDate,
      item.MpucompleteDate,
      item.DerateCreateDate,
      item.DerateCompleteDate,
      item.TrenchingWSOpenDate,
      item.TrenchingCompleteDate,
      item.FinCreateDate,
      item.FinPassDate,
      item.PtoSubmittedDate,
      item.PtoDate,
    ]);

    const csvRows = [headers, ...csvData];

    const csvString = Papa.unparse(csvRows);

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Pipeline.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExporting(false);
    setExportShow(false);
  };


  useEscapeKey(()=>setOpenFilter(false));

  const location = useLocation();

  useEffect(() => {
    
      window.scrollTo({top:10,behavior:'smooth'});
        
  }, [location.pathname]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const leaderDealer = (newFormData: any): { value: string; label: string }[] =>
    newFormData?.dealer_name?.map((value: string) => ({
      value,
      label: value,
    }));

  const getNewFormData = async () => {
    const tableData = {
      tableNames: ['dealer_name'],
    };
    const res = await postCaller(EndPoints.get_newFormData, tableData);
    if (res.status > 200) {
      return;
    }
    if (res.data?.dealer_name) {
      setSelectedDealer(leaderDealer(res.data));
      setDealerOption(leaderDealer(res.data));
    }
    setIsFetched(true);
  };

  const periodFilterOptions: any = [
    {
      label: 'All',
      start: null,
      end: null,
    },
    {
      label: 'This Week',
      start: startOfThisWeek,
      end: today,
    },
    {
      label: 'Last Week',
      start: startOfLastWeek,
      end: endOfLastWeek,
    },
    {
      label: 'This Month',
      start: startOfThisMonth,
      end: today,
    },
    {
      label: 'Last Month',
      start: startOfLastMonth,
      end: endOfLastMonth,
    },
    {
      label: 'This Year',
      start: startOfThisYear,
      end: today,
    },
  ];

  const handleSearchChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      setPage(1);
    }, 800),
    []
  );

  useEffect(() => {
    if (isFetched) {
      (async () => {
        setLoading(true);
        try {
          const data = await postCaller('get_perfomancetiledata', {
            project_status:
              activeTab === 'Active Queue' ? ['ACTIVE'] : ['JEOPARDY', 'HOLD'],
            dealer_names: selectedDealer.map((item) => item.value),
          });

          if (data.status > 201) {
            toast.error(data.message);
            return;
          }
          setTileData(data.data || {});
          setLoading(false);
        } catch (error) {
          console.error(error);
          toast.error((error as Error).message);
        } finally {
        }
      })();
    }
  }, [activeTab, selectedDealer, isFetched]);

  useEffect(() => {
    if (isFetched) {
      dispatch(
        getPerfomanceStatus({


          page,
          perPage,
          startDate: '',
          endDate: '',
          uniqueId: searchValue ? searchValue : '',
          selected_milestone: activeCardId ? selectedMilestone : '',
          project_status:
            activeTab === 'Active Queue' ? ['ACTIVE'] : ['JEOPARDY', 'HOLD'],
          dealer_names: selectedDealer.map((item) => item.value),
          fieldData,
          minValue,
          maxValue
        })

      );
    }
  }, [
    page,
    selectedRangeDate.start,
    selectedRangeDate.end,
    selectedProject.value,
    searchValue,
    selectedMilestone,
    activeTab,
    selectedDealer,
    isFetched,
    activeCardId,
    filtered
  ]);

  useEffect(() => {
    if (showDropdown) {
      getNewFormData();
    } else {
      setIsFetched(true);
    }
  }, [showDropdown]);

  const calculateCompletionPercentage = (
    project: (typeof projectStatus)[0]
  ) => {
    const totalSteps = Object.keys(project).length;
    const completedSteps = Object.values(project).filter(
      (date) => !!date
    ).length;
    const completionPercentage = (completedSteps / totalSteps) * 100;
    return completionPercentage.toFixed(2);
  };

  const formatFloat = (number: number | undefined) => {
    if (
      typeof number === 'number' &&
      !isNaN(number) &&
      Number.isFinite(number) &&
      Number.isInteger(number) === false
    ) {
      return number.toFixed(2);
    } else {
      return number;
    }
  };
  const startIndex = (page - 1) * perPage + 1;
  const endIndex = page * perPage;

  const topCardsData = [
    {
      id: 1,
      title: 'Site Survey',
      value: titleData.site_survey_count,
      pending: 'survey',
    },
    {
      id: 2,
      title: 'CAD Design',
      value: titleData.cad_design_count,
      pending: 'cad',
    },
    {
      id: 3,
      title: 'Permitting',
      value: titleData.permitting_count,
      pending: 'permit',
    },
    {
      id: 4,
      title: 'Roofing',
      value: titleData.roofing_count,
      pending: 'roof',
    },
    {
      id: 5,
      title: 'Install',
      value: titleData.isntall_count,
      pending: 'install',
    },
    {
      id: 6,
      title: 'Inspection',
      value: titleData.inspection_count,
      pending: 'inspection',
    },
    {
      id: 7,
      title: 'Activation',
      value: titleData.activation_count,
      pending: 'activation',
    },
  ];

  const cardColors = [
    '#57B3F1',
    '#E0728C',
    '#63ACA3',
    '#6761DA',
    '#C470C7',
    '#A07FFF',
    '#EE6363',
  ];
  const hoverColors = [
    '#DCF1FF',
    '#FFE1E8',
    '#C3E7E3',
    '#DEDCFF',
    '#FEE0FF',
    '#E5D1FF',
    '#FFC9C9',
  ];
  const activeColors = [
    '#57B3F1',
    '#E1728C',
    '#63ACA3',
    '#6761DA',
    '#C470C7',
    '#A07FFF',
    '#EE6363',
  ];

  const resetPage = () => {
    setPage(1);
  };

  const isMobile = useMatchMedia('(max-width: 767px)');

  const handlePendingRequest = (pending: any) => {
    setSelectedMilestone(pending);
    setPage(1);
  };

  const [selectedProjectQC, setSelectedProjectQC] = useState<any>(null);

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
  const [ntpValue, setNtpValue] = useState("0 days pending");
  const handleActiveTab = (tab: any) => {
    setActiveTab(tab);
  };

  const isStaging = process.env.REACT_APP_ENV;

  // console.log(projectStatus, datacount, 'projectStatus');
  // console.log(selectedRangeDate, 'select');
  console.log(projectStatus, "This is project status");
  console.log(projectsCount, " This is projectsCount")

  const [isHovered, setIsHovered] = useState(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const mouseDownHandler = (e: MouseEvent) => {
      isDown = true;
      container.classList.add('active');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = 'grabbing';
    };

    const mouseLeaveHandler = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const mouseUpHandler = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1;
      container.scrollLeft = scrollLeft - walk;
    };
    container.addEventListener('mousedown', mouseDownHandler);
    container.addEventListener('mouseleave', mouseLeaveHandler);
    container.addEventListener('mouseup', mouseUpHandler);
    container.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      container.removeEventListener('mousedown', mouseDownHandler);
      container.removeEventListener('mouseleave', mouseLeaveHandler);
      container.removeEventListener('mouseup', mouseUpHandler);
      container.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return (
    <div className="project-main-wrp">
      <div className="project-container">
        <div className="project-heading pipeline-heading">
          <h2>{activeTab === 'Active Queue' ? 'Active' : 'Hold & Jeopardy'}</h2>
          <div className="pipeline-header-btns">
            {showDropdown && (
              <DropdownCheckbox
                label={selectedDealer.length === 1 ? 'partner' : 'partners'}
                placeholder={'Search partners'}
                selectedOptions={selectedDealer}
                options={dealerOption}
                onChange={(val) => {
                  setSelectedDealer(val);
                  setPage(1);
                }}
                disabled={loading || isLoading}
              />
            )}
            <button
              disabled={loading || isLoading}
              className={`desktop-btn ${activeTab === 'Active Queue' ? 'active' : ''}`}
              onClick={() => {
                handleActiveTab('Active Queue'), setPage(1);
              }}
            >
              Active
            </button>
            <button
              disabled={loading || isLoading}
              className={`mobile-btn ${activeTab === 'Active Queue' ? 'active' : ''}`}
              onClick={() => {
                handleActiveTab('Active Queue'), setPage(1);
              }}
            >
              Active
            </button>

            <button
              disabled={loading || isLoading}
              className={`desktop-btn ${activeTab === 'Hold & Jeopardy' ? 'active' : ''}`}
              onClick={() => {
                handleActiveTab('Hold & Jeopardy'), setPage(1);
              }}
            >
              Hold & Jeopardy
            </button>
            <button
              disabled={loading || isLoading}
              className={`mobile-btn ${activeTab === 'Hold & Jeopardy' ? 'active' : ''}`}
              onClick={() => {
                handleActiveTab('Hold & Jeopardy'), setPage(1);
              }}
            >
              H&J
            </button>
          </div>
        </div>
        <div className="flex stats-card-wrapper">
          <div
            ref={containerRef}
            style={{ width: '100%', cursor: 'grab' }}
            className="project-card-container-1"
          >
            {loading ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  marginInline: 'auto',
                }}
              >
                <MicroLoader />
              </div>
            ) : (
              <>
                {topCardsData.map((card, index) => {
                  const cardColor = cardColors[index % cardColors.length];
                  const hoverColor = hoverColors[index % hoverColors.length];
                  const activeColor = activeColors[index % activeColors.length];
                  const isActive = activeCardId === card.id;

                  const handleCardClick = (cardId: any, title: string) => {
                    setActiveCardId(activeCardId === cardId ? null : cardId);
                    setActiveCardTitle(activeCardId === cardId ? '' : title);
                  };

                  return (
                    <div
                      key={card.id}
                      className="flex items-center arrow-wrap"
                      style={{ marginRight: '-20px' }}
                    >
                      <div
                        key={card.id}
                        className={`project-card ${index === topCardsData.length - 1 ? 'last-card' : ''
                          } ${isActive ? 'active' : ''}`}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(-1)}
                        style={{
                          backgroundColor: isActive
                            ? activeColor
                            : isHovered === index
                              ? hoverColor
                              : '#F6F6F6',
                          border:
                            isHovered === index
                              ? `none`
                              : `2px solid ${cardColor}`,
                        }}
                        onClick={(e) => {
                          handlePendingRequest(card?.pending);
                          handleCardClick(card.id, card.title);
                        }}
                      >
                        <span
                          className="stages-numbers"
                          style={{ color: cardColor, borderColor: cardColor }}
                        >
                          {activeCardId === card.id ? <MdDone /> : card.id}
                        </span>
                        <p style={{ color: isActive ? '#fff' : '' }}>
                          {card.title || 'N/A'}
                        </p>
                        <h2
                          style={{
                            color:
                              isHovered === index && !isActive
                                ? '#263747'
                                : isActive
                                  ? '#fff'
                                  : cardColor,
                          }}
                        >
                          {card.value || '0'}
                        </h2>
                      </div>
                      {index < topCardsData.length - 1 && (
                        <div
                          className="flex arrow-dir"
                          style={{ padding: '0 5px' }}
                        >
                          <MdOutlineKeyboardDoubleArrowRight
                            style={{
                              width: '1.5rem',
                              height: '1.5rem',
                              color: cardColor,
                              marginLeft:
                                activeCardId === card.id ? '8px' : '0px',
                            }}
                          />
                          <MdOutlineKeyboardDoubleArrowRight
                            style={{
                              marginLeft: '-10px',
                              height: '1.5rem',
                              width: '1.5rem',
                              color:
                                cardColors[(index + 1) % cardColors.length],
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className="project-container"
        style={{ marginTop: '1rem', padding: '0 0 1rem 0' }}
      >
        <div className="performance-table-heading" style={{ marginTop: "1.2rem" }}>
          <div className="proper-top pipeline-agingReport-filter">
            <div className="performance-project">
              {activeCardId !== null && (
                <div className="active-queue">
                  <IoClose
                    size={20}
                    onClick={() => {
                      setActiveCardId(null),
                        setSelectedMilestone(''),
                        setPage(1);
                    }}
                  />
                  <h2>{activeCardTitle || 'N/A'}</h2>
                </div>
              )}
              <div className="proper-select">
                {/* <IoIosSearch className="search-icon" /> */}
                <Input
                  type="text"
                  placeholder="Search for Unique ID or Name"
                  value={search}
                  name="Search for Unique ID or Name"
                  onChange={(e) => {
                    const input = e.target.value;
                    const regex = /^[a-zA-Z0-9\s]*$/; // Allow only alphanumeric and spaces
                    if (regex.test(input) && input.length <= 50) {
                      setSearch(input);
                      handleSearchChange(e);
                    }
                  }}
                />
              </div>

              <div
                className="performance-box-container pipeline-box-container"
                style={{ padding: '0.7rem 1rem' }}
              >
                <p className="status-indicator">Status indicators</p>
                <div className="progress-box-body">
                  <div
                    className="progress-box"
                    style={{ background: '#377CF6', borderRadius: '2px' }}
                  ></div>
                  <p>Scheduled</p>
                </div>
                <div className="progress-box-body">
                  <div
                    className="progress-box"
                    style={{ background: '#63ACA3', borderRadius: '2px' }}
                  ></div>
                  <p>Completed</p>
                </div>
                <div className="progress-box-body">
                  <div
                    className="progress-box"
                    style={{ background: '#E9E9E9', borderRadius: '2px' }}
                  ></div>
                  <p>Not Started</p>
                </div>
              </div>
            </div>

            <div className="perf-export-btn relative pipline-export-btn">
              {!!(projectStatus.length && !loading) && (
                <div className='filterButtonAddition '>

                  <div
                    className="pipelineFilterLine"
                    style={{ backgroundColor: '#377CF6' }}
                    data-tooltip-id='filter'
                    onClick={HandleFilterClick}
                  >
                    <img
                      src={ICONS.fil_white}
                      alt=""
                      style={{ height: '15px', width: '15px',position:filterAplied?'relative':'static', left:filterAplied? '5px' : '0px' }}
                      className='filterImg'

                   
                    />
                    { filterAplied &&
                      <div className='pipeLine-filter-ActiveSign'></div>
                    }

                  </div>


                  <button
                    disabled={isExportingData}
                    onClick={ExportCsv}
                    data-tooltip-id="export"
                    className={`performance-exportbtn performance-exp-mob flex items-center justify-center pipeline-export ${isExportingData ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {isExportingData ? (
                      <MdDownloading
                        className="downloading-animation"
                        size={20}
                      />
                    ) : (
                      <LuImport size={20} />
                    )}
                  </button>
                </div>
              )}

              <Tooltip
                style={{
                  zIndex: 20,
                  background: '#f7f7f7',
                  color: '#000',
                  fontSize: 12,
                  paddingBlock: 4,
                }}
                offset={8}
                id="export"
                place="bottom"
                content="Export"
              />
              {!openFilter && <Tooltip
                style={{
                  zIndex: 20,
                  background: '#f7f7f7',
                  color: '#000',
                  fontSize: 12,
                  paddingBlock: 4,
                }}
                offset={8}
                id="filter"
                place="bottom"
                content="Filter"
              />}
              {openFilter && !loading && <div ref={filterRef} className='dropDownFilter'>

                <div className='filterOptions'>
                  {['Project Age', 'NTP', 'Permitting', 'Install', 'PTO'].map(
                    (option: string, index) => (
                      <div className="eachOption" key={index}>
                        <input
                          id={`pipeline-filter-options-${index}`}
                          type="checkbox"
                          checked={checkedStates[index]}
                          onChange={() => {
                            const newCheckedStates = [...checkedStates];
                            newCheckedStates[index] = !newCheckedStates[index];

                            setCheckedStates(newCheckedStates);

                            // Update the checkedOptions based on the new state
                            if (newCheckedStates[index]) {
                              // Add the option if checked
                              setCheckedOptions((prev) => [...prev, option]);
                            } else {
                              // Remove the option if unchecked
                              setCheckedOptions((prev) => prev.filter((opt) => opt !== option));
                            }
                          }}
                        />
                        <label
                          className="options"
                          style={{ color: checkedStates[index] ? '#377CF6' : 'black' , cursor:'pointer'}}
                          htmlFor={`pipeline-filter-options-${index}`}
                        >
                          {option}
                        </label>
                        {

                        }
                      </div>
                    )
                  )}
                </div>


                <div className='breakLine'>
                </div>
                <div className='secondHalfFilter'>
                  <div className='selectDaysDiv'>
                    <p className='selectDays'>Select Days</p>
                  </div>

                  <div className='filterdays'>
                    <div className='startDay'>
                      <div className='mThen'>
                        <p className='moreThen'>More than</p>
                      </div>
                      <label className='pipeline-inputBox-div'>
                      <input
                        className='dayBox'
                        value={minValue === 0 ? '' : minValue}
                        type="text"
                        onChange={handleMinChange}
                        onBlur={() => {
                          set_minValue(minValue <= 0 ? 1 : minValue);
                        }}
                        style={{outline:'none', width: minValue.toString().length === 1 ? '15px' :
                          minValue.toString().length === 2 ? '24px' : '30px'}}
                        min={1}
                        max={180}
                      />
                     {minValue !== 0 && <p className='pipeline-inputBox-div-para'>{minValue===1?'day':'days'}</p>}
                        </label>
                    </div>
                    <div className='endDay'>
                      <div className='lThen'>
                        <p className='lessThen'>Less than</p>
                      </div>
                      <label className='pipeline-inputBox-div'>
                      <input
                        className='dayBox'
                        value={maxValue === 0 ? '' : maxValue}
                        type="text"
                        onChange={handleMaxChange}
                        disabled={minValue === 180}
                        
                        onBlur={() => {
                          set_maxValue(maxValue <= 0 ? 180 : maxValue);
                          
                        }}
                        style={{outline:'none',width: maxValue.toString().length === 1 ? '15px' :
                          maxValue.toString().length === 2 ? '24px' : '30px'}}
                        min={1}
                        max={360}
                      />
                       {maxValue !==0 && <p className='pipeline-inputBox-div-para'>{maxValue===1?'day':'days'}</p>}
</label>
                    </div>
                  </div>

                  <Slider
                    range
                    min={1}
                    max={180}
                    value={[minValue, maxValue]}
                    onChange={handleSliderChange}
                    marks={{
                      1: {
                        label: <span style={{ color: 'black' }}>1</span>,
                      },
                      30: {
                        label: <span style={{ color: 'black' }}>30</span>,
                      },
                      60: {
                        label: <span style={{ color: 'black' }}>60</span>,
                      },
                      90: {
                        label: <span style={{ color: 'black' }}>90</span>,
                      },
                      120: {
                        label: <span style={{ color: 'black' }}>120</span>,
                      },
                      150: {
                        label: <span style={{ color: 'black' }}>150</span>,
                      },
                      180: {
                        label: <span style={{ color: 'black' }}>180</span>,
                      },
                    }}
                    className="custom-slider"
                    railStyle={{
                      backgroundColor: '#E5E7EB',
                      height: 2,
                    }}
                    trackStyle={{
                      backgroundColor: '#3B82F6',
                      height: 2,
                    }}
                    handleStyle={{
                      borderColor: '#3B82F6',
                      backgroundColor: '#3B82F6',
                      opacity: 1,
                      width: 12,
                      height: 12,
                      marginTop: -4,
                      boxShadow: '0 0 0 2px white',
                    }}
                  />


                 


                  <div className='filterButtons'>

                    <div className='cancelButton' onClick={() => {
                      setFieldData([]); const resetStates = new Array(5).fill(false);
                      setCheckedStates(resetStates);
                      set_maxValue(75);
                      set_minValue(25);
                      setPage(1);
                      // Also clear the checkedOptions array
                      setCheckedOptions([]); setOpenFilter(false); 
                      setFilterAplied(false);
                      setFiltered(prev=>!prev);
                      
                    }} style={{ cursor: "pointer" }}> Cancel </div>


                    <div className='applyButton' 
                    style={{cursor:'pointer'}}
                    onClick={() => {
                    if (minValue > maxValue) {
                    toast.error("In Range Min value can not be more than Max value");
                    set_minValue(25);
                    set_maxValue(70);
                    setFilterAplied(false);
                    }
                    else if(fieldData.length===0)
                    {
                      toast.error("Please Select atleast one Option!");
                    }
                    else {
                    setFiltered(prev => !prev);
                    setOpenFilter(false);
                    setFilterAplied(true);
                    setPage(1);
                    }
      
      
                    }}
                   > Apply </div>
                  </div>
                </div>

              </div>}
            </div>
          </div>

          <div className="performance-milestone-table">
            <table>
              <thead>
                <tr>
                  <th style={{ padding: '0px' }}>
                    <div className="milestone-header">
                      <div className="project-info">
                        <p>Project Info</p>
                      </div>
                      <div className="header-milestone">
                        <p>Milestones</p>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      colSpan={6}
                    >
                      <MicroLoader />
                    </td>
                  </tr>
                ) : projectStatus.length < 1 && !isLoading ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center' }}>
                      <div
                        className=""
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <DataNotFound />
                      </div>
                    </td>
                  </tr>
                ) : (
                  projectStatus.map(
                    (project: (typeof projectStatus)[0], index: number) => {
                      const newObj: any = { ...project };
                      delete newObj?.['unqiue_id'];
                      return (
                        <tr key={index}>
                          <td style={{ padding: '0px' }}>
                            <div className="milestone-data">
                              <div className="project-info-details">


                                <Link
                                  to={`/project-management?project_id=${project.unqiue_id}&customer-name=${project.customer}`}
                                  
                                >
                                  <div className="deco-text">
                                    <h3>{project.customer}</h3>
                                    <p className="install-update">
                                      {project.unqiue_id}
                                    </p>
                                  </div>
                                </Link>
                                {project.days_project_age && project.days_project_age !== '-' && project.days_project_age !== '0' && <div className='projectAge'>
                                  <p>Project age :
                                    {
                                      ' ' + project.days_project_age.split(" ")[0] + " days"

                                    }
                                  </p>

                                </div>}
                                {
                                  !project.days_project_age && <div style={{ margin: '5px 0px' }}> </div>
                                }
                                <div className="milestone-status">

                                  <div
                                    className="status-item qc-item click qc"
                                    onClick={() => {
                                      setSelectedProjectQC(project.qc);
                                      filter();
                                    }}
                                  >
                                    QC:
                                    <img
                                      src={
                                        Object.values(project.qc).some(
                                          (value) => value === 'Pending'
                                        ) ||
                                          project.qc.qc_action_required_count > 0
                                          ? ICONS.Pendingqc
                                          : ICONS.complete
                                      }
                                      width={16}
                                      alt="img"
                                    />
                                    {Object.values(project.qc).every(
                                      (value) => value !== 'Pending'
                                    ) && project.qc.qc_action_required_count > 0
                                      ? project.qc.qc_action_required_count
                                      : ''}
                                  </div>
                                  <div
                                    className={`status-item ntp-item click ${project.co_status === 'CO Complete' ? 'ntp' : ''}`}
                                    onClick={() => {
                                      setSelectedProjectQC(project.ntp);
                                      ntpAction();
                                      setNtpValue(project.days_ntp);
                                    }}
                                  >
                                    NTP:
                                    <img
                                      src={
                                        Object.values(project.ntp).some(
                                          (value) => value === 'Pending'
                                        ) ||
                                          project.ntp.action_required_count > 0
                                          ? ICONS.Pendingqc
                                          : ICONS.complete
                                      }
                                      width={16}
                                      alt="img"
                                    />
                                    {Object.values(project.ntp).every(
                                      (value) => value !== 'Pending'
                                    ) && project.qc.qc_action_required_count > 0
                                      ? project.ntp.action_required_count
                                      : ''}
                                    {
                                      project.days_ntp && project.days_ntp !== '-' && project.days_ntp !== '0 day pending' &&

                                      <div className='ntpActionRequired'>
                                        <p>{project.days_ntp.split(" ")[0] + project.days_ntp.split(" ")[0] === '1' ? 'day' : 'days'}</p>
                                      </div>
                                    }
                                  </div>
                                  {

                                  }

                                  {project.co_status !== 'CO Complete' &&
                                    project.co_status && (
                                      <div
                                        className="status-item co"
                                        data-tooltip={project.co_status} // Custom tooltip
                                      >
                                        C/O
                                      </div>
                                    )}

                                </div>
                              </div>

                              {/* <p className='performance-info-p' onClick={() => {}}>More info.</p> */}

                              <div className="strips-wrapper">
                                {/* Site Survey */}
                                <div className="strip-container">
                                  <div
                                    className="milestone-strips"
                                    style={getColorStyle(project.site_survey_colour)}
                                  >
                                    <p className="strips-data">site survey</p>
                                    <div className="strip-title">
                                      {project.site_survey_date ? (
                                        <p>{project?.site_survey_date}</p>
                                      ) : (
                                        <p className={`${project.site_survey_colour === '#E9E9E9' ? 'text-dark' : 'text-white'}`}>
                                          {'No Data'}
                                        </p>
                                      )}
                                    </div>
                                    <div className="strip-arrow">
                                      <MdOutlineKeyboardDoubleArrowRight
                                        style={{
                                          width: '1.2rem',
                                          height: '1.2rem',
                                          color: project.site_survey_colour,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  {/* Days Remaining */}
                                  {project.days_site_survey && project.days_site_survey !== '0 day pending' && project.days_site_survey !== '-' && <div className="pendingDayDiv">
                                    <p className="daysRemaining">{project.days_site_survey}</p>
                                    <div className='simpleLine'> </div>
                                  </div>}
                                </div>

                                {/* CAD Design */}
                                <div className="strip-container">
                                  <div
                                    className="notch-strip"
                                    style={getColorStyle(project.cad_design_colour)}
                                  >
                                    <p className="strips-data">cad design</p>
                                    <div className="notch-title">
                                      {project.cad_design_date ? (
                                        <p>{project?.cad_design_date}</p>
                                      ) : (
                                        <p className={`${project.cad_design_colour === '#E9E9E9' ? 'text-dark' : 'text-white'}`}>
                                          {'No Data'}
                                        </p>
                                      )}
                                    </div>
                                    <div className="strip-arrow">
                                      <MdOutlineKeyboardDoubleArrowRight
                                        style={{
                                          width: '1.2rem',
                                          height: '1.2rem',
                                          color: project.cad_design_colour,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  {/* Days Remaining */}
                                  {project.cad_design_colour === '#377CF6' && project.days_cad_design && project.days_cad_design !== '0 day pending' && project.days_cad_design !== '-' && <div className="pendingDayDiv">
                                    <p className="daysRemaining">{project.days_cad_design}</p>
                                    <div className='simpleLine'> </div>
                                  </div>}
                                </div>

                                {/* Permitting */}
                                <div className="strip-container">
                                  <div
                                    className="notch-strip"
                                    style={getColorStyle(project.permitting_colour)}
                                  >
                                    <p className="strips-data">permitting</p>
                                    <div className="notch-title">
                                      {project.permitting_date ? (
                                        <p>{project?.permitting_date}</p>
                                      ) : (
                                        <p className={`${project.permitting_colour === '#E9E9E9' ? 'text-dark' : 'text-white'}`}>
                                          {'No Data'}
                                        </p>
                                      )}
                                    </div>
                                    <div className="strip-arrow">
                                      <MdOutlineKeyboardDoubleArrowRight
                                        style={{
                                          width: '1.2rem',
                                          height: '1.2rem',
                                          color: project.permitting_colour,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  {/* Days Remaining */}
                                  {project.days_permits && project.days_permits !== '0 day pending' && project.days_permits !== '-' && <div className="pendingDayDiv">
                                    <p className="daysRemaining">{project.days_permits}</p>
                                    <div className='simpleLine'> </div>
                                  </div>}
                                </div>

                                {/* Roofing */}
                                {project.roofing_colour && (
                                  <div className="strip-container">
                                    <div
                                      className="notch-strip"
                                      style={getColorStyle(project.roofing_colour)}
                                    >
                                      <p className="strips-data">roofing</p>
                                      <div className="notch-title">
                                        {project.roofing_date ? (
                                          <p>{project?.roofing_date}</p>
                                        ) : (
                                          <p className={`${project.roofing_colour === '#E9E9E9' ? 'text-dark' : 'text-white'}`}>
                                            {'No Data'}
                                          </p>
                                        )}
                                      </div>
                                      <div className="strip-arrow">
                                        <MdOutlineKeyboardDoubleArrowRight
                                          style={{
                                            width: '1.2rem',
                                            height: '1.2rem',
                                            color: project.roofing_colour,
                                          }}
                                        />
                                      </div>
                                    </div>
                                    {/* Days Remaining */}
                                    {project.days_roofing && project.days_roofing !== '-' && project.days_roofing !== '0 day pending' && <div className="pendingDayDiv">
                                      <p className="daysRemaining">{project.days_roofing}</p>
                                      <div className='simpleLine'> </div>
                                    </div>}
                                  </div>
                                )}

                                {/* Install */}
                                <div className="strip-container">
                                  <div
                                    className="notch-strip"
                                    style={getColorStyle(project.install_colour)}
                                  >
                                    <p className="strips-data">install</p>
                                    <div className="notch-title">
                                      {project.install_date ? (
                                        <p>{project?.install_date}</p>
                                      ) : (
                                        <p className={`${project.install_colour === '#E9E9E9' ? 'text-dark' : 'text-white'}`}>
                                          {'No Data'}
                                        </p>
                                      )}
                                    </div>
                                    <div className="strip-arrow">
                                      <MdOutlineKeyboardDoubleArrowRight
                                        style={{
                                          width: '1.2rem',
                                          height: '1.2rem',
                                          color: project.install_colour,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  {/* Days Remaining */}
                                  {project.days_install && project.days_install !== '0 day pending' && project.days_install !== '-' && <div className="pendingDayDiv">
                                    <p className="daysRemaining">{project.days_install}</p>
                                    <div className='simpleLine'> </div>
                                  </div>}
                                </div>

                                {/* Electrical */}
                                {project?.electrical_date && (
                                  <div className="strip-container">
                                    <div
                                      className="notch-strip"
                                      style={getColorStyle(project.electrical_colour)}
                                    >
                                      <p className="strips-data">electrical</p>
                                      <div className="notch-title">
                                        {project.electrical_date ? (
                                          <p>{project?.electrical_date}</p>
                                        ) : (
                                          <p className={`${project.electrical_colour === '#E9E9E9' ? 'text-dark' : 'text-white'}`}>
                                            {'No Data'}
                                          </p>
                                        )}
                                      </div>
                                      <div className="strip-arrow">
                                        <MdOutlineKeyboardDoubleArrowRight
                                          style={{
                                            width: '1.2rem',
                                            height: '1.2rem',
                                            color: project.electrical_colour,
                                          }}
                                        />
                                      </div>
                                    </div>
                                    {/* Days Remaining */}
                                    {project.days_electrical && project.days_electrical !== '0 day pending' && project.days_electrical !== '-' && <div className="pendingDayDiv">
                                      <p className="daysRemaining">{project.days_electrical}</p>
                                      <div className='simpleLine'> </div>
                                    </div>}
                                  </div>
                                )}

                                {/* Inspection */}
                                <div className="strip-container">
                                  <div
                                    className="notch-strip"
                                    style={getColorStyle(project.inspectionsColour)}
                                  >
                                    <p className="strips-data">inspection</p>
                                    <div className="notch-title">
                                      {project.inspection_date ? (
                                        <p>{project?.inspection_date}</p>
                                      ) : (
                                        <p className={`${project.inspectionsColour === '#E9E9E9' ? 'text-dark' : 'text-white'}`}>
                                          {'No Data'}
                                        </p>
                                      )}
                                    </div>
                                    <div className="strip-arrow">
                                      <MdOutlineKeyboardDoubleArrowRight
                                        style={{
                                          width: '1.2rem',
                                          height: '1.2rem',
                                          color: project.inspectionsColour,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  {/* Days Remaining */}
                                  {project.days_inspection && project.days_inspection !== '0 day pending' && project.days_inspection !== '-' && <div className="pendingDayDiv">
                                    <p className="daysRemaining">{project.days_inspection}</p>
                                    <div className='simpleLine'> </div>
                                  </div>}
                                </div>

                                {/* Activation */}
                                <div className="strip-container">
                                  <div
                                    className="notch-strip"
                                    style={getColorStyle(project.activation_colour)}
                                  >
                                    <p className="strips-data">activation</p>
                                    <div className="notch-title">
                                      {project.activation_date ? (
                                        <p>{project?.activation_date}</p>
                                      ) : (
                                        <p className={`${project.activation_colour === '#E9E9E9' ? 'text-dark' : 'text-white'}`}>
                                          {'No Data'}
                                        </p>
                                      )}
                                    </div>
                                    <div>
                                      <MdOutlineKeyboardDoubleArrowRight
                                        style={{
                                          width: '1.2rem',
                                          height: '1.2rem',
                                          color: project.activation_colour,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  {/* Days Remaining */}
                                  {project.days_activation && project.days_activation !== '0 day pending' && project.days_activation !== '-' && <div className="pendingDayDiv">
                                    <p className="daysRemaining">{project.days_activation}</p>
                                    <div className='simpleLine'> </div>
                                  </div>}
                                </div>
                              </div>

                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                )}

                <QCPopUp
                  projectDetail={selectedProjectQC}
                  isOpen={filterOPen}
                  handleClose={filterClose}
                />
                <NtpPopUp
                  projectDetail={selectedProjectQC}
                  isOpen={ntpOPen}
                  handleClose={ntpClose}
                  ntpValue={ntpValue}
                />
              </tbody>
            </table>
          </div>

          {!isLoading && (
            <div className="page-heading-container">
              {!!projectsCount && (
                <p className="page-heading">
                  {startIndex} -{' '}
                  {endIndex > projectsCount ? projectsCount : endIndex} of{' '}
                  {projectsCount} item
                </p>
              )}

              {projectStatus?.length > 0 ? (
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(projectsCount / perPage)}
                  paginate={(num) => setPage(num)}
                  currentPageData={projectStatus}
                  goToNextPage={() => setPage((prev) => prev + 1)}
                  goToPrevPage={() =>
                    setPage((prev) => (prev < 1 ? prev - 1 : prev))
                  }
                  perPage={perPage}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
  
export default ProjectPerformence;
