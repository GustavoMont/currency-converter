import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "../icons";
import Option from "../styles/Option";
import SelectCurrency from "../styles/SelectCurrency";

function Select({
  list,
  isFinalCurrency,
  activeOption: outActiveOption,
  onSelect,
}) {
  const [isActive, setIsActive] = useState(false);
  const [activeOption, setActiveOption] = useState(list[0] || outActiveOption);
  const selectRef = useRef(null);

  function closeDropdown(e) {
    if (e.target !== selectRef.current) {
      setIsActive(false);
    }
  }
  useEffect(() => {
    document.body.addEventListener("click", closeDropdown);

    return () => {
      setIsActive(false);
    };
  }, []);

  return (
    <SelectCurrency
      isActive={isActive}
      onClick={() => setIsActive(!isActive)}
      isFinalCurrency={isFinalCurrency}
    >
      <div data-testid="select" className="active-option" ref={selectRef}>
        <div>{outActiveOption || activeOption}</div>
        <div className="icon">
          <ChevronDownIcon />
        </div>
      </div>

      <div className="options-container">
        {list
          .filter((item) => activeOption !== item)
          .map((item) => (
            <Option
              role={"option"}
              key={item}
              onClick={() => {
                if (onSelect) {
                  onSelect(item);
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
