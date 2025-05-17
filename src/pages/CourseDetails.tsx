import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COURSES } from "../data/courses";
import CourseExtraInfoBox from "../components/CourseExtraInfoBox";
import { Link } from "react-router-dom";
import { CourseInterface } from "../data/interfaces";
import ImageSlider from "../components/ImageSlider";

const CourseDetails: React.FC = () => {
  const { course } = useParams<{ course: string }>();
  const [myCourse, setMyCourse] = useState<CourseInterface | undefined>(
    undefined,
  );
  useEffect(() => {
    const foundCourse = COURSES.find((c) => c.id === course) || undefined;
    // foundCourse?.images?.forEach((img, i) => {
    //   img.isActive = i === 0;
    // });
    setMyCourse(foundCourse);
  }, [course]);

  if (myCourse === undefined) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="sixteen column">
            <h2>
              Curso no encontrado <i className="icon-file"></i>
            </h2>
            <p>
              La página a la que desea acceder no existe o fue cambiada. Por
              favor comienze desde la página de cursos{" "}
              <Link to="/cursos">cursos</Link>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="sixteen floated">
          <div className="shop-page page-content">
            <div className="six columns">
              <ImageSlider images={myCourse.images ? myCourse.images : []} />
            </div>
            <div className="nine columns">
              <div className="product-info">
                <h3 className="title">{myCourse.title}</h3>
                {myCourse.term ? (
                  <span className="price">{myCourse.term}</span>
                ) : (
                  ""
                )}
                {myCourse.info}
                <div className="clearfix"></div>
              </div>
            </div>
            <div className="clearfix"></div>
            <CourseExtraInfoBox course={myCourse} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
