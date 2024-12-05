import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const MarketingFeesColumn: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },
  { name: 'source', displayName: 'Source', type: 'string', isCheckbox: true },
  { name: 'dba', displayName: 'DBA', type: 'string', isCheckbox: false },
  { name: 'state', displayName: 'State', type: 'string', isCheckbox: false },
  {
    name: 'fee_rate',
    displayName: 'Fee Rate',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'chg_dlr',
    displayName: 'Chg Dlr',
    type: 'boolean',
    isCheckbox: false,
  },
  {
    name: 'pay_src',
    displayName: 'Pay Src',
    type: 'boolean',
    isCheckbox: false,
  },
  {
    name: 'description',
    displayName: 'Description',
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
