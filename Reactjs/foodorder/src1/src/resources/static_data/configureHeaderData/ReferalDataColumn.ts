import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const ReferalDataColumn: Column[] = [
  {
    name: 'unique_id',
    displayName: 'Unique Id',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'new_customer',
    displayName: 'New Customer',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'referrer_serial',
    displayName: 'Referrer Serial',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'referrer_name',
    displayName: 'Referrer Name',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'amount', displayName: 'Amount', type: 'number', isCheckbox: false },

  {
    name: 'rep_doll_divby_per',
    displayName: 'Rep $ / %',
    type: 'number',
    isCheckbox: false,
  },

  { name: 'notes', displayName: 'Notes', type: 'string', isCheckbox: false },
  {
    name: 'start_date',
    displayName: 'Start Date',
    type: 'date',
    isCheckbox: false,
  },
];
