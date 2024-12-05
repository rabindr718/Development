import { Column } from '../../../core/models/data_models/FilterSelectModel';
export const AdderDataColumn: Column[] = [
  {
    name: 'unique_id',
    displayName: 'Unique ID',
    type: 'string',
    isCheckbox: true,
  },
  { name: 'date', displayName: 'Date', type: 'date', isCheckbox: false },
  { name: 'gc', displayName: 'GC', type: 'string', isCheckbox: false },
  {
    name: 'exact_amount',
    displayName: 'Exact Amt',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'per_kw_amt',
    displayName: 'Per Kw Amt',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'rep_percent',
    displayName: 'Rep $ / %',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'notes', displayName: 'Notes', type: 'string', isCheckbox: false },
  {
    name: 'type_ad_mktg',
    displayName: 'Type ad mktg',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'sys_size',
    displayName: 'Sys Size',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'adder_cal',
    displayName: 'Adder Calc',
    type: 'number',
    isCheckbox: false,
  },
];
