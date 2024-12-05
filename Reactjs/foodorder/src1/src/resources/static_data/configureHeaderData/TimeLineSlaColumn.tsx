import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const TimeLineSlaColumns: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },
  {
    name: 'type_m2m',
    displayName: 'Type M2M',
    type: 'string',
    isCheckbox: true,
  },
  { name: 'state', displayName: 'State', type: 'string', isCheckbox: false },
  { name: 'days', displayName: 'Days', type: 'number', isCheckbox: false },
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
