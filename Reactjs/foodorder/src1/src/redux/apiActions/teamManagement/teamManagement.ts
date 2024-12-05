import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

export const getTeams = createAsyncThunk(
  'fetchteams/get_teams',
  async (data?: string[]) => {
    const response = await postCaller('get_teams', { dealer_names: data });
    return {
      list: response.data,
      count: response.dbRecCount,
    };
  }
);

export const getTeam = createAsyncThunk(
  'fetchteam/get_team',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('get_team', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getsaleRepList = createAsyncThunk(
  'getsalereplist/salerep',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('get_sale_reps', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getSalesManagerList = createAsyncThunk(
  'getsalesManagerList/salesManager',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('get_users_by_role', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createTeam = createAsyncThunk(
  'getCreateTeam/createTeam',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_team', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const manageTeam = createAsyncThunk(
  'getManageTeam/manageTeam',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('manage_team', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getTeamMemberDropdown = createAsyncThunk(
  'getManageDropdown/Member_dropdown',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('get_team_member_dropdown', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data.data.sale_rep_list;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
