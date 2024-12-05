import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const LoanFeesColumn: Column[] = [
  { name: 'dealer', displayName: 'Dealer', type: 'string', isCheckbox: true },
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
    displayName: 'Owe Cost',
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
