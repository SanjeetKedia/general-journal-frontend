import { useEffect, useState } from "react";

const SearchInput = ({
  value,
  searchOptions,
  onChange,
  optionsToShow = 5,
}: {
  value: string;
  searchOptions: string[];
  onChange: (value: string) => void;
  optionsToShow?: number;
}) => {
  const [hidden, setHidden] = useState(true);
  const [sortedOptions, setSortedOptions] = useState<string[]>([]);

  useEffect(() => {
    const getSortedOptions = () => {
      const arr = searchOptions
        .filter((option) => option.toLowerCase().includes(value.toLowerCase()))
        .sort((a, b) => {
          const aIndex = a.toLowerCase().indexOf(value.toLowerCase());
          const bIndex = b.toLowerCase().indexOf(value.toLowerCase());

          // Prioritize options that start with the input value
          if (aIndex === 0 && bIndex !== 0) return -1;
          if (bIndex === 0 && aIndex !== 0) return 1;

          // If both start with the input value or neither does, sort alphabetically
          return a.localeCompare(b);
        });

      return arr.slice(0, optionsToShow);
    };

    const options = getSortedOptions();
    setSortedOptions(options);
  }, [optionsToShow, value, searchOptions]);

  const handleFocus = () => setHidden(false);

  // const handleBlur = () => {
  //   handleSelectOption(sortedOptions[0]);
  // };

  const handleSelectOption = (option: string) => {
    onChange(option);
    setHidden(true);
  };

  return (
    <div className="relative" onFocus={handleFocus}>
      <input
        className="bg-transparent w-full h-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hidden ? (
        ""
      ) : (
        <div className="absolute w-full ">
          {sortedOptions.map((option, i) => {
            return (
              <input
                className="bg-secondary border border-primary-foreground px-2 py-1 w-full cursor-pointer"
                readOnly
                key={i}
                value={option}
                onClick={() => handleSelectOption(option)}
                data-is-option={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
