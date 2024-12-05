export const toggleRowSelection = (
  index: number,
  selectedRows: Set<number>,
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>,
  setSelectAllChecked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const newSelectedRows = new Set(selectedRows);
  if (newSelectedRows.has(index)) {
    newSelectedRows.delete(index);
  } else {
    newSelectedRows.add(index);
  }
  setSelectedRows(newSelectedRows);
  if (newSelectedRows.size === 0) {
    setSelectAllChecked(false);
  }
};

export const toggleAllRows = (
  selectedRows: Set<number>,
  data: any,
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>,
  setSelectAllChecked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (selectedRows.size === data.length) {
    setSelectedRows(new Set());
    setSelectAllChecked(false);
  } else {
    const allIndexes = new Set(Array.from(Array(data.length).keys()));
    setSelectedRows(allIndexes);
    setSelectAllChecked(true);
  }
};
