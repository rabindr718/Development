import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../infrastructure/web_api/api_client/EndPoints';
import { HTTP_STATUS } from '../../../core/models/api_models/RequestModel';
import {
  CreateUserParamModel,
  DealerOwner,
  DeleteUserModel,
  ReportTo,
  UserDropdownModel,
} from '../../../core/models/api_models/UserManagementModel';

/** get dealer */
export const fetchDealerOwner = createAsyncThunk(
  'user/get_dealer_owner',
  async (data: DealerOwner) => {
    const response = await postCaller(
      EndPoints.get_user_by_role,
      JSON.stringify(data)
    );
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error(response.message);
    }

    const { users_name_list } = response.data;
    const mapList: UserDropdownModel[] = users_name_list.map(
      (el: { name: string }) => {
        return {
          label: el.name,
          value: el.name,
        };
      }
    );
    return mapList;
  }
);

/** get region list */
export const fetchRegionList = createAsyncThunk(
  'user/get_region',
  async (data: ReportTo) => {
    const response = await postCaller(EndPoints.get_users_by_dealer, data);
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error(response.message);
    }

    const { users_name_list } = response.data;

    if (users_name_list) {
      const mapList: UserDropdownModel[] = users_name_list.map(
        (el: { name: string; user_code: string }) => {
          return {
            label: el.name,
            value: el.user_code,
          };
        }
      );
      return mapList;
    }
    return [];
  }
);
/**cretae user */

export const createUserOnboarding = createAsyncThunk(
  'user/create_onboarding_users',
  async (data: CreateUserParamModel, { rejectWithValue }): Promise<any> => {
    try {
      const response = await postCaller(EndPoints.create_user, data);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createDealer = createAsyncThunk(
  'user/create_dealer',
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const response = await postCaller('create_vdealer', data);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/** delete user */
export const deleteUserOnboarding = createAsyncThunk(
  'user/delete_onboarding_users',
  async (data: DeleteUserModel, { rejectWithValue }): Promise<any> => {
    try {
      const response = await postCaller(EndPoints.delete_users, data);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/** delete user */
export const deleteUserDealer = createAsyncThunk(
  'userdealer/delete_dealer_users',
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const response = await postCaller('update_vdealer_active', data);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
