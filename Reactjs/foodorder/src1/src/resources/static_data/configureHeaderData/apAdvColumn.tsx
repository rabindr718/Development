import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const ApAdvColumn: Column[] = [
  {
    name: 'unique_id',
    displayName: 'Unique ID',
    type: 'string',
    isCheckbox: true,
  },
  { name: 'payee', displayName: 'Payee', type: 'string', isCheckbox: false },
  {
    name: 'Amount_ovrd',
    displayName: 'Amount Ovrd',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'approved_by',
    displayName: 'approved_by',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'Date',
    displayName: 'Date',
    type: 'date',
    isCheckbox: false,
  },
  {
    name: 'notes',
    displayName: 'Notes',
    type: 'string',
    isCheckbox: false,
  },
];
