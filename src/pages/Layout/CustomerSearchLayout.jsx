import React from "react";
import InteractiveMap from "../../components/Map/InteractiveMap";
import { Outlet } from "react-router-dom";

const CustomerSearchLayout = () => {
  return (
    <div className="relative h-[100vh] w-full">
      <div className="absolute inset-0 top-[var(--header-height)] z-0">
        <InteractiveMap />
      </div>
      <Outlet />
    </div>
  );
};

export default CustomerSearchLayout;
