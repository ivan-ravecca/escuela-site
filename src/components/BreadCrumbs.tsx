import React from "react";
import { useLocation, Link } from "react-router-dom";
import { breadcrumbParts } from "../data/courses";

const BreadCrumbs: React.FC = () => {
  const location = useLocation();
  const whereAmI = location.pathname.split("/").filter(Boolean).pop();
  if (!whereAmI || !breadcrumbParts[whereAmI]) {
    return;
  }

  const pathnames = location.pathname.split("/").filter((x) => x);
  const items = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    return (
      <li key={index}>
        <Link
          to={routeTo}
          key={index}
          aria-label={breadcrumbParts[name].title}
          title={breadcrumbParts[name].title}
        >
          {breadcrumbParts[name].title.length > 25
            ? `${breadcrumbParts[name].title.slice(0, 25)}...`
            : breadcrumbParts[name].title}
        </Link>
      </li>
    );
  });

  return (
    <div className="container floated">
      <div className="sixteen floated page-title">
        <h2>{breadcrumbParts[whereAmI].title}</h2>

        <nav id="breadcrumbs">
          <ul>
            <li>Estas en:</li>
            {items}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BreadCrumbs;
