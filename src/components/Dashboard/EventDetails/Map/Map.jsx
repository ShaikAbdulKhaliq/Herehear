import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import { useGlobalInfo } from "../../../../context/globalContext";

const destination = [78.38598118932651, 17.44030946921754];
const Map = ({ setShowMap }) => {
  const mapContainerRef = useRef(null);

  const { selectedeventdetails } = useGlobalInfo();
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const handleMinimizeClick = () => {
    if (setShowMap) {
      setShowMap(false);
      console.log("Minimize button clicked");
    }
  };
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFub2hhcnB1bGx1cnUiLCJhIjoiY2xyeHB2cWl0MWFkcjJpbmFuYXkyOTZzaCJ9.AUGHU42YHgAPtHjDzdhZ7g";
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [selectedeventdetails.longitude, selectedeventdetails.latitude],
      zoom: 9,
    });
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });
    mapInstance.addControl(geolocate);
    mapInstance.on("load", () => {
      geolocate.on("geolocate", (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([longitude, latitude]);
        mapInstance.setCenter([longitude, latitude]);
        mapInstance.setZoom(14);
      });
      geolocate.trigger();

      // const el = document.createElement("div");
      // el.className = "marker";
      new mapboxgl.Marker()
        .setLngLat([
          selectedeventdetails.longitude,
          selectedeventdetails.latitude,
        ])
        .addTo(mapInstance);
    });
    setMap(mapInstance);
    return () => mapInstance.remove();
  }, []);
  // console.log("selectedeventdetails",selectedeventdetails)
  useEffect(() => {
    if (userLocation && map) {
      let end = [selectedeventdetails.longitude, selectedeventdetails.latitude];

      getRoute(userLocation, end);
    }
  }, [userLocation, map, selectedeventdetails]);
  const getRoute = (start, end) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=false&geometries=geojson&access_token=${mapboxgl.accessToken}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const route = data.routes[0].geometry.coordinates;
        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        };
        if (map.getSource("route")) {
          map.getSource("route").setData(geojson);
        } else {
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3887be",
              "line-width": 5,
              "line-opacity": 0.75,
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error forming route:", error);
      });
  };
  return (
    <div style={{width: "100%", height: "100%"}}>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100vh" }}
        className="map_container"
      ></div>
      <div className="fullscreen" onClick={handleMinimizeClick}>
        <img src="/svgs/map_min.svg" alt="" />
      </div>
    </div>
  );
};
export default Map;
