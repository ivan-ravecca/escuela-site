import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCourses } from "../contexts/CourseContext";
import { CourseService } from "../services/CourseService";
import CourseExtraInfoBox from "../components/CourseExtraInfoBox";
import { Link } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import { SiteCourse } from "../types/siteCourse";

type Lookup =
  | { id: string; status: "found"; course: SiteCourse }
  | { id: string; status: "not-found" | "error" };

const CourseDetails: React.FC = () => {
  const { course } = useParams<{ course: string }>();
  const navigate = useNavigate();
  const { courses, loading, error, refresh } = useCourses();
  const listedCourse = courses.find((item) => item.id === course);
  const [lookup, setLookup] = useState<Lookup | null>(null);
  const myCourse = listedCourse || (lookup && lookup.id === course && lookup.status === "found" ? lookup.course : undefined);
  const lookupStatus = lookup && lookup.id === course ? lookup.status : "loading";
  useEffect(() => {
    if (loading || error || listedCourse || !course) return;
    let active = true;
    CourseService.get(course).then(({ course: found }) => {
      if (!active) return;
      if (found.id !== course) {
        navigate(found.path, { replace: true });
      } else {
        setLookup({ id: course, status: "found", course: found });
        void refresh();
      }
    }).catch((cause) => {
      if (!active) return;
      if (axios.isAxiosError(cause) && (cause.response?.status === 404 || cause.response?.status === 400)) {
        setLookup({ id: course, status: "not-found" });
      } else {
        console.error("No se pudo cargar el curso", cause);
        setLookup({ id: course, status: "error" });
      }
    });
    return () => { active = false; };
  }, [course, loading, error, listedCourse, navigate, refresh]);

  if (loading || (!myCourse && lookupStatus === "loading" && !error)) return <p>Cargando curso...</p>;
  if (error || (!myCourse && lookupStatus === "error")) {
    return <div role="alert">No se pudo cargar el curso. <button onClick={() => { setLookup(null); void refresh(); }}>Reintentar</button></div>;
  }

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
              <ImageSlider key={`${myCourse.recordId}:${JSON.stringify(myCourse.images)}`} images={myCourse.images} />
            </div>
            <div className="nine columns">
              <div className="product-info">
                <h3 className="title">{myCourse.title}</h3>
                {myCourse.term ? (
                  <span className="price">{myCourse.term}</span>
                ) : (
                  ""
                )}
                <div dangerouslySetInnerHTML={{ __html: myCourse.info }} />
                <div className="clearfix"></div>
              </div>
            </div>
            <div className="clearfix"></div>
            <CourseExtraInfoBox key={myCourse.recordId} course={myCourse} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
