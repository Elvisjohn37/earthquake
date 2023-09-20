import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Markers = ({ locations = [] }) =>
  locations.map((location) => (
    // set default pin location when the page is loaded
    <div
      lat={location.geometry.coordinates[1]}
      lng={location.geometry.coordinates[0]}
    >
      {/* Custome Marker for earthquakes */}
      <FontAwesomeIcon
        icon={faLocationDot}
        size="2xl"
        style={{ color: "#b22e2e" }}
      />
    </div>
  ));

export default Markers;
