import { useEffect } from "react";
import "./ErrorBanner.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeErrors } from "../store/errors";
import { useLocation } from "react-router-dom";

const ErrorBanner = () => {
  const errors = useSelector((state) => state.errors);
  const [animate, setAnimate] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (errors && errors.length > 0) {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 50);
    }
  }, [errors]);

  useEffect(() => {
    if (!location.pathname.includes("/vendors")) {
      dispatch(removeErrors());
    }
  }, [location]);

  const onAnimationEnd = () => {
    dispatch(removeErrors());
  };

  return errors &&
    errors.length &&
    location.pathname.includes("/vendors") > 0 ? (
    <div
      className={`error-banner ${animate ? "slide-out-animation" : ""}`}
      onAnimationEnd={onAnimationEnd}
    >
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  ) : null;
};

export default ErrorBanner;