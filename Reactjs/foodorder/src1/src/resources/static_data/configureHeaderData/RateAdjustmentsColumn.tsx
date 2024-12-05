import { Column } from '../../../core/models/data_models/FilterSelectModel';

// adjustment
// :
// "12345"
// max_rate
// :
// 123456
// min_rate
// :
// 12345
// pay_scale
// :
// "1011"
// position
// :
// "qa"
// record_id
// :
// 1
// unique_id
// :
// "PrAN0l"
export const RateAdjustmentsColumns: Column[] = [
  {
    name: 'pay_scale',
    displayName: 'Pay Scale',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'position',
    displayName: 'Position',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'adjustment',
    displayName: 'Adjustment',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'min_rate',
    displayName: 'Min Rate',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'max_rate',
    displayName: 'Max Rate',
    type: 'number',
    isCheckbox: false,
  },
];
