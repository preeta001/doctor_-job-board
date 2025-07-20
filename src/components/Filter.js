import React from "react";

const Filter = ({ section, activeFilters, setActiveFilters }) => {
  const handleChange = (value) => {
    const currentValues = activeFilters[section.id] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    setActiveFilters({
      ...activeFilters,
      [section.id]: newValues,
    });
  };

  return (
    <div>
      {section.options.map((option) => (
        <label key={option.value}>
          <input
            type="checkbox"
            checked={
              activeFilters[section.id]
                ? activeFilters[section.id].includes(option.value)
                : false
            }
            onChange={() => handleChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Filter;
