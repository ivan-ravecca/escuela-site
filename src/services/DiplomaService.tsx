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
