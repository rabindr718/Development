import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const AdderResponsibilityColumns: Column[] = [
  {
    name: 'pay_scale',
    displayName: 'Pay Scale',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'percentage',
    displayName: 'Percentage',
    type: 'number',
    isCheckbox: false,
  },
];
