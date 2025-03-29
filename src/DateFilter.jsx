import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";

const options = {
  year: "numeric",
};

const DateFilter = ({ selectedDate, onSelect, selectedColor, icon: Icon }) => {
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [choosenValue, setChoosenValue] = useState();

  useEffect(() => {
    if (selectedDate) {
      setChoosenValue(
        new Date(selectedDate).toLocaleDateString(undefined, options)
      );
    }
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectDate = ({ year, value }) => {
    setChoosenValue(year);
    onSelect({ year, value });
    setIsOpen(false);
  };

  // Custom Render for year Content
  const renderYearContent = (year) => {
    const tooltipText = `${year}`;
    return <span title={tooltipText}>{year}</span>;
  };

  return (
    <div className="relative z-30">
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="border-2 rounded-full text-gray-600 py-2 px-6 flex w-58 items-center gap-2 bg-white"
      >
        <span>
          <Icon />
        </span>
        {choosenValue || "Select Date"}
      </button>

      {isOpen && (
        <div
          ref={modalRef}
          className="absolute right-0 mt-1 bg-white border rounded shadow-lg p-4 flex"
        >
          <div
            className={`opacity-100
              
            `}
          >
            <DatePicker
              inline
              selected={selectedDate}
              onChange={(dates) => {
                const choosenString = new Date(dates).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                  }
                );
                handleSelectDate({
                  year: choosenString,
                  value: dates,
                });
              }}
              renderYearContent={renderYearContent}
              showYearPicker
              dateFormat="yyyy"
              calendarClassName="custom-year-picker" // Apply custom styles
            />
          </div>
        </div>
      )}

      <style>{`
      .custom-year-picker .react-datepicker__year-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Ensures 3 columns */
  gap: 12px; /* Adds spacing between columns */
  width: 100%; /* Ensure it takes the full width */
  max-width: 300px; /* Adjust as needed */
}

.custom-year-picker .react-datepicker__year-text {
  width: auto; /* Allow flexibility */
  text-align: center;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.custom-year-picker .react-datepicker__year-text:hover {
  background-color: #f3f4f6; /* Light gray hover effect */
}

.custom-year-picker .react-datepicker__year-text--selected {
  background-color: ${selectedColor} !important; /* Change to your desired color */
  color: #fff; /* Change text color to white for better contrast */
  font-weight: bold; /* Optional: Make the selected year bold */
  border-radius: 8px; /* Optional: Round corners */
}

.custom-year-picker .react-datepicker__year-text--selected:hover {
  background-color:  ${selectedColor} ; /* Darker shade for hover effect */
}

`}</style>
    </div>
  );
};

DateFilter.defaultProps = {
  selectedDate: new Date(), // Default to null if no startDate is provided
  onSelect: () => {}, // Prevents "onSelect is not a function" error
  selectedColor: "#9D55FF",
  icon: IoCalendarOutline,
};

export default DateFilter;
