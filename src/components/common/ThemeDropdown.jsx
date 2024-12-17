import { useEffect, useRef } from "react";

const ThemeDropdown = ({ status, isOpen, setIsOpen, themeItems }) => {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative -mb-2 mt-1 inline-block w-32 px-5 pt-2 text-left">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-32 justify-between rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-main-300 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        {status}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="-mr-1 ml-2 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 z-50 mx-5 mt-1 w-[calc(100%)] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
            {themeItems.map((item, index) => (
              <a
                key={index}
                onClick={item.onClick}
                className="flex cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-main-100"
                role="menuitem"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;
