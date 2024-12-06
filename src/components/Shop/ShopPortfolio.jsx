import React from "react";

function ShopPortfolio(props) {
  return (
    <div className="mx-5 my-3">
      <p className="mb-1 font-semibold">포트폴리오</p>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <img
            className="rounded-md object-cover"
            src="https://cdn.imweb.me/thumbnail/20230323/0420b4bad17e0.png"
          ></img>
        </div>
        <div>
          <img
            className="rounded-md object-cover"
            src="https://cdn.imweb.me/thumbnail/20230323/0420b4bad17e0.png"
          ></img>
        </div>
        <div>
          <img
            className="rounded-md object-cover"
            src="https://cdn.imweb.me/thumbnail/20230323/0420b4bad17e0.png"
          ></img>
        </div>
        <div>
          <img
            className="rounded-md object-cover"
            src="https://cdn.imweb.me/thumbnail/20230323/0420b4bad17e0.png"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default ShopPortfolio;
