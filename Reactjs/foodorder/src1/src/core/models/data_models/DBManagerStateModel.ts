import { DBManagerUserActivityModel } from '../api_models/DBManagerModel';

export interface DBManagerStateModel {
  error: string | null | any;
  loading: boolean;
  userActivityList?: DBManagerUserActivityModel[];
  totalCount: number;
}
