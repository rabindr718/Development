import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const RepIncentColumn: Column[] = [
  {
    name: 'name',
    displayName: 'Name',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'doll_div_kw',
    displayName: 'Kw Deduction',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'month',
    displayName: 'Month',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'comment',
    displayName: 'Comment',
    type: 'string',
    isCheckbox: false,
  },
];
