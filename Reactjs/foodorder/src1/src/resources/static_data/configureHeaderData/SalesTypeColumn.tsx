import { Column } from '../../../core/models/data_models/FilterSelectModel';
export const SalesTypeColumn: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },

  { name: 'type_name', displayName: 'Name', type: 'string', isCheckbox: true },
  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },
];
