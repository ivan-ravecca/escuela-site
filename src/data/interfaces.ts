import { JSX } from "react";

export interface CourseImageInterface {
  src: string;
  alt: string;
  isActive: boolean;
}

export interface CourseInterface {
  path: string;
  id: string;
  title: string;
  term: string; //duración
  openRegistration: string | JSX.Element;
  info: string | JSX.Element;
  curriculum: string[] | JSX.Element | undefined;
  requirements: string[];
  images: CourseImageInterface[] | undefined;
}

export interface BreadcrumbInterface {
  url: string;
  title: string;
}
