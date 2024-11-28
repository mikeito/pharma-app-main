import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import Map, { Marker } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { useEffect, useState } from "react";

export default function MapBox({ coordinates }: { coordinates: { latitude: number; longitude: number }[] }) {
  const { theme } = useTheme();
  const [center, setCenter] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (coordinates.length > 0) {
      const calculatedCenter = getCenter(coordinates);
      if (calculatedCenter) setCenter(calculatedCenter);
    }
  }, [coordinates]);

  if (!center) {
    return <>Loading...</>;
  }

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 10,
      }}
      mapStyle={
        theme === "light"
          ? "mapbox://styles/mapbox/streets-v10"
          : "mapbox://styles/mapbox/dark-v10"
      }
    >
      {coordinates.map((marker, index) => (
        <Marker
          key={index}
          longitude={marker.longitude}
          latitude={marker.latitude}
          offset={[-20, -10]}
        >
          <p
            role="img"
            className="animate-bounce cursor-pointer text-2xl"
            aria-label="push-pin"
          >
            📌
          </p>
        </Marker>
      ))}
    </Map>
  );
}
