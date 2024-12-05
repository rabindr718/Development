import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const SsOnboardingColumn: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },
  {
    name: 'ss_onboarding_id',
    displayName: 'Unique id',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'ss_first_name',
    displayName: 'First Name',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'ss_last_name',
    displayName: 'Last Name',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'ss_email',
    displayName: 'E-mail',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'ss_phone',
    displayName: 'Phone No',
    type: 'date',
    isCheckbox: false,
  },
  {
    name: 'base_location_address',
    displayName: 'Address',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'base_location_state',
    displayName: 'State',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'base_location_zip_code',
    displayName: 'Zip Code',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'base_location_timezone',
    displayName: 'Timezone',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'work_start_time',
    displayName: 'Start Time',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'work_end_time',
    displayName: 'End Time',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'radius_of_service',
    displayName: 'Service Radius',
    type: 'string',
    isCheckbox: false,
  },
];
