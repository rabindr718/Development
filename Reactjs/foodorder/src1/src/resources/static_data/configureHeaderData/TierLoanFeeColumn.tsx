import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const TierLoanColumn: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },

  {
    name: 'dealer_tier',
    displayName: 'Dealer Tier',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'installer',
    displayName: 'Installer',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'state', displayName: 'State', type: 'string', isCheckbox: false },
  {
    name: 'loan_type',
    displayName: 'Loan Type',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'owe_cost',
    displayName: 'OWE Cost',
    type: 'number',
    isCheckbox: false,
  },
  { name: 'dlr_mu', displayName: 'DLR MU', type: 'number', isCheckbox: false },
  {
    name: 'dlr_cost',
    displayName: 'DLR Cost',
    type: 'number',
    isCheckbox: false,
  },
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
