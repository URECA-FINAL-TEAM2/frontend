import React, { useState } from "react";

const CustomerQuote = () => {
  const [activeSection, setActiveSection] = useState("section1");

  const renderContent = () => {
    switch (activeSection) {
      case "section1":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold">Section 1 Content</h2>
            <p>This is the content for the first section.</p>
          </div>
        );
      case "section2":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold">Section 2 Content</h2>
            <p>This is the content for the second section.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Menu Bar */}
      <div className="flex h-[30px] border-b">
        <button
          onClick={() => setActiveSection("section1")}
          className={`flex-1 ${activeSection === "section1" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"} transition-colors`}
        >
          견적 받는 중
        </button>
        <button
          onClick={() => setActiveSection("section2")}
          className={`flex-1 ${activeSection === "section2" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"} transition-colors`}
        >
          1:1 맞춤 견적
        </button>
      </div>

      {/* Content Area */}
      <div>{renderContent()}</div>
    </div>
  );
};

export default CustomerQuote;
