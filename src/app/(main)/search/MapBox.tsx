"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import Map, { Marker } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { Popover } from "../../../components/ui/popover";

import { useSelector } from "react-redux";
import { selectOrganisations } from "src/redux/modules/organisations/organisationSelectors";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { OrganisationState } from "src/redux/modules/organisations/organisationReducer";
import organisationActions from "src/redux/modules/organisations/organisationActions";
import { useEffect } from "react";

const markers = [
  {
    latitude: 4.06034,
    longitude: 9.70703,
  },
  {
    latitude: 4.0385,
    longitude: 9.7096,
  },
  {
    latitude: 4.0485,
    longitude: 9.712,
  },
  {
    latitude: 4.0826,
    longitude: 9.7349,
  },
];

export default function MapBox() {


  const dispatch = useAppDispatch();
  const organisations: typeof OrganisationState.organisations = useAppSelector(selectOrganisations);

  useEffect(() => {
    dispatch(organisationActions.getOrganizations());
  }, []);
  const { theme } = useTheme();

  const coordinates = organisations.data?.length > 0 ? organisations.data : markers?.map((result:any) => ({
    latitude: Number(result.latitude),
    longitude: Number(result.longitude),
  }));

  var center = getCenter(coordinates);
  console.log("if ran", coordinates);


  if (!center) {
    return <>Loading</>
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
      {coordinates?.map((marker:any, index:any) => {

        return (
          <div key={index}>
            <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              offset={[-20, -10]}
              //   color="red"
              //   anchor="bottom"
            >
              <p
                role="img"
                // onClick={() => setSelectedLocation(marker)}
                className="animate-bounce cursor-pointer text-2xl"
                aria-label="push-pin"
              >
                📌
              </p>
            </Marker>
            {/* <Popover>hello</Popover> */}
          </div>
        );
      })}
    </Map>
  );
}
