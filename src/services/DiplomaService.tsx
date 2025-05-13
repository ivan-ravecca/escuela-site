const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getDiploma = async (diplomaID: string) => {
  return await fetch(`${VITE_API_URL}/diploma/${diplomaID}`, {
    method: "GET",
  });
};

export const generateDiploma = async (driveURL: string) => {
  return await fetch(`${VITE_API_URL}/diploma/generate?link=${driveURL}`, {
    method: "GET",
  });
};

interface CertificateData {
  studentName: string;
  courseName: string;
  courseDate: string;
  driveUrl: string;
}

export const createCertificate = async (
  data: CertificateData,
): Promise<Response> => {
  const response = await fetch(`${VITE_API_URL}/diploma/certificate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};
