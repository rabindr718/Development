import { IoAddSharp } from 'react-icons/io5';
// import "../commissionRate/Filter.css";
import Input from '../../../components/text_input/Input';
import { ActionButton } from '../../../components/button/ActionButton';
import { useAppDispatch } from '../../../../redux/hooks';
import { ICONS } from '../../../../resources/icons/Icons';
import { useState } from 'react';
import { fetchData } from '../../../../redux/apiSlice/configSlice/config_get_slice/dataslice';
import SelectOption from '../../../components/selectOption/SelectOption';
import OperationSelect from '../../../components/FilterModal/OperationSelect';

interface Column {
  name: string;
  displayName: string;
  type: string;
}
interface TableProps {
  handleClose: () => void;
  columns: Column[];
  page_number: number;
  page_size: number;
}
interface FilterModel {
  Column: string;
  Operation: string;
  Data: string;
}
interface Option {
  value: string;
  label: string;
}

interface ErrorState {
  [key: string]: string;
}
// Filter component
const FilterData: React.FC<TableProps> = ({
  handleClose,
  columns,
  page_number,
  page_size,
}) => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<FilterModel[]>([
    { Column: '', Operation: '', Data: '' },
  ]);
  const [errors, setErrors] = useState<ErrorState>({});
  const options: Option[] = columns.map((column) => ({
    value: column.name,
    label: column.displayName,
  }));

  const handleAddRow = () => {
    setFilters([...filters, { Column: '', Operation: '', Data: '' }]);
    setErrors({});
  };

  const handleRemoveRow = (index: number) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const handleChange = (
    index: number,
    field: keyof FilterModel,
    value: any
  ) => {
    const newRules = [...filters];
    newRules[index][field] = value;
    newRules[index].Data = '';
    setFilters(newRules);
  };

  const handleDataChange = (index: number, value: string) => {
    const newFilters = [...filters];
    if (
      newFilters[index].Column === 'col5' ||
      newFilters[index].Column === 'col6'
    ) {
      value = value.replace(/^(\.)(\d+)/, '0$1$2');
    }
    newFilters[index].Data = value;
    setFilters(newFilters);
  };
  const getInputType = (columnName: string) => {
    if (
      columnName === 'col5' ||
      columnName === 'col6' ||
      columnName === 'col7'
    ) {
      return 'number';
    } else {
      return 'text';
    }
  };

  const applyFilter = async () => {
    setErrors({});
    if (
      filters.some((filter) => !filter.Column || filter.Column === 'Select')
    ) {
      console.log(
        "Column not selected or 'Select' chosen. Skipping validation and API call."
      );
      return;
    }
    // Perform validation
    const newErrors: ErrorState = {};

    filters.forEach((filter, index) => {
      if (!filter.Operation) {
        newErrors[`operation${index}`] = `Please provide Operation`;
      }
      if (!filter.Data) {
        newErrors[`data${index}`] = `Please provide Data`;
      }
    });

    // Update state with new errors
    setErrors(newErrors);

    // If no errors, proceed with API call
    if (Object.keys(newErrors).length === 0) {
      const formattedFilters = filters.map((filter) => ({
        Column: filter.Column,
        Operation: filter.Operation,
        Data: filter.Data,
      }));
      console.log(formattedFilters);
      const req = {
        page_number: page_number,
        page_size: page_size,
        filters: formattedFilters,
      };
      dispatch(fetchData(req));
    }
  };

  console.log(errors);
  return (
    <div className="transparent-model">
      <div className="filter-modal">
        <div className="createUserContainer">
          <div className="filter-section">
            <h3 className="createProfileText">Filter</h3>
            <div className="iconsSection2">
              <button
                type="button"
                style={{
                  color: 'black',
                  border: '1px solid #ACACAC',
                }}
                onClick={handleAddRow}
              >
                <IoAddSharp /> Add New
              </button>
            </div>
          </div>
          <div className="createProfileInputView">
            <div className="createProfileTextView">
              {filters?.map((filter, index) => (
                <div className="create-input-container" key={index}>
                  <div className="create-input-field">
                    <label className="inputLabel">Column Name</label>
                    <div className="">
                      <SelectOption
                        options={[
                          { value: 'Select', label: 'Select' },
                          ...options,
                        ]}
                        value={
                          options.find(
                            (option) => option.value === filter.Column
                          ) || undefined
                        }
                        onChange={(selectedOption: any) => {
                          handleChange(index, 'Column', selectedOption.value);
                          setErrors({ ...errors, [`column${index}`]: '' });
                        }}
                      />
                    </div>
                  </div>
                  <div className="create-input-field">
                    <label className="inputLabel">Operation</label>
                    <OperationSelect
                      options={options}
                      columnType={
                        columns.find((option) => option.name === filter.Column)
                          ?.type || ''
                      }
                      value={filter.Operation}
                      onChange={(value: any) => {
                        handleChange(index, 'Operation', value);
                        setErrors({ ...errors, [`operation${index}`]: '' });
                      }}
                      errors={errors}
                      index={index}
                    />
                  </div>

                  <div className="create-input-field">
                    <Input
                      type={getInputType(filter.Column)}
                      label="Data"
                      name="Data"
                      value={filter.Data}
                      onChange={(e) => {
                        handleDataChange(index, e.target.value);
                        setErrors({ ...errors, [`data${index}`]: '' });
                      }}
                      placeholder={'Enter'}
                    />
                    {errors[`data${index}`] && (
                      <span style={{ color: 'red', fontSize: '12px' }}>
                        {errors[`data${index}`]}
                      </span>
                    )}
                  </div>
                  <div
                    className="cross-btn"
                    onClick={() => handleRemoveRow(index)}
                  >
                    <img src={ICONS.cross} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="createUserActionButton">
            <div className="" style={{ gap: '2rem', display: 'flex' }}>
              <ActionButton
                title={'Apply'}
                type="submit"
                onClick={() => applyFilter()}
              />

              <ActionButton
                title={'cancel'}
                type="reset"
                onClick={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterData;
