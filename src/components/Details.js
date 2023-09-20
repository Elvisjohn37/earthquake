import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import styles from "./Details.module.scss";
import DefaultLoader from "./Loader.js";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "./../assets/js/helper.js";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { getNearByCities } from "./../requests/googlemap.js";
import Skeleton from "@mui/material/Skeleton";
import { provideData } from "./map/slice.js";

const Details = ({ detail }) => {
  const map = useSelector(provideData);
  const [nearByCities, setNearByCities] = useState([]);
  const [isLoadingNearByCities, setIsLoadingNearByCities] = useState(true);

  // This useEffect is for getting the nearby cities
  useEffect(() => {
    const hasNearByCities =
      detail?.properties.products["nearby-cities"] !== undefined;

    if (hasNearByCities) {
      const url =
        detail?.properties.products["nearby-cities"][0]?.contents[
          "nearby-cities.json"
        ].url;

      setIsLoadingNearByCities(true);
      getNearByCities({
        url,
        success: (response) => {
          setNearByCities(response.data);
        },
        completed: () => setIsLoadingNearByCities(false),
      });
    } else {
      setNearByCities([]);
      setIsLoadingNearByCities(false);
    }
  }, [detail]);

  return (
    <div className={styles.details}>
      {map.isDetailsLoading ? (
        <DefaultLoader />
      ) : detail ? (
        <>
          <h1>{detail?.properties.title}</h1>
          <div className={styles.subHeader}>
            <div className={styles.location}>
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ color: "#22bcbc", paddingRight: "10px" }}
              />
              {detail?.properties.place}
            </div>
            <div className={styles.dateTime}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ color: "#22bcbc", paddingRight: "10px" }}
              />
              {formatDate(detail?.properties.time)}
            </div>
          </div>
          <Divider variant="middle" />
          <div className={styles.content}>
            <div className={styles.magnitude}>
              Magnitude: {detail?.properties.mag}
            </div>
            {isLoadingNearByCities ? (
              <Skeleton variant="rounded" width={400} height={60} />
            ) : nearByCities.length > 0 ? (
              <>
                <Stack
                  className={styles.nearByCities}
                  direction="row"
                  spacing={1}
                >
                  Nearby Cities:
                  {nearByCities.map((nearByCity) => (
                    <Chip className={styles.chip} label={nearByCity.name} />
                  ))}
                </Stack>
              </>
            ) : null}
            <div>Tsunami: {detail?.properties.tsunami}</div>
            <div>
              <Link
                target="__blank"
                href={detail?.properties.url}
                underline="none"
              >
                More Info
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Details;
