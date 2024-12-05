import { Column } from '../../../core/models/data_models/FilterSelectModel';
export const ApRepColumns: Column[] = [
  {
    name: 'unique_id',
    displayName: 'Unique ID',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'rep',
    displayName: 'REP',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'dba',
    displayName: 'DBA',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'type', displayName: 'Type', type: 'string', isCheckbox: false },
  { name: 'date', displayName: 'Date', type: 'string', isCheckbox: false },
  {
    name: 'amount',
    displayName: 'Amount',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'method', displayName: 'Method', type: 'string', isCheckbox: false },
  { name: 'cbiz', displayName: 'CBIZ', type: 'date', isCheckbox: false },
  {
    name: 'transaction',
    displayName: 'Transaction',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'notes',
    displayName: 'Notes',
    type: 'string',
    isCheckbox: false,
  },
];
