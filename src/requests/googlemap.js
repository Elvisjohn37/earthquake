import axios from "axios";

export const getEarthquakeList = ({
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios
    .get(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    )
    .then(success)
    .catch(error)
    .finally(completed);
};

export const getSelectedLocation = ({
  url = "",
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.get(url).then(success).catch(error).finally(completed);
};

export const getNearByCities = ({
  url = "",
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.get(url).then(success).catch(error).finally(completed);
};
