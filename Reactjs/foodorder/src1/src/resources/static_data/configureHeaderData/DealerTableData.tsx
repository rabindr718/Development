import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const DealerTableData: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },
  {
    name: 'sub_dealer',
    displayName: 'Sub Dealer',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'dealer', displayName: 'Dealer', type: 'string', isCheckbox: false },
  {
    name: 'pay_rate',
    displayName: 'Pay Rate',
    type: 'number',
    isCheckbox: false,
  },
  { name: 'state', displayName: 'State', type: 'string', isCheckbox: false },
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
