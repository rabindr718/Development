import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const RepPaySettingsColumns: Column[] = [
  { name: 'name', displayName: 'Name', type: 'string', isCheckbox: true },
  { name: 'state', displayName: 'State', type: 'string', isCheckbox: false },
  {
    name: 'pay_scale',
    displayName: 'Pay Scale',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'position',
    displayName: 'Position',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'b_e', displayName: 'BE', type: 'boolean', isCheckbox: false },
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
