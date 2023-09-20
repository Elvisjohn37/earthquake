import { BallTriangle } from "react-loader-spinner";
import styles from "./Loader.module.scss";

const DefaultLoader = () => {
  return (
    <BallTriangle
      height={100}
      width={100}
      color="#22bcbc"
      ariaLabel="ball-triangle-loading"
      wrapperClass={styles.loader}
      wrapperStyle=""
    />
  );
};

export default DefaultLoader;
