import { Column } from '../../../core/models/data_models/FilterSelectModel';
export const ARColumns: Column[] = [
  {
    name: 'unique_id',
    displayName: 'Unique ID',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'customer_name',
    displayName: 'Customer Name',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'state_name',
    displayName: 'State',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'date', displayName: 'Date', type: 'date', isCheckbox: false },
  { name: 'amount', displayName: 'Amount', type: 'number', isCheckbox: false },
  {
    name: 'payment_type',
    displayName: 'Payment Type',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'bank', displayName: 'Bank', type: 'string', isCheckbox: false },
  { name: 'ced', displayName: 'CED', type: 'date', isCheckbox: false },
  {
    name: 'partner_name',
    displayName: 'Partner',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'total_paid',
    displayName: 'Total Paid',
    type: 'number',
    isCheckbox: false,
  },
];
