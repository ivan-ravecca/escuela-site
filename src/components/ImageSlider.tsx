import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseImageBox from "./CourseImageBox";
import { CourseImageInterface } from "../data/interfaces";

const ImageSlider: React.FC<{ images: CourseImageInterface[] }> = ({
  images,
}) => {
  const [myImages, setMyImages] = useState<CourseImageInterface[]>(images);
  useEffect(() => {
    setMyImages(images);
  }, [images]);

  const manageImageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    next: boolean,
  ) => {
    e.preventDefault();
    let indexActive: number | undefined = myImages.findIndex(
      (img) => img.isActive,
    );
    if (indexActive === undefined) {
      indexActive = 0;
    } else if (next) {
      if (indexActive === myImages.length - 1) {
        indexActive = 0;
      } else {
        indexActive += 1;
      }
    } else if (indexActive === 0) {
      indexActive = myImages.length - 1;
    } else {
      indexActive -= 1;
    }
    const updatedImages = myImages.map((img, i) => {
      img.isActive = i === indexActive;
      return img;
    });
    setMyImages(updatedImages);
  };

  return (
    <section className="flexslider shop">
      <ul className="slides">
        {myImages &&
          myImages.map((img, i) => <CourseImageBox key={i} {...img} />)}
      </ul>
      <ul className="flex-direction-nav">
        <li>
          <Link
            className="flex-prev"
            to="#"
            title="Anterior"
            aria-label="Anterior"
            onClick={(e) => manageImageClick(e, false)}
          >
            Anterior
          </Link>
        </li>
        <li>
          <Link
            className="flex-next"
            to="#"
            title="Siguiente"
            aria-label="Siguiente"
            onClick={(e) => manageImageClick(e, true)}
          >
            Siguiente
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default ImageSlider;
