import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../infrastructure/web_api/api_client/EndPoints';
import { HTTP_STATUS } from '../../../core/models/api_models/RequestModel';
import { DBManagerUserActivityModel } from '../../../core/models/api_models/DBManagerModel';

/** get user onboadring users */
export const fetchDBManagerUserActivity = createAsyncThunk(
  'DBManager/userActivity',
  async (param: any) => {
    const response = await postCaller(
      EndPoints.Get_DBManager_User_Activity,
      JSON.stringify(param)
    );
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error(response.message);
    }

    const { data, dbRecCount } = response;

    const { dblog_list_response } = data;
    if (!dblog_list_response || dblog_list_response.length === 0) {
      return { list: [], dbRecCount: 0 };
    }
    const list: DBManagerUserActivityModel[] = dblog_list_response.map(
      (el: DBManagerUserActivityModel, index: number) => {
        return {
          username: el.username,
          db_name: el.db_name,
          time_date: el.time_date,
          query_details: el.query_details,
        };
      }
    );
    return { list, dbRecCount };
  }
);
