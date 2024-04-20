import { useEffect } from "react";
import "./Error.css";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

function Error({ error }) {
  const navigate = useNavigate();
  return (
    <>
      <p className="error-tag">{error}</p>
      <button className="error-btn" onClick={() => navigate("/")}>
        Go home?
      </button>
    </>
  );
}

export default Error;

Error.propTypes = {
  error:PropTypes.string.isRequired
}