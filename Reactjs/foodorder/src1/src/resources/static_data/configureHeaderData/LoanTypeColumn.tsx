import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const LoanTypeColumns: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },

  {
    name: 'product_code',
    displayName: 'Product Code',
    type: 'string',
    isCheckbox: true,
  },
  { name: 'active', displayName: 'Active', type: 'string', isCheckbox: false },
  { name: 'adder', displayName: 'Adder', type: 'number', isCheckbox: false },
  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },
];
