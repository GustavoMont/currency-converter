import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "../icons";
import Option from "../styles/Option";
import SelectCurrency from "../styles/SelectCurrency";

function Select({ list, isFinalCurrency, firstElement, onSelect }) {
  const [isActive, setIsActive] = useState(false);
  const [activeOption, setActiveOption] = useState(firstElement || list[0]);
  const selectRef = useRef(null);

  function closeDropdown(e) {
    if (e.path[0] !== selectRef.current) {
      setIsActive(false);
    }
  }
  useEffect(() => {
    document.body.addEventListener("click", closeDropdown);
  }, []);

  return (
    <SelectCurrency
      isActive={isActive}
      onClick={() => setIsActive(!isActive)}
      isFinalCurrency={isFinalCurrency}
    >
      <div className="active-option" ref={selectRef}>
        <div>{activeOption}</div>
        <div className="icon">
          <ChevronDownIcon />
        </div>
      </div>

      <div className="options-container">
        {list
          .filter((item) => activeOption !== item)
          .map((item) => (
            <Option
              key={item}
              onClick={() => {
                if (onSelect) {
                  onSelect();
                }
                setActiveOption(item);
              }}
            >
              {item}
            </Option>
          ))}
      </div>
    </SelectCurrency>
  );
}

export default Select;