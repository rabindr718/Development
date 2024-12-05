import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const RepCreditcolumns: Column[] = [
  {
    name: 'unique_id',
    displayName: 'Unique Id',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'approved_by',
    displayName: 'Approved By',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'per_kw_amt',
    displayName: 'Per KW AMT',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'exact_amt',
    displayName: 'Exact AMT',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'notes',
    displayName: 'Notes',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'date',
    displayName: 'Date',
    type: 'date',
    isCheckbox: false,
  },
];
