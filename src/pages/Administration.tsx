import React from "react";
import AdminMenu from "../components/AdminMenu";

const Administration: React.FC = () => {
  return (
    <div className="page-content">
      <div className="container">
        <div className="sixteen columns">
          <h2>Opciones</h2>

          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default Administration;
