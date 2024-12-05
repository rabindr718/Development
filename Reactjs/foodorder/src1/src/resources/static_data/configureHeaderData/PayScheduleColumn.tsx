import { Column } from '../../../core/models/data_models/FilterSelectModel';
// Rl            float64 `json:"rl"`
// 	Draw          float64 `json:"draw"`
// 	DrawMax       float64 `json:"draw_max"`
// 	RepDraw       float64 `json:"rep_draw"`
// 	RepDrawMax    float64 `json:"rep_draw_max"`
export const PayScheduleColumns: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },

  { name: 'dealer', displayName: 'Dealer', type: 'string', isCheckbox: true },
  {
    name: 'partner_name',
    displayName: 'Partner Name',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'installer_name',
    displayName: 'Installer Name',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'sale_type',
    displayName: 'Sale Type',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'state', displayName: 'State', type: 'string', isCheckbox: false },
  { name: 'rl', displayName: 'Rate List', type: 'number', isCheckbox: false },
  { name: 'draw', displayName: 'Draw', type: 'number', isCheckbox: false },
  {
    name: 'draw_max',
    displayName: 'Draw Max',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'rep_draw',
    displayName: 'Rep Draw',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'rep_draw_max',
    displayName: 'Rep Draw Max',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'rep_pay',
    displayName: 'Rep Pay',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'commission_model',
    displayName: 'Commission Model',
    type: 'string',
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
