import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import '../../oweHub/configure/configure.css';
import { toggleAllRows } from '../chekbox/checkHelper';
import CheckBox from '../chekbox/CheckBox';
interface SortableHeaderProps {
  titleName: string;
  sortKey: string;
  sortDirection?: 'asc' | 'desc';
  onClick: (key: string) => void;
  isCheckbox: boolean;
  selectAllChecked: boolean;
  selectedRows: Set<number>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>;
  setSelectAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
  isAnyRowSelected: boolean;
  isAllRowsSelected: boolean;
  data: any;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  titleName,
  sortKey,
  selectAllChecked,
  selectedRows,
  setSelectAllChecked,
  data,
  isAllRowsSelected,
  isAnyRowSelected,
  setSelectedRows,
  sortDirection,
  onClick,
  isCheckbox,
}) => {
  const handleClick = () => {
    onClick(sortKey);
  };

  return (
    <th>
      <div className="flex-check">
        {isCheckbox ? (
          <div>
            <CheckBox
              checked={data?.length ? isAllRowsSelected : false}
              onChange={() => {
                if (data?.length === 0) {
                  setSelectAllChecked(false);
                } else {
                  toggleAllRows(
                    selectedRows,
                    data,
                    setSelectedRows,
                    setSelectAllChecked
                  );
                }
              }}
              indeterminate={isAnyRowSelected && !isAllRowsSelected}
            />
          </div>
        ) : null}

        <div className="table-header" onClick={handleClick}>
          <p>{titleName}</p>{' '}
          {sortDirection !== 'desc' ? (
            <FaArrowDown className="arrow-icon-table" />
          ) : (
            <FaArrowUp className="arrow-icon-table" />
          )}
        </div>
      </div>
    </th>
  );
};
export default SortableHeader;
