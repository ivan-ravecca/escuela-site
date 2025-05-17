const API_URL = import.meta.env.VITE_API_URL;

import apiClient from "../interceptors/apiClient";
import { CertificateData } from "../data/interfaces";

export const getDiploma = async (diplomaID: string) => {
  return await fetch(`${API_URL}/diploma/${diplomaID}`, {
    method: "GET",
  });
};

export const generateDiploma = async (driveURL: string) => {
  return await apiClient.get(`${API_URL}/diploma/generate?link=${driveURL}`, {
    method: "GET",
  });
};

export const createCertificate = async (data: CertificateData) => {
  const response = await apiClient.post(`${API_URL}/diploma/certificate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};
