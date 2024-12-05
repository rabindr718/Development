import React, { useRef, useState } from 'react';
import Select, {
  CSSObjectWithLabel,
  MenuPosition,
  createFilter,
  DropdownIndicatorProps,
  SingleValueProps,
  GroupBase,
} from 'react-select';
import { FixedSizeList as List } from 'react-window';
import './drop.css';
 
interface Option {
  value: string;
  label: string;
}
 
interface Props {
  options: Option[];
  value: Option | undefined;
  onChange: (newValue: Option | null) => void;
  menuListStyles?: CSSObjectWithLabel;
  disabled?: boolean;
  controlStyles?: CSSObjectWithLabel;
  singleValueStyles?: CSSObjectWithLabel;
  valueContainerStyles?: CSSObjectWithLabel;
  menuStyles?: CSSObjectWithLabel;
  dropdownIndicatorStyles?: CSSObjectWithLabel;
  marginTop?: string | number;
  labelColor?: string;
  width?: string;
  placeholder?: string;
  menuWidth?: string;
  menuPosition?: MenuPosition | undefined;
  enableHoverEffect?: boolean;
  lazyRender?: boolean;
  optionStyles?: CSSObjectWithLabel;
}
 
const MenuList = ({ options, children, maxHeight, getValue }: any) => {
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * 36;
  if (!children?.length)
    return <span className="text-center block py2"> No Data Found </span>;
 
  return (
    <List
      height={maxHeight}
      itemCount={options.length}
      itemSize={50}
      className="scrollbar scrollable-view-children"
      width={'100%'}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => (
        <div style={style}>
          {
            // @ts-ignore
            children[index]
          }
        </div>
      )}
    </List>
  );
};
 
const ReportsSelectOption: React.FC<Props> = ({
  options,
  value,
  onChange,
  menuListStyles = {},
  disabled = false,
  controlStyles = {},
  singleValueStyles = {},
  valueContainerStyles = {},
  menuStyles = {},
  dropdownIndicatorStyles = {},
  marginTop = '25px',
  width,
  labelColor,
  placeholder,
  menuWidth,
  menuPosition = 'absolute',
  enableHoverEffect = true,
  lazyRender = false,
  optionStyles,
}) => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
 
  return (
    <div
      className="select-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Select
        options={options}
        isSearchable
        menuPosition={menuPosition}
        filterOption={lazyRender ? createFilter({ ignoreAccents: false }) : undefined}
        onChange={onChange}
        components={lazyRender ? { MenuList } : undefined}
        placeholder={placeholder || 'Select'}
        ref={scrollRef}
        value={value || { label: placeholder || 'Select', value: '' }}
        isDisabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            marginTop: marginTop,
            borderRadius: '8px',
            outline: 'none',
            fontSize: '13px',
            height: '2.25rem',
            cursor: 'pointer',
            boxShadow: 'none',
            width: width || baseStyles.width,
            ...controlStyles,
            transition: 'border-color 0.3s ease',
            border: (isHovered || state.isFocused) ? '1px solid #377CF6' : '1px solid #292B2E',
            '&:hover': enableHoverEffect
              ? {
                border: '1px solid #377CF6',
              }
              : {},
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: '12px',
            cursor: 'pointer',
            borderRadius: "2px",
            background: state.isSelected ? '#377CF6' : '#fff',
            color: labelColor || baseStyles.color,
            '&:hover': {
              background: state.isSelected ? '#377CF6' : '#DDEBFF',
            },
            ...optionStyles,
          }),
          menu: (base) => ({
            ...base,
            zIndex: 99,
            ...menuStyles,
            width: menuWidth || base.width,
            border: "1px solid #292B2E",
            boxShadow: "0px 4px 10px rgba(43, 42, 42, 0.3)",
            borderRadius: "8px",
          }),
          menuList: (base) => ({
            ...base,
            '&::-webkit-scrollbar': {
              scrollbarWidth: 'thin',
              scrollBehavior: 'smooth',
              display: 'block',
              scrollbarColor: 'rgb(173, 173, 173) #fff',
              width: 8,
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgb(173, 173, 173)',
              borderRadius: '30px',
            },
            ...menuListStyles,
          }),
          singleValue: (base: any, { data }: SingleValueProps<Option, false, GroupBase<Option>>) => ({
            ...base,
            color: isFocused || isHovered ? '#377CF6' : (value ? undefined : '#292B2E'),
            ...singleValueStyles,
          }),
          valueContainer: (base) => ({
            ...base,
            ...valueContainerStyles,
          }),
          dropdownIndicator: (base: CSSObjectWithLabel, { isFocused }: DropdownIndicatorProps<Option, false>) => ({
            ...base,
            color: (isHovered || isFocused) ? '#377CF6' : "#292B2E",
            ...dropdownIndicatorStyles,
            '& svg': {
              fill: (isHovered || isFocused) ? '#377CF6' : "#292B2E",
            },
          }),
          placeholder: (base) => ({
            ...base,
            color: isHovered ? '#377CF6' : '#8b8484',
          }),
        }}
      />
    </div>
  );
};
 
export default ReportsSelectOption;