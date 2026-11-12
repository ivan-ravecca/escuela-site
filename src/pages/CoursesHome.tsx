import React from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../contexts/CourseContext";

const CoursesHome: React.FC = () => {
  const { courses, loading, error, refresh } = useCourses();
  if (loading) return <p>Cargando cursos...</p>;
  if (error) return <div role="alert">{error} <button onClick={() => void refresh()}>Reintentar</button></div>;
  return (
    <div className="page-content portfolio">
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {courses.map((course) => {
            return (
              <div className="one-third column isotope-item" key={course.recordId}>
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
