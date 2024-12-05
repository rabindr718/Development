import { ROUTES } from './routes';
import { BiDollar, BiSupport } from 'react-icons/bi';
import { RiUserSettingsLine } from 'react-icons/ri';
import { MdPendingActions } from 'react-icons/md';
import { GrDocumentConfig } from 'react-icons/gr';
import { GrDocumentPerformance } from 'react-icons/gr';
import { AiOutlineProject, AiOutlineTeam } from 'react-icons/ai';
import { ImStatsBars2 } from 'react-icons/im';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { IoCloudUploadOutline, IoListSharp } from 'react-icons/io5';
import { PiMapPin } from 'react-icons/pi';
import { MdOutlinePermMedia } from "react-icons/md";
import { FaCalculator } from "react-icons/fa";
import { ICONS } from '../resources/icons/Icons';
import { TbReportSearch } from "react-icons/tb";
const mob = {
  mob: [
    {
      path: ROUTES.PEINDING_QUEUE,
      sidebarProps: {
        displayText: 'Pending Actions ',
        icon: (
          <MdPendingActions
            size={20}
            style={{ marginLeft: '2px' }}
            color="black"
          />
        ),
      },
    },
    {
      path: ROUTES.LEADERBOARD,
      sidebarProps: {
        displayText: 'Leaderboard',
        icon: <ImStatsBars2 size={18} style={{ flexShrink: '0' }} />,
      },
    },
    {
      path: ROUTES.PROJECT_PERFORMANCE,
      sidebarProps: {
        displayText: 'Pipeline',
        icon: (
          <GrDocumentPerformance
            size={20}
            style={{ marginLeft: '5px' }}
            className="hover-icon"
          />
        ),
      },
    },
    {
      path: ROUTES.PROJECT_STATUS,
      sidebarProps: {
        displayText: 'Project Manager',
        icon: (
          <AiOutlineProject
            size={20}
            style={{ marginLeft: '3px' }}
            color="black"
          />
        ),
      },
    },
    {
      path: ROUTES.MAP_ADDRESS,
      sidebarProps: {
        displayText: 'Install Map',
        icon: (
          <PiMapPin size={20} style={{ marginLeft: '3px' }} color="black" />
        ),
      },
    },
    {
      path: ROUTES.COMMISSION_DASHBOARD,
      sidebarProps: {
        displayText: 'Dealer Pay',
        icon: (
          // <BiDollar size={20} style={{ marginLeft: '5px' }} className="hover-icon"/>
          <img src={ICONS.MenuDealer} style={{ marginLeft: '5px' }} className="hover-icon" width={20} height={20} alt="sidebar-dealer-logo" />
        ),
      },
    },
    {
      path: ROUTES.CONFIG_PAGE,
      sidebarProps: {
        displayText: 'Configure',
        icon: <GrDocumentConfig size={18} style={{ flexShrink: '0' }} />,
      },
    },
    {
      path: ROUTES.USER_MANAEMENT,

      sidebarProps: {
        displayText: 'Users',
        icon: <RiUserSettingsLine size={20} style={{ flexShrink: '0' }} />,
      },
    },
    {
      path: ROUTES.TOTAL_COUNT,
      sidebarProps: {
        displayText: 'Reports',
        icon: <TbReportSearch size={18} style={{ flexShrink: '0' }} />,
      },
    },
    {
      path: ROUTES.LEAD_MANAGEMENT,
      sidebarProps: {
        displayText: 'Leads',
        icon: (
          // <IoListSharp size={20} style={{ marginLeft: '3px' }} color="black" />
          <img src={ICONS.MenuLead} style={{ marginLeft: '3px' }} className="hover-icon" width={20} height={20} alt="sidebar-menu-logo" />
        ),
      },
    },
    {
      path: ROUTES.LIBRARY,
      sidebarProps: {
        displayText: 'Library',
        icon: (
          <MdOutlinePermMedia
            size={20}
            style={{ marginLeft: '3px' }}
            color="black"
          />
        ),
      },
    },
    {
      path: ROUTES.SALES_REP_SCHEDULER,
      sidebarProps: {
        displayText: 'Scheduler',
        icon: <RiCalendarScheduleLine size={20} style={{ flexShrink: '0' }} />,
      },
    },
    {
      path: ROUTES.TEAM_MANAGEMENT_DASHBOARD,

      sidebarProps: {
        displayText: 'Teams',
        icon: <AiOutlineTeam size={20} style={{ flexShrink: '0' }} />,
      },
    },
    {
      path: ROUTES.CALCULATOR,

      sidebarProps: {
        displayText: 'CAGR CALCULATOR',
        icon: <FaCalculator size={20} style={{ flexShrink: '0' }} />,
      },
    },
    {
      path: ROUTES.TECHNICAL_SUPPORT,
      sidebarProps: {
        displayText: 'Technical Support',
        icon: <BiSupport size={20} style={{ flexShrink: '0' }} />,
      },
    },

    // {
    //   path: ROUTES.CALENDAR,
    //   sidebarProps: {
    //     displayText: 'Performance Calendar',
    //     icon: <FaRegCalendarCheck size={20} style={{ flexShrink: '0' }} />,
    //   },
    // },
  ],
};

const other = {
  other: [
    {
      path: ROUTES.TEAM_MANAGEMENT_DASHBOARD,

      sidebarProps: {
        displayText: 'Teams',
        icon: <AiOutlineTeam size={20} style={{ flexShrink: '0' }} />,
      },
    },
    {
      path: ROUTES.USER_MANAEMENT,

      sidebarProps: {
        displayText: 'Users',
        icon: <RiUserSettingsLine size={20} style={{ flexShrink: '0' }} />,
      },
    },
    {
      path: ROUTES.CONFIG_PAGE,
      sidebarProps: {
        displayText: 'Configure',
        icon: <GrDocumentConfig size={18} style={{ flexShrink: '0' }} />,
      },
    },
  ],
};

export const createSideMenuList = (): any[] => {
  let sideMenu: { [key: string]: any[] }[] = [];
  const remiainingPage: { [key: string]: any[] } = {};
  remiainingPage.mob = [
    { ...mob.mob[0] },
    { ...mob.mob[3] },
    { ...mob.mob[4] },
    { ...mob.mob[5] },
    { ...other.other[1] },
  ];
  const remiainingPage1: { [key: string]: any[] } = {};
  remiainingPage1.mob = [{ ...mob.mob[0] }, { ...mob.mob[3] }];
  const teammanagement: { [key: string]: any[] } = {};
  teammanagement.mob = [{ ...mob.mob[1] }];
  sideMenu.push(mob);

  return sideMenu;
};
