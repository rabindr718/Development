import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { HTTP_STATUS } from '../../../core/models/api_models/RequestModel';
import {
  DBTable,
  OnboardingChartModel,
  UserOnboardingModel,
} from '../../../core/models/api_models/UserManagementModel';
import { EndPoints } from '../../../infrastructure/web_api/api_client/EndPoints';

const COLORS = [
  '#8E81E0',
  '#63ACA3',
  '#F86D75',
  '#CBCE3D',
  '#57B3F1',
  '#EE824D',
  '#52cafe',
  '#C470C7',
  '#9e84a0',
];
const randomHsl = () => `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
/** get user onboadring users */
export const fetchUserOnboarding = createAsyncThunk(
  'user/userOnboarding',
  async () => {
    const response = await postCaller(EndPoints.Get_User_onboarding_list, {});
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error('Failed to fetch onboarding data');
    }

    const { usermgmt_onboarding_list, active_sale_rep, inactive_sale_rep } =
      response.data;
    if (!usermgmt_onboarding_list || usermgmt_onboarding_list.length === 0) {
      return {
        usermgmt_onboarding_list: [],
        performanceList: [],
      };
    }

    const mapList: OnboardingChartModel[] = usermgmt_onboarding_list.map(
      (el: UserOnboardingModel, index: number) => {
        return {
          name: el.role_name,
          value: el.user_count,
          fill: COLORS[index] || randomHsl(),
        };
      }
    );

    let userPerformanceList: OnboardingChartModel[] = [];
    if (active_sale_rep !== 0 || inactive_sale_rep !== 0) {
      userPerformanceList.push(
        {
          name: 'Active SaleRep',
          value: active_sale_rep,
          fill: '#63ACA3',
        },
        {
          name: 'Inactive SaleRep',
          value: Math.abs(inactive_sale_rep),
          fill: '#E0728C',
        }
      );
    }
    return { mapList, userPerformanceList };
  }
);

/** get user onboadring users */
export const createTablePermission = createAsyncThunk(
  'user/table_permission',
  async () => {
    const response = await postCaller(EndPoints.table_permission, {});
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error('Failed to fetch onboarding data');
    }

    const { table_permission } = response.data;
    const mapList: DBTable[] = table_permission.map((el: DBTable) => {
      return {
        table_name: el.table_name,
      };
    });
    return mapList;
  }
);

/** get list user based */
export const fetchUserListBasedOnRole = createAsyncThunk(
  'user/user_list_based_on_Role',
  async (data: any) => {
    const response = await postCaller(
      EndPoints.Get_User_list_based_on_Role,
      JSON.stringify(data)
    );
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error('Failed to fetch onboarding data');
    }
    const { users_data_list } = response.data;
    if (!users_data_list || users_data_list.length === 0) {
      return { users_data_list: [], count: 0 };
    }
    return { users_data_list, count: response.dbRecCount };
  }
);

export const fetchDealerList = createAsyncThunk(
  'dealer/user_list_dealer',
  async (data: any) => {
    const response = await postCaller('get_vdealer', data);
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error('Failed to fetch onboarding data');
    }
    const { vdealers_list } = response.data;
    if (!vdealers_list || vdealers_list.length === 0) {
      return { vdealers_list: [], count: 0 };
    }
    return { vdealers_list, count: response.dbRecCount };
  }
);
