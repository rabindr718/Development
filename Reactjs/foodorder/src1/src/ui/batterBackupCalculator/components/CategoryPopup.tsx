import React, { SetStateAction, useEffect, useState } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { PiCircle } from 'react-icons/pi';
interface IPopPupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isSelected: number;
  setBattery: React.Dispatch<
    React.SetStateAction<
      {
        category: { name: string; ampere: number };
        amp: string;
        note: string;
      }[]
    >
  >;
  battery: {
    category: { name: string; ampere: number };
    amp: string;
    note: string;
  }[];
  lightHouseAmpSize: number;
}
const CategoryPopup = ({
  isOpen,
  setIsOpen,
  isSelected,
  setBattery,
  battery,
}: IPopPupProps) => {
  const categories = [
    { name: 'Microwave', ampere: 6 },
    { name: 'Dishwasher', ampere: 4 },
    { name: 'Garbage Disposal', ampere: 3 },
    { name: 'Refrigerator', ampere: 6 },
    { name: 'Water heater (Tank)', ampere: 23 },
    { name: 'Water heater (Tankless)', ampere: 55 },
    { name: 'Air Handler', ampere: 8 },
    { name: 'Range', ampere: 21 },
    { name: 'Single Oven', ampere: 10 },
    { name: 'Double Oven', ampere: 30 },
    { name: 'Stovetop', ampere: 15 },
    { name: 'AC Unit', ampere: 35 },
    { name: 'Electric Furnace', ampere: 65 },
    { name: 'Mini Split', ampere: 15 },
    {
      name: 'Dryer',
      ampere: 24,
    },
    {
      name: 'Washing Machine',
      ampere: 13,
    },
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const elm = e.target as HTMLElement;
      if (
        !elm.closest('.category-container') &&
        !elm.closest('.category-btn')
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);
  const handleClick = (item: { name: string; ampere: number }) => {
    setIsOpen(false);
    setBattery((prev) => {
      const init = [...prev];
      init[isSelected].category = {
        ...item,
        name: item.name.toLocaleLowerCase(),
      };
      return init;
    });
  };
  return (
    <div
      style={{
        transition: 'all .5s',
        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
      }}
      className="transparent-model items-end "
    >
      <div className="scrollbar category-container ">
        <div className=" category-popup-header ">
          <span>Select Category</span>
        </div>

        <div className=" categories-container">
          {categories.map((item, ind) => {
            return (
              <div
                key={ind}
                onClick={() => handleClick(item)}
                className="flex mb2 pr2 pointer items-center justify-between"
              >
                <div className="flex items-center ">
                  {battery[isSelected] &&
                  battery[isSelected].category.name ===
                    item.name.toLocaleLowerCase() ? (
                    <IoCheckmarkCircle color="#129537" size={20} className="" />
                  ) : (
                    <PiCircle color="#A2A2A2" size={20} />
                  )}
                  <span className="ml2"> {item.name} </span>
                </div>
                <span>{item.ampere} AMP</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPopup;
