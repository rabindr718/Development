import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const ApptSettersColumn: Column[] = [
  {
    name: 'unique_id',
    displayName: 'Unique ID',
    type: 'string',
    isCheckbox: true,
  },
  { name: 'name', displayName: 'Name', type: 'string', isCheckbox: false },
  { name: 'team_name', displayName: 'Team', type: 'string', isCheckbox: false },
  {
    name: 'pay_rate',
    displayName: 'Pay Rate',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'start_date',
    displayName: 'Start Date',
    type: 'date',
    isCheckbox: false,
  },
  {
    name: 'end_date',
    displayName: 'End Date',
    type: 'date',
    isCheckbox: false,
  },
];
