import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const DealerCreditColumn: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },
  {
    name: 'unique_id',
    displayName: 'Unique ID',
    type: 'string',
    isCheckbox: false,
  },
 
  {
    name: 'customer',
    displayName: 'Customer',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'credit_amount',
    displayName: 'Credit Amt',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'credit_date',
    displayName: 'Credit Date',
    type: 'date',
    isCheckbox: false,
  },

  {
    name: 'approved_by',
    displayName: 'Approved By',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'notes', displayName: 'Notes', type: 'string', isCheckbox: false },
  // { name: 'podio', displayName: 'Podio Link', type: 'string', isCheckbox: false },
 
];
