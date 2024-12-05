import { Column } from '../../../core/models/data_models/FilterSelectModel';
export const ApDedColumn: Column[] = [
  {
    name: 'unique_id',
    displayName: 'Unique ID',
    type: 'string',
    isCheckbox: true,
  },
  { name: 'payee', displayName: 'Payee', type: 'string', isCheckbox: false },
  {
    name: 'amount',
    displayName: 'Amount',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'date',
    displayName: 'Date',
    type: 'date',
    isCheckbox: false,
  },
  {
    name: 'short_code',
    displayName: 'Short Code',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'dealer',
    displayName: 'Dealer',
    type: 'string',
    isCheckbox: false,
  },
];
