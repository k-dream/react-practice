import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ type, value , onClick}) => {
  return <button type={type} className={styles.button} onClick={onClick}>{value}</button>;
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Button;
