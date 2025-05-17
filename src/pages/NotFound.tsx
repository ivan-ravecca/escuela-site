import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="page-content">
      <div className="container">
        <div className="sixteen columns">
          <section id="not-found">
            <h2>
              404 <i className="icon-file"></i>
            </h2>
            <p>
              La página a la que desea acceder no existe o fue cambiada. Por
              favor comienze desde el <Link to="/">inicio</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
