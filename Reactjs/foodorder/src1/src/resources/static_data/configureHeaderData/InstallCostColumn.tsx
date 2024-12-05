import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const InstallCostColumns: Column[] = [
  { name: 'cost', displayName: 'Cost', type: 'number', isCheckbox: true },
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
