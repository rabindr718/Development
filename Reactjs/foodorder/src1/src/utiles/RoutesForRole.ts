import { TYPE_OF_USER } from '../resources/static_data/Constant';
import { ROUTES } from '../routes/routes';
import Leaderboard from '../ui/leaderboard';
import PendingQueue from '../ui/oweHub/pendingQueue';
import ProjectPerformence from '../ui/oweHub/projectTracker/ProjectPerformence';
import ProjectStatus from '../ui/oweHub/projectTracker/ProjectStatus';
import { DashboardPage } from '../ui/oweHub/dashboard/DashboardPage';
import TeamManagement from '../ui/oweHub/teammanagement/dashboard';
import UserManagement from '../ui/oweHub/userManagement/UserManagement';
import TechnicalSupport from '../ui/oweHub/technicalSupport/TechnicalSupport';
import ConfigurePage from '../ui/oweHub/configure/ConfigurePage';
import TeamTable from '../ui/oweHub/teammanagement/teamtable';
import Calendar from '../ui/Calendar/PerformanceCalendar';
import LeadManagementDashboard from '../ui/leadmanagement/LeadManagementDashboard';
const exceptDB = Object.values(TYPE_OF_USER).filter(
  (item) => item !== 'DB User'
);
export default [
  {
    route: ROUTES.LEADERBOARD,
    element: Leaderboard,
    available: exceptDB,
    stagingOnly: false,
  },

  {
    route: ROUTES.PEINDING_QUEUE,
    element: PendingQueue,
    available: exceptDB,
    stagingOnly: false,
  },

  {
    route: ROUTES.PROJECT_PERFORMANCE,
    element: ProjectPerformence,
    available: exceptDB,
    stagingOnly: false,
  },

  {
    route: ROUTES.LEAD_MANAGEMENT,
    element: LeadManagementDashboard,
    available: exceptDB,
    stagingOnly: true,
  },

  {
    route: ROUTES.PROJECT_STATUS,
    element: ProjectStatus,
    available: [
      TYPE_OF_USER.ADMIN,
      TYPE_OF_USER.FINANCE_ADMIN,
      TYPE_OF_USER.DEALER_OWNER,
      TYPE_OF_USER.SUB_DEALER_OWNER,
      TYPE_OF_USER.ACCOUNT_EXCUTIVE,
      TYPE_OF_USER.ACCOUNT_MANAGER,
      TYPE_OF_USER.SALE_MANAGER,
      TYPE_OF_USER.REGIONAL_MANGER,
      TYPE_OF_USER.SALES_REPRESENTATIVE,
      TYPE_OF_USER.APPOINTMENT_SETTER,
    ],
    stagingOnly: false,
  },

 

  {
    route: ROUTES.COMMISSION_DASHBOARD,
    element: DashboardPage,
    available: [
      TYPE_OF_USER.ADMIN,
      TYPE_OF_USER.FINANCE_ADMIN,
      TYPE_OF_USER.ACCOUNT_EXCUTIVE,
      TYPE_OF_USER.ACCOUNT_MANAGER,
      TYPE_OF_USER.DEALER_OWNER,
      // TYPE_OF_USER.SUB_DEALER_OWNER,
      // TYPE_OF_USER.REGIONAL_MANGER,
      // TYPE_OF_USER.SALE_MANAGER,
      // TYPE_OF_USER.SALES_REPRESENTATIVE,
      // TYPE_OF_USER.APPOINTMENT_SETTER
    ],
    stagingOnly: true,
  },

  {
    route: ROUTES.TEAM_MANAGEMENT_DASHBOARD,
    element: TeamManagement,
    available: [
      TYPE_OF_USER.ADMIN,
      TYPE_OF_USER.FINANCE_ADMIN,
      TYPE_OF_USER.DEALER_OWNER,
      TYPE_OF_USER.SUB_DEALER_OWNER,

      TYPE_OF_USER.REGIONAL_MANGER,
      TYPE_OF_USER.SALE_MANAGER,
      TYPE_OF_USER.SALES_REPRESENTATIVE,
    ],
    stagingOnly: false,
  },

  {
    route: ROUTES.USER_MANAEMENT,
    element: UserManagement,
    available: [
      TYPE_OF_USER.ADMIN,
      TYPE_OF_USER.DEALER_OWNER,
      TYPE_OF_USER.SUB_DEALER_OWNER,
    ],
    stagingOnly: false,
  },

  {
    route: ROUTES.CALENDAR,
    element: Calendar,
    available: [
      TYPE_OF_USER.DEALER_OWNER,
      TYPE_OF_USER.SALE_MANAGER,
      TYPE_OF_USER.SALES_REPRESENTATIVE,
      TYPE_OF_USER.REGIONAL_MANGER,
      TYPE_OF_USER.APPOINTMENT_SETTER,
    ],
    stagingOnly: false,
  },
  {
    route: ROUTES.CONFIG_PAGE,
    element: ConfigurePage,
    available: [
      TYPE_OF_USER.ADMIN,
      TYPE_OF_USER.FINANCE_ADMIN,
      // TYPE_OF_USER.DEALER_OWNER,
      // TYPE_OF_USER.SUB_DEALER_OWNER,
    ],
    stagingOnly: false,
  },
  {
    route: ROUTES.TEAM_MANAGEMENT_TABLE,
    element: TeamTable,
    available: [
      TYPE_OF_USER.ADMIN,
      TYPE_OF_USER.FINANCE_ADMIN,
      TYPE_OF_USER.DEALER_OWNER,
      TYPE_OF_USER.SUB_DEALER_OWNER,
      TYPE_OF_USER.REGIONAL_MANGER,
      TYPE_OF_USER.SALE_MANAGER,
      TYPE_OF_USER.SALES_REPRESENTATIVE,
    ],
    stagingOnly: false,
  },
  {
    route: ROUTES.TECHNICAL_SUPPORT,
    element: TechnicalSupport,
    available: Object.values(TYPE_OF_USER),
    stagingOnly: false,
  },
];
