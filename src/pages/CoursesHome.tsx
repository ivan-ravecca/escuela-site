import React from "react";
import { Link } from "react-router-dom";
import { COURSES } from "../data/courses";

const CoursesHome: React.FC = () => {
  return (
    <div className="page-content portfolio">
      <div className="container">
        <div className="sixteen columns">
          <h1>Nuestros Cursos</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {COURSES.map((course, index) => {
            return (
              <div className="one-third column isotope-item" key={index}>
                <Link to={course.path} className="portfolio-item isotope">
                  <figure>
                    {course.images && course.images[0] && (
                      <img
                        src={course.images[0].src}
                        alt={course.images[0].alt}
                      />
                    )}
                    <figcaption className="item-description">
                      <h5>{course.title}</h5>
                      <span>{course.term}</span>
                    </figcaption>
                  </figure>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoursesHome;
