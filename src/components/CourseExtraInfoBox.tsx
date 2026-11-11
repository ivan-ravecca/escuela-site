import React from "react";
import { Link } from "react-router-dom";
import { SiteCourse } from "../types/siteCourse";
const CourseExtraInfoBox: React.FC<{ course: SiteCourse }> = ({
  course,
}) => {
  const [activeTab, setActiveTab] = React.useState("tab1");
  return (
    <div className="fifteen columns">
      <ul className="tabs-nav">
        <li
          className={activeTab === "tab1" ? "active" : ""}
          onClick={() => setActiveTab("tab1")}
        >
          <Link to="#">Requisitos</Link>
        </li>
        {course.openRegistration ? (
          <li
            className={activeTab === "tab2" ? "active" : ""}
            onClick={() => setActiveTab("tab2")}
          >
            <Link to="#">Inscripciones</Link>
          </li>
        ) : (
          ""
        )}
        {course.curriculum ? (
          <li
            className={activeTab === "tab3" ? "active" : ""}
            onClick={() => setActiveTab("tab3")}
          >
            <Link to="#">Temario</Link>
          </li>
        ) : (
          ""
        )}
      </ul>

      <div className="tabs-container">
        <div
          className="tab-content"
          id="tab1"
          style={{ display: activeTab === "tab1" ? "block" : "none" }}
        >
          <p>Estos son los requisitos para poder cursar.</p>
          <ul className="check-list">
            {course.requirements.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        <div
          className="tab-content"
          id="tab2"
          style={{ display: activeTab === "tab2" ? "block" : "none" }}
        >
          <div dangerouslySetInnerHTML={{ __html: course.openRegistration }} />
        </div>
        <div
          className="tab-content"
          id="tab3"
          style={{ display: activeTab === "tab3" ? "block" : "none" }}
        >
          {course.curriculum && <div dangerouslySetInnerHTML={{ __html: course.curriculum }} />}
        </div>
      </div>
    </div>
  );
};

export default CourseExtraInfoBox;
