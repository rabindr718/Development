import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const NonCommDlrColumn: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },
  {
    name: 'unique_id',
    displayName: 'Unique ID',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'customer',
    displayName: 'Customer',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'dealer_name',
    displayName: 'Dealer Code',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'dealer_dba',
    displayName: 'Dealer DBA',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'exact_amount',
    displayName: 'Exact Amt.',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'balance',
    displayName: 'Balance',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'approved_by',
    displayName: 'Approved By',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'notes', displayName: 'Notes', type: 'string', isCheckbox: false },
  {
    name: 'paid_amount',
    displayName: 'Paid Amount',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'date',
    displayName: 'Date',
    type: 'date',
    isCheckbox: false,
  },
];
