import React, { useEffect, useState } from 'react';
import { ReactComponent as CROSS_BUTTON } from '../../../../resources/assets/cross_button.svg';
import { ICONS } from '../../../../resources/icons/Icons';
import { FaArrowDown } from 'react-icons/fa6';
import CheckBox from '../../../components/chekbox/CheckBox';
import { ActionButton } from '../../../components/button/ActionButton';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

interface ButtonProps {
  setSelectTable: React.Dispatch<React.SetStateAction<boolean>>;
  setTablePermissions: React.Dispatch<React.SetStateAction<any>>;
  tablePermissions: any;
  selected: Set<number>;
  setSelected: React.Dispatch<React.SetStateAction<Set<number>>>;
}
const SelectTable: React.FC<ButtonProps> = ({
  setSelectTable,
  setTablePermissions,
  tablePermissions,
  setSelected,
  selected,
}) => {
  const dispatch = useAppDispatch();
  const { option } = useAppSelector((state) => state.dataTableSlice);
  const [sortType, setSortType] = useState('asc');
  function handleOptionChange(type: string, table: string, ind: number) {
    if (selected.has(ind)) {
      setTablePermissions((permissions: any) => {
        return {
          ...permissions,
          [table]: type,
        };
      });
    }
  }
  const [tables, setTables] = useState(() =>
    option.map((option: { table_name: string }) => option.table_name)
  );
  const handleSort = () => {
    console.log('woringgg');

    if (sortType === 'asc') {
      setSortType('desc');
      const table = tables.sort((a: string, b: string) => b.localeCompare(a));
      setTables(table);
    } else {
      setSortType('asc');
      const table = tables.sort((a: string, b: string) => a.localeCompare(b));
      setTables(table);
    }
  };

  console.log(tablePermissions, 'permission', tables);

  return (
    <>
      <div className="transparent-model">
        <div className="modal" style={{ height: 'auto' }}>
          <div
            className="createUserCrossButton"
            onClick={() => {
              setSelectTable(false);
              // setSelected(new Set())
              // setTablePermissions({})
            }}
          >
            <CROSS_BUTTON />
          </div>
          <div className="selectTable-section">
            <p> Section Table</p>
          </div>

          <div
            className="TableContainer"
            style={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              height: 'auto',
              maxHeight: 417,
            }}
          >
            <table>
              <thead>
                <tr>
                  <th>
                    <div>
                      <CheckBox
                        checked={tables.length === selected.size}
                        onChange={() => {
                          const set = new Set(Array.from(selected));
                          if (set.size === tables.length) {
                            set.clear();
                            setSelected(set);
                            setTablePermissions({});
                          } else {
                            const newSet = new Set(
                              Array.from(Array(tables.length).keys())
                            );
                            setSelected(newSet);
                          }
                        }}
                      />
                    </div>
                  </th>

                  <th>
                    <div
                      onClick={handleSort}
                      className="table-header"
                      style={{ cursor: 'pointer' }}
                    >
                      <p>Table Name</p>
                      {sortType === 'asc' ? (
                        <FaArrowDown style={{ color: '#667085' }} />
                      ) : (
                        <FaArrowDown style={{ color: '#667085' }} />
                      )}
                    </div>
                  </th>
                  <th>
                    <div className="table-header">
                      <p>View</p>
                    </div>
                  </th>
                  <th>
                    <div className="table-header">
                      <p>Edit</p>
                    </div>
                  </th>
                  <th>
                    <div className="table-header">
                      <p>Full</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tables.map((table: string, ind: number) => (
                  <tr key={ind}>
                    <td>
                      <div>
                        <CheckBox
                          checked={selected.has(ind)}
                          onChange={() => {
                            const set = new Set(Array.from(selected));
                            if (set.has(ind)) {
                              set.delete(ind);
                              const permissons = { ...tablePermissions };
                              if (table in permissons) {
                                delete permissons[table];
                                setTablePermissions(permissons);
                              }
                            } else {
                              set.add(ind);
                            }
                            setSelected(set);
                          }}
                        />
                      </div>
                    </td>

                    <td style={{ fontWeight: '500', color: 'black' }}>
                      {table}
                    </td>
                    <td>
                      <div className="radio-container">
                        <div className="radio-content">
                          <input
                            type="radio"
                            className="user-radio"
                            disabled={!selected.has(ind)}
                            checked={tablePermissions[table] === 'View'}
                            onChange={(e) =>
                              handleOptionChange('View', table, ind)
                            }
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="radio-container">
                        <div className="radio-content">
                          <input
                            type="radio"
                            className="user-radio"
                            disabled={!selected.has(ind)}
                            checked={tablePermissions[table] === 'Edit'}
                            onChange={(e) =>
                              handleOptionChange('Edit', table, ind)
                            }
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="radio-container">
                        <div className="radio-content">
                          <input
                            type="radio"
                            className="user-radio"
                            disabled={!selected.has(ind)}
                            // value={"1"}
                            checked={tablePermissions[table] === 'Full'}
                            onChange={(e) =>
                              handleOptionChange('Full', table, ind)
                            }
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingBlock: '1rem',
            }}
          >
            <ActionButton
              type="submit"
              title="Done"
              onClick={() => setSelectTable(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectTable;
