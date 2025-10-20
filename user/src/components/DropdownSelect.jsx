import React from 'react';
import { FaCheck, FaChevronDown } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const DropdownSelect = ({ options, selectedOption, onSelect, label }) => {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="department" className="">{label}</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="px-4 py-2 rounded-md bg-white dark:bg-gray-100 text-black border relative min-w-[22ch] text-left flex items-center justify-between"
            type="button"
          >
            <span className="relative z-10">{selectedOption}</span>
            <FaChevronDown className="w-3 h-3 text-gray-500 dark:text-gray-400" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={4}
          className="bg-white dark:bg-gray-700 border border-orange-200 rounded-md mt-1 shadow-lg dark:border-gray-600"
        >
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              onSelect={() => onSelect(option)}
              className={`
                ${selectedOption === option
                  ? "bg-orange-600 text-white"
                  : "bg-white dark:bg-gray-700 text-black dark:text-white"
                }
                hover:bg-orange-200 dark:hover:bg-orange-500 
                px-4 py-2 rounded-md transition-colors duration-200 flex items-center justify-between
              `}
            >
              <span>{option}</span>
              {selectedOption === option && <FaCheck className="w-4 h-4 text-white ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownSelect;
