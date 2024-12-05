import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const DealerTierColumn: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },

  {
    name: 'dealer_name',
    displayName: 'Dealer Name',
    type: 'string',
    isCheckbox: true,
  },
  { name: 'tier', displayName: 'Tier', type: 'string', isCheckbox: false },
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
