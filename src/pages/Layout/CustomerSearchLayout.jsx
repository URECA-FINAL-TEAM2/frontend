import React from "react";
import InteractiveMap from "../../components/Map/InteractiveMap";
import { Outlet } from "react-router-dom";

// const CustomerSearchLayout = () => {
//   return (
//     <div className="relative h-[calc(100vh-var(--bottom-bar-height))] w-full overflow-hidden">
//       <div className="absolute left-0 right-0 top-[var(--header-height)] z-0 h-[calc(100vh-var(--bottom-bar-height))]">
//         <InteractiveMap />
//       </div>
//       <div className="pointer-events-none relative z-10">
//         <div className="pointer-events-auto">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

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
