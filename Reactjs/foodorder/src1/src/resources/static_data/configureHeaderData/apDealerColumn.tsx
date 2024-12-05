import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const ApDealerColumn: Column[] = [
  {
    name: 'unique_id',
    displayName: 'Unique ID',
    type: 'string',
    isCheckbox: true,
  },
  { name: 'Dealer', displayName: 'Dealer', type: 'string', isCheckbox: false },
  {
    name: 'dba',
    displayName: 'DBA',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'type', displayName: 'Type', type: 'string', isCheckbox: false },
  { name: 'date', displayName: 'Date', type: 'date', isCheckbox: false },
  { name: 'Amount', displayName: 'Amount', type: 'string', isCheckbox: false },
  { name: 'Method', displayName: 'Method', type: 'string', isCheckbox: false },
  { name: 'Notes', displayName: 'Notes', type: 'string', isCheckbox: false },

  {
    name: 'Home Owner',
    displayName: 'Home Owner',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'ST', displayName: 'ST', type: 'string', isCheckbox: false },
];
