import React from "react";

function ShopPortfolio({ portfolios }) {
  return (
    <div className="m-5">
      <p className="mb-1 pt-3 text-lg font-semibold">포트폴리오</p>
      <div className="grid grid-cols-3 gap-2">
        {portfolios.map((portfolio, index) => (
          <div key={index}>
            <img className="h-28 w-28 rounded-md object-cover" src={portfolio} alt={`포트폴리오 이미지 ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPortfolio;
