export interface FilterModel {
  Column: string;
  Operation: string;
  Data: string;
}
export interface Column {
  name: string;
  displayName: string;
  type: string;
  isCheckbox: boolean;
}

export interface optionOperation {
  value: string;
  label: string;
}
export const getOperationsForColumnType = (columnType: string) => {
  const options: optionOperation[] = [];
  if (columnType === 'string') {
    options.push({ value: 'eqs', label: 'Equals To' });
    options.push({ value: 'stw', label: 'Start With' });
    options.push({ value: 'edw', label: 'End With' });
    options.push({ value: 'cont', label: 'Contains' });
  }
  if (columnType === 'number') {
    options.push({ value: 'eqs', label: 'Equals' });
    options.push({ value: 'grt', label: 'Greater Than' });
    options.push({ value: 'grteqs', label: 'Greater Than Equals To' });
    options.push({ value: 'lst', label: 'Less Than' });
    options.push({ value: 'lsteqs', label: 'Less Than Equals To' });
  }
  if (columnType === 'date') {
    options.push({ value: 'eqs', label: 'On' });
    options.push({ value: 'grt', label: 'After' });
    options.push({ value: 'grteqs', label: 'On an After' });
    options.push({ value: 'lst', label: 'Before' });
    options.push({ value: 'lsteqs', label: 'On and Before' });
  }
  if (columnType === 'boolean') {
    options.push({ value: 'eqs', label: 'Equals' });
  }
  return options;
};

export const getLabelForOperation = (value: string) => {
  switch (value) {
    case 'eqs':
      return 'Equals' || 'On';
    case 'stw':
      return 'Start With';
    case 'edw':
      return 'End With';
    case 'cont':
      return 'Contains';
    case 'grt':
      return 'Greater Than' || 'After';
    case 'grteqs':
      return 'Greater Than Equals To' || 'On and After';
    case 'lst':
      return 'Less Than' || 'Before';
    case 'lsteqs':
      return 'Less Than Equals To' || 'On and Before';

    default:
      return value;
  }
};
