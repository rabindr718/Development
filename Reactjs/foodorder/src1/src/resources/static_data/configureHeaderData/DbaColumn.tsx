import { Column } from '../../../core/models/data_models/FilterSelectModel';
export const DbaColumn: Column[] = [
  {
    name: 'preferred_name',
    displayName: 'Preferred Name',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'dba',
    displayName: 'DBA',
    type: 'string',
    isCheckbox: false,
  },
];
