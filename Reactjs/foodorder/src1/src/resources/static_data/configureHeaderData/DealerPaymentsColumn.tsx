import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const DealerPaymentsColumn: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },
  {
    name: 'unique_id',
    displayName: 'Unique id',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'customer',
    displayName: 'Customer',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'sales_partner',
    displayName: 'Sales Partner',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'type_of_payment',
    displayName: 'Type of Payment',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'payment_date',
    displayName: 'Payment Date',
    type: 'date',
    isCheckbox: false,
  },
  {
    name: 'payment_amount',
    displayName: 'Payment Amount',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'payment_method',
    displayName: 'Payment Method',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'transaction',
    displayName: 'Transaction',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'notes',
    displayName: 'Notes',
    type: 'string',
    isCheckbox: false,
  },
];
