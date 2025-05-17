import React from "react";
import { Link } from "react-router-dom";
import { breadcrumbParts } from "../data/courses";
import { useAuth } from "../contexts/AuthContext";

const AdminMenu: React.FC = () => {
  const { logout } = useAuth();
  return (
    <ul className="cols2">
      <li className="col2">
        <Link
          to={breadcrumbParts["certificado"].url}
          title={breadcrumbParts["certificado"].title}
          aria-label={breadcrumbParts["certificado"].title}
        >
          {breadcrumbParts["certificado"].title}
        </Link>
      </li>
      <li className="col2">
        <Link
          to={breadcrumbParts["qr"].url}
          title={breadcrumbParts["qr"].title}
          aria-label={breadcrumbParts["qr"].title}
        >
          {breadcrumbParts["qr"].title}
        </Link>
      </li>
      <li className="col2">
        <Link
          to="/"
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
          onClick={logout}
        >
          Cerrar sesión
        </Link>
      </li>
    </ul>
  );
};

export default AdminMenu;
