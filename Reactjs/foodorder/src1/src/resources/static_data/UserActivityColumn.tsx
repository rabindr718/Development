import { Column } from '../../core/models/data_models/FilterSelectModel';

export const UserActivityColumn: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },
  {
    name: 'user_name',
    displayName: 'User Name',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'db_name',
    displayName: 'DB Name',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'query_details',
    displayName: 'Query Details',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'time_date',
    displayName: 'Time & Date',
    type: 'date',
    isCheckbox: false,
  },
];
