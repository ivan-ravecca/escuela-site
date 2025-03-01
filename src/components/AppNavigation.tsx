import React from "react";
import MenuLinks from "./MenuLinks";
import MenuLinksBurguer from "./MenuLinksBurguer";
import { useEffect, useState } from "react";

const AppNavigation: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {isDesktop && <MenuLinks />}
      {!isDesktop && <MenuLinksBurguer />}
    </>
  );
};

export default AppNavigation;
