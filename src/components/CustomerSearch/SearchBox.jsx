import React, { useState, useRef, useEffect } from "react";
import useShopStore from "../../store/shopStore";

function SearchBox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const { searchShops } = useShopStore();

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchShops(searchQuery);
  };

  const handleBlur = (e) => {
    // Check if the related target is the button
    // This prevents closing when clicking the search button
    if (e.relatedTarget !== buttonRef.current && !searchQuery) {
      setIsExpanded(false);
      searchShops(""); // Reset to original shops
    }
  };

  const toggleSearch = () => {
    if (isExpanded) {
      // If expanded, close it
      setIsExpanded(false);
      setSearchQuery("");
      searchShops(""); // Reset to original shops
    } else {
      // If not expanded, open it
      setIsExpanded(true);
    }
  };

  return (
    <div className="flex content-center justify-end py-3.5">
      <div className="relative">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <div className="relative">
            <input
              ref={inputRef}
              type="search"
              placeholder="매장명 • 주소 • 미용사 스킬을 검색하세요."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`absolute right-0 top-1/2 z-10 h-12 -translate-y-1/2 rounded-full border bg-white text-sm transition-all duration-300 ease-in-out ${
                isExpanded ? "w-80 cursor-text pl-5 pr-12 opacity-100" : "w-12 cursor-pointer pl-0 pr-0 opacity-0"
              } `}
              onFocus={() => setIsExpanded(true)}
              onBlur={handleBlur}
            />
            <button
              ref={buttonRef}
              type="button"
              onClick={toggleSearch}
              className="relative z-20 flex h-12 w-12 items-center justify-center rounded-full border bg-white hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBox;
