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
    responseType: "arraybuffer",
    headers: {
      Accept: "image/png",
    },
  });
};

export const createCertificate = async (data: CertificateData) => {
  const response = await apiClient.post(
    `${API_URL}/diploma/certificate`,
    data,
    {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
    },
  );
  if (!response.data) {
    throw new Error("No se recibieron datos del servidor");
  }

  try {
    return new Blob([response.data], { type: "application/pdf" });
  } catch (error) {
    console.error("Error al crear el Blob:", error);
    console.error("Detalle de la respuesta:", response);
    throw new Error("Error al procesar el PDF recibido");
  }
};
