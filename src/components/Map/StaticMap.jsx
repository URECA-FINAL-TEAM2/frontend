import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useMapSetup } from "./MapBase";

const StaticMap = ({ location, shopName }) => {
  const { isLoaded, error } = useMapSetup();
  if (!isLoaded) return error;

  const mapContainerStyle = {
    width: "100%",
    height: "100%"
  };

  const options = {
    disableDefaultUI: true,
    clickableIcons: false,
    draggable: false,
    scrollwheel: false
  };

  return (
    <div className={"relative h-full w-full"}>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={16} center={location} options={options}>
        {window.google && <MarkerF position={location} title={shopName} key={shopName} />}
      </GoogleMap>
    </div>
  );
};

export default StaticMap;
