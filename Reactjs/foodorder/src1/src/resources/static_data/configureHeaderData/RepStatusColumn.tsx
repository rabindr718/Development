import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const RepStatuscolumns: Column[] = [
  { name: 'name', displayName: 'Name', type: 'string', isCheckbox: true },
  { name: 'status', displayName: 'Status', type: 'string', isCheckbox: false },
];
