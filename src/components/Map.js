import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimneyCrack } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import ToolTipContent from "./ToolTipContent.js";
import {
  getEarthquakeList,
  getSelectedLocation,
} from "./../requests/googlemap.js";
import DefaultLoader from "./Loader.js";
import { useDispatch } from "react-redux";
import { startLoad, endLoad } from "./map/slice.js";

const Map = ({ getDetails = () => null }) => {
  const [earthquakeList, setEarthquakeList] = useState([]);
  const [defaultLocation, setDefaultLocation] = useState({ lat: 0, lng: 0 });
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [toolTipStatus, setToolTipStatus] = useState([]);
  const dispatch = useDispatch();

  // This useEffect is for getting the list of earthquake from the API
  useEffect(() => {
    getEarthquakeList({
      success: (response) => {
        const featues = response.data.features || [];
        setEarthquakeList(featues);
        setDefaultLocation({
          lat: featues[0]?.geometry.coordinates[1],
          lng: featues[0]?.geometry.coordinates[0],
        });
      },
      error: (response) => {
        console.log(response);
      },
      completed: () => setIsMapLoading(false),
    });
  }, []);

// This useEffect is for setting the default location of the map when the page is loaded
  useEffect(() => {
    if (earthquakeList.length > 0) {
      setDefaultLocation({
        lat: earthquakeList[0].geometry.coordinates[1],
        lng: earthquakeList[0].geometry.coordinates[0],
      });
      setToolTipStatus(earthquakeList.map(() => false));
      setIsMapLoading(false);
    }
  }, [earthquakeList]);

  // This function is for showing and hiding of pin location callout
  const toggleToolTip = (SelectedIndex) => {
    setToolTipStatus(
      toolTipStatus.map((tool, index) =>
        index === SelectedIndex ? !tool : tool
      )
    );
  };

  // This function trigger when the user clicks on the callout and start to fetch data from the API
  const handleClickToolTip = (detail) => {
    dispatch(startLoad());
    getSelectedLocation({
      url: detail,
      success: (response) => {
        getDetails(response.data);
      },
      completed: () => dispatch(endLoad())
    });
  };

  return isMapLoading ? (
    <DefaultLoader />
  ) : (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultLocation}
        defaultZoom={1}
        onClick={() => setToolTipStatus(toolTipStatus.map(() => false))}
      >
        {earthquakeList.map((earthquakeLis, index) => (
          <div
            lat={earthquakeLis.geometry.coordinates[1]}
            lng={earthquakeLis.geometry.coordinates[0]}
            key={index}
          >
            <Tooltip
              arrow
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => toggleToolTip(index)}
              open={toolTipStatus[index]}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <ToolTipContent
                  onClick={() =>
                    handleClickToolTip(earthquakeLis.properties.detail)
                  }
                  dateTime={earthquakeLis.properties.time}
                  location={earthquakeLis.properties.place}
                />
              }
            >
              <FontAwesomeIcon
                onClick={() => toggleToolTip(index)}
                icon={faHouseChimneyCrack}
                size="lg"
                style={{ color: "#b22e2e" }}
              />
            </Tooltip>
          </div>
        ))}
      </GoogleMapReact>
    </>
  );
};

export default Map;
