import { Column } from '../../../core/models/data_models/FilterSelectModel';
export const ApPdaColumn: Column[] = [
  {
    name: 'unique_id',
    displayName: 'Unique ID',
    type: 'string',
    isCheckbox: true,
  },
  { name: 'payee', displayName: 'Payee', type: 'string', isCheckbox: false },
  {
    name: 'amount_ovrd',
    displayName: 'Amount Ovrd',
    type: 'number',
    isCheckbox: false,
  },

  {
    name: 'approved_by',
    displayName: 'Approved By',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'date',
    displayName: 'Date',
    type: 'date',
    isCheckbox: false,
  },
  {
    name: 'customer',
    displayName: 'Customer',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'dealer',
    displayName: 'Dealer',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'notes',
    displayName: 'Notes',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },
];
