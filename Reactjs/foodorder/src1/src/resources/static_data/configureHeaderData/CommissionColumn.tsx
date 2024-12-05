import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const Commissioncolumns: Column[] = [
  { name: 'partner', displayName: 'Partner', type: 'string', isCheckbox: true },
  {
    name: 'installer',
    displayName: 'Installer',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'state', displayName: 'State', type: 'string', isCheckbox: false },
  {
    name: 'sale_type',
    displayName: 'Sale Type',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'sale_price',
    displayName: 'Sale Price',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'rep_type',
    displayName: 'Rep Type',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'rl', displayName: 'RL', type: 'number', isCheckbox: false },
  { name: 'rate', displayName: 'Rate', type: 'number', isCheckbox: false },
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
