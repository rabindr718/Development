import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const AdderVColumns: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },
  {
    name: 'adder_name',
    displayName: 'Adder Name',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'adder_type',
    displayName: 'Adder Type',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'price_amount',
    displayName: 'Price Amount',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'price_type',
    displayName: 'Price Type',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'active', displayName: 'Active', type: 'number', isCheckbox: false },
];
