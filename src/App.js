import "./App.css";
import React, { useState } from "react";
import styles from "./App.module.scss";
import Map from "./components/Map.js";
import Details from "./components/Details.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [detail, setDetail] = useState(null);

  // Getting details of selected earthquake location
  const getDetails = (detail) => {
    setDetail(detail);
  };

  return (
    <div className={styles.app}>
      <header>
        <FontAwesomeIcon
          icon={faGlobe}
          size="2xl"
          style={{ color: "#ffffff" }}
        />
        <span>Earthquakes Around The World</span>
      </header>
      <div className={styles.content}>
        {/* Map section */}
        <div className={styles.map}>
          <Map getDetails={getDetails} />
        </div>
        {/* Details section */}
        <div className={styles.details}>
          <Details detail={detail} />
        </div>
      </div>
    </div>
  );
}

export default App;
