import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const AdjustmentsColumns: Column[] = [
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
    name: 'partner_name',
    displayName: 'Partner',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'installer_name',
    displayName: 'Installer',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'state_name',
    displayName: 'State',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'sys_size',
    displayName: 'Sys. Size',
    type: 'number',
    isCheckbox: false,
  },
  { name: 'bl', displayName: 'BL', type: 'number', isCheckbox: false },
  { name: 'epc', displayName: 'Epc', type: 'number', isCheckbox: false },
  { name: 'date', displayName: 'Date', type: 'date', isCheckbox: false },
  { name: 'amount', displayName: 'Amount', type: 'number', isCheckbox: false },
  { name: 'notes', displayName: 'Notes', type: 'string', isCheckbox: false },
];
