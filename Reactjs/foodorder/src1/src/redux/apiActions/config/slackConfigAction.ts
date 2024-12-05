import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';
import { socket } from '../../../ui/components/layout/ChatSupport';

interface IPaginate {
  page_number: number;
  page_size: number;
  archived?: boolean;
}

interface ICreateSlackConfig {
  issue_type: string;
  channel_name: string;
  bot_token: string;
  slack_app_token: string;
  channel_id: string;
}

interface IUpdateSlackConfig extends ICreateSlackConfig {
  record_id: string;
}

export const fetchSlackConfigList = createAsyncThunk(
  '/get_slack_config',
  async (param: IPaginate, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_slack_config', param);
      console.log('dba action', data);
      const list = data?.data?.slack_config_list;
      return { list, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createSlackConfig = createAsyncThunk(
  '/create_slack_config',
  async (param: ICreateSlackConfig, { rejectWithValue }) => {
    try {
      const data = await postCaller('create_slack_config', param);
      toast.success(data?.message);
      socket.emit('update-channels');
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateSlackConfig = createAsyncThunk(
  '/update_slack_config',
  async (param: IUpdateSlackConfig, { rejectWithValue }) => {
    try {
      const data = await postCaller('update_slack_config', param);
      socket.emit('update-channels');
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteSlackConfig = createAsyncThunk(
  '/delete_slack_config',
  async (recordId: string, { rejectWithValue }) => {
    try {
      const data = await postCaller('update_slack_config_archive', {
        record_id: recordId,
      });
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
