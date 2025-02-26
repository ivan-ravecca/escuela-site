import React from "react";
import { CourseImageInterface } from "../data/interfaces";
import { Link } from "react-router-dom";

const CourseImageBox: React.FC<
  CourseImageInterface & { isActive: boolean }
> = ({ src, alt, isActive }) => {
  return (
    <li
      className={isActive ? "flex-active-slide" : ""}
      style={
        isActive
          ? {
              width: "100%",
              float: "left",
              marginRight: "-100%",
              position: "relative",
              display: "block",
            }
          : { display: "none" }
      }
    >
      <Link
        to={src}
        rel="fancybox-gallery"
        title={alt}
        onClick={(e) => e.preventDefault()}
      >
        <img src={src} alt={alt} aria-label={alt} />
      </Link>
    </li>
  );
};

export default CourseImageBox;
