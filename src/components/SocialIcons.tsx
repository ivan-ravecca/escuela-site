import React from "react";
import { SITE_NAME, SOCIAL_URLS } from "../../app.config";
import { Link } from "react-router-dom";
import { SocialIconProps } from "../data/interfaces";
import { AnalyticsService } from "../services/AnalyticsService";

const SocialIcons: React.FC = () => {
  const socialIconsList: SocialIconProps[] = [
    {
      name: "Facebook",
      url: SOCIAL_URLS.facebook,
      icon: "facebook",
      alt: `Facebook de ${SITE_NAME}`,
    },
    {
      name: "Instagram",
      url: SOCIAL_URLS.instagram,
      icon: "instagram",
      alt: `Instagram de ${SITE_NAME}`,
    },
    {
      name: "Linkedin",
      url: SOCIAL_URLS.linkedin,
      icon: "linkedin",
      alt: `Linkedin de ${SITE_NAME}`,
    },
    {
      name: "Whatsapp",
      url: SOCIAL_URLS.whatsapp,
      icon: "whatsapp",
      alt: `Chatea con nosotros ${SITE_NAME}`,
    },
  ];

  return (
    <ul className="social-icons">
      {socialIconsList.map((social, index) => (
        <li className={social.icon} key={index}>
          <Link
            to={social.url}
            aria-label={social.alt}
            title={social.alt}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              AnalyticsService.trackEvent(
                "Social",
                "Click",
                `Ir a ${social.name}`,
              );
            }}
          >
            {social.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialIcons;
