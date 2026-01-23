import { ReactNode } from "react";
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

export interface RequestInfoProps {
  inquiringName: string;
  requiresPhysicalPresence: boolean;
  requiresGraduationYear: boolean;
}

export interface InquireParams {
  name: string;
  email: string;
  phone: string;
  course: string;
  ci: string;
  year: string;
  inquire: string;
}

// AUTH
// Define los tipos para nuestro usuario y el contexto
export interface User {
  email: string;
  name: string;
  picture?: string;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface ProtectedRouteProps {
  redirectPath?: string;
}

// Custom Modal
export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

// Social Icons
export interface SocialIconProps {
  url: string;
  icon: string;
  alt: string;
  name: string;
}

// Diplomaservice
export type ProgramOption = "op1" | "op2" | "op3";

interface CertificateBaseData {
  studentName: string;
  courseName: string;
  courseDate: string;
}

export interface CertificateMecData extends CertificateBaseData {
  certMec: true;
}

export interface CertificateCourseData extends CertificateBaseData {
  certMec: false;
  programOption: ProgramOption;
}
export interface CertificateOtherData extends CertificateBaseData {
  certMec: false;
  programOption?: ProgramOption;
}

export type CertificateData = CertificateMecData | CertificateCourseData | CertificateOtherData;
