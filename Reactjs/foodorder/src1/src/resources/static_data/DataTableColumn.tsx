import { Column } from '../../core/models/data_models/FilterSelectModel';

export const DataTableColumn: Column[] = [
  { name: 'col1', displayName: 'Column1', type: 'string', isCheckbox: true },
  { name: 'col2', displayName: 'Column2', type: 'string', isCheckbox: false },
  { name: 'col3', displayName: 'Column3', type: 'string', isCheckbox: false },
  { name: 'col4', displayName: 'Column4', type: 'string', isCheckbox: false },
  { name: 'col5', displayName: 'Column5', type: 'number', isCheckbox: false },
  { name: 'col6', displayName: 'Column6', type: 'number', isCheckbox: false },
  { name: 'col7', displayName: 'Column7', type: 'number', isCheckbox: false },
];
